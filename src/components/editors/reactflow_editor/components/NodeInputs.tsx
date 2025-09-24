// Node Inputs Component
// Renders input sockets for React Flow nodes

import React from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import { InputDefinition } from '../definitions';
import { EnhancedConnectionState } from '../hooks';

/**
 * Props for NodeInputs component
 */
export interface NodeInputsProps {
  inputs: InputDefinition[];
  connectionState: EnhancedConnectionState;
  nodeId: string;
}

/**
 * Styled components
 */
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  min-height: 20px;
`;

const InputLabel = styled.span<{ $required?: boolean; $connected?: boolean }>`
  font-size: 11px;
  color: ${props => props.$connected ? '#1890ff' : props.$required ? '#ff4d4f' : '#666'};
  font-weight: ${props => props.$connected ? '600' : '500'};
  margin-left: 16px;
  user-select: none;
`;

const RequiredIndicator = styled.span`
  color: #ff4d4f;
  margin-left: 2px;
  font-weight: bold;
`;

const ConnectionIndicator = styled.div<{ $connected?: boolean }>`
  position: absolute;
  left: -2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${props => props.$connected ? '#1890ff' : 'transparent'};
  transition: all 0.2s ease;
`;

const StyledHandle = styled(Handle)<{ $socketType?: string; $connected?: boolean }>`
  width: 12px;
  height: 12px;
  border: 2px solid white;
  background: ${props => getSocketColor(props.$socketType)};
  opacity: ${props => props.$connected ? 1 : 0.7};
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  
  &.react-flow__handle-left {
    left: -6px;
  }
`;

const InputTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1000;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.8);
  }
`;

const InputRowWithTooltip = styled(InputRow)`
  &:hover ${InputTooltip} {
    opacity: 1;
  }
`;

/**
 * Get color for socket type
 */
function getSocketColor(socketType?: string): string {
  switch (socketType) {
    case 'ExprSocket': return '#4CAF50';      // Green for expressions
    case 'VectorSocket': return '#2196F3';    // Blue for vectors
    case 'FloatSocket': return '#FF9800';     // Orange for floats
    case 'BoolSocket': return '#9C27B0';      // Purple for booleans
    case 'StringSocket': return '#607D8B';    // Blue-grey for strings
    case 'MaterialSocket': return '#E91E63';  // Pink for materials
    case 'StateSocket': return '#795548';     // Brown for state
    default: return '#9E9E9E';                // Grey for unknown
  }
}

/**
 * NodeInputs Component
 * Renders input sockets with connection state awareness
 */
export const NodeInputs: React.FC<NodeInputsProps> = ({
  inputs,
  connectionState
}) => {
  if (inputs.length === 0) {
    return null;
  }

  return (
    <InputsContainer>
      {inputs.map((input) => {
        const isConnected = connectionState.isInputConnected(input.key);
        const connectionCount = connectionState.getInputConnectionCount(input.key);
        
        return (
          <InputRowWithTooltip key={input.key}>
            <ConnectionIndicator $connected={isConnected} />
            
            <StyledHandle
              type="target"
              position={Position.Left}
              id={input.key}
              $socketType={input.socketType}
              $connected={isConnected}
            />
            
            <InputLabel 
              $required={input.required} 
              $connected={isConnected}
            >
              {input.label}
              {input.required && <RequiredIndicator>*</RequiredIndicator>}
              {connectionCount > 1 && (
                <span style={{ 
                  fontSize: '9px', 
                  color: '#1890ff', 
                  marginLeft: '4px' 
                }}>
                  ({connectionCount})
                </span>
              )}
            </InputLabel>
            
            {input.description && (
              <InputTooltip>
                <div><strong>{input.label}</strong></div>
                <div>Type: {input.socketType}</div>
                <div>{input.description}</div>
                {input.required && <div style={{ color: '#ff7875' }}>Required</div>}
                {input.defaultValue !== undefined && (
                  <div>Default: {JSON.stringify(input.defaultValue)}</div>
                )}
              </InputTooltip>
            )}
          </InputRowWithTooltip>
        );
      })}
    </InputsContainer>
  );
};

export default NodeInputs;

