/**
 * Node type definitions
 */

import { ControlDefinition } from './control';

export type NodeCategory = 
  | 'Primitives 2D'
  | 'Primitives 3D'
  | 'Transforms 2D'
  | 'Transforms 3D'
  | 'Primitives'
  | 'Transforms'
  | 'Combinators'
  | 'Math'
  | 'Variables'
  | 'Color'
  | 'color'
  | 'Materials'
  | 'Utilities'
  | 'Advanced'
  | 'auto'
  | 'primitives_2d'
  | 'primitives_3d'
  | 'combinators'
  | 'math'
  | 'variables'
  | 'materials'
  | 'utilities'
  | 'advanced';

export interface InputDefinition {
  key: string;
  label: string;
  socketType: string;
  required: boolean;
  defaultValue?: any;
  multiple?: boolean;
}

export interface OutputDefinition {
  key: string;
  label: string;
  socketType: string;
}

export interface NodeDefinition {
  type: string;
  label: string;
  category: NodeCategory;
  inputs: InputDefinition[];
  outputs: OutputDefinition[];
  controls: ControlDefinition[];
  factory: (data?: Record<string, any>) => Record<string, any>;
  description?: string;
  icon?: string;
}

export interface NodeData {
  nodeType: string;
  definition?: NodeDefinition;
  [key: string]: any; // Control values
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface ReactFlowNodeData {
  id: string;
  type: string;
  position: NodePosition;
  data: NodeData;
}

export interface ReactFlowEdgeData {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}
