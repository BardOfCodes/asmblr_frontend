// Node Sizing Utilities
// Calculate node dimensions based on content with proper two-row layout

import { NodeDefinition } from '../definitions';
import { NodeTheme } from '../theme/NodeTheme';

/**
 * Sizing calculation result
 */
export interface NodeSizing {
  width: number;
  height: number;
  leftColumnWidth: number;
  rightColumnWidth: number;
}

/**
 * Row sizing information for inputs/outputs
 */
interface RowSizing {
  labelWidth: number;
  controlWidth: number;
  totalWidth: number;
  height: number;
}

/**
 * Calculate text width (approximate)
 */
function calculateTextWidth(text: string, fontSize: number, fontWeight: number = 500): number {
  // Approximate character width based on font size and weight
  const baseCharWidth = fontSize * 0.6;
  const weightMultiplier = fontWeight >= 600 ? 1.1 : 1.0;
  return text.length * baseCharWidth * weightMultiplier;
}

/**
 * Calculate control width based on type and config
 */
function calculateControlWidth(
  controlType: string,
  config: any,
  data: Record<string, any>,
  theme: NodeTheme
): number {
  const baseWidth = 60;
  const padding = 16; // Internal padding
  
  switch (controlType) {
    case 'vector2':
      // 2 components: X[input] Y[input]
      return 2 * 40 + 2 * 8 + 2 * 6 + padding; // inputs + labels + gaps + padding
      
    case 'vector3':
      // 3 components: X[input] Y[input] Z[input]
      return 3 * 35 + 3 * 8 + 2 * 4 + padding; // inputs + labels + gaps + padding
      
    case 'vector4':
      // 4 components: X[input] Y[input] Z[input] W[input]
      return 4 * 30 + 4 * 8 + 3 * 4 + padding; // inputs + labels + gaps + padding
      
    case 'string':
      const value = data[config.key] || config.defaultValue || '';
      const placeholder = config.placeholder || '';
      const textToMeasure = value.length > placeholder.length ? value : placeholder;
      return Math.max(baseWidth, Math.min(180, textToMeasure.length * 7 + padding));
      
    case 'select':
      const options = config.options || [];
      const longestOption = options.reduce((longest: string, opt: string) => 
        opt.length > longest.length ? opt : longest, ''
      );
      return Math.max(baseWidth, longestOption.length * 7 + padding + 20); // +20 for dropdown arrow
      
    case 'float':
      return baseWidth + padding;
      
    case 'checkbox':
      return 20 + padding; // Just the checkbox
      
    default:
      return baseWidth + padding;
  }
}

/**
 * Calculate sizing for an input row (socket + label + optional control)
 */
function calculateInputRowSizing(
  input: any,
  control: any | null,
  data: Record<string, any>,
  theme: NodeTheme,
  isConnected: boolean
): RowSizing {
  // Row 1: Socket + Label
  const labelWidth = calculateTextWidth(input.label, theme.labels.fontSize, theme.labels.fontWeight);
  const row1Width = theme.sockets.size.normal + labelWidth + theme.labels.margin.length * 4;
  
  // Row 2: Control (if exists and not connected)
  let controlWidth = 0;
  if (control && !isConnected) {
    controlWidth = calculateControlWidth(control.type, control.config, data, theme);
  }
  
  const totalWidth = Math.max(row1Width, controlWidth);
  const height = theme.controls.height + (control && !isConnected ? theme.controls.height + theme.layout.rowGap : 0);
  
  return {
    labelWidth,
    controlWidth,
    totalWidth,
    height
  };
}

/**
 * Calculate sizing for an output row (label + socket)
 */
function calculateOutputRowSizing(
  output: any,
  theme: NodeTheme
): RowSizing {
  const labelWidth = calculateTextWidth(output.label, theme.labels.fontSize, theme.labels.fontWeight);
  const totalWidth = labelWidth + theme.sockets.size.normal + theme.labels.margin.length * 4;
  const height = theme.controls.height;
  
  return {
    labelWidth,
    controlWidth: 0,
    totalWidth,
    height
  };
}

/**
 * Calculate optimal node dimensions - ONLY CALLED ONCE AT NODE CREATION
 */
export function calculateNodeSizing(
  definition: NodeDefinition,
  data: Record<string, any>,
  theme: NodeTheme,
  connectedInputs: Set<string> = new Set()
): NodeSizing {
  let leftColumnWidth = 0;
  let rightColumnWidth = 0;
  let totalHeight = theme.header.height;
  
  // Calculate left column (inputs + controls)
  let leftColumnHeight = 0;
  
  // Regular inputs
  definition.inputs.forEach(input => {
    const isConnected = connectedInputs.has(input.key);
    const linkedControl = definition.controls.find(c => c.linkedToInput === input.key);
    
    const rowSizing = calculateInputRowSizing(input, linkedControl, data, theme, isConnected);
    leftColumnWidth = Math.max(leftColumnWidth, rowSizing.totalWidth);
    leftColumnHeight += rowSizing.height + theme.layout.rowGap;
  });
  
  // Controls (that aren't linked to inputs)
  definition.controls
    .filter(control => !control.linkedToInput)
    .forEach(control => {
      const isConnected = control.hasSocket && connectedInputs.has(control.key);
      
      // Create a fake input for calculation
      const fakeInput = {
        key: control.key,
        label: control.showLabel !== false ? control.label : '',
        socketType: control.socketType || 'FloatSocket'
      };
      
      const rowSizing = calculateInputRowSizing(fakeInput, control, data, theme, isConnected);
      leftColumnWidth = Math.max(leftColumnWidth, rowSizing.totalWidth);
      leftColumnHeight += rowSizing.height + theme.layout.rowGap;
    });
  
  // Calculate right column (outputs)
  let rightColumnHeight = 0;
  definition.outputs.forEach(output => {
    const rowSizing = calculateOutputRowSizing(output, theme);
    rightColumnWidth = Math.max(rightColumnWidth, rowSizing.totalWidth);
    rightColumnHeight += rowSizing.height + theme.layout.rowGap;
  });
  
  // Add socket padding
  leftColumnWidth += theme.layout.socketPadding;
  rightColumnWidth += theme.layout.socketPadding;
  
  // Calculate total width
  const titleWidth = calculateTextWidth(definition.label, theme.header.fontSize, theme.header.fontWeight) + 24;
  const contentWidth = leftColumnWidth + rightColumnWidth + theme.layout.columnGap;
  const totalWidth = Math.max(titleWidth, contentWidth);
  
  // Clamp width
  const finalWidth = Math.max(theme.layout.minWidth, Math.min(theme.layout.maxWidth, totalWidth));
  
  // Calculate total height
  const bodyHeight = Math.max(leftColumnHeight, rightColumnHeight) + theme.body.gap * 2;
  totalHeight += bodyHeight;
  
  return {
    width: finalWidth,
    height: Math.max(80, totalHeight),
    leftColumnWidth: Math.max(leftColumnWidth, finalWidth * 0.6), // Ensure minimum left column width
    rightColumnWidth: Math.max(rightColumnWidth, 60), // Ensure minimum right column width
  };
}

/**
 * Cache for node sizing to avoid recalculation
 */
const sizingCache = new Map<string, NodeSizing>();

/**
 * Get cached sizing or calculate if not cached
 */
export function getCachedNodeSizing(
  nodeId: string,
  definition: NodeDefinition,
  data: Record<string, any>,
  theme: NodeTheme,
  connectedInputs: Set<string> = new Set()
): NodeSizing {
  // Create cache key based on definition and initial data (not current connections)
  const cacheKey = `${nodeId}-${definition.type}-${JSON.stringify(definition.factory())}`;
  
  if (!sizingCache.has(cacheKey)) {
    // Calculate sizing only once with empty connections (for initial sizing)
    const sizing = calculateNodeSizing(definition, data, theme, new Set());
    sizingCache.set(cacheKey, sizing);
  }
  
  return sizingCache.get(cacheKey)!;
}

/**
 * Clear sizing cache (useful for theme changes)
 */
export function clearSizingCache(): void {
  sizingCache.clear();
}


