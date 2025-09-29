// Basic React Flow Node Component
// Themed, properly sized node with two-row input/output layout

import React, { useMemo, useCallback, memo } from 'react';
import { Handle, Position, NodeProps, useReactFlow, useStore } from 'reactflow';
import styled from 'styled-components';
import { NodeDefinition } from '../../../../types/node';
import { NodeRegistry } from '../definitions';
import { NodeTheme, DEFAULT_NODE_THEME } from '../theme/NodeTheme';
import { ControlDefinition } from '../../../../types/control';
import { getControlComponent } from '../controls';
import { parseTypeString } from '../controls/TypeParser';


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
  width: fit-content;
  height: fit-content;
  min-width: 120px;
  min-height: 60px;
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
  padding: 4px 8px 8px 8px; /* Added bottom padding */
  gap: 0px; /* No gap between left and right columns */
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 4px;
  align-items: flex-end;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px; /* Reduced gap between inputs */
`;

const OutputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px; /* Reduced gap between outputs */
`;

const ControlSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px; /* Reduced gap between controls */
`;

// Two-row input: socket+label on top, control below
const InputContainer = styled.div<{ $hidden?: boolean }>`
  display: ${props => props.$hidden ? 'none' : 'flex'};
  flex-direction: column;
  position: relative;
  margin-bottom: var(--row-padding); /* Theme-controlled row padding */
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
  margin-top: 2px; /* Reduced top margin */
  gap: 4px; /* Reduced gap */
  min-height: 24px; /* Reduced min height */
`;

// Two-row output: label+socket on top
const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: var(--row-padding); /* Theme-controlled row padding */
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

// Removed old hardcoded control styles - now using TypeParser and control components

const StyledHandle = styled(Handle)<{ $socketType?: string }>`
  width: var(--socket-size);
  height: var(--socket-size);
  border: var(--socket-border);
  background: ${props => getSocketColor(props.$socketType)};
  border-radius: 50%;
  z-index: 10; /* Ensure socket appears above node */
  
  /* Shadow only on the outside part using clip-path */
  box-shadow: var(--socket-shadow);
  
  &.react-flow__handle-left {
    left: calc(-1 * var(--socket-offset-left));
    /* Clip shadow to only show on left side (outside the node) */
    clip-path: circle(50% at 50% 50%);
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
  }
  
  &.react-flow__handle-right {
    right: calc(-1 * var(--socket-offset-right));
    /* Clip shadow to only show on right side (outside the node) */
    clip-path: circle(50% at 50% 50%);
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    &.react-flow__handle-left {
      box-shadow: -3px 0 6px rgba(0, 0, 0, 0.3);
    }
    &.react-flow__handle-right {
      box-shadow: 3px 0 6px rgba(0, 0, 0, 0.3);
    }
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
const calculateNodeSizing = (definition: NodeDefinition | null) => {
  if (!definition) return { width: 150, height: 60 };
  
  // Simple: just use auto sizing - let CSS handle it
  return {
    width: 'auto' as any,
    height: 'auto' as any
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
  const definition = useMemo((): NodeDefinition | null => {
    if (data.definition) {
      return data.definition;
    }
    
    if (data.registry && data.nodeType) {
      return data.registry.get(data.nodeType) || null;
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

  // Calculate sizing - simple bottom-up approach
  const sizing = useMemo(() => {
    return calculateNodeSizing(definition);
  }, [definition]);

  // No need to manually set node size - using CSS fit-content

  // Calculate CSS variables for styled components
  const cssVariables = useMemo(() => {
    const socketSize = theme.sockets.size.normal;
    const nodeBorderWidth = 2; // From NodeContainer border: 2px solid
    const bodyPadding = 8; // From NodeBody padding: 4px 8px 8px 8px
    const labelMargin = 5; // From SocketLabel margin-left/right: 5px
    
    // Calculate precise offset: half socket + border + body padding + label margin + offset factor
    const baseOffset = (socketSize / 2) + nodeBorderWidth + bodyPadding + labelMargin;
    const leftOffset = baseOffset + (socketSize * (theme.sockets.offsetFactors?.left || 0));
    const rightOffset = baseOffset + (socketSize * (theme.sockets.offsetFactors?.right || 0));
    
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
      
      // Labels
      '--label-font-size': `${theme.labels.fontSize}px`,
      '--label-color': theme.labels.color,
      '--label-color-secondary': theme.labels.colorSecondary,
      '--label-font-weight': theme.labels.fontWeight,
      '--label-margin': theme.labels.margin,
      
      // Controls
      '--control-padding': theme.controls.padding,
      '--control-border': theme.controls.border,
      '--control-radius': `${theme.controls.borderRadius}px`,
      '--control-font-size': `${theme.controls.fontSize}px`,
      '--control-bg': theme.controls.background,
      '--control-bg-secondary': theme.controls.backgroundSecondary,
      '--control-height': `${theme.controls.height}px`,
      '--control-border-focus': theme.controls.borderFocus,
      '--control-border-focus-shadow': `${theme.controls.borderFocus}40`,
      '--control-gap': `${theme.controls.gap}px`,
      '--control-text-color': theme.controls.textColor,
      '--control-text-color-secondary': theme.controls.textColorSecondary,
      '--control-button-add': theme.controls.buttonAdd,
      '--control-button-add-hover': theme.controls.buttonAddHover,
      '--control-button-delete': theme.controls.buttonDelete,
      '--control-button-delete-hover': theme.controls.buttonDeleteHover,
      // Standardized input styling
      '--control-input-padding': theme.controls.inputPadding,
      '--control-input-font-size': `${theme.controls.inputFontSize}px`,
      '--control-input-border-radius': `${theme.controls.inputBorderRadius}px`,
      
      // Control sizing
      '--control-vector-width': `${theme.controls.vectorInputWidth}px`,
      '--control-vector-width-list': `${theme.controls.vectorInputWidthList}px`,
      '--control-float-width': `${theme.controls.floatInputWidth}px`,
      '--control-float-width-list': `${theme.controls.floatInputWidthList}px`,
      '--control-matrix-width': `${theme.controls.matrixInputWidth}px`,
      '--control-matrix-padding': `${theme.controls.matrixContainerPadding}px`,
      
      // Sockets
      '--socket-size': `${socketSize}px`,
      '--socket-border': theme.sockets.border,
      '--socket-background': theme.sockets.colors.default,
      '--socket-shadow': theme.sockets.shadow,
      '--socket-shadow-hover': theme.sockets.shadowHover,
      '--socket-offset-left': `${leftOffset}px`, /* Precise offset calculation */
      '--socket-offset-right': `${rightOffset}px`, /* Precise offset calculation */
      
      // Layout
      '--row-padding': `${theme.layout.rowPadding}px`,
      
      // Connections (for global edge styling)
      '--connection-color': theme.connections.color,
      '--connection-color-selected': theme.connections.colorSelected,
      '--connection-color-hover': theme.connections.colorHover,
      '--connection-stroke-width': `${theme.connections.strokeWidth}px`,
      '--connection-stroke-selected': `${theme.connections.strokeWidthSelected}px`,
      '--connection-shadow': theme.connections.shadow,
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
              controlValues: {
                ...node.data.controlValues,
                [controlKey]: value,
              },
            },
          };
        }
        return node;
      })
    );
  }, [id, setNodes]);

  // Render control based on its type using TypeParser - memoized
  const renderControl = useCallback((control: ControlDefinition, value: any) => {
    const ControlComponent = getControlComponent(control.type);
    const typeMapping = parseTypeString(control.type);
    
    // Merge control config with TypeParser config (TypeParser config takes precedence for things like options)
    const mergedConfig = {
      ...control.config,
      ...typeMapping.config,
      // Use TypeParser default if control config doesn't have one
      defaultValue: control.config.defaultValue ?? typeMapping.defaultValue
    };
    
    return (
      <ControlComponent
        id={`${id}-${control.key}`}
        type={control.type}
        label={control.label}
        value={value}
        config={mergedConfig}
        onChange={(newValue) => handleControlChange(control.key, newValue)}
        disabled={false}
      />
    );
  }, [handleControlChange, id]);

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
                          {renderControl(linkedControl, data.controlValues?.[linkedControl.key])}
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
                          {renderControl(control, data.controlValues?.[control.key])}
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