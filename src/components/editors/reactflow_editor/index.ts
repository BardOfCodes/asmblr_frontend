// React Flow Editor Main Export
// Central export point for the React Flow editor system

// Main components
export { ReactFlowEditor } from './ReactFlowEditor';
export { CustomNode } from './components/CustomNode';

// Hooks
export { useReactFlowEditor } from './hooks/useReactFlowEditor';

// Types
export type {
  SocketType,
  ControlType,
  NodeInput,
  NodeOutput,
  ControlConfig,
  UniformMapping,
  NodeControl,
  BaseNodeData,
  NodeDefinition,
  ReactFlowNodeData,
  ReactFlowNode,
  ReactFlowEdge,
  ReactFlowExportData,
  ReactFlowEditorHandle,
  ContextMenuItem,
  NodeCategory,
  ModeNodeSet,
  ModeDefinition,
} from './types';

// Controls
export {
  BaseControl,
  FloatControl,
  Vector2Control,
  Vector3Control,
  Vector4Control,
  getControlComponent,
  isUniformControl,
  getBaseControlType,
  createControl,
} from './controls';

// Utilities
export {
  NodeRegistry,
  NodeFactory,
  ContextMenuBuilder,
  globalNodeRegistry,
  globalNodeFactory,
  globalContextMenuBuilder,
} from './utils/NodeRegistry';
