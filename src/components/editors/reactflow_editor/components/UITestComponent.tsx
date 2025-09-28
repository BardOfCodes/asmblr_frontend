// UI Test Component for React Flow Components
// This component provides a test interface for the smart node rendering system

import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { 
  ReactFlowProvider, 
  Node, 
  useNodesState, 
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  addEdge,
  Connection
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import BasicNode from './BasicNode';
import { NodeRegistry, NodeFactory, NodeDefinition } from '../definitions';
import { DEFAULT_NODE_THEME } from '../theme';
import { GraphSerializer } from '../utils/GraphSerializer';
// Import auto-generated node definitions
import { Box3DDefinition, Sphere3DDefinition, Cylinder3DDefinition } from '../nodes/auto_nodes/primitives3d';
import { Translate3DDefinition, EulerRotate3DDefinition, Scale3DDefinition } from '../nodes/auto_nodes/transforms3d';
import { UnionDefinition, DifferenceDefinition } from '../nodes/auto_nodes/combinators';

/**
 * Styled components for the test interface
 */
const TestContainer = styled.div`
  width: 100%;
  height: 600px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
`;

const ControlButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: #f5f5f5;
    border-color: #1890ff;
  }
  
  &:active {
    background: #e6f7ff;
  }
`;

const StatusPanel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 11px;
  z-index: 1000;
`;

/**
 * Node types for React Flow
 */
const nodeTypes = {
  'smart-node': BasicNode
};

/**
 * UI Test Component
 */
export const UITestComponent: React.FC = () => {
  // Initialize registry and factory with auto-generated nodes
  const [registry] = useState(() => {
    const reg = new NodeRegistry();
    // Register auto-generated nodes instead of basic definitions
    reg.registerMany([
      Box3DDefinition,
      Sphere3DDefinition, 
      Cylinder3DDefinition,
      Translate3DDefinition,
      EulerRotate3DDefinition,
      Scale3DDefinition,
      UnionDefinition,
      DifferenceDefinition
    ]);
    return reg;
  });
  
  const [factory] = useState(() => new NodeFactory(registry));
  
  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // Test state
  const [nodeCount, setNodeCount] = useState(0);
  const [selectedNodeType, setSelectedNodeType] = useState('Box3D');
  const [saveKey, setSaveKey] = useState('test-graph');
  const [statusMessage, setStatusMessage] = useState('Ready');
  
  // Available node types from registry
  const availableTypes = useMemo(() => {
    return registry.getAll().map((def: NodeDefinition) => def.type);
  }, [registry]);
  
  // Create a new node
  const createNode = useCallback((nodeType: string) => {
    const result = factory.createNode(nodeType, { position: { x: 100 + nodes.length * 60, y: 100 } });
    
    if (result.success && result.node) {
      const nodeData = result.node.getAllData();
      const newNode: Node = {
        id: result.node.id,
        type: 'smart-node',
        position: result.node.position,
        data: {
          ...nodeData,
          nodeType: result.node.type, // Get type from the node object, not from data
          registry
        }
      };
      
      setNodes(prev => [...prev, newNode]);
      setNodeCount(prev => prev + 1);
    }
  }, [factory, registry, setNodes, nodes.length]);
  
  // Clear all nodes
  const clearNodes = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setNodeCount(0);
    setStatusMessage('Graph cleared');
  }, [setNodes, setEdges]);

  // Save current graph to localStorage
  const saveGraph = useCallback(() => {
    try {
      GraphSerializer.saveToLocalStorage(nodes, edges, saveKey);
      setStatusMessage(`Saved to '${saveKey}'`);
    } catch (error) {
      setStatusMessage(`Save failed: ${error}`);
    }
  }, [nodes, edges, saveKey]);

  // Load graph from localStorage
  const loadGraph = useCallback(() => {
    try {
      const result = GraphSerializer.loadFromLocalStorage(saveKey, 'base', registry);
      if (result) {
        setNodes(result.nodes);
        setEdges(result.edges);
        setNodeCount(result.nodes.length);
        setStatusMessage(`Loaded '${saveKey}' (${result.nodes.length} nodes, ${result.edges.length} edges)`);
      } else {
        setStatusMessage(`No saved data found for '${saveKey}'`);
      }
    } catch (error) {
      setStatusMessage(`Load failed: ${error}`);
    }
  }, [saveKey, registry, setNodes, setEdges]);

  // Export graph to file
  const exportGraph = useCallback(() => {
    try {
      GraphSerializer.exportToFile(nodes, edges, `${saveKey}.json`);
      setStatusMessage(`Exported to ${saveKey}.json`);
    } catch (error) {
      setStatusMessage(`Export failed: ${error}`);
    }
  }, [nodes, edges, saveKey]);

  // Import graph from file
  const importGraph = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const result = await GraphSerializer.importFromFile(file, 'base', registry);
          setNodes(result.nodes);
          setEdges(result.edges);
          setNodeCount(result.nodes.length);
          setStatusMessage(`Imported ${file.name} (${result.nodes.length} nodes, ${result.edges.length} edges)`);
        } catch (error) {
          setStatusMessage(`Import failed: ${error}`);
        }
      }
    };
    input.click();
  }, [registry, setNodes, setEdges]);
  
  // Create a test scenario with connections using auto-generated nodes
  const createTestScenario = useCallback(() => {
    clearNodes();
    
    // Create nodes to test variadic behavior
    const boxResult = factory.createNode('Box3D', {
      position: { x: 50, y: 100 }
    });
    
    const sphereResult = factory.createNode('Sphere3D', {
      position: { x: 50, y: 250 }
    });
    
    const cylinderResult = factory.createNode('Cylinder3D', {
      position: { x: 50, y: 400 }
    });
    
    const translateResult = factory.createNode('Translate3D', {
      position: { x: 350, y: 150 }
    });
    
    const unionResult = factory.createNode('Union', {
      position: { x: 650, y: 250 }
    });
    
    if (boxResult.success && sphereResult.success && cylinderResult.success && translateResult.success && unionResult.success) {
      const newNodes: Node[] = [
        {
          id: boxResult.node!.id,
          type: 'smart-node',
          position: boxResult.node!.position,
          data: {
            ...boxResult.node!.getAllData(),
            nodeType: boxResult.node!.type,
            registry
          }
        },
        {
          id: sphereResult.node!.id,
          type: 'smart-node',
          position: sphereResult.node!.position,
          data: {
            ...sphereResult.node!.getAllData(),
            nodeType: sphereResult.node!.type,
            registry
          }
        },
        {
          id: cylinderResult.node!.id,
          type: 'smart-node',
          position: cylinderResult.node!.position,
          data: {
            ...cylinderResult.node!.getAllData(),
            nodeType: cylinderResult.node!.type,
            registry
          }
        },
        {
          id: translateResult.node!.id,
          type: 'smart-node',
          position: translateResult.node!.position,
          data: {
            ...translateResult.node!.getAllData(),
            nodeType: translateResult.node!.type,
            registry
          }
        },
        {
          id: unionResult.node!.id,
          type: 'smart-node',
          position: unionResult.node!.position,
          data: {
            ...unionResult.node!.getAllData(),
            nodeType: unionResult.node!.type,
            registry
          }
        }
      ];
      
      // Create connections to demonstrate variadic behavior
      const newEdges = [
        // Connect Box3D output to Translate3D input (non-variadic)
        {
          id: 'e1',
          source: boxResult.node!.id,
          target: translateResult.node!.id,
          sourceHandle: 'expr',
          targetHandle: 'expr'
        },
        // Connect multiple sources to Union input (variadic) - this should work
        {
          id: 'e2',
          source: sphereResult.node!.id,
          target: unionResult.node!.id,
          sourceHandle: 'expr',
          targetHandle: 'expr'
        },
        {
          id: 'e3',
          source: cylinderResult.node!.id,
          target: unionResult.node!.id,
          sourceHandle: 'expr',
          targetHandle: 'expr'
        },
        // Connect Translate3D output to Union as well (3rd connection to variadic input)
        {
          id: 'e4',
          source: translateResult.node!.id,
          target: unionResult.node!.id,
          sourceHandle: 'expr',
          targetHandle: 'expr'
        }
      ];
      
      setNodes(newNodes);
      setEdges(newEdges);
      setNodeCount(5);
    }
  }, [factory, registry, clearNodes, setNodes, setEdges]);
  
  // Handle new connections with variadic rules
  const onConnect = useCallback((params: Connection) => {
    if (!params.target || !params.targetHandle) return;
    
    // Find the target node to determine socket rules
    const targetNode = nodes.find(node => node.id === params.target);
    if (!targetNode) return;
    
    // Get the node definition to check variadic property
    const nodeDefinition = registry.get(targetNode.data.nodeType);
    if (!nodeDefinition) return;
    
    // Find the input definition for this target handle
    const inputDefinition = nodeDefinition.inputs.find(input => input.key === params.targetHandle);
    if (!inputDefinition) return;
    
    setEdges(prev => {
      let updatedEdges = [...prev];
      
      // If input is NOT variadic, remove existing connections to this input
      if (!inputDefinition.variadic) {
        console.log(`[UITest Connection] Input ${params.targetHandle} is not variadic, removing existing connections`);
        updatedEdges = updatedEdges.filter(edge => 
          !(edge.target === params.target && edge.targetHandle === params.targetHandle)
        );
      } else {
        console.log(`[UITest Connection] Input ${params.targetHandle} is variadic, allowing multiple connections`);
      }
      
      // Add the new connection
      return addEdge(params, updatedEdges);
    });
  }, [setEdges, nodes, registry]);
  
  return (
    <div>
      <h3>🎨 Smart Node UI Test</h3>
      <p>Test the React Flow node components with connection-aware behavior</p>
      
      <TestContainer>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            defaultEdgeOptions={{
              style: { 
                strokeWidth: DEFAULT_NODE_THEME.connections.strokeWidth,
                stroke: DEFAULT_NODE_THEME.connections.color
              },
              type: DEFAULT_NODE_THEME.connections.type,
              animated: DEFAULT_NODE_THEME.connections.animated
            }}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
          
          <ControlPanel>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Node Controls
            </div>
            
            <select 
              value={selectedNodeType} 
              onChange={(e) => setSelectedNodeType(e.target.value)}
              style={{ padding: '4px', fontSize: '12px' }}
            >
              {availableTypes.map((type: string) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <ControlButton onClick={() => createNode(selectedNodeType)}>
              Add {selectedNodeType}
            </ControlButton>
            
            <ControlButton onClick={createTestScenario}>
              Create Test Scenario
            </ControlButton>
            
            <ControlButton onClick={clearNodes}>
              Clear All
            </ControlButton>
            
            <div style={{ fontWeight: 'bold', marginTop: '12px', marginBottom: '8px' }}>
              Save/Load
            </div>
            
            <input 
              type="text" 
              value={saveKey} 
              onChange={(e) => setSaveKey(e.target.value)}
              placeholder="Save key"
              style={{ padding: '4px', fontSize: '12px', marginBottom: '4px' }}
            />
            
            <div style={{ display: 'flex', gap: '4px' }}>
              <ControlButton onClick={saveGraph} style={{ flex: 1 }}>
                Save
              </ControlButton>
              <ControlButton onClick={loadGraph} style={{ flex: 1 }}>
                Load
              </ControlButton>
            </div>
            
            <div style={{ display: 'flex', gap: '4px' }}>
              <ControlButton onClick={exportGraph} style={{ flex: 1 }}>
                Export
              </ControlButton>
              <ControlButton onClick={importGraph} style={{ flex: 1 }}>
                Import
              </ControlButton>
            </div>
            
            <div style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
              <div>Nodes: {nodeCount}</div>
              <div>Connections: {edges.length}</div>
            </div>
          </ControlPanel>
          
          <StatusPanel>
            <div><strong>Status:</strong> {statusMessage}</div>
            <div style={{ marginTop: '8px' }}><strong>Instructions:</strong></div>
            <div>• Add nodes using the controls</div>
            <div>• Drag to connect sockets</div>
            <div>• Watch controls hide when inputs connect</div>
            <div>• Try the test scenario for variadic demo</div>
            <div>• Union node accepts multiple inputs (variadic)</div>
            <div>• Other nodes replace previous connections</div>
            <div>• Test save/load and export/import functionality</div>
          </StatusPanel>
        </ReactFlowProvider>
      </TestContainer>
    </div>
  );
};

export default UITestComponent;

