// Node Outputs Component
// Renders output sockets for React Flow nodes

import React from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import { OutputDefinition } from '../definitions';
import { ConnectionState } from '../hooks';

/**
 * Props for NodeOutputs component
 */
export interface NodeOutputsProps {
  outputs: OutputDefinition[];
  connectionState: ConnectionState;
  nodeId: string;
}

/**
 * Styled components
 */
const OutputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`;

const OutputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  min-height: 20px;
`;

const OutputLabel = styled.span<{ $connected?: boolean }>`
  font-size: 11px;
  color: ${props => props.$connected ? '#1890ff' : '#666'};
  font-weight: ${props => props.$connected ? '600' : '500'};
  margin-right: 16px;
  user-select: none;
`;

const ConnectionIndicator = styled.div<{ $connected?: boolean }>`
  position: absolute;
  right: -2px;
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
  
  &.react-flow__handle-right {
    right: -6px;
  }
`;

const OutputTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  right: 50%;
  transform: translateX(50%);
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
    right: 50%;
    transform: translateX(50%);
    border: 4px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.8);
  }
`;

const OutputRowWithTooltip = styled(OutputRow)`
  &:hover ${OutputTooltip} {
    opacity: 1;
  }
`;

const ConnectionCount = styled.span`
  font-size: 9px;
  color: #1890ff;
  margin-left: 4px;
  background: rgba(24, 144, 255, 0.1);
  padding: 1px 4px;
  border-radius: 2px;
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
 * NodeOutputs Component
 * Renders output sockets with connection state awareness
 */
export const NodeOutputs: React.FC<NodeOutputsProps> = ({
  outputs,
  connectionState
}) => {
  if (outputs.length === 0) {
    return null;
  }

  return (
    <OutputsContainer>
      {outputs.map((output) => {
        const isConnected = connectionState.isOutputConnected(output.key);
        const connectionCount = connectionState.getOutputConnectionCount(output.key);
        
        return (
          <OutputRowWithTooltip key={output.key}>
            <OutputLabel $connected={isConnected}>
              {output.label}
              {connectionCount > 1 && (
                <ConnectionCount>
                  {connectionCount}
                </ConnectionCount>
              )}
            </OutputLabel>
            
            <ConnectionIndicator $connected={isConnected} />
            
            <StyledHandle
              type="source"
              position={Position.Right}
              id={output.key}
              $socketType={output.socketType}
              $connected={isConnected}
            />
            
            {output.description && (
              <OutputTooltip>
                <div><strong>{output.label}</strong></div>
                <div>Type: {output.socketType}</div>
                <div>{output.description}</div>
                {connectionCount > 0 && (
                  <div style={{ color: '#91d5ff' }}>
                    Connected to {connectionCount} node{connectionCount > 1 ? 's' : ''}
                  </div>
                )}
              </OutputTooltip>
            )}
          </OutputRowWithTooltip>
        );
      })}
    </OutputsContainer>
  );
};

export default NodeOutputs;

