// Basic React Flow Node Component
// Themed, properly sized node with two-row input/output layout

import React, { useMemo, useCallback, memo } from 'react';
import { Handle, Position, NodeProps, useReactFlow, useStore } from 'reactflow';
import styled from 'styled-components';
import { NodeDefinition } from '../../../../types/node';
import { NodeRegistry } from '../definitions';
import { NodeTheme, DEFAULT_NODE_THEME } from '../theme/NodeTheme';
import { ControlDefinition } from '../../../../types/control';

/**
 * Parse CSS padding shorthand to numeric left/right values (px)
 */
function parsePadding(padding: string | number | undefined): { left: number; right: number } {
  if (!padding) return { left: 0, right: 0 };
  if (typeof padding === 'number') return { left: padding, right: padding };
  const parts = String(padding).trim().split(/\s+/);
  const toNum = (v: string) => parseFloat(v.replace('px', '')) || 0;
  if (parts.length === 1) {
    const v = toNum(parts[0]);
    return { left: v, right: v };
  }
  if (parts.length === 2) {
    const horizontal = toNum(parts[1]);
    return { left: horizontal, right: horizontal };
  }
  if (parts.length === 3) {
    // top, horizontal, bottom
    const horizontal = toNum(parts[1]);
    return { left: horizontal, right: horizontal };
  }
  // top, right, bottom, left
  const right = toNum(parts[1]);
  const left = toNum(parts[3]);
  return { left, right };
}

/**
 * Props for the BasicNode component
 */
export interface BasicNodeProps extends NodeProps {
  data: {
    nodeType: string;
    registry?: NodeRegistry;
    definition?: NodeDefinition;
    theme?: NodeTheme;
    [key: string]: any;
  };
}

/**
 * Connection state for inputs/outputs
 */
export interface ConnectionState {
  connectedInputs: Set<string>;
  connectedOutputs: Set<string>;
  inputConnections: Record<string, string[]>;
  outputConnections: Record<string, string[]>;
}

/**
 * Memoized styled components - created once and reused
 * Use CSS variables for dynamic values to prevent recreation
 */
const NodeContainer = styled.div`
  width: var(--node-width);
  min-height: var(--node-height);
  background: var(--node-bg);
  border: 2px solid var(--node-border);
  border-radius: var(--node-radius);
  box-shadow: var(--node-shadow);
  font-family: var(--node-font);
  font-size: var(--node-font-size);
  overflow: visible;
  position: relative;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: var(--node-shadow-hover);
  }
`;

const NodeHeader = styled.div`
  background: var(--header-bg);
  padding: var(--header-padding);
  font-weight: var(--header-font-weight);
  font-size: var(--header-font-size);
  color: var(--header-color);
  border-bottom: var(--header-border);
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--header-height);
  flex-shrink: 0;
`;

const NodeTitle = styled.span`
  text-align: center;
`;

const NodeBody = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  padding: var(--body-padding);
  gap: var(--column-gap);
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--left-column-width);
  gap: var(--row-gap);
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--right-column-width);
  gap: var(--row-gap);
  align-items: flex-end;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--row-gap);
`;

const OutputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--row-gap);
`;

const ControlSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--row-gap);
`;

// Two-row input: socket+label on top, control below
const InputContainer = styled.div<{ $hidden?: boolean }>`
  display: ${props => props.$hidden ? 'none' : 'flex'};
  flex-direction: column;
  position: relative;
  margin-bottom: 2px;
`;

const InputLabelRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 20px;
`;

const InputControlRow = styled.div<{ $hidden?: boolean }>`
  display: ${props => props.$hidden ? 'none' : 'flex'};
  align-items: center;
  margin-top: 4px;
  gap: 6px;
  min-height: 28px;
`;

// Two-row output: label+socket on top
const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const OutputLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 20px;
`;

const SocketLabel = styled.span<{ $isInput?: boolean }>`
  font-size: var(--label-font-size);
  color: var(--label-color);
  font-weight: var(--label-font-weight);
  margin: var(--label-margin);
  margin-left: ${props => props.$isInput ? '5px' : '0'};
  margin-right: ${props => props.$isInput ? '0' : '5px'};
  user-select: none;
`;

// Removed unused ControlLabel component

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

const ControlInput = styled.input`
  padding: var(--control-padding);
  border: 1px solid var(--control-border);
  border-radius: var(--control-radius);
  font-size: var(--control-font-size);
  background: var(--control-bg);
  width: 100%;
  min-width: 0;
  height: var(--control-height);
  
  &:focus {
    outline: none;
    border-color: var(--control-border-focus);
    box-shadow: 0 0 0 1px var(--control-border-focus-shadow);
  }
`;

const VectorContainer = styled.div`
  display: flex;
  gap: var(--control-gap);
  align-items: center;
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const VectorInput = styled(ControlInput)`
  width: 60px;
  text-align: center;
  min-width: 60px;
  flex-shrink: 0;
`;

const VectorLabel = styled.span`
  font-size: 9px;
  color: var(--label-color);
  min-width: 8px;
  text-align: center;
  flex-shrink: 0;
`;

const StyledHandle = styled(Handle)<{ $socketType?: string }>`
  width: var(--socket-size);
  height: var(--socket-size);
  border: var(--socket-border);
  background: ${props => getSocketColor(props.$socketType)};
  box-shadow: var(--socket-shadow);
  border-radius: 50%;
  
  &.react-flow__handle-left {
    left: calc(-1 * var(--socket-offset-left));
  }
  
  &.react-flow__handle-right {
    right: calc(-1 * var(--socket-offset-right));
  }
  
  &:hover {
    box-shadow: var(--socket-shadow-hover);
  }
`;

/**
 * Get color for socket type (static function to prevent recreation)
 */
function getSocketColor(socketType?: string): string {
  if (!socketType) return DEFAULT_NODE_THEME.sockets.colors.default;
  const colors = DEFAULT_NODE_THEME.sockets.colors as any;
  return colors[socketType] || colors.default;
}

/**
 * Custom hook that only tracks edges for a specific node
 * This prevents unnecessary re-renders when unrelated edges change
 */
const useNodeEdges = (nodeId: string) => {
  return useStore((state) => {
    const edges = state.edges;
    // Only return edges that involve this specific node
    return edges.filter(edge => 
      edge.source === nodeId || edge.target === nodeId
    );
  });
};

/**
 * Cached sizing calculator - regular function, memoized in component
 */
const calculateNodeSizing = (
  definition: NodeDefinition | null,
  connectedInputsSize: number,
  inputCount: number,
  outputCount: number,
  controlCount: number
) => {
  if (!definition) return { width: 180, height: 80, leftColumnWidth: 120, rightColumnWidth: 60 };
  
  // Helper function to estimate text width
  const estimateTextWidth = (text: string, fontSize: number = 12) => {
    return text.length * fontSize * 0.6;
  };
  
  // Calculate left column width based on inputs and controls
  let maxLeftWidth = 0;
  
  // Check input labels
  definition.inputs.forEach(input => {
    const labelWidth = estimateTextWidth(input.label) + 30;
    maxLeftWidth = Math.max(maxLeftWidth, labelWidth);
  });
  
  // Check control widths
  definition.controls.forEach(control => {
    let controlWidth = 60; // Base width
    
    // Adjust based on control type
    switch (control.type) {
      case 'vector2':
        controlWidth = 180;
        break;
      case 'vector3':
        controlWidth = 270;
        break;
      case 'vector4':
        controlWidth = 360;
        break;
      case 'string':
        controlWidth = 120;
        break;
    }
    
    const totalControlWidth = controlWidth + 30;
    maxLeftWidth = Math.max(maxLeftWidth, totalControlWidth);
  });
  
  // Calculate right column width based on outputs
  let maxRightWidth = 60;
  definition.outputs.forEach(output => {
    const labelWidth = estimateTextWidth(output.label) + 30;
    maxRightWidth = Math.max(maxRightWidth, labelWidth);
  });
  
  // Calculate header width
  const headerWidth = estimateTextWidth(definition.label, 13) + 24;
  
  // Final calculations
  const leftColumnWidth = Math.max(120, maxLeftWidth);
  const rightColumnWidth = Math.max(60, maxRightWidth);
  const contentWidth = leftColumnWidth + rightColumnWidth + 16;
  const calculatedWidth = Math.max(180, Math.max(headerWidth, contentWidth));
  
  // Height calculation - simplified
  const visibleControlsCount = controlCount - connectedInputsSize;
  const totalRows = Math.max(inputCount + visibleControlsCount, outputCount);
  const baseHeight = 32;
  const rowHeight = 24;
  const controlRowHeight = 32;
  const padding = 12;
  
  const calculatedHeight = Math.max(
    70,
    baseHeight + (totalRows * rowHeight) + (visibleControlsCount * controlRowHeight) + padding
  );
  
  return {
    width: calculatedWidth,
    height: calculatedHeight,
    leftColumnWidth,
    rightColumnWidth
  };
};

/**
 * Basic React Flow Node Component - Optimized with memoization
 */
export const BasicNode: React.FC<BasicNodeProps> = memo(({
  id,
  data,
  selected
}) => {
  const nodeEdges = useNodeEdges(id); // Only track edges for THIS node
  const { setNodes } = useReactFlow();
  const theme = data.theme || DEFAULT_NODE_THEME;
  
  // Get node definition
  const definition = useMemo(() => {
    if (data.definition) {
      return data.definition;
    }
    
    if (data.registry && data.nodeType) {
      return data.registry.get(data.nodeType);
    }
    
    return null;
  }, [data.definition, data.registry, data.nodeType]);

  // Calculate connection state - ONLY reacts to THIS node's edge changes
  const connectionState = useMemo((): ConnectionState => {
    const connectedInputs = new Set<string>();
    const connectedOutputs = new Set<string>();
    const inputConnections: Record<string, string[]> = {};
    const outputConnections: Record<string, string[]> = {};

    nodeEdges.forEach(edge => {
      if (edge.target === id) {
        const inputKey = edge.targetHandle || 'default';
        connectedInputs.add(inputKey);
        if (!inputConnections[inputKey]) {
          inputConnections[inputKey] = [];
        }
        inputConnections[inputKey].push(edge.id);
      }
      
      if (edge.source === id) {
        const outputKey = edge.sourceHandle || 'default';
        connectedOutputs.add(outputKey);
        if (!outputConnections[outputKey]) {
          outputConnections[outputKey] = [];
        }
        outputConnections[outputKey].push(edge.id);
      }
    });

    return {
      connectedInputs,
      connectedOutputs,
      inputConnections,
      outputConnections
    };
  }, [nodeEdges, id]);

  // Calculate sizing with better memoization
  const sizing = useMemo(() => {
    if (!definition) return { width: 180, height: 80, leftColumnWidth: 120, rightColumnWidth: 60 };
    
    return calculateNodeSizing(
      definition,
      connectionState.connectedInputs.size,
      definition.inputs.length,
      definition.outputs.length,
      definition.controls.length
    );
  }, [definition, connectionState.connectedInputs.size]);

  // Calculate CSS variables for styled components
  const cssVariables = useMemo(() => {
    const { left: paddingLeft, right: paddingRight } = parsePadding(theme.body.padding);
    const socketSize = theme.sockets.size.normal;
    
    return {
      // Node container
      '--node-width': `${sizing.width}px`,
      '--node-height': `${sizing.height}px`,
      '--node-bg': theme.container.background,
      '--node-border': selected ? theme.container.borderSelected : theme.container.border,
      '--node-radius': `${theme.container.borderRadius}px`,
      '--node-shadow': theme.container.shadow,
      '--node-shadow-hover': theme.container.shadowHover,
      '--node-font': theme.container.fontFamily,
      '--node-font-size': `${theme.container.fontSize}px`,
      
      // Header
      '--header-bg': theme.header.background,
      '--header-padding': theme.header.padding,
      '--header-font-weight': theme.header.fontWeight,
      '--header-font-size': `${theme.header.fontSize}px`,
      '--header-color': theme.header.color,
      '--header-border': theme.header.borderBottom,
      '--header-height': `${theme.header.height}px`,
      
      // Body
      '--body-padding': theme.body.padding,
      '--column-gap': `${theme.layout.columnGap}px`,
      '--row-gap': `${theme.layout.rowGap}px`,
      '--left-column-width': `${sizing.leftColumnWidth}px`,
      '--right-column-width': `${sizing.rightColumnWidth}px`,
      
      // Labels
      '--label-font-size': `${theme.labels.fontSize}px`,
      '--label-color': theme.labels.color,
      '--label-font-weight': theme.labels.fontWeight,
      '--label-margin': theme.labels.margin,
      
      // Controls
      '--control-padding': theme.controls.padding,
      '--control-border': theme.controls.border,
      '--control-radius': `${theme.controls.borderRadius}px`,
      '--control-font-size': `${theme.controls.fontSize}px`,
      '--control-bg': theme.controls.background,
      '--control-height': `${theme.controls.height}px`,
      '--control-border-focus': theme.controls.borderFocus,
      '--control-border-focus-shadow': `${theme.controls.borderFocus}40`,
      '--control-gap': `${theme.controls.gap}px`,
      
      // Sockets
      '--socket-size': `${socketSize}px`,
      '--socket-border': theme.sockets.border,
      '--socket-shadow': theme.sockets.shadow,
      '--socket-shadow-hover': theme.sockets.shadowHover,
      '--socket-offset-left': `${socketSize / 2 + paddingLeft}px`,
      '--socket-offset-right': `${socketSize / 2 + paddingRight}px`,
    } as React.CSSProperties;
  }, [theme, sizing, selected]);

  // Handle control value changes
  const handleControlChange = useCallback((controlKey: string, value: any) => {
    // Update node data using React Flow's proper update mechanism
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              [controlKey]: value,
            },
          };
        }
        return node;
      })
    );
  }, [id, setNodes]);

  // Render control based on its type - memoized
  const renderControl = useCallback((control: ControlDefinition, value: any) => {
    switch (control.type) {
      case 'float':
        return (
          <ControlInput
            type="number"
            value={value !== undefined ? value : control.config.defaultValue || 0}
            step={theme.controls.step}
            onChange={(e) => handleControlChange(control.key, parseFloat(e.target.value) || 0)}
          />
        );
        
      case 'string':
        return (
          <ControlInput
            type="text"
            value={value !== undefined ? value : control.config.defaultValue || ''}
            placeholder={control.config.placeholder}
            onChange={(e) => handleControlChange(control.key, e.target.value)}
          />
        );
        
      case 'vector2':
      case 'vector3':
      case 'vector4':
        const dimensions = control.type === 'vector2' ? 2 : control.type === 'vector3' ? 3 : 4;
        const labels = ['X', 'Y', 'Z', 'W'];
        const vecValue = value || control.config.defaultValue || new Array(dimensions).fill(0);
        
        return (
          <VectorContainer>
            {Array.from({ length: dimensions }, (_, i) => (
              <React.Fragment key={i}>
                <VectorLabel>{labels[i]}</VectorLabel>
                  <VectorInput
                  type="number"
                  value={vecValue[i] || 0}
                    step={theme.controls.step}
                  onChange={(e) => {
                    const newVec = [...vecValue];
                    newVec[i] = parseFloat(e.target.value) || 0;
                    handleControlChange(control.key, newVec);
                  }}
                />
              </React.Fragment>
            ))}
          </VectorContainer>
        );
        
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value !== undefined ? value : control.config.defaultValue || false}
            onChange={(e) => handleControlChange(control.key, e.target.checked)}
          />
        );
        
      default:
        return (
          <ControlInput
            type="text"
            value={String(value !== undefined ? value : control.config.defaultValue || '')}
            onChange={(e) => handleControlChange(control.key, e.target.value)}
          />
        );
    }
  }, [handleControlChange, theme]);

  // If no definition found, render error state
  if (!definition) {
    return (
      <NodeContainer style={{ '--node-width': '180px', '--node-height': '60px', ...cssVariables } as React.CSSProperties}>
        <NodeHeader>
          <NodeTitle>❌ Unknown Node</NodeTitle>
        </NodeHeader>
        <NodeBody>
          <LeftColumn>
            <div style={{ color: '#ff4d4f', fontSize: '11px' }}>
              Type: {data.nodeType || 'undefined'}
            </div>
          </LeftColumn>
        </NodeBody>
      </NodeContainer>
    );
  }

  return (
    <NodeContainer style={cssVariables}>
      {/* Node Header with just the title */}
      <NodeHeader>
        <NodeTitle>{definition.label}</NodeTitle>
      </NodeHeader>

      {/* Node Body with two columns */}
      <NodeBody>
        {/* Left Column: Inputs and Controls */}
        <LeftColumn>
          {/* Regular Inputs with two-row layout */}
          {definition.inputs.length > 0 && (
            <InputSection>
              {definition.inputs.map((input) => {
                const linkedControl = definition.controls.find(c => c.linkedToInput === input.key);
                const isInputConnected = connectionState.connectedInputs.has(input.key);
                const showControl = linkedControl && !isInputConnected;
                
                return (
                  <InputContainer key={input.key}>
                    {/* Row 1: Socket + Label */}
                    <InputLabelRow>
                      <StyledHandle
                        type="target"
                        position={Position.Left}
                        id={input.key}
                        $socketType={input.socketType}
                      />
                      <SocketLabel $isInput={true}>
                        {input.label}
                        {input.required && <span style={{ color: '#ff4d4f' }}>*</span>}
                      </SocketLabel>
                    </InputLabelRow>
                    
                    {/* Row 2: Control (if linked and not connected) */}
                    {showControl && (
                      <InputControlRow>
                        <ControlContainer>
                          {renderControl(linkedControl, data[linkedControl.key])}
                        </ControlContainer>
                      </InputControlRow>
                    )}
                  </InputContainer>
                );
              })}
            </InputSection>
          )}

          {/* Standalone Controls (not linked to inputs) with two-row layout */}
          {definition.controls.filter(c => !c.linkedToInput).length > 0 && (
            <ControlSection>
              {definition.controls
                .filter(control => !control.linkedToInput)
                .map((control) => {
                  const isControlConnected = control.hasSocket && 
                                           connectionState.connectedInputs.has(control.key);
                  
                  return (
                    <InputContainer key={control.key}>
                      {/* Row 1: Socket + Label */}
                      <InputLabelRow>
                        {control.hasSocket && (
                          <StyledHandle
                            type="target"
                            position={Position.Left}
                            id={control.key}
                            $socketType={control.socketType}
                          />
                        )}
                        {control.showLabel !== false && (
                          <SocketLabel $isInput={true}>
                            {control.label}
                          </SocketLabel>
                        )}
                      </InputLabelRow>
                      
                      {/* Row 2: Control (if not connected) */}
                      <InputControlRow $hidden={isControlConnected}>
                        <ControlContainer>
                          {renderControl(control, data[control.key])}
                        </ControlContainer>
                      </InputControlRow>
                    </InputContainer>
                  );
                })}
            </ControlSection>
          )}
        </LeftColumn>

        {/* Right Column: Outputs with single row layout */}
        {definition.outputs.length > 0 && (
          <RightColumn>
            <OutputSection>
              {definition.outputs.map((output) => (
                <OutputContainer key={output.key}>
                  <OutputLabelRow>
                    <SocketLabel>{output.label}</SocketLabel>
                    <StyledHandle
                      type="source"
                      position={Position.Right}
                      id={output.key}
                      $socketType={output.socketType}
                    />
                  </OutputLabelRow>
                </OutputContainer>
              ))}
            </OutputSection>
          </RightColumn>
        )}
      </NodeBody>
    </NodeContainer>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for memo - only re-render if important props change
  return (
    prevProps.id === nextProps.id &&
    prevProps.selected === nextProps.selected &&
    prevProps.data.nodeType === nextProps.data.nodeType &&
    // Deep compare only control values that might have changed
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
  );
});

BasicNode.displayName = 'BasicNode';

export default BasicNode;