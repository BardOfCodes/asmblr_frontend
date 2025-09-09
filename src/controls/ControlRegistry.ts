import React from 'react';

export interface ControlDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  component: React.ComponentType<any>;
  props: Record<string, any>;
  defaultProps?: Record<string, any>;
}

export interface ControlGroup {
  id: string;
  name: string;
  description: string;
  controls: string[]; // Control IDs
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export class ControlRegistry {
  private controls: Map<string, ControlDefinition> = new Map();
  private groups: Map<string, ControlGroup> = new Map();
  private categories: Set<string> = new Set();

  registerControl(definition: ControlDefinition): void {
    this.controls.set(definition.id, definition);
    this.categories.add(definition.category);
  }

  registerControls(definitions: ControlDefinition[]): void {
    definitions.forEach(def => this.registerControl(def));
  }

  registerGroup(group: ControlGroup): void {
    this.groups.set(group.id, group);
  }

  getControl(id: string): ControlDefinition | null {
    return this.controls.get(id) || null;
  }

  getAllControls(): ControlDefinition[] {
    return Array.from(this.controls.values());
  }

  getControlsByCategory(category: string): ControlDefinition[] {
    return Array.from(this.controls.values()).filter(
      control => control.category === category
    );
  }

  getGroup(id: string): ControlGroup | null {
    return this.groups.get(id) || null;
  }

  getAllGroups(): ControlGroup[] {
    return Array.from(this.groups.values());
  }

  getCategories(): string[] {
    return Array.from(this.categories).sort();
  }

  createControlComponent(id: string, props: Record<string, any> = {}): React.ReactElement | null {
    const definition = this.controls.get(id);
    if (!definition) {
      console.error(`Control "${id}" not found in registry`);
      return null;
    }

    const mergedProps = {
      ...definition.defaultProps,
      ...definition.props,
      ...props,
    };

    return React.createElement(definition.component, mergedProps);
  }

  searchControls(query: string): ControlDefinition[] {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.controls.values()).filter(control =>
      control.name.toLowerCase().includes(lowercaseQuery) ||
      control.description.toLowerCase().includes(lowercaseQuery) ||
      control.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  validateGroup(groupId: string): { valid: boolean; errors: string[] } {
    const group = this.groups.get(groupId);
    if (!group) {
      return { valid: false, errors: [`Group "${groupId}" not found`] };
    }

    const errors: string[] = [];
    
    for (const controlId of group.controls) {
      if (!this.controls.has(controlId)) {
        errors.push(`Control "${controlId}" in group "${groupId}" not found`);
      }
    }

    return { valid: errors.length === 0, errors };
  }

  exportRegistry(): any {
    return {
      controls: Object.fromEntries(
        Array.from(this.controls.entries()).map(([id, def]) => [
          id,
          {
            ...def,
            component: def.component.name, // Store component name instead of reference
          }
        ])
      ),
      groups: Object.fromEntries(this.groups),
      categories: Array.from(this.categories),
      exportedAt: new Date().toISOString(),
    };
  }

  clear(): void {
    this.controls.clear();
    this.groups.clear();
    this.categories.clear();
  }

  removeControl(id: string): boolean {
    const control = this.controls.get(id);
    if (!control) {
      return false;
    }

    // Remove from groups
    for (const [groupId, group] of this.groups.entries()) {
      const index = group.controls.indexOf(id);
      if (index > -1) {
        group.controls.splice(index, 1);
      }
    }

    this.controls.delete(id);
    return true;
  }

  removeGroup(id: string): boolean {
    return this.groups.delete(id);
  }

  get controlCount(): number {
    return this.controls.size;
  }

  get groupCount(): number {
    return this.groups.size;
  }

  get categoryCount(): number {
    return this.categories.size;
  }
}

// Global registry instance
export const controlRegistry = new ControlRegistry();
