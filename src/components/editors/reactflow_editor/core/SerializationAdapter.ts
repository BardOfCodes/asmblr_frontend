// Serialization Adapter for React Flow Node Editor
// This module provides utilities for converting between different graph formats

import { 
  ReactFlowGraph, 
  GuideJsonFormat, 
  ReactFlowNodeCore, 
  ReactFlowConnection 
} from './ReactFlowCore';

/**
 * Adapter for converting between React Flow internal format and external formats
 * Primarily handles guide.json compatibility for backend communication
 */
export class SerializationAdapter {
  
  /**
   * Convert internal graph to guide.json format
   * This is the primary export format for backend communication
   */
  static toGuideJson(graph: ReactFlowGraph, moduleName: string = 'base'): GuideJsonFormat {
    return graph.serialize(moduleName);
  }

  /**
   * Convert guide.json format to internal graph
   * Used for loading saved graphs and backend responses
   */
  static fromGuideJson(guideJson: GuideJsonFormat, moduleName: string = 'base'): ReactFlowGraph {
    return ReactFlowGraph.fromGuideJson(guideJson, moduleName);
  }

  /**
   * Convert to React Flow format for the UI layer
   * Transforms internal representation to React Flow's expected format
   */
  static toReactFlowFormat(graph: ReactFlowGraph): ReactFlowUIFormat {
    const nodes = graph.nodes.map(node => ({
      id: node.id,
      type: 'smart-node', // All nodes use the SmartReactFlowNode component
      position: node.position,
      data: {
        nodeType: node.type,
        ...node.getAllData()
      }
    }));

    const edges = graph.connections.map(conn => ({
      id: conn.id,
      source: conn.source,
      target: conn.target,
      sourceHandle: conn.sourceOutput,
      targetHandle: conn.targetInput,
      type: 'default'
    }));

    return { nodes, edges };
  }

  /**
   * Convert from React Flow format to internal representation
   * Used when React Flow UI changes need to be reflected in internal state
   */
  static fromReactFlowFormat(
    reactFlowNodes: ReactFlowUINode[], 
    reactFlowEdges: ReactFlowUIEdge[]
  ): ReactFlowGraph {
    const nodes = reactFlowNodes.map(rfNode => 
      new ReactFlowNodeCore(
        rfNode.data.nodeType,
        { ...rfNode.data, nodeType: undefined }, // Remove nodeType from data
        rfNode.position,
        rfNode.id
      )
    );

    const connections = reactFlowEdges.map(rfEdge =>
      new ReactFlowConnection(
        rfEdge.source,
        rfEdge.sourceHandle || 'default',
        rfEdge.target,
        rfEdge.targetHandle || 'default',
        rfEdge.id
      )
    );

    return new ReactFlowGraph(nodes, connections);
  }

  /**
   * Export graph in a compact format for debugging/logging
   */
  static toDebugFormat(graph: ReactFlowGraph): DebugGraphFormat {
    return {
      summary: {
        nodes: graph.nodes.length,
        connections: graph.connections.length,
        nodeTypes: [...new Set(graph.nodes.map(n => n.type))]
      },
      nodes: graph.nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        dataKeys: Object.keys(node.getAllData())
      })),
      connections: graph.connections.map(conn => ({
        id: conn.id,
        flow: `${conn.source}.${conn.sourceOutput} → ${conn.target}.${conn.targetInput}`
      }))
    };
  }

  /**
   * Validate guide.json format before importing
   */
  static validateGuideJson(guideJson: any): GuideJsonValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check basic structure
    if (!guideJson || typeof guideJson !== 'object') {
      errors.push('Guide JSON must be an object');
      return { isValid: false, errors, warnings };
    }

    if (!guideJson.moduleList || typeof guideJson.moduleList !== 'object') {
      errors.push('Guide JSON must have a moduleList property');
      return { isValid: false, errors, warnings };
    }

    // Validate each module
    Object.entries(guideJson.moduleList).forEach(([moduleName, module]: [string, any]) => {
      if (!module || typeof module !== 'object') {
        errors.push(`Module '${moduleName}' must be an object`);
        return;
      }

      // Check required arrays
      if (!Array.isArray(module.nodes)) {
        errors.push(`Module '${moduleName}' must have a nodes array`);
      }

      if (!Array.isArray(module.connections)) {
        errors.push(`Module '${moduleName}' must have a connections array`);
      }

      if (!module.positions || typeof module.positions !== 'object') {
        errors.push(`Module '${moduleName}' must have a positions object`);
      }

      // Validate nodes
      if (Array.isArray(module.nodes)) {
        module.nodes.forEach((node: any, index: number) => {
          if (!node.id || typeof node.id !== 'string') {
            errors.push(`Node ${index} in module '${moduleName}' must have a string id`);
          }
          if (!node.name || typeof node.name !== 'string') {
            errors.push(`Node ${index} in module '${moduleName}' must have a string name (type)`);
          }
          if (!node.data || typeof node.data !== 'object') {
            errors.push(`Node ${index} in module '${moduleName}' must have a data object`);
          }
        });
      }

      // Validate connections
      if (Array.isArray(module.connections)) {
        module.connections.forEach((conn: any, index: number) => {
          const requiredFields = ['source', 'sourceOutput', 'target', 'targetInput'];
          requiredFields.forEach(field => {
            if (!conn[field] || typeof conn[field] !== 'string') {
              errors.push(`Connection ${index} in module '${moduleName}' must have a string ${field}`);
            }
          });
        });
      }

      // Check for orphaned connections
      if (Array.isArray(module.nodes) && Array.isArray(module.connections)) {
        const nodeIds = new Set(module.nodes.map((n: any) => n.id));
        module.connections.forEach((conn: any, index: number) => {
          if (conn.source && !nodeIds.has(conn.source)) {
            warnings.push(`Connection ${index} references non-existent source node '${conn.source}'`);
          }
          if (conn.target && !nodeIds.has(conn.target)) {
            warnings.push(`Connection ${index} references non-existent target node '${conn.target}'`);
          }
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Create a minimal valid guide.json structure
   */
  static createEmptyGuideJson(moduleName: string = 'base'): GuideJsonFormat {
    return {
      moduleList: {
        [moduleName]: {
          nodes: [],
          connections: [],
          positions: {}
        }
      }
    };
  }

  /**
   * Merge two guide.json structures
   * Useful for combining subgraphs or importing partial graphs
   */
  static mergeGuideJson(
    base: GuideJsonFormat, 
    addition: GuideJsonFormat,
    targetModule: string = 'base'
  ): GuideJsonFormat {
    const result = JSON.parse(JSON.stringify(base)); // Deep clone

    Object.entries(addition.moduleList).forEach(([moduleName, module]) => {
      if (!result.moduleList[targetModule]) {
        result.moduleList[targetModule] = {
          nodes: [],
          connections: [],
          positions: {}
        };
      }

      const target = result.moduleList[targetModule];
      
      // Add nodes (with ID conflict resolution)
      const existingIds = new Set(target.nodes.map(n => n.id));
      module.nodes.forEach(node => {
        let nodeId = node.id;
        let counter = 1;
        
        // Resolve ID conflicts
        while (existingIds.has(nodeId)) {
          nodeId = `${node.id}_${counter}`;
          counter++;
        }

        target.nodes.push({
          ...node,
          id: nodeId
        });

        existingIds.add(nodeId);

        // Update positions
        if (module.positions[node.id]) {
          target.positions[nodeId] = module.positions[node.id];
        }
      });

      // Add connections (updating IDs if they were changed)
      module.connections.forEach(conn => {
        target.connections.push({
          ...conn
          // Note: This is a simplified merge - in practice, you'd need to
          // update connection node references if IDs were changed above
        });
      });
    });

    return result;
  }
}

// Type definitions for React Flow UI format
export interface ReactFlowUINode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any> & { nodeType: string };
}

export interface ReactFlowUIEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
}

export interface ReactFlowUIFormat {
  nodes: ReactFlowUINode[];
  edges: ReactFlowUIEdge[];
}

// Debug format for logging and troubleshooting
export interface DebugGraphFormat {
  summary: {
    nodes: number;
    connections: number;
    nodeTypes: string[];
  };
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    dataKeys: string[];
  }>;
  connections: Array<{
    id: string;
    flow: string;
  }>;
}

// Validation result interface
export interface GuideJsonValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
