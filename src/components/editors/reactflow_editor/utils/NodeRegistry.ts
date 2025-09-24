// Node Registry and Factory System
// This module provides a centralized system for registering and creating nodes

import { v4 as uuidv4 } from 'uuid';
import { 
  NodeDefinition, 
  ReactFlowNode, 
  ReactFlowNodeData, 
  ModeNodeSet,
  ModeDefinition,
  ContextMenuItem
} from '../types';

// Generate unique IDs for nodes
const generateId = (): string => uuidv4();

/**
 * NodeRegistry manages all available node types and their definitions
 */
export class NodeRegistry {
  private registry = new Map<string, NodeDefinition>();
  private modes = new Map<string, ModeDefinition>();

  /**
   * Register a node definition
   */
  registerNode(definition: NodeDefinition): void {
    this.registry.set(definition.type, definition);
  }

  /**
   * Register multiple node definitions
   */
  registerNodes(definitions: NodeDefinition[]): void {
    definitions.forEach(def => this.registerNode(def));
  }

  /**
   * Get a node definition by type
   */
  getNodeDefinition(type: string): NodeDefinition | undefined {
    return this.registry.get(type);
  }

  /**
   * Get all registered node definitions
   */
  getAllNodeDefinitions(): NodeDefinition[] {
    return Array.from(this.registry.values());
  }

  /**
   * Get node definitions by category
   */
  getNodesByCategory(category: string): NodeDefinition[] {
    return Array.from(this.registry.values())
      .filter(def => def.category === category);
  }

  /**
   * Register a mode with its specific node set
   */
  registerMode(mode: ModeDefinition): void {
    this.modes.set(mode.name, mode);
    
    // Register all nodes from this mode
    Object.values(mode.nodeSet).flat().forEach(nodeDef => {
      this.registerNode(nodeDef);
    });
  }

  /**
   * Get mode definition
   */
  getMode(modeName: string): ModeDefinition | undefined {
    return this.modes.get(modeName);
  }

  /**
   * Get available categories for a mode
   */
  getModeCategories(modeName: string): string[] {
    const mode = this.modes.get(modeName);
    return mode ? Object.keys(mode.nodeSet) : [];
  }

  /**
   * Get nodes for a specific mode and category
   */
  getModeNodes(modeName: string, category?: string): NodeDefinition[] {
    const mode = this.modes.get(modeName);
    if (!mode) return [];

    if (category) {
      return mode.nodeSet[category] || [];
    }

    // Return all nodes for the mode
    return Object.values(mode.nodeSet).flat();
  }

  /**
   * Check if a node type exists
   */
  hasNodeType(type: string): boolean {
    return this.registry.has(type);
  }

  /**
   * Get all available categories
   */
  getAllCategories(): string[] {
    const categories = new Set<string>();
    Array.from(this.registry.values()).forEach(def => {
      categories.add(def.category);
    });
    return Array.from(categories);
  }

  /**
   * Search nodes by label or type
   */
  searchNodes(query: string): NodeDefinition[] {
    const searchTerm = query.toLowerCase();
    return Array.from(this.registry.values()).filter(def => 
      def.label.toLowerCase().includes(searchTerm) ||
      def.type.toLowerCase().includes(searchTerm)
    );
  }
}

/**
 * NodeFactory creates React Flow nodes from definitions
 */
export class NodeFactory {
  constructor(private registry: NodeRegistry) {}

  /**
   * Create a React Flow node from a node type
   */
  createNode(type: string, data?: any, position?: { x: number; y: number }): ReactFlowNode {
    const definition = this.registry.getNodeDefinition(type);
    if (!definition) {
      throw new Error(`Unknown node type: ${type}`);
    }

    const nodeId = generateId();
    
    // Initialize control values with defaults or provided data
    const controlValues: Record<string, any> = {};
    definition.controls.forEach(control => {
      const key = control.id;
      controlValues[key] = data?.[key] ?? control.config.defaultValue;
    });

    const nodeData: ReactFlowNodeData = {
      id: nodeId,
      type: definition.type,
      label: definition.label,
      category: definition.category,
      inputs: definition.inputs,
      outputs: definition.outputs,
      controls: definition.controls,
      controlValues,
      dimensions: definition.dimensions,
      metadata: data?.metadata
    };

    return {
      id: nodeId,
      type: 'custom', // React Flow node type (we'll use custom rendering)
      position: position || { x: 0, y: 0 },
      data: nodeData
    };
  }

  /**
   * Create multiple nodes
   */
  createNodes(nodeSpecs: Array<{ type: string; data?: any; position?: { x: number; y: number } }>): ReactFlowNode[] {
    return nodeSpecs.map(spec => this.createNode(spec.type, spec.data, spec.position));
  }

  /**
   * Clone an existing node
   */
  cloneNode(node: ReactFlowNode, position?: { x: number; y: number }): ReactFlowNode {
    const newNode = this.createNode(node.data.type, node.data.controlValues);
    if (position) {
      newNode.position = position;
    }
    return newNode;
  }

  /**
   * Validate node data against its definition
   */
  validateNode(node: ReactFlowNode): boolean {
    const definition = this.registry.getNodeDefinition(node.data.type);
    if (!definition) return false;

    // Check if all required controls have values
    for (const control of definition.controls) {
      if (control.config.defaultValue !== undefined && 
          node.data.controlValues[control.id] === undefined) {
        return false;
      }
    }

    return true;
  }
}

/**
 * ContextMenuBuilder creates context menus for node creation
 */
export class ContextMenuBuilder {
  constructor(private registry: NodeRegistry, private factory: NodeFactory) {}

  /**
   * Build context menu for a specific mode
   */
  buildContextMenu(modeName: string, onNodeCreate: (node: ReactFlowNode) => void): ContextMenuItem[] {
    const mode = this.registry.getMode(modeName);
    if (!mode) return [];

    const menuItems: ContextMenuItem[] = [];

    Object.entries(mode.nodeSet).forEach(([category, nodes]) => {
      if (nodes.length === 0) return;

      const categoryItems: ContextMenuItem[] = nodes.map(nodeDef => ({
        label: nodeDef.label,
        key: nodeDef.type,
        handler: () => {
          const node = this.factory.createNode(nodeDef.type);
          onNodeCreate(node);
        }
      }));

      menuItems.push({
        label: category,
        key: category,
        children: categoryItems
      });
    });

    return menuItems;
  }

  /**
   * Build flat context menu (no categories)
   */
  buildFlatContextMenu(modeName: string, onNodeCreate: (node: ReactFlowNode) => void): ContextMenuItem[] {
    const nodes = this.registry.getModeNodes(modeName);
    
    return nodes.map(nodeDef => ({
      label: nodeDef.label,
      key: nodeDef.type,
      handler: () => {
        const node = this.factory.createNode(nodeDef.type);
        onNodeCreate(node);
      }
    }));
  }

  /**
   * Build searchable context menu
   */
  buildSearchableContextMenu(
    modeName: string, 
    searchQuery: string,
    onNodeCreate: (node: ReactFlowNode) => void
  ): ContextMenuItem[] {
    const allNodes = this.registry.getModeNodes(modeName);
    const filteredNodes = searchQuery 
      ? allNodes.filter(node => 
          node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.type.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allNodes;

    return filteredNodes.map(nodeDef => ({
      label: nodeDef.label,
      key: nodeDef.type,
      handler: () => {
        const node = this.factory.createNode(nodeDef.type);
        onNodeCreate(node);
      }
    }));
  }
}

// Global registry instance (singleton)
export const globalNodeRegistry = new NodeRegistry();
export const globalNodeFactory = new NodeFactory(globalNodeRegistry);
export const globalContextMenuBuilder = new ContextMenuBuilder(globalNodeRegistry, globalNodeFactory);
