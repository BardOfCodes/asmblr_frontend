// Node Graph Serialization System
// Converts between React Flow format and standard graph format

import { Node, Edge } from 'reactflow';
import { ReactFlowNodeData } from '../types';

/**
 * Standard graph format interfaces
 */
export interface GraphNode {
  id: string;
  name: string; // Node type
  data: Record<string, any>;
}

export interface GraphConnection {
  source: string;
  sourceOutput: string;
  target: string;
  targetInput: string;
}

export interface GraphPosition {
  x: number;
  y: number;
}

export interface GraphModule {
  nodes: GraphNode[];
  connections: GraphConnection[];
  positions: Record<string, GraphPosition>;
}

export interface GraphFormat {
  moduleList: Record<string, GraphModule>;
}

/**
 * React Flow graph serialization
 */
export class GraphSerializer {
  /**
   * Convert React Flow graph to standard format
   */
  static serialize(
    nodes: Node<ReactFlowNodeData>[],
    edges: Edge[],
    moduleName: string = 'base'
  ): GraphFormat {
    // Convert nodes - use nodeType which is what SmartReactFlowNode expects
    const graphNodes: GraphNode[] = nodes.map(node => ({
      id: node.id,
      name: (node.data as any).nodeType || node.data.type || 'UnknownNode',
      data: (node.data as any).controlValues || {}
    }));

    // Convert edges
    const graphConnections: GraphConnection[] = edges.map(edge => ({
      source: edge.source,
      sourceOutput: edge.sourceHandle || 'expr',
      target: edge.target,
      targetInput: edge.targetHandle || 'expr'
    }));

    // Convert positions
    const graphPositions: Record<string, GraphPosition> = {};
    nodes.forEach(node => {
      graphPositions[node.id] = {
        x: Math.round(node.position.x),
        y: Math.round(node.position.y)
      };
    });

    return {
      moduleList: {
        [moduleName]: {
          nodes: graphNodes,
          connections: graphConnections,
          positions: graphPositions
        }
      }
    };
  }

  /**
   * Convert standard format to React Flow graph
   */
  static deserialize(
    graphData: GraphFormat,
    moduleName: string = 'base',
    nodeRegistry?: any // NodeRegistry for getting definitions
  ): { nodes: Node<ReactFlowNodeData>[]; edges: Edge[] } {
    const module = graphData.moduleList[moduleName];
    if (!module) {
      throw new Error(`Module '${moduleName}' not found in graph data`);
    }

    // Convert nodes
    const nodes: Node<ReactFlowNodeData>[] = module.nodes.map(graphNode => {
      const position = module.positions[graphNode.id] || { x: 0, y: 0 };
      
      // Get the node definition from registry to create proper data structure
      let nodeData: ReactFlowNodeData;
      
      if (nodeRegistry) {
        const definition = nodeRegistry.get(graphNode.name);
        if (definition) {
          // Create proper data structure matching what SmartReactFlowNode expects
          nodeData = {
            id: graphNode.id,
            type: graphNode.name,
            label: definition.label,
            category: definition.category,
            inputs: definition.inputs || [],
            outputs: definition.outputs || [],
            controls: definition.controls || [],
            controlValues: graphNode.data || {},
            nodeType: graphNode.name, // This is what SmartReactFlowNode uses
            registry: nodeRegistry
          } as any;
        } else {
          // Fallback for unknown nodes
          nodeData = {
            id: graphNode.id,
            type: graphNode.name,
            label: `Unknown: ${graphNode.name}`,
            category: 'auto',
            inputs: [],
            outputs: [],
            controls: [],
            controlValues: graphNode.data || {},
            nodeType: graphNode.name, // This is what SmartReactFlowNode uses
            registry: nodeRegistry
          } as any;
        }
      } else {
        // No registry provided - create minimal data
        nodeData = {
          id: graphNode.id,
          type: graphNode.name,
          label: graphNode.name,
          category: 'auto',
          inputs: [],
          outputs: [],
          controls: [],
          controlValues: graphNode.data || {},
          nodeType: graphNode.name // This is what SmartReactFlowNode uses
        } as any;
      }
      
      return {
        id: graphNode.id,
        type: 'smart-node',
        position: {
          x: position.x,
          y: position.y
        },
        data: nodeData
      };
    });

    // Convert connections
    const edges: Edge[] = module.connections.map((conn, index) => ({
      id: `edge-${index}`,
      source: conn.source,
      target: conn.target,
      sourceHandle: conn.sourceOutput,
      targetHandle: conn.targetInput,
      type: 'default', // Use default for smooth bezier curves
      style: {
        strokeWidth: 4,
        stroke: '#6366F1'
      }
    }));

    return { nodes, edges };
  }

  /**
   * Save to localStorage
   */
  static saveToLocalStorage(
    nodes: Node<ReactFlowNodeData>[],
    edges: Edge[],
    key: string = 'reactflow-graph',
    moduleName: string = 'base'
  ): void {
    try {
      const graphData = this.serialize(nodes, edges, moduleName);
      localStorage.setItem(key, JSON.stringify(graphData, null, 2));
      console.log('[GraphSerializer] Saved to localStorage:', key);
    } catch (error) {
      console.error('[GraphSerializer] Error saving to localStorage:', error);
      throw error;
    }
  }

  /**
   * Load from localStorage
   */
  static loadFromLocalStorage(
    key: string = 'reactflow-graph',
    moduleName: string = 'base',
    nodeRegistry?: any
  ): { nodes: Node<ReactFlowNodeData>[]; edges: Edge[] } | null {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) {
        console.log('[GraphSerializer] No saved data found in localStorage:', key);
        return null;
      }

      const graphData: GraphFormat = JSON.parse(saved);
      const result = this.deserialize(graphData, moduleName, nodeRegistry);
      console.log('[GraphSerializer] Loaded from localStorage:', key, result.nodes.length, 'nodes', result.edges.length, 'edges');
      return result;
    } catch (error) {
      console.error('[GraphSerializer] Error loading from localStorage:', error);
      return null;
    }
  }

  /**
   * Export to downloadable JSON file
   */
  static exportToFile(
    nodes: Node<ReactFlowNodeData>[],
    edges: Edge[],
    filename: string = 'graph.json',
    moduleName: string = 'base'
  ): void {
    try {
      const graphData = this.serialize(nodes, edges, moduleName);
      const dataStr = JSON.stringify(graphData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = filename;
      link.click();
      
      console.log('[GraphSerializer] Exported to file:', filename);
    } catch (error) {
      console.error('[GraphSerializer] Error exporting to file:', error);
      throw error;
    }
  }

  /**
   * Import from file upload
   */
  static importFromFile(
    file: File,
    moduleName: string = 'base',
    nodeRegistry?: any
  ): Promise<{ nodes: Node<ReactFlowNodeData>[]; edges: Edge[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const graphData: GraphFormat = JSON.parse(content);
          const result = this.deserialize(graphData, moduleName, nodeRegistry);
          console.log('[GraphSerializer] Imported from file:', file.name, result.nodes.length, 'nodes', result.edges.length, 'edges');
          resolve(result);
        } catch (error) {
          console.error('[GraphSerializer] Error importing from file:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }

  /**
   * Validate graph format
   */
  static validateFormat(graphData: any): boolean {
    try {
      if (!graphData || typeof graphData !== 'object') return false;
      if (!graphData.moduleList || typeof graphData.moduleList !== 'object') return false;
      
      for (const [, module] of Object.entries(graphData.moduleList)) {
        const mod = module as any;
        if (!mod.nodes || !Array.isArray(mod.nodes)) return false;
        if (!mod.connections || !Array.isArray(mod.connections)) return false;
        if (!mod.positions || typeof mod.positions !== 'object') return false;
        
        // Validate nodes
        for (const node of mod.nodes) {
          if (!node.id || !node.name || typeof node.data !== 'object') return false;
        }
        
        // Validate connections
        for (const conn of mod.connections) {
          if (!conn.source || !conn.target || !conn.sourceOutput || !conn.targetInput) return false;
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }
}
