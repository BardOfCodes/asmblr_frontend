// Node Factory System for React Flow Editor
// This module creates nodes using definitions from the registry

import { ReactFlowNodeCore } from '../core/ReactFlowCore';
import { NodeDefinition, ValidationResult } from './NodeDefinitions';
import { NodeRegistry } from './NodeRegistry';

/**
 * Node creation options
 */
export interface NodeCreationOptions {
  position?: { x: number; y: number };
  data?: Record<string, any>;
  id?: string;
  validateData?: boolean;
}

/**
 * Node creation result
 */
export interface NodeCreationResult {
  success: boolean;
  node?: ReactFlowNodeCore;
  errors: string[];
  warnings: string[];
}

/**
 * Batch node creation result
 */
export interface BatchCreationResult {
  success: number;
  failed: number;
  nodes: ReactFlowNodeCore[];
  errors: Array<{ type: string; error: string }>;
}

/**
 * Node Factory - creates nodes from definitions
 */
export class NodeFactory {
  private registry: NodeRegistry;
  private nodeCounter = 0;

  constructor(registry: NodeRegistry) {
    this.registry = registry;
  }

  /**
   * Create a single node from a type
   */
  createNode(
    type: string, 
    options: NodeCreationOptions = {}
  ): NodeCreationResult {
    const {
      position = { x: 0, y: 0 },
      data = {},
      id,
      validateData = true
    } = options;

    // Get the node definition
    const definition = this.registry.get(type);
    if (!definition) {
      return {
        success: false,
        errors: [`Unknown node type: ${type}`],
        warnings: []
      };
    }

    try {
      // Generate unique ID if not provided
      const nodeId = id || this.generateNodeId(type);

      // Create default data using the factory function
      const defaultData = definition.factory(data);
      
      // Merge with provided data
      const finalData = { ...defaultData, ...data };

      // Validate data if requested
      let validation: ValidationResult = { isValid: true, errors: [], warnings: [] };
      if (validateData && definition.validator) {
        validation = definition.validator(finalData);
        if (!validation.isValid) {
          return {
            success: false,
            errors: validation.errors,
            warnings: validation.warnings
          };
        }
      }

      // Create the node using the constructor
      const node = new ReactFlowNodeCore(
        type,
        finalData,
        position,
        nodeId
      );

      return {
        success: true,
        node,
        errors: [],
        warnings: validation.warnings
      };

    } catch (error) {
      return {
        success: false,
        errors: [`Failed to create node: ${error instanceof Error ? error.message : String(error)}`],
        warnings: []
      };
    }
  }

  /**
   * Create multiple nodes at once
   */
  createNodes(
    requests: Array<{ type: string; options?: NodeCreationOptions }>
  ): BatchCreationResult {
    const result: BatchCreationResult = {
      success: 0,
      failed: 0,
      nodes: [],
      errors: []
    };

    requests.forEach(({ type, options = {} }) => {
      const nodeResult = this.createNode(type, options);
      
      if (nodeResult.success && nodeResult.node) {
        result.success++;
        result.nodes.push(nodeResult.node);
      } else {
        result.failed++;
        result.errors.push({
          type,
          error: nodeResult.errors.join('; ')
        });
      }
    });

    return result;
  }

  /**
   * Create a node with automatic positioning
   */
  createNodeWithAutoPosition(
    type: string,
    existingNodes: ReactFlowNodeCore[],
    options: Omit<NodeCreationOptions, 'position'> = {}
  ): NodeCreationResult {
    const position = this.calculateAutoPosition(type, existingNodes);
    
    return this.createNode(type, {
      ...options,
      position
    });
  }

  /**
   * Calculate automatic positioning for a new node
   */
  private calculateAutoPosition(
    type: string,
    existingNodes: ReactFlowNodeCore[]
  ): { x: number; y: number } {
    const definition = this.registry.get(type);
    const nodeWidth = definition?.dimensions?.width || 180;
    const nodeHeight = definition?.dimensions?.height || 80;
    
    // Grid-based positioning
    const gridSize = 250; // Space between nodes
    const startX = 100;
    const startY = 100;

    // Find the next available position
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const x = startX + col * gridSize;
        const y = startY + row * gridSize;

        // Check if this position is occupied
        const occupied = existingNodes.some(node => {
          const nodeDefinition = this.registry.get(node.type);
          const existingWidth = nodeDefinition?.dimensions?.width || 180;
          const existingHeight = nodeDefinition?.dimensions?.height || 80;

          // Check for overlap with some padding
          const padding = 50;
          return (
            x < node.position.x + existingWidth + padding &&
            x + nodeWidth + padding > node.position.x &&
            y < node.position.y + existingHeight + padding &&
            y + nodeHeight + padding > node.position.y
          );
        });

        if (!occupied) {
          return { x, y };
        }
      }
    }

    // Fallback to random position if grid is full
    return {
      x: Math.random() * 500 + 100,
      y: Math.random() * 500 + 100
    };
  }

  /**
   * Generate a unique node ID
   */
  private generateNodeId(type: string): string {
    this.nodeCounter++;
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `${type.toLowerCase()}-${timestamp}-${random}`;
  }

  /**
   * Clone an existing node with new ID and position
   */
  cloneNode(
    sourceNode: ReactFlowNodeCore,
    options: Partial<NodeCreationOptions> = {}
  ): NodeCreationResult {
    const {
      position = { 
        x: sourceNode.position.x + 50, 
        y: sourceNode.position.y + 50 
      },
      data = sourceNode.data,
      id,
      validateData = false // Skip validation for clones since source was valid
    } = options;

    return this.createNode(sourceNode.type, {
      position,
      data: { ...data }, // Deep copy the data
      id,
      validateData
    });
  }

  /**
   * Create a node from a template
   */
  createFromTemplate(
    template: {
      type: string;
      data: Record<string, any>;
      position?: { x: number; y: number };
    },
    options: Partial<NodeCreationOptions> = {}
  ): NodeCreationResult {
    return this.createNode(template.type, {
      position: template.position,
      data: template.data,
      ...options
    });
  }

  /**
   * Validate node data against its definition
   */
  validateNodeData(node: ReactFlowNodeCore): ValidationResult {
    const definition = this.registry.get(node.type);
    if (!definition) {
      return {
        isValid: false,
        errors: [`Unknown node type: ${node.type}`],
        warnings: []
      };
    }

    if (definition.validator) {
      return definition.validator(node.data);
    }

    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }

  /**
   * Get available node types for creation
   */
  getAvailableTypes(): string[] {
    return this.registry.getAll().map(def => def.type);
  }

  /**
   * Get node definition for a type
   */
  getDefinition(type: string): NodeDefinition | undefined {
    return this.registry.get(type);
  }

  /**
   * Check if a node type is available
   */
  hasType(type: string): boolean {
    return this.registry.has(type);
  }

  /**
   * Get factory statistics
   */
  getStats(): {
    availableTypes: number;
    nodesCreated: number;
    registry: any;
  } {
    return {
      availableTypes: this.registry.getAll().length,
      nodesCreated: this.nodeCounter,
      registry: this.registry.getStats()
    };
  }

  /**
   * Reset the node counter (useful for testing)
   */
  resetCounter(): void {
    this.nodeCounter = 0;
  }

  /**
   * Create a node with smart defaults based on context
   */
  createSmartNode(
    type: string,
    context: {
      existingNodes: ReactFlowNodeCore[];
      lastClickPosition?: { x: number; y: number };
      connectedToNode?: string;
      connectedToOutput?: string;
    },
    options: Partial<NodeCreationOptions> = {}
  ): NodeCreationResult {
    const definition = this.registry.get(type);
    if (!definition) {
      return {
        success: false,
        errors: [`Unknown node type: ${type}`],
        warnings: []
      };
    }

    // Smart positioning
    let position = options.position;
    if (!position) {
      if (context.lastClickPosition) {
        position = context.lastClickPosition;
      } else {
        position = this.calculateAutoPosition(type, context.existingNodes);
      }
    }

    // Smart data defaults based on context
    let smartData = { ...options.data };
    
    // If connecting to another node, try to infer good defaults
    if (context.connectedToNode && context.connectedToOutput) {
      const sourceNode = context.existingNodes.find(n => n.id === context.connectedToNode);
      if (sourceNode) {
        const sourceDefinition = this.registry.get(sourceNode.type);
        if (sourceDefinition) {
          // Find compatible inputs in the new node
          const compatibleInputs = definition.inputs.filter(input => {
            const sourceOutput = sourceDefinition.outputs.find(o => o.key === context.connectedToOutput);
            return sourceOutput && input.socketType === sourceOutput.socketType;
          });

          // Set smart defaults based on source node data
          if (compatibleInputs.length > 0 && sourceNode.data) {
            // This could be expanded with more sophisticated logic
            // For now, just ensure the node can be created
          }
        }
      }
    }

    return this.createNode(type, {
      ...options,
      position,
      data: smartData
    });
  }
}
