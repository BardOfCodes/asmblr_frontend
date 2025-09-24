// Smart React Flow Node Component
// Themed, properly sized node with two-row input/output layout

import React, { useMemo, useCallback } from 'react';
import { Handle, Position, NodeProps, useEdges, useReactFlow } from 'reactflow';
import styled from 'styled-components';
import { NodeDefinition, NodeRegistry } from '../definitions';
import { NodeTheme, DEFAULT_NODE_THEME } from '../theme/NodeTheme';

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
 * Props for the SmartReactFlowNode component
 */
export interface SmartReactFlowNodeProps extends NodeProps {
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
 * Themed styled components
 */
const NodeContainer = styled.div<{ 
  $width: number; 
  $height: number; 
  $selected?: boolean;
  $theme: NodeTheme;
}>`
  width: ${props => props.$width}px;
  min-height: ${props => props.$height}px;
  background: ${props => props.$theme.container.background};
  border: 2px solid ${props => props.$selected ? props.$theme.container.borderSelected : props.$theme.container.border};
  border-radius: ${props => props.$theme.container.borderRadius}px;
  box-shadow: ${props => props.$theme.container.shadow};
  font-family: ${props => props.$theme.container.fontFamily};
  font-size: ${props => props.$theme.container.fontSize}px;
  overflow: visible; /* Allow sockets to extend outside */
  position: relative;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: ${props => props.$theme.container.shadowHover};
  }
`;

const NodeHeader = styled.div<{ $theme: NodeTheme }>`
  background: ${props => props.$theme.header.background};
  padding: ${props => props.$theme.header.padding};
  font-weight: ${props => props.$theme.header.fontWeight};
  font-size: ${props => props.$theme.header.fontSize}px;
  color: ${props => props.$theme.header.color};
  border-bottom: ${props => props.$theme.header.borderBottom};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.$theme.header.height}px;
  flex-shrink: 0;
`;

const NodeTitle = styled.span`
  text-align: center;
`;

const NodeBody = styled.div<{ $theme: NodeTheme }>`
  display: flex;
  flex: 1;
  min-height: 0;
  padding: ${props => props.$theme.body.padding};
  gap: ${props => props.$theme.layout.columnGap}px;
`;

const LeftColumn = styled.div<{ $width: number; $theme: NodeTheme }>`
  display: flex;
  flex-direction: column;
  width: ${props => props.$width}px;
  gap: ${props => props.$theme.layout.rowGap}px;
`;

const RightColumn = styled.div<{ $width: number; $theme: NodeTheme }>`
  display: flex;
  flex-direction: column;
  width: ${props => props.$width}px;
  gap: ${props => props.$theme.layout.rowGap}px;
  align-items: flex-end;
`;

const InputSection = styled.div<{ $theme: NodeTheme }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$theme.layout.rowGap}px;
`;

const OutputSection = styled.div<{ $theme: NodeTheme }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$theme.layout.rowGap}px;
`;

const ControlSection = styled.div<{ $theme: NodeTheme }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$theme.layout.rowGap}px;
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

const SocketLabel = styled.span<{ $theme: NodeTheme; $isInput?: boolean }>`
  font-size: ${props => props.$theme.labels.fontSize}px;
  color: ${props => props.$theme.labels.color};
  font-weight: ${props => props.$theme.labels.fontWeight};
  margin: ${props => props.$theme.labels.margin};
  margin-left: ${props => props.$isInput ? '5px' : '0'};
  margin-right: ${props => props.$isInput ? '0' : '5px'};
  user-select: none;
`;

const ControlLabel = styled.label<{ $show?: boolean; $theme: NodeTheme }>`
  display: ${props => props.$show ? 'block' : 'none'};
  font-size: ${props => props.$theme.labels.fontSize}px;
  color: ${props => props.$theme.labels.color};
  font-weight: ${props => props.$theme.labels.fontWeight};
  min-width: 30px;
  flex-shrink: 0;
  margin-right: 8px;
`;

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

const ControlInput = styled.input<{ $theme: NodeTheme }>`
  padding: ${props => props.$theme.controls.padding};
  border: 1px solid ${props => props.$theme.controls.border};
  border-radius: ${props => props.$theme.controls.borderRadius}px;
  font-size: ${props => props.$theme.controls.fontSize}px;
  background: ${props => props.$theme.controls.background};
  width: 100%;
  min-width: 0;
  height: ${props => props.$theme.controls.height}px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$theme.controls.borderFocus};
    box-shadow: 0 0 0 1px ${props => props.$theme.controls.borderFocus}40;
  }
`;

const VectorContainer = styled.div<{ $theme: NodeTheme }>`
  display: flex;
  gap: ${props => props.$theme.controls.gap}px;
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

const VectorLabel = styled.span<{ $theme: NodeTheme }>`
  font-size: 9px;
  color: ${props => props.$theme.labels.color};
  min-width: 8px;
  text-align: center;
  flex-shrink: 0;
`;

const StyledHandle = styled(Handle)<{ 
  $socketType?: string; 
  $theme: NodeTheme;
}>`
  width: ${props => props.$theme.sockets.size.normal}px;
  height: ${props => props.$theme.sockets.size.normal}px;
  border: ${props => props.$theme.sockets.border};
  background: ${props => getSocketColor(props.$socketType, props.$theme)};
  box-shadow: ${props => props.$theme.sockets.shadow};
  border-radius: 50%;
  
  &.react-flow__handle-left {
    ${props => {
      const size = props.$theme.sockets.size.normal;
      const { left } = parsePadding(props.$theme.body.padding);
      const offsetPx = size / 2 + left; // center exactly on node edge
      return `left: -${offsetPx}px;`;
    }}
  }
  
  &.react-flow__handle-right {
    ${props => {
      const size = props.$theme.sockets.size.normal;
      const { right } = parsePadding(props.$theme.body.padding);
      const offsetPx = size / 2 + right; // center exactly on node edge
      return `right: -${offsetPx}px;`;
    }}
  }
  
  &:hover {
    box-shadow: ${props => props.$theme.sockets.shadowHover};
  }
`;

/**
 * Get color for socket type from theme
 */
function getSocketColor(socketType?: string, theme?: NodeTheme): string {
  if (!theme || !socketType) return DEFAULT_NODE_THEME.sockets.colors.default;
  return theme.sockets.colors[socketType as keyof typeof theme.sockets.colors] || theme.sockets.colors.default;
}

/**
 * Smart React Flow Node Component
 */
export const SmartReactFlowNode: React.FC<SmartReactFlowNodeProps> = ({
  id,
  data,
  selected
}) => {
  const edges = useEdges(); // This hook provides reactive edge state
  const { setNodes } = useReactFlow(); // For proper node updates
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

  // Calculate connection state - REACTIVE to edge changes
  const connectionState = useMemo((): ConnectionState => {
    const connectedInputs = new Set<string>();
    const connectedOutputs = new Set<string>();
    const inputConnections: Record<string, string[]> = {};
    const outputConnections: Record<string, string[]> = {};

    edges.forEach(edge => {
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

    // Debug logging to verify reactivity
    console.log(`[${id.slice(0,8)}] Connection state updated:`, {
      connectedInputs: Array.from(connectedInputs),
      totalEdges: edges.length,
      nodeType: data.nodeType
    });

    return {
      connectedInputs,
      connectedOutputs,
      inputConnections,
      outputConnections
    };
  }, [edges, id, data.nodeType]); // Now properly depends on the reactive edges array

  // Calculate sizing dynamically based on visible controls and actual content
  const sizing = useMemo(() => {
    if (!definition) return { width: 180, height: 80, leftColumnWidth: 120, rightColumnWidth: 60 };
    
    // Helper function to estimate text width
    const estimateTextWidth = (text: string, fontSize: number = 12) => {
      return text.length * fontSize * 0.6; // Rough approximation
    };
    
    // Calculate left column width based on inputs and visible controls
    let maxLeftWidth = 0;
    
    // Check input labels
    definition.inputs.forEach(input => {
      const labelWidth = estimateTextWidth(input.label) + 30; // +30 for socket space
      maxLeftWidth = Math.max(maxLeftWidth, labelWidth);
    });
    
    // Check visible control widths
    definition.controls.forEach(control => {
      const isVisible = control.linkedToInput 
        ? !connectionState.connectedInputs.has(control.linkedToInput)
        : !control.hasSocket || !connectionState.connectedInputs.has(control.key);
      
      if (isVisible) {
        let controlWidth = 60; // Base width
        
        // Adjust based on control type
        switch (control.type) {
          case 'vector2':
            controlWidth = 180; // 2 * 60px + gaps
            break;
          case 'vector3':
            controlWidth = 270; // 3 * 60px + gaps
            break;
          case 'vector4':
            controlWidth = 360; // 4 * 60px + gaps
            break;
          case 'string':
            if (control.config.defaultValue) {
              controlWidth = Math.max(100, estimateTextWidth(String(control.config.defaultValue)) + 20);
            }
            break;
        }
        
        const totalControlWidth = controlWidth + 30; // +30 for socket space if applicable
        maxLeftWidth = Math.max(maxLeftWidth, totalControlWidth);
      }
    });
    
    // Calculate right column width based on outputs
    let maxRightWidth = 60; // Minimum
    definition.outputs.forEach(output => {
      const labelWidth = estimateTextWidth(output.label) + 30; // +30 for socket space
      maxRightWidth = Math.max(maxRightWidth, labelWidth);
    });
    
    // Calculate header width
    const headerWidth = estimateTextWidth(definition.label, 13) + 24; // Header font size + padding
    
    // Final calculations
    const leftColumnWidth = Math.max(120, maxLeftWidth);
    const rightColumnWidth = Math.max(60, maxRightWidth);
    const contentWidth = leftColumnWidth + rightColumnWidth + 16; // +16 for column gap
    const calculatedWidth = Math.max(180, Math.max(headerWidth, contentWidth));
    
    // Height calculation
    const visibleInputs = definition.inputs.length;
    const visibleOutputs = definition.outputs.length;
    const visibleControlsCount = definition.controls.filter(control => {
      if (control.linkedToInput) {
        return !connectionState.connectedInputs.has(control.linkedToInput);
      } else {
        return !control.hasSocket || !connectionState.connectedInputs.has(control.key);
      }
    }).length;
    
    const totalRows = Math.max(visibleInputs + visibleControlsCount, visibleOutputs);
    // Each row is about 24px (20px label + 4px margin), controls add 28px + 4px margin = 32px
    const baseHeight = 32; // Header
    const rowHeight = 24; // Label row height
    const controlRowHeight = 32; // Control row height  
    const padding = 12;
    
    const calculatedHeight = Math.max(
      70, // Minimum height for any node (reduced from 80)
      baseHeight + (totalRows * rowHeight) + (visibleControlsCount * controlRowHeight) + padding
    );
    
    console.log(`[${id.slice(0,8)}] Dynamic sizing: width=${calculatedWidth}, height=${calculatedHeight}, left=${leftColumnWidth}, right=${rightColumnWidth}`);
    
    return {
      width: calculatedWidth,
      height: calculatedHeight,
      leftColumnWidth,
      rightColumnWidth
    };
  }, [id, definition, data, theme, connectionState.connectedInputs]);

  // Handle control value changes
  const handleControlChange = useCallback((controlKey: string, value: any) => {
    console.log(`Control ${controlKey} changed to:`, value);
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

  // Render control based on its type
  const renderControl = useCallback((control: any, value: any) => {
    switch (control.type) {
      case 'float':
        return (
          <ControlInput
            $theme={theme}
            type="number"
            value={value !== undefined ? value : control.config.defaultValue || 0}
            step={theme.controls.step}
            onChange={(e) => handleControlChange(control.key, parseFloat(e.target.value) || 0)}
          />
        );
        
      case 'string':
        return (
          <ControlInput
            $theme={theme}
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
          <VectorContainer $theme={theme}>
            {Array.from({ length: dimensions }, (_, i) => (
              <React.Fragment key={i}>
                <VectorLabel $theme={theme}>{labels[i]}</VectorLabel>
                  <VectorInput
                  $theme={theme}
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
            $theme={theme}
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
      <NodeContainer $width={180} $height={60} $selected={selected} $theme={theme}>
        <NodeHeader $theme={theme}>
          <NodeTitle>❌ Unknown Node</NodeTitle>
        </NodeHeader>
        <NodeBody $theme={theme}>
          <LeftColumn $width={120} $theme={theme}>
            <div style={{ color: '#ff4d4f', fontSize: '11px' }}>
              Type: {data.nodeType || 'undefined'}
            </div>
          </LeftColumn>
        </NodeBody>
      </NodeContainer>
    );
  }

  return (
    <NodeContainer 
      $width={sizing.width}
      $height={sizing.height}
      $selected={selected}
      $theme={theme}
    >
      {/* Node Header with just the title */}
      <NodeHeader $theme={theme}>
        <NodeTitle>{definition.label}</NodeTitle>
      </NodeHeader>

      {/* Node Body with two columns */}
      <NodeBody $theme={theme}>
        {/* Left Column: Inputs and Controls */}
        <LeftColumn $width={sizing.leftColumnWidth} $theme={theme}>
          {/* Regular Inputs with two-row layout */}
          {definition.inputs.length > 0 && (
            <InputSection $theme={theme}>
              {definition.inputs.map((input) => {
                const linkedControl = definition.controls.find(c => c.linkedToInput === input.key);
                const isInputConnected = connectionState.connectedInputs.has(input.key);
                const showControl = linkedControl && !isInputConnected;
                
                // Debug logging for input controls
                if (linkedControl) {
                  console.log(`[${id.slice(0,8)}] Input ${input.key}: connected=${isInputConnected}, showControl=${showControl}`);
                }
                
                return (
                  <InputContainer key={input.key}>
                    {/* Row 1: Socket + Label */}
                    <InputLabelRow>
                      <StyledHandle
                        type="target"
                        position={Position.Left}
                        id={input.key}
                        $socketType={input.socketType}
                        $theme={theme}
                      />
                      <SocketLabel $theme={theme} $isInput={true}>
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
            <ControlSection $theme={theme}>
              {definition.controls
                .filter(control => !control.linkedToInput)
                .map((control) => {
                  const isControlConnected = control.hasSocket && 
                                           connectionState.connectedInputs.has(control.key);
                  
                  // Debug logging for standalone controls
                  if (control.hasSocket) {
                    console.log(`[${id.slice(0,8)}] Control ${control.key}: connected=${isControlConnected}, hasSocket=${control.hasSocket}`);
                  }
                  
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
                            $theme={theme}
                          />
                        )}
                        {control.showLabel !== false && (
                          <SocketLabel $theme={theme} $isInput={true}>
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
          <RightColumn $width={sizing.rightColumnWidth} $theme={theme}>
            <OutputSection $theme={theme}>
              {definition.outputs.map((output) => (
                <OutputContainer key={output.key}>
                  <OutputLabelRow>
                    <SocketLabel $theme={theme}>{output.label}</SocketLabel>
                    <StyledHandle
                      type="source"
                      position={Position.Right}
                      id={output.key}
                      $socketType={output.socketType}
                      $theme={theme}
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
};

export default SmartReactFlowNode;