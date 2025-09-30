// React Flow Editor Types
// This file defines all the core types for the React Flow-based visual programming editor

import { Node, Edge } from 'reactflow';
import { 
  ControlType, 
  ControlConfig, 
  ControlDefinition, 
  BaseControlProps,
  UniformMapping 
} from '../../../types/control';

// Re-export for backward compatibility
export { ControlType, ControlConfig, BaseControlProps, UniformMapping };

// Socket types for connections between nodes
export type SocketType = 'ExprSocket' | 'FloatSocket' | 'VectorSocket' | 'BoolSocket' | 'StringSocket';

// Node input definition
export interface NodeInput {
  id: string;
  label: string;
  type: SocketType;
  required: boolean;
  defaultValue?: any;
}

// Node output definition
export interface NodeOutput {
  id: string;
  label: string;
  type: SocketType;
}

// Node control definition (extends ControlDefinition with uniforms)
export interface NodeControl extends ControlDefinition {
  id: string; // Alias for key for backward compatibility
  uniforms?: UniformMapping[];
}

// Base node data structure
export interface BaseNodeData {
  id: string;
  type: string;
  label: string;
  category: string;
  inputs: NodeInput[];
  outputs: NodeOutput[];
  controls: NodeControl[];
  metadata?: Record<string, any>;
}

// Node definition for registration
export interface NodeDefinition {
  type: string;
  label: string;
  category: string;
  inputs: NodeInput[];
  outputs: NodeOutput[];
  controls: NodeControl[];
  dimensions?: {
    width: number;
    height: number;
  };
  factory: (data?: any) => ReactFlowNodeData;
}

// React Flow node data (extends BaseNodeData with runtime values)
export interface ReactFlowNodeData extends BaseNodeData {
  controlValues: Record<string, any>;
  dimensions?: {
    width: number;
    height: number;
  };
}

// React Flow node type
export type ReactFlowNode = Node<ReactFlowNodeData>;

// React Flow edge type  
export type ReactFlowEdge = Edge;

// Serialization types
export interface SerializedNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    controls: Record<string, any>;
    inputs: NodeInput[];
    outputs: NodeOutput[];
  };
}

export interface SerializedEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

export interface ReactFlowExportData {
  nodes: SerializedNode[];
  edges: SerializedEdge[];
  uniforms: Record<string, any>;
  metadata: {
    version: string;
    mode: string;
    timestamp: string;
  };
}

// Uniform value type
export interface UniformValue {
  type: 'float' | 'vec2' | 'vec3' | 'vec4';
  value: number | number[];
  min?: number | number[];
  max?: number | number[];
}

// Context menu item
export interface ContextMenuItem {
  label: string;
  handler?: () => void;
  key?: string;
  children?: ContextMenuItem[];  // For submenus
  selected?: boolean;
  icon?: string;
}

// Editor handle interface (compatible with existing system)
export interface ReactFlowEditorHandle {
  view: React.ReactNode;
  type: 'reactflow_editor';
  getCode?: () => string;
  setCode?: (code: string) => void;
  exportData: () => ReactFlowExportData;
  importData: (data: ReactFlowExportData) => void;
  getNodes: () => ReactFlowNode[];
  getEdges: () => ReactFlowEdge[];
  addNode: (nodeType: string, position?: { x: number; y: number }) => void;
  removeNode: (nodeId: string) => void;
  updateNodeControl: (nodeId: string, controlId: string, value: any) => void;
  zoomToFit: () => void;
  layout: () => void;
  nodeRegistry?: any; // Node registry for type conversion during serialization
}

// Node category definitions
export type NodeCategory = 
  | 'Primitives'
  | 'Transforms' 
  | 'Variables'
  | 'Math'
  | 'Combinators'
  | 'Capture'
  | 'Process';

// Mode-specific node sets
export interface ModeNodeSet {
  [category: string]: NodeDefinition[];
}

export interface ModeDefinition {
  name: string;
  label: string;
  nodeSet: ModeNodeSet;
}
