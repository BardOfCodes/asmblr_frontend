// Connection State Hook
// Provides reactive connection state for React Flow nodes

import { useMemo } from 'react';
import { useReactFlow } from 'reactflow';
import { ConnectionState } from '../components/SmartReactFlowNode';

/**
 * Enhanced connection information
 */
export interface EnhancedConnectionState extends ConnectionState {
  // Connection counts
  inputCount: number;
  outputCount: number;
  totalConnections: number;
  
  // Connection analysis
  isFullyConnected: boolean;      // All required inputs connected
  hasUnconnectedRequired: boolean; // Has unconnected required inputs
  isolatedNode: boolean;          // No connections at all
  
  // Helper functions
  isInputConnected: (inputKey: string) => boolean;
  isOutputConnected: (outputKey: string) => boolean;
  getInputConnectionCount: (inputKey: string) => number;
  getOutputConnectionCount: (outputKey: string) => number;
}

/**
 * Hook to get enhanced connection state for a node
 */
export function useConnectionState(
  nodeId: string,
  requiredInputs: string[] = []
): EnhancedConnectionState {
  const { getEdges } = useReactFlow();
  
  return useMemo(() => {
    const edges = getEdges();
    const connectedInputs = new Set<string>();
    const connectedOutputs = new Set<string>();
    const inputConnections: Record<string, string[]> = {};
    const outputConnections: Record<string, string[]> = {};

    // Process all edges to find connections for this node
    edges.forEach(edge => {
      if (edge.target === nodeId) {
        const inputKey = edge.targetHandle || 'default';
        connectedInputs.add(inputKey);
        if (!inputConnections[inputKey]) {
          inputConnections[inputKey] = [];
        }
        inputConnections[inputKey].push(edge.id);
      }
      
      if (edge.source === nodeId) {
        const outputKey = edge.sourceHandle || 'default';
        connectedOutputs.add(outputKey);
        if (!outputConnections[outputKey]) {
          outputConnections[outputKey] = [];
        }
        outputConnections[outputKey].push(edge.id);
      }
    });

    // Calculate derived state
    const inputCount = connectedInputs.size;
    const outputCount = connectedOutputs.size;
    const totalConnections = inputCount + outputCount;
    
    const unconnectedRequired = requiredInputs.filter(
      inputKey => !connectedInputs.has(inputKey)
    );
    
    const isFullyConnected = requiredInputs.length > 0 && unconnectedRequired.length === 0;
    const hasUnconnectedRequired = unconnectedRequired.length > 0;
    const isolatedNode = totalConnections === 0;

    // Helper functions
    const isInputConnected = (inputKey: string) => connectedInputs.has(inputKey);
    const isOutputConnected = (outputKey: string) => connectedOutputs.has(outputKey);
    const getInputConnectionCount = (inputKey: string) => inputConnections[inputKey]?.length || 0;
    const getOutputConnectionCount = (outputKey: string) => outputConnections[outputKey]?.length || 0;

    return {
      connectedInputs,
      connectedOutputs,
      inputConnections,
      outputConnections,
      inputCount,
      outputCount,
      totalConnections,
      isFullyConnected,
      hasUnconnectedRequired,
      isolatedNode,
      isInputConnected,
      isOutputConnected,
      getInputConnectionCount,
      getOutputConnectionCount
    };
  }, [getEdges, nodeId, requiredInputs]);
}

/**
 * Hook to determine if a control should be visible
 */
export function useControlVisibility(
  nodeId: string,
  controlKey: string,
  linkedInputKey?: string
): {
  isVisible: boolean;
  reason: 'always-visible' | 'input-connected' | 'input-disconnected';
} {
  const connectionState = useConnectionState(nodeId);
  
  return useMemo(() => {
    // If control is not linked to an input, always show it
    if (!linkedInputKey) {
      return {
        isVisible: true,
        reason: 'always-visible'
      };
    }
    
    // If linked input is connected, hide the control
    const isConnected = connectionState.isInputConnected(linkedInputKey);
    
    return {
      isVisible: !isConnected,
      reason: isConnected ? 'input-connected' : 'input-disconnected'
    };
  }, [connectionState, controlKey, linkedInputKey]);
}

/**
 * Hook to get node validation state based on connections
 */
export function useNodeValidation(
  nodeId: string,
  requiredInputs: string[] = []
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  status: 'valid' | 'warning' | 'error' | 'incomplete';
} {
  const connectionState = useConnectionState(nodeId, requiredInputs);
  
  return useMemo(() => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Check for missing required inputs
    if (connectionState.hasUnconnectedRequired) {
      const unconnected = requiredInputs.filter(
        input => !connectionState.isInputConnected(input)
      );
      errors.push(`Missing required inputs: ${unconnected.join(', ')}`);
    }
    
    // Check for isolated nodes
    if (connectionState.isolatedNode) {
      warnings.push('Node has no connections');
    }
    
    // Determine overall status
    let status: 'valid' | 'warning' | 'error' | 'incomplete';
    if (errors.length > 0) {
      status = 'error';
    } else if (warnings.length > 0) {
      status = 'warning';
    } else if (connectionState.isFullyConnected) {
      status = 'valid';
    } else {
      status = 'incomplete';
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      status
    };
  }, [connectionState, requiredInputs]);
}



