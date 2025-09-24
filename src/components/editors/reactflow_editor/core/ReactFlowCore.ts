// Core Data Structures for React Flow Node Editor
// This module defines the fundamental data structures that power the visual programming interface

import { v4 as uuidv4 } from 'uuid';

/**
 * Core node representation - stores the essential data for each node
 * Matches the format expected by guide.json for backend compatibility
 */
export class ReactFlowNodeCore {
  public readonly id: string;
  public readonly type: string;
  public data: Record<string, any>; // Default values from controls
  public position: { x: number; y: number };

  constructor(
    type: string, 
    data: Record<string, any> = {}, 
    position: { x: number; y: number } = { x: 0, y: 0 },
    id?: string
  ) {
    this.id = id || uuidv4();
    this.type = type;
    this.data = { ...data }; // Clone to avoid reference issues
    this.position = { ...position };
  }

  /**
   * Update a data property for this node
   */
  updateData(key: string, value: any): void {
    this.data[key] = value;
  }

  /**
   * Get a data property value
   */
  getData(key: string): any {
    return this.data[key];
  }

  /**
   * Get all data as a copy
   */
  getAllData(): Record<string, any> {
    return { ...this.data };
  }

  /**
   * Update node position
   */
  updatePosition(position: { x: number; y: number }): void {
    this.position = { ...position };
  }

  /**
   * Serialize to guide.json format
   */
  serialize(): GuideJsonNode {
    return {
      id: this.id,
      name: this.type, // In guide.json, 'name' is the node type
      data: this.getAllData()
    };
  }

  /**
   * Create from guide.json format
   */
  static fromGuideJson(guideNode: GuideJsonNode, position?: { x: number; y: number }): ReactFlowNodeCore {
    return new ReactFlowNodeCore(
      guideNode.name, // 'name' in guide.json is the type
      guideNode.data,
      position || { x: 0, y: 0 },
      guideNode.id
    );
  }
}

/**
 * Connection between two nodes - represents a data flow link
 * Matches the format expected by guide.json connections
 */
export class ReactFlowConnection {
  public readonly id: string;
  public readonly source: string;          // Source node ID
  public readonly sourceOutput: string;    // Source output socket name
  public readonly target: string;          // Target node ID  
  public readonly targetInput: string;     // Target input socket name

  constructor(
    source: string,
    sourceOutput: string,
    target: string,
    targetInput: string,
    id?: string
  ) {
    this.id = id || uuidv4();
    this.source = source;
    this.sourceOutput = sourceOutput;
    this.target = target;
    this.targetInput = targetInput;
  }

  /**
   * Check if this connection involves a specific node
   */
  involvesNode(nodeId: string): boolean {
    return this.source === nodeId || this.target === nodeId;
  }

  /**
   * Check if this connection connects to a specific input
   */
  connectsToInput(nodeId: string, inputName: string): boolean {
    return this.target === nodeId && this.targetInput === inputName;
  }

  /**
   * Check if this connection comes from a specific output
   */
  comesFromOutput(nodeId: string, outputName: string): boolean {
    return this.source === nodeId && this.sourceOutput === outputName;
  }

  /**
   * Serialize to guide.json format
   */
  serialize(): GuideJsonConnection {
    return {
      source: this.source,
      sourceOutput: this.sourceOutput,
      target: this.target,
      targetInput: this.targetInput
    };
  }

  /**
   * Create from guide.json format
   */
  static fromGuideJson(guideConnection: GuideJsonConnection): ReactFlowConnection {
    return new ReactFlowConnection(
      guideConnection.source,
      guideConnection.sourceOutput,
      guideConnection.target,
      guideConnection.targetInput
    );
  }
}

/**
 * Complete graph representation - contains all nodes and connections
 * Can serialize to/from guide.json format for backend compatibility
 */
export class ReactFlowGraph {
  public nodes: ReactFlowNodeCore[];
  public connections: ReactFlowConnection[];
  public positions: Record<string, { x: number; y: number }>;

  constructor(
    nodes: ReactFlowNodeCore[] = [],
    connections: ReactFlowConnection[] = []
  ) {
    this.nodes = [...nodes];
    this.connections = [...connections];
    this.positions = {};
    
    // Initialize positions from nodes
    this.nodes.forEach(node => {
      this.positions[node.id] = { ...node.position };
    });
  }

  /**
   * Add a node to the graph
   */
  addNode(node: ReactFlowNodeCore): void {
    this.nodes.push(node);
    this.positions[node.id] = { ...node.position };
  }

  /**
   * Remove a node and all its connections
   */
  removeNode(nodeId: string): boolean {
    const nodeIndex = this.nodes.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return false;

    // Remove the node
    this.nodes.splice(nodeIndex, 1);
    delete this.positions[nodeId];

    // Remove all connections involving this node
    this.connections = this.connections.filter(conn => !conn.involvesNode(nodeId));

    return true;
  }

  /**
   * Add a connection to the graph
   */
  addConnection(connection: ReactFlowConnection): boolean {
    // Check if connection already exists
    const exists = this.connections.some(conn => 
      conn.source === connection.source &&
      conn.sourceOutput === connection.sourceOutput &&
      conn.target === connection.target &&
      conn.targetInput === connection.targetInput
    );

    if (exists) return false;

    this.connections.push(connection);
    return true;
  }

  /**
   * Remove a connection from the graph
   */
  removeConnection(connectionId: string): boolean {
    const connectionIndex = this.connections.findIndex(c => c.id === connectionId);
    if (connectionIndex === -1) return false;

    this.connections.splice(connectionIndex, 1);
    return true;
  }

  /**
   * Get a node by ID
   */
  getNode(nodeId: string): ReactFlowNodeCore | undefined {
    return this.nodes.find(n => n.id === nodeId);
  }

  /**
   * Get all connections for a specific node
   */
  getNodeConnections(nodeId: string): ReactFlowConnection[] {
    return this.connections.filter(conn => conn.involvesNode(nodeId));
  }

  /**
   * Get all input connections for a specific node
   */
  getNodeInputConnections(nodeId: string): ReactFlowConnection[] {
    return this.connections.filter(conn => conn.target === nodeId);
  }

  /**
   * Get all output connections for a specific node
   */
  getNodeOutputConnections(nodeId: string): ReactFlowConnection[] {
    return this.connections.filter(conn => conn.source === nodeId);
  }

  /**
   * Get connected inputs for a node (returns set of input names)
   */
  getConnectedInputs(nodeId: string): Set<string> {
    const connected = new Set<string>();
    this.connections.forEach(conn => {
      if (conn.target === nodeId) {
        connected.add(conn.targetInput);
      }
    });
    return connected;
  }

  /**
   * Update node position
   */
  updateNodePosition(nodeId: string, position: { x: number; y: number }): boolean {
    const node = this.getNode(nodeId);
    if (!node) return false;

    node.updatePosition(position);
    this.positions[nodeId] = { ...position };
    return true;
  }

  /**
   * Serialize to guide.json format
   */
  serialize(moduleName: string = 'base'): GuideJsonFormat {
    return {
      moduleList: {
        [moduleName]: {
          nodes: this.nodes.map(node => node.serialize()),
          connections: this.connections.map(conn => conn.serialize()),
          positions: { ...this.positions }
        }
      }
    };
  }

  /**
   * Create from guide.json format
   */
  static fromGuideJson(guideJson: GuideJsonFormat, moduleName: string = 'base'): ReactFlowGraph {
    const module = guideJson.moduleList[moduleName];
    if (!module) {
      throw new Error(`Module '${moduleName}' not found in guide.json`);
    }

    const nodes = module.nodes.map(guideNode => 
      ReactFlowNodeCore.fromGuideJson(guideNode, module.positions[guideNode.id])
    );

    const connections = module.connections.map(guideConnection =>
      ReactFlowConnection.fromGuideJson(guideConnection)
    );

    const graph = new ReactFlowGraph(nodes, connections);
    graph.positions = { ...module.positions };

    return graph;
  }

  /**
   * Create a deep copy of the graph
   */
  clone(): ReactFlowGraph {
    const clonedNodes = this.nodes.map(node => 
      new ReactFlowNodeCore(node.type, node.getAllData(), node.position, node.id)
    );

    const clonedConnections = this.connections.map(conn =>
      new ReactFlowConnection(conn.source, conn.sourceOutput, conn.target, conn.targetInput, conn.id)
    );

    return new ReactFlowGraph(clonedNodes, clonedConnections);
  }

  /**
   * Get graph statistics
   */
  getStats(): GraphStats {
    return {
      nodeCount: this.nodes.length,
      connectionCount: this.connections.length,
      nodeTypes: [...new Set(this.nodes.map(n => n.type))],
      isolatedNodes: this.nodes.filter(node => 
        this.getNodeConnections(node.id).length === 0
      ).map(n => n.id)
    };
  }
}

// Type definitions for guide.json compatibility
export interface GuideJsonNode {
  id: string;
  name: string; // This is the node type
  data: Record<string, any>;
}

export interface GuideJsonConnection {
  source: string;
  sourceOutput: string;
  target: string;
  targetInput: string;
}

export interface GuideJsonModule {
  nodes: GuideJsonNode[];
  connections: GuideJsonConnection[];
  positions: Record<string, { x: number; y: number }>;
}

export interface GuideJsonFormat {
  moduleList: Record<string, GuideJsonModule>;
}

export interface GraphStats {
  nodeCount: number;
  connectionCount: number;
  nodeTypes: string[];
  isolatedNodes: string[];
}
