/**
 * Editor type definitions
 */

import { ReactFlowNodeData, ReactFlowEdgeData } from './node';

export type EditorType = 'code_editor' | 'reactflow_editor';

export interface EditorHandle {
  view: React.ReactNode;
  type: EditorType;
  getCode?: () => string;
  setCode?: (code: string) => void;
  getNodes?: () => ReactFlowNodeData[];
  getEdges?: () => ReactFlowEdgeData[];
  setNodes?: (nodes: ReactFlowNodeData[]) => void;
  setEdges?: (edges: ReactFlowEdgeData[]) => void;
  process?: () => void;
  clearGraph?: () => void;
  exportGraph?: () => any;
  importGraph?: (data: any) => void;
}
