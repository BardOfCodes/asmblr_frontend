// Graph Manager for React Flow Node Editor
// This module provides high-level operations for managing the node graph

import { ReactFlowNodeCore, ReactFlowConnection, ReactFlowGraph, GuideJsonFormat } from './ReactFlowCore';

/**
 * Event system for graph changes
 */
export interface GraphManagerEvents {
  'node-added': { node: ReactFlowNodeCore };
  'node-removed': { nodeId: string };
  'node-updated': { nodeId: string; key: string; value: any };
  'node-moved': { nodeId: string; position: { x: number; y: number } };
  'connection-added': { connection: ReactFlowConnection };
  'connection-removed': { connectionId: string };
  'graph-cleared': {};
  'graph-loaded': { graph: ReactFlowGraph };
}

export type GraphEventCallback<T = any> = (data: T) => void;

/**
 * High-level graph management system
 * Provides CRUD operations and maintains graph consistency
 */
export class ReactFlowGraphManager {
  private graph: ReactFlowGraph;
  private eventListeners: Map<keyof GraphManagerEvents, GraphEventCallback[]> = new Map();
  private changeHistory: GraphChange[] = [];
  private maxHistorySize = 50;
  // Policy: per node type, which inputs are variadic (allow multiple connections)
  private inputVariadicMap: Map<string, Set<string>> = new Map();

  constructor(initialGraph?: ReactFlowGraph) {
    this.graph = initialGraph || new ReactFlowGraph();
    this.initializeEventListeners();
  }

  /**
   * Initialize event listener maps
   */
  private initializeEventListeners(): void {
    const eventTypes: (keyof GraphManagerEvents)[] = [
      'node-added', 'node-removed', 'node-updated', 'node-moved',
      'connection-added', 'connection-removed', 'graph-cleared', 'graph-loaded'
    ];
    
    eventTypes.forEach(eventType => {
      this.eventListeners.set(eventType, []);
    });
  }

  /**
   * Configure input variadic policies from a plain object
   * schema: { [nodeType]: { [inputKey]: boolean } }
   */
  setInputVariadicPolicy(schema: Record<string, Record<string, boolean>>): void {
    this.inputVariadicMap.clear();
    Object.entries(schema).forEach(([nodeType, inputs]) => {
      const set = new Set<string>();
      Object.entries(inputs).forEach(([key, isVar]) => {
        if (isVar) set.add(key);
      });
      this.inputVariadicMap.set(nodeType, set);
    });
  }

  private isInputVariadic(nodeType: string, inputKey: string): boolean {
    const set = this.inputVariadicMap.get(nodeType);
    return !!(set && set.has(inputKey));
  }

  /**
   * Event Management
   */
  on<K extends keyof GraphManagerEvents>(
    event: K, 
    callback: GraphEventCallback<GraphManagerEvents[K]>
  ): void {
    const listeners = this.eventListeners.get(event) || [];
    listeners.push(callback);
    this.eventListeners.set(event, listeners);
  }

  off<K extends keyof GraphManagerEvents>(
    event: K, 
    callback: GraphEventCallback<GraphManagerEvents[K]>
  ): void {
    const listeners = this.eventListeners.get(event) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  private emit<K extends keyof GraphManagerEvents>(
    event: K, 
    data: GraphManagerEvents[K]
  ): void {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  /**
   * Node Operations
   */

  /**
   * Add a new node to the graph
   */
  addNode(node: ReactFlowNodeCore): string;
  addNode(
    type: string, 
    position: { x: number; y: number }, 
    data?: Record<string, any>
  ): string;
  addNode(
    nodeOrType: ReactFlowNodeCore | string,
    position?: { x: number; y: number },
    data: Record<string, any> = {}
  ): string {
    let node: ReactFlowNodeCore;
    
    if (nodeOrType instanceof ReactFlowNodeCore) {
      // Adding an existing node
      node = nodeOrType;
    } else {
      // Creating a new node from parameters
      node = new ReactFlowNodeCore(nodeOrType, data, position!);
    }
    
    this.graph.addNode(node);
    
    this.recordChange({
      type: 'add-node',
      nodeId: node.id,
      data: { type: node.type, position: node.position, data: node.getAllData() }
    });

    this.emit('node-added', { node });
    return node.id;
  }

  /**
   * Remove a node and all its connections
   */
  removeNode(nodeId: string): boolean {
    const node = this.graph.getNode(nodeId);
    if (!node) return false;

    // Get connections before removal for history
    const connections = this.graph.getNodeConnections(nodeId);
    
    const success = this.graph.removeNode(nodeId);
    if (success) {
      this.recordChange({
        type: 'remove-node',
        nodeId,
        data: { 
          node: node.serialize(), 
          position: node.position,
          connections: connections.map(c => c.serialize())
        }
      });

      this.emit('node-removed', { nodeId });
    }

    return success;
  }

  /**
   * Update node data
   */
  updateNodeData(nodeId: string, key: string, value: any): boolean {
    const node = this.graph.getNode(nodeId);
    if (!node) return false;

    const oldValue = node.getData(key);
    node.updateData(key, value);

    this.recordChange({
      type: 'update-node',
      nodeId,
      data: { key, value, oldValue }
    });

    this.emit('node-updated', { nodeId, key, value });
    return true;
  }

  /**
   * Move a node to a new position
   */
  moveNode(nodeId: string, position: { x: number; y: number }): boolean {
    const success = this.graph.updateNodePosition(nodeId, position);
    if (success) {
      this.emit('node-moved', { nodeId, position });
    }
    return success;
  }

  /**
   * Get node data
   */
  getNodeData(nodeId: string): Record<string, any> | null {
    const node = this.graph.getNode(nodeId);
    return node ? node.getAllData() : null;
  }

  /**
   * Get node by ID
   */
  getNode(nodeId: string): ReactFlowNodeCore | undefined {
    return this.graph.getNode(nodeId);
  }

  /**
   * Get all nodes
   */
  getAllNodes(): ReactFlowNodeCore[] {
    return [...this.graph.nodes];
  }

  /**
   * Connection Operations
   */

  /**
   * Add a connection between nodes
   */
  addConnection(
    sourceId: string,
    sourceOutput: string,
    targetId: string,
    targetInput: string
  ): string | null {
    // Validate nodes exist
    if (!this.graph.getNode(sourceId) || !this.graph.getNode(targetId)) {
      return null;
    }

    // Check for self-connection
    if (sourceId === targetId) {
      return null;
    }

    // Determine if target input is variadic; if not, drop previous connection
    const targetNode = this.graph.getNode(targetId);
    const targetType = targetNode?.type || '';
    const variadic = this.isInputVariadic(targetType, targetInput);
    if (!variadic) {
      const existingConnection = this.graph.connections.find(conn =>
        conn.target === targetId && conn.targetInput === targetInput
      );
      if (existingConnection) {
        this.removeConnection(existingConnection.id);
      }
    }

    const connection = new ReactFlowConnection(sourceId, sourceOutput, targetId, targetInput);
    const success = this.graph.addConnection(connection);

    if (success) {
      this.recordChange({
        type: 'add-connection',
        connectionId: connection.id,
        data: connection.serialize()
      });

      this.emit('connection-added', { connection });
      return connection.id;
    }

    return null;
  }

  /**
   * Remove a connection
   */
  removeConnection(connectionId: string): boolean {
    const connection = this.graph.connections.find(c => c.id === connectionId);
    if (!connection) return false;

    const success = this.graph.removeConnection(connectionId);
    if (success) {
      this.recordChange({
        type: 'remove-connection',
        connectionId,
        data: connection.serialize()
      });

      this.emit('connection-removed', { connectionId });
    }

    return success;
  }

  /**
   * Get all connections
   */
  getAllConnections(): ReactFlowConnection[] {
    return [...this.graph.connections];
  }

  /**
   * Get connections for a specific node
   */
  getNodeConnections(nodeId: string): ReactFlowConnection[] {
    return this.graph.getNodeConnections(nodeId);
  }

  /**
   * Get connected inputs for a node
   */
  getConnectedInputs(nodeId: string): Set<string> {
    return this.graph.getConnectedInputs(nodeId);
  }

  /**
   * Check if an input is connected
   */
  isInputConnected(nodeId: string, inputName: string): boolean {
    return this.graph.getConnectedInputs(nodeId).has(inputName);
  }

  /**
   * Graph Operations
   */

  /**
   * Clear the entire graph
   */
  clearGraph(): void {
    const oldGraph = this.graph.clone();
    this.graph = new ReactFlowGraph();

    this.recordChange({
      type: 'clear-graph',
      data: { oldGraph: oldGraph.serialize() }
    });

    this.emit('graph-cleared', {});
  }

  /**
   * Load a graph from guide.json format
   */
  loadFromGuideJson(guideJson: GuideJsonFormat, moduleName: string = 'base'): boolean {
    try {
      const newGraph = ReactFlowGraph.fromGuideJson(guideJson, moduleName);
      const oldGraph = this.graph.clone();
      
      this.graph = newGraph;

      this.recordChange({
        type: 'load-graph',
        data: { 
          oldGraph: oldGraph.serialize(),
          newGraph: newGraph.serialize()
        }
      });

      this.emit('graph-loaded', { graph: newGraph });
      return true;
    } catch (error) {
      console.error('Failed to load graph from guide.json:', error);
      return false;
    }
  }

  /**
   * Export graph to guide.json format
   */
  exportToGuideJson(moduleName: string = 'base'): GuideJsonFormat {
    return this.graph.serialize(moduleName);
  }

  /**
   * Get current graph
   */
  getGraph(): ReactFlowGraph {
    return this.graph;
  }

  /**
   * Get graph statistics
   */
  getGraphStats() {
    return this.graph.getStats();
  }

  /**
   * Validation Operations
   */

  /**
   * Validate the current graph for consistency
   */
  validateGraph(): GraphValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for orphaned connections
    this.graph.connections.forEach(conn => {
      if (!this.graph.getNode(conn.source)) {
        errors.push(`Connection ${conn.id} references non-existent source node ${conn.source}`);
      }
      if (!this.graph.getNode(conn.target)) {
        errors.push(`Connection ${conn.id} references non-existent target node ${conn.target}`);
      }
    });

    // Check for isolated nodes
    const isolatedNodes = this.graph.getStats().isolatedNodes;
    if (isolatedNodes.length > 0) {
      warnings.push(`Found ${isolatedNodes.length} isolated nodes: ${isolatedNodes.join(', ')}`);
    }

    // Check for duplicate connections
    const connectionKeys = new Set<string>();
    this.graph.connections.forEach(conn => {
      const key = `${conn.source}-${conn.sourceOutput}-${conn.target}-${conn.targetInput}`;
      if (connectionKeys.has(key)) {
        errors.push(`Duplicate connection: ${conn.source}.${conn.sourceOutput} -> ${conn.target}.${conn.targetInput}`);
      }
      connectionKeys.add(key);
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      stats: this.graph.getStats()
    };
  }

  /**
   * History and Undo/Redo (basic implementation)
   */
  private recordChange(change: GraphChange): void {
    this.changeHistory.push({
      ...change,
      timestamp: Date.now()
    });

    // Limit history size
    if (this.changeHistory.length > this.maxHistorySize) {
      this.changeHistory.shift();
    }
  }

  /**
   * Get change history
   */
  getChangeHistory(): GraphChange[] {
    return [...this.changeHistory];
  }

  /**
   * Clear change history
   */
  clearHistory(): void {
    this.changeHistory = [];
  }
}

// Supporting types
interface GraphChange {
  type: 'add-node' | 'remove-node' | 'update-node' | 'add-connection' | 'remove-connection' | 'clear-graph' | 'load-graph';
  nodeId?: string;
  connectionId?: string;
  data: any;
  timestamp?: number;
}

export interface GraphValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    nodeCount: number;
    connectionCount: number;
    nodeTypes: string[];
    isolatedNodes: string[];
  };
}
