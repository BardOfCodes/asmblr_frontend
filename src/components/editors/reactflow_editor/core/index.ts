// Core Module Exports
// This module provides the foundational classes and utilities for the React Flow Node Editor

export {
  ReactFlowNodeCore,
  ReactFlowConnection,
  ReactFlowGraph,
  type GuideJsonNode,
  type GuideJsonConnection,
  type GuideJsonModule,
  type GuideJsonFormat,
  type GraphStats
} from './ReactFlowCore';

export {
  ReactFlowGraphManager,
  type GraphManagerEvents,
  type GraphEventCallback,
  type GraphValidationResult
} from './ReactFlowGraphManager';

export {
  SerializationAdapter,
  type ReactFlowUINode,
  type ReactFlowUIEdge,
  type ReactFlowUIFormat,
  type DebugGraphFormat,
  type GuideJsonValidationResult
} from './SerializationAdapter';

// Re-export definitions for convenience
export * from '../definitions';
