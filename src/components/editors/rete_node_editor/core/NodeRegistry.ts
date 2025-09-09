import { Node } from '../types';

export interface NodeDefinition {
  type: string;
  label: string;
  description: string;
  category: string;
  inputs: NodePortDefinition[];
  outputs: NodePortDefinition[];
  controls: NodeControlDefinition[];
  factory: () => Node;
}

export interface NodePortDefinition {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  multipleConnections?: boolean;
}

export interface NodeControlDefinition {
  key: string;
  type: 'number' | 'string' | 'boolean' | 'select' | 'color' | 'vector';
  label: string;
  defaultValue: any;
  options?: { value: any; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export class NodeRegistry {
  private nodes: Map<string, NodeDefinition> = new Map();
  private categories: Set<string> = new Set();

  registerNode(definition: NodeDefinition): void {
    this.nodes.set(definition.type, definition);
    this.categories.add(definition.category);
  }

  registerNodes(definitions: NodeDefinition[]): void {
    definitions.forEach(def => this.registerNode(def));
  }

  getNode(type: string): NodeDefinition | null {
    return this.nodes.get(type) || null;
  }

  getAllNodes(): NodeDefinition[] {
    return Array.from(this.nodes.values());
  }

  getNodesByCategory(category: string): NodeDefinition[] {
    return Array.from(this.nodes.values()).filter(node => node.category === category);
  }

  getCategories(): string[] {
    return Array.from(this.categories).sort();
  }

  searchNodes(query: string): NodeDefinition[] {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.nodes.values()).filter(node => 
      node.label.toLowerCase().includes(lowercaseQuery) ||
      node.description.toLowerCase().includes(lowercaseQuery) ||
      node.type.toLowerCase().includes(lowercaseQuery)
    );
  }

  createNode(type: string): Node | null {
    const definition = this.nodes.get(type);
    if (!definition) {
      console.error(`Node type "${type}" not found in registry`);
      return null;
    }

    try {
      return definition.factory();
    } catch (error) {
      console.error(`Failed to create node of type "${type}":`, error);
      return null;
    }
  }

  validateNode(node: Node): { valid: boolean; errors: string[] } {
    const definition = this.nodes.get(node.label || '');
    if (!definition) {
      return { valid: false, errors: [`Unknown node type: ${node.label}`] };
    }

    const errors: string[] = [];

    // Validate inputs
    for (const inputDef of definition.inputs) {
      if (inputDef.required && !node.inputs[inputDef.key]) {
        errors.push(`Required input "${inputDef.label}" is missing`);
      }
    }

    // Validate controls
    for (const controlDef of definition.controls) {
      const control = node.controls[controlDef.key];
      if (!control) {
        errors.push(`Required control "${controlDef.label}" is missing`);
        continue;
      }

      // Type validation would go here
      if (controlDef.type === 'number') {
        const value = (control as any).value;
        if (typeof value !== 'number') {
          errors.push(`Control "${controlDef.label}" must be a number`);
        } else {
          if (controlDef.min !== undefined && value < controlDef.min) {
            errors.push(`Control "${controlDef.label}" must be >= ${controlDef.min}`);
          }
          if (controlDef.max !== undefined && value > controlDef.max) {
            errors.push(`Control "${controlDef.label}" must be <= ${controlDef.max}`);
          }
        }
      }
    }

    return { valid: errors.length === 0, errors };
  }

  exportDefinitions(): any {
    return {
      nodes: Object.fromEntries(this.nodes),
      categories: Array.from(this.categories),
      exportedAt: new Date().toISOString(),
    };
  }

  importDefinitions(data: any): void {
    if (data.nodes) {
      for (const [type, definition] of Object.entries(data.nodes)) {
        this.nodes.set(type, definition as NodeDefinition);
      }
    }
    if (data.categories) {
      data.categories.forEach((cat: string) => this.categories.add(cat));
    }
  }

  clear(): void {
    this.nodes.clear();
    this.categories.clear();
  }

  get nodeCount(): number {
    return this.nodes.size;
  }

  get categoryCount(): number {
    return this.categories.size;
  }
}

// Global registry instance
export const nodeRegistry = new NodeRegistry();
