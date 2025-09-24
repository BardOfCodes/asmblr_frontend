// React Flow Editor Types
// This file defines all the core types for the React Flow-based visual programming editor

import { Node, Edge } from 'reactflow';

// Base control props interface
export interface BaseControlProps {
  id: string;
  type: ControlType;
  label: string;
  value: any;
  config: ControlConfig;
  onChange: (value: any) => void;
  className?: string;
  disabled?: boolean;
}

// Socket types for connections between nodes
export type SocketType = 'ExprSocket' | 'FloatSocket' | 'VectorSocket' | 'BoolSocket' | 'StringSocket';

// Control types for node parameters
export type ControlType = 
  | 'float'           // Single float slider
  | 'vector2'         // 2D vector input
  | 'vector3'         // 3D vector input  
  | 'vector4'         // 4D vector input
  | 'string'          // Text input
  | 'select'          // Dropdown selection
  | 'color'           // Color picker
  | 'checkbox'        // Boolean toggle
  | 'range'           // Min/max range slider
  | 'uniform_float'   // Uniform-generating float
  | 'uniform_vector2' // Uniform-generating vec2
  | 'uniform_vector3' // Uniform-generating vec3
  | 'uniform_vector4'; // Uniform-generating vec4

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

// Control configuration
export interface ControlConfig {
  defaultValue: any;
  min?: number | number[];
  max?: number | number[];
  step?: number;
  options?: string[]; // For select controls
  precision?: number;
  units?: string;
}

// Uniform mapping for controls that generate shader uniforms
export interface UniformMapping {
  name: string;           // Uniform name in shader
  type: 'float' | 'vec2' | 'vec3' | 'vec4';
  transform?: (value: any) => any; // Optional value transformation
}

// Node control definition
export interface NodeControl {
  id: string;
  type: ControlType;
  label: string;
  config: ControlConfig;
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
