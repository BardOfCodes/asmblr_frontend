// Main React Flow Editor Component
// The primary editor component that manages the React Flow canvas and node interactions

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  NodeTypes,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import './styles/theme.css';
import './styles/editor.css';

import { CustomNode } from './components/CustomNode';
import BasicNode from './components/BasicNode';
import ContextMenu from './components/ContextMenu';
import NodeSearchModal from './components/NodeSearchModal';
import { ReactFlowNode, ReactFlowEdge, ReactFlowNodeData } from './types';
import { NodeRegistry, NodeFactory } from './definitions';
import * as AutoNodes from './nodes/auto_nodes';
import { DEFAULT_NODE_THEME } from './theme';
import { projectService } from './services/ProjectService';
import { setReactFlowRef } from './hooks/useProjectActions';
import { AllModeDefinitions } from './config/ModeNodeSets';
import { debug } from '../../../utils/debug';

// Create global registry and factory instances
const globalNodeRegistry = new NodeRegistry();
const globalNodeFactory = new NodeFactory(globalNodeRegistry);

// Load all auto-generated nodes and configure modes on initialization
const initializeRegistry = () => {
  const nodeDefinitions = Object.values(AutoNodes).filter(
    (item): item is any => item && typeof item === 'object' && 'type' in item
  );
  
  // Register all nodes first
  globalNodeRegistry.registerMany(nodeDefinitions);
  
  // Register mode-specific node sets
  AllModeDefinitions.forEach(modeDefinition => {
    globalNodeRegistry.registerMode(modeDefinition);
  });
  
  debug.log('✅ Initialized node registry with modes:', AllModeDefinitions.map(m => m.name));
};

// Initialize once
initializeRegistry();

// Initialize project service
projectService.initialize(globalNodeRegistry);

// Define custom node types (outside component to prevent recreation)
const nodeTypes: NodeTypes = {
  custom: CustomNode,
  'smart-node': BasicNode,
};

// Define default edge options (outside component to prevent recreation)
const defaultEdgeOptions = {
  style: { 
    strokeWidth: DEFAULT_NODE_THEME.connections.strokeWidth,
    stroke: DEFAULT_NODE_THEME.connections.color
  },
  type: DEFAULT_NODE_THEME.connections.type,
  animated: DEFAULT_NODE_THEME.connections.animated
};

interface ReactFlowEditorProps {
  modeName: string;
  onNodesChange?: (nodes: ReactFlowNode[]) => void;
  onEdgesChange?: (edges: ReactFlowEdge[]) => void;
  onNodeControlChange?: (nodeId: string, controlId: string, value: any) => void;
  className?: string;
}

/**
 * Inner React Flow Editor Component (inside ReactFlowProvider)
 */
const ReactFlowEditorInner: React.FC<ReactFlowEditorProps> = ({
  modeName,
  onNodesChange,
  onEdgesChange,
  onNodeControlChange,
  className = ''
}) => {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesStateChange] = useNodesState<ReactFlowNodeData>([]);
  const [edges, setEdges, onEdgesStateChange] = useEdgesState([]);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Project management is now handled by the lightweight ProjectService
  // Register React Flow functions for project operations
  
  useEffect(() => {
    setReactFlowRef({
      getNodes: reactFlowInstance.getNodes,
      getEdges: reactFlowInstance.getEdges,
      getViewport: reactFlowInstance.getViewport,
      setNodes,
      setEdges,
      setViewport: reactFlowInstance.setViewport,
      fitView: reactFlowInstance.fitView
    });

    // Cleanup on unmount
    return () => {
      setReactFlowRef(null);
    };
  }, [reactFlowInstance, setNodes, setEdges]);

  // Handle connection creation with validation and variadic rules
  const onConnect = useCallback(
    (params: Connection) => {
      // Basic validation
      if (!params.source || !params.sourceHandle || !params.target || !params.targetHandle) {
        return;
      }

      // Validation 1: Prevent self-connections
      if (params.source === params.target) {
        return;
      }

      // Find source and target nodes
      const sourceNode = nodes.find(node => node.id === params.source);
      const targetNode = nodes.find(node => node.id === params.target);
      
      if (!sourceNode || !targetNode) {
        return;
      }

      // Get node definitions
      const sourceDefinition = globalNodeRegistry.get((sourceNode.data as any).nodeType || sourceNode.data.type);
      const targetDefinition = globalNodeRegistry.get((targetNode.data as any).nodeType || targetNode.data.type);
      
      if (!sourceDefinition || !targetDefinition) {
        return;
      }

      // Validation 2: Ensure source is an output and target is an input
      const sourceOutput = sourceDefinition.outputs.find(output => output.key === params.sourceHandle);
      const targetInput = targetDefinition.inputs.find(input => input.key === params.targetHandle);

      if (!sourceOutput) {
        return;
      }

      if (!targetInput) {
        return;
      }
      
      // Find the input definition to check variadic property
      const inputDefinition = targetDefinition.inputs.find(input => input.key === params.targetHandle);
      if (!inputDefinition) {
        return;
      }
      
      let updatedEdges = [...edges];
      
      // If input is NOT variadic, remove existing connections to this input
      if (!inputDefinition.variadic) {
        updatedEdges = updatedEdges.filter(edge => 
          !(edge.target === params.target && edge.targetHandle === params.targetHandle)
        );
      }
      
      // Add the new connection
      const newEdges = addEdge(params, updatedEdges);
      setEdges(newEdges);
      onEdgesChange?.(newEdges);
    },
    [edges, setEdges, onEdgesChange, nodes]
  );

  // Handle node control changes
  useEffect(() => {
    const handleNodeControlChange = (event: CustomEvent) => {
      const { nodeId, controlId, value } = event.detail;
      
      // Update the node's control values
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            const updatedControlValues = {
              ...node.data.controlValues,
              [controlId]: value
            };
            
            return {
              ...node,
              data: {
                ...node.data,
                controlValues: updatedControlValues
              }
            };
          }
          return node;
        })
      );

      // Notify parent component
      onNodeControlChange?.(nodeId, controlId, value);
    };

    window.addEventListener('nodeControlChange', handleNodeControlChange as EventListener);
    
    return () => {
      window.removeEventListener('nodeControlChange', handleNodeControlChange as EventListener);
    };
  }, [setNodes, onNodeControlChange]);

  // Handle context menu
  const onPaneContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setContextMenuPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
    setIsContextMenuOpen(true);
  }, []);

  // Close context menu
  const closeContextMenu = useCallback(() => {
    setIsContextMenuOpen(false);
  }, []);

  // Auto-arrange nodes using dagre layout algorithm
  const autoArrangeNodes = useCallback(() => {
    if (nodes.length === 0) return;

    const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
      const g = new dagre.graphlib.Graph();
      g.setGraph({ 
        rankdir: direction,
        nodesep: 50,
        ranksep: 100,
        marginx: 20,
        marginy: 20
      });
      g.setDefaultEdgeLabel(() => ({}));

      nodes.forEach((node) => {
        g.setNode(node.id, { 
          width: node.width || 220, 
          height: node.height || 120 
        });
      });

      edges.forEach((edge) => {
        g.setEdge(edge.source, edge.target);
      });

      dagre.layout(g);

      return {
        nodes: nodes.map((node) => {
          const nodeWithPosition = g.node(node.id);
          return {
            ...node,
            position: {
              x: nodeWithPosition.x - (node.width || 220) / 2,
              y: nodeWithPosition.y - (node.height || 120) / 2,
            },
          };
        }),
        edges,
      };
    };

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, 'LR');
    
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    
    // Fit view to show all nodes after a short delay
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.1, duration: 800 });
    }, 100);
  }, [nodes, edges, setNodes, setEdges, reactFlowInstance]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if editor has focus or is the active element
      const isEditorFocused = editorRef.current?.contains(document.activeElement) || 
                              document.activeElement === editorRef.current;
      
      if (!isEditorFocused) return;

      // Cmd+G (Mac) or Ctrl+G (Windows/Linux) to open search modal
      if ((e.metaKey || e.ctrlKey) && e.key === 'g') {
        e.preventDefault();
        setIsSearchModalOpen(true);
        setIsContextMenuOpen(false); // Close context menu if open
      }
      
      // Cmd+L (Mac) or Ctrl+L (Windows/Linux) to auto-arrange nodes
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        autoArrangeNodes();
      }
      
      // Escape to close modals
      if (e.key === 'Escape') {
        setIsContextMenuOpen(false);
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [autoArrangeNodes]);

  // Add node from context menu
  const addNode = useCallback((nodeType: string, customPosition?: { x: number; y: number }) => {
    try {
      let position: { x: number; y: number };
      
      if (customPosition) {
        // Use provided position (from search modal)
        position = reactFlowInstance.screenToFlowPosition(customPosition);
      } else {
        // Use context menu position
        position = reactFlowInstance.screenToFlowPosition({
          x: contextMenuPosition.x,
          y: contextMenuPosition.y,
        });
      }

      const result = globalNodeFactory.createNode(nodeType, { position });
      
      if (result.success && result.node) {
        // Convert ReactFlowNodeCore to ReactFlow node format
        const nodeData = result.node.getAllData();
        
        // Get the node definition to create proper data structure
        const definition = globalNodeRegistry.get(result.node.type);
        if (!definition) {
          return;
        }

        const reactFlowNode = {
          id: result.node.id,
          type: 'smart-node', // Use our smart node component
          position: result.node.position,
          data: {
            id: result.node.id,
            type: result.node.type,
            label: definition.label,
            category: definition.category,
            inputs: definition.inputs || [],
            outputs: definition.outputs || [],
            controls: definition.controls || [],
            controlValues: nodeData.controlValues || {},
            nodeType: result.node.type, // This is what SmartReactFlowNode uses
            registry: globalNodeRegistry
          } as unknown as ReactFlowNodeData
        };
        
        setNodes((nds) => [...nds, reactFlowNode]);
        onNodesChange?.([...nodes, reactFlowNode]);
      }
      
      closeContextMenu();
    } catch (error) {
      // Silently handle error in production
    }
  }, [contextMenuPosition, reactFlowInstance, setNodes, nodes, onNodesChange, closeContextMenu]);

  // Handle nodes change - properly sync state without setTimeout
  const handleNodesChange = useCallback((changes: any) => {
    onNodesStateChange(changes);
    // Use ReactFlow's internal state which is already updated
    if (onNodesChange && reactFlowInstance) {
      const currentNodes = reactFlowInstance.getNodes();
      onNodesChange(currentNodes);
    }
  }, [onNodesStateChange, onNodesChange, reactFlowInstance]);

  // Handle edges change - properly sync state without setTimeout
  const handleEdgesChange = useCallback((changes: any) => {
    onEdgesStateChange(changes);
    // Use ReactFlow's internal state which is already updated
    if (onEdgesChange && reactFlowInstance) {
      const currentEdges = reactFlowInstance.getEdges();
      onEdgesChange(currentEdges);
    }
  }, [onEdgesStateChange, onEdgesChange, reactFlowInstance]);

  // Get mode-specific node definitions for context menu and search
  const allNodeDefinitions = useMemo(() => {
    // Try to get mode-specific nodes first
    const modeNodes = globalNodeRegistry.getModeNodes(modeName);
    if (modeNodes.length > 0) {
      debug.log(`Using ${modeNodes.length} mode-specific nodes for ${modeName}`);
      return modeNodes;
    }
    
    // Fallback to all nodes if mode not configured
    debug.log(`No mode-specific nodes found for ${modeName}, using all nodes`);
    return globalNodeRegistry.getAll();
  }, [modeName]);

  // Create CSS variables for global edge styling
  const editorStyle = useMemo(() => ({
    width: '100%', 
    height: '100%',
    // Connection CSS variables for global edge styling
    '--connection-color': DEFAULT_NODE_THEME.connections.color,
    '--connection-color-selected': DEFAULT_NODE_THEME.connections.colorSelected,
    '--connection-color-hover': DEFAULT_NODE_THEME.connections.colorHover,
    '--connection-stroke-width': `${DEFAULT_NODE_THEME.connections.strokeWidth}px`,
    '--connection-stroke-selected': `${DEFAULT_NODE_THEME.connections.strokeWidthSelected}px`,
    '--connection-shadow': DEFAULT_NODE_THEME.connections.shadow,
  } as React.CSSProperties), []);

  return (
    <div 
      ref={editorRef}
      className={`reactflow-editor ${className}`} 
      style={editorStyle}
      tabIndex={0} // Make div focusable for keyboard shortcuts
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onPaneContextMenu={onPaneContextMenu}
        onPaneClick={closeContextMenu}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background />
        <Controls>
          <button
            onClick={autoArrangeNodes}
            title="Auto-arrange nodes (Ctrl+L / Cmd+L)"
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            ⚡
          </button>
        </Controls>
        <MiniMap />
      </ReactFlow>

      {/* Context Menu */}
      <ContextMenu
        isOpen={isContextMenuOpen}
        position={contextMenuPosition}
        nodeDefinitions={allNodeDefinitions}
        onNodeSelect={(nodeType) => addNode(nodeType)}
        onClose={closeContextMenu}
      />

      {/* Node Search Modal */}
      <NodeSearchModal
        isOpen={isSearchModalOpen}
        nodeDefinitions={allNodeDefinitions}
        onNodeSelect={(nodeType, position) => {
          addNode(nodeType, position);
          setIsSearchModalOpen(false);
        }}
        onClose={() => setIsSearchModalOpen(false)}
        editorBounds={editorRef.current?.getBoundingClientRect()}
      />
    </div>
  );
};

/**
 * Main React Flow Editor Component (with ReactFlowProvider wrapper)
 */
export const ReactFlowEditor: React.FC<ReactFlowEditorProps> = (props) => {
  return (
    <ReactFlowProvider>
      <ReactFlowEditorInner {...props} />
    </ReactFlowProvider>
  );
};
