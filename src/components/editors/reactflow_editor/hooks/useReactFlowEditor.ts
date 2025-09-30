// React Flow Editor Hook
// Provides the editor interface compatible with the existing adaptive editor system

import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { ReactFlowEditor, globalNodeRegistry } from '../ReactFlowEditor';
import { ReactFlowEditorHandle, ReactFlowNode, ReactFlowEdge, ReactFlowExportData } from '../types';
import { NodeRegistry } from '../definitions';
// Import all auto-generated node definitions
import * as AutoNodes from '../nodes/auto_nodes';
import { NodeDefinition } from '../definitions';

interface UseReactFlowEditorProps {
  modeName: string;
}

export const useReactFlowEditor = ({ modeName }: UseReactFlowEditorProps): ReactFlowEditorHandle => {
  const [nodes, setNodes] = useState<ReactFlowNode[]>([]);
  const [edges, setEdges] = useState<ReactFlowEdge[]>([]);

  // Initialize nodes on first load
  useEffect(() => {
    // Load all auto-generated node definitions
    const nodeDefinitions = Object.values(AutoNodes).filter(
      (item): item is NodeDefinition => item && typeof item === 'object' && 'type' in item
    );
    
    console.log('Loading', nodeDefinitions.length, 'auto-generated nodes for mode:', modeName);
    console.log('✅ Found', nodeDefinitions.length, 'auto-generated nodes');
    
    // Log some sample node types for debugging
    const sampleTypes = nodeDefinitions.slice(0, 5).map(def => def.type);
    console.log('📋 Sample node types:', sampleTypes);
  }, [modeName]);

  // Handle nodes change
  const handleNodesChange = useCallback((newNodes: ReactFlowNode[]) => {
    setNodes(newNodes);
  }, []);

  // Handle edges change  
  const handleEdgesChange = useCallback((newEdges: ReactFlowEdge[]) => {
    setEdges(newEdges);
  }, []);

  // Handle node control changes
  const handleNodeControlChange = useCallback((nodeId: string, controlId: string, value: any) => {
    // This will be handled by the ReactFlowEditor component internally
    // We could emit events here for uniform updates if needed
    console.log('Node control changed:', { nodeId, controlId, value });
  }, []);

  // Export data function
  const exportData = useCallback((): ReactFlowExportData => {
    const serializedNodes = nodes.map(node => ({
      id: node.id,
      type: node.data.type,
      position: node.position,
      data: {
        label: node.data.label,
        controls: node.data.controlValues,
        inputs: node.data.inputs,
        outputs: node.data.outputs,
      }
    }));

    const serializedEdges = edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle || '',
      targetHandle: edge.targetHandle || '',
    }));

    // Extract uniforms from uniform-generating controls
    const uniforms: Record<string, any> = {};
    nodes.forEach(node => {
      node.data.controls.forEach(control => {
        if (control.uniforms) {
          control.uniforms.forEach(uniform => {
            const value = node.data.controlValues[control.id];
            uniforms[uniform.name] = uniform.transform ? uniform.transform(value) : value;
          });
        }
      });
    });

    return {
      nodes: serializedNodes,
      edges: serializedEdges,
      uniforms,
      metadata: {
        version: '1.0.0',
        mode: modeName,
        timestamp: new Date().toISOString(),
      }
    };
  }, [nodes, edges, modeName]);

  // Import data function
  const importData = useCallback((data: ReactFlowExportData) => {
    // This would need to reconstruct nodes and edges from serialized data
    // For now, just log the data
    console.log('Importing React Flow data:', data);
  }, []);

  // Get nodes
  const getNodes = useCallback(() => nodes, [nodes]);

  // Get edges
  const getEdges = useCallback(() => edges, [edges]);

  // Add node
  const addNode = useCallback((nodeType: string, position?: { x: number; y: number }) => {
    // This would use the node factory to create a new node
    console.log('Add node:', nodeType, position);
  }, []);

  // Remove node
  const removeNode = useCallback((nodeId: string) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    setEdges(prevEdges => prevEdges.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    ));
  }, []);

  // Update node control
  const updateNodeControl = useCallback((nodeId: string, controlId: string, value: any) => {
    setNodes(prevNodes => 
      prevNodes.map(node => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              controlValues: {
                ...node.data.controlValues,
                [controlId]: value
              }
            }
          };
        }
        return node;
      })
    );
  }, []);

  // Zoom to fit
  const zoomToFit = useCallback(() => {
    // This would be implemented using React Flow's fitView function
    console.log('Zoom to fit');
  }, []);

  // Layout function
  const layout = useCallback(() => {
    // This would implement auto-layout functionality
    console.log('Auto layout');
  }, []);

  // Create the editor view
  const view = useMemo(() => 
    React.createElement(ReactFlowEditor, {
      modeName,
      onNodesChange: handleNodesChange,
      onEdgesChange: handleEdgesChange,
      onNodeControlChange: handleNodeControlChange
    }), [modeName, handleNodesChange, handleEdgesChange, handleNodeControlChange]
  );

  // Return the editor handle
  return useMemo(() => ({
    view,
    type: 'reactflow_editor' as const,
    exportData,
    importData,
    getNodes,
    getEdges,
    addNode,
    removeNode,
    updateNodeControl,
    zoomToFit,
    layout,
    nodeRegistry: globalNodeRegistry, // Add the global node registry for serialization
  }), [
    view,
    exportData,
    importData,
    getNodes,
    getEdges,
    addNode,
    removeNode,
    updateNodeControl,
    zoomToFit,
    layout,
  ]);
};
