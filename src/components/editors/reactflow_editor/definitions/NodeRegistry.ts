// Node Registry System for React Flow Editor
// This module manages all available node types and provides search/filtering capabilities

import { 
  NodeDefinition, 
  NodeCategory, 
  NodeMenuItem, 
  NodeRegistryConfig, 
  DEFAULT_REGISTRY_CONFIG,
  validateNodeDefinition 
} from './NodeDefinitions';

/**
 * Search result for node registry queries
 */
export interface NodeSearchResult {
  definition: NodeDefinition;
  score: number;        // Relevance score (0-1)
  matchedFields: string[]; // Which fields matched the search
}

/**
 * Registry statistics
 */
export interface RegistryStats {
  totalNodes: number;
  nodesByCategory: Record<NodeCategory, number>;
  experimentalNodes: number;
  deprecatedNodes: number;
}

/**
 * Node Registry - manages all available node types
 */
export class NodeRegistry {
  private definitions = new Map<string, NodeDefinition>();
  private config: NodeRegistryConfig;
  private categoryIndex = new Map<NodeCategory, Set<string>>();
  private tagIndex = new Map<string, Set<string>>();

  constructor(config: NodeRegistryConfig = DEFAULT_REGISTRY_CONFIG) {
    this.config = { ...config };
    this.initializeIndices();
  }

  /**
   * Initialize search indices
   */
  private initializeIndices(): void {
    // Initialize category index
    Object.keys(this.config.categories).forEach(category => {
      this.categoryIndex.set(category as NodeCategory, new Set());
    });
  }

  /**
   * Register a single node definition
   */
  register(definition: NodeDefinition): boolean {
    // Validate the definition
    const validation = validateNodeDefinition(definition);
    if (!validation.isValid) {
      console.error(`Failed to register node ${definition.type}:`, validation.errors);
      return false;
    }

    // Log warnings
    if (validation.warnings.length > 0) {
      console.warn(`Warnings for node ${definition.type}:`, validation.warnings);
    }

    // Register the definition
    this.definitions.set(definition.type, definition);

    // Update category index
    const categoryNodes = this.categoryIndex.get(definition.category) || new Set();
    categoryNodes.add(definition.type);
    this.categoryIndex.set(definition.category, categoryNodes);

    // Update tag index
    if (definition.tags) {
      definition.tags.forEach(tag => {
        const tagNodes = this.tagIndex.get(tag.toLowerCase()) || new Set();
        tagNodes.add(definition.type);
        this.tagIndex.set(tag.toLowerCase(), tagNodes);
      });
    }

    return true;
  }

  /**
   * Register multiple node definitions
   */
  registerMany(definitions: NodeDefinition[]): { success: number; failed: number } {
    let success = 0;
    let failed = 0;

    definitions.forEach(definition => {
      if (this.register(definition)) {
        success++;
      } else {
        failed++;
      }
    });

    return { success, failed };
  }

  /**
   * Get a node definition by type
   */
  get(type: string): NodeDefinition | undefined {
    return this.definitions.get(type);
  }

  /**
   * Check if a node type exists
   */
  has(type: string): boolean {
    return this.definitions.has(type);
  }

  /**
   * Get all node definitions
   */
  getAll(): NodeDefinition[] {
    return Array.from(this.definitions.values());
  }

  /**
   * Get all node definitions by category
   */
  getByCategory(category: NodeCategory): NodeDefinition[] {
    const nodeTypes = this.categoryIndex.get(category) || new Set();
    return Array.from(nodeTypes)
      .map(type => this.definitions.get(type))
      .filter((def): def is NodeDefinition => def !== undefined);
  }

  /**
   * Get all categories with their node counts
   */
  getCategories(): Array<{ category: NodeCategory; count: number; config: any }> {
    return Object.entries(this.config.categories)
      .map(([category, config]) => ({
        category: category as NodeCategory,
        count: (this.categoryIndex.get(category as NodeCategory) || new Set()).size,
        config
      }))
      .sort((a, b) => a.config.order - b.config.order);
  }

  /**
   * Search for nodes
   */
  search(query: string, options: {
    category?: NodeCategory;
    includeExperimental?: boolean;
    includeDeprecated?: boolean;
    maxResults?: number;
  } = {}): NodeSearchResult[] {
    const {
      category,
      includeExperimental = this.config.uiConfig.showExperimental,
      includeDeprecated = this.config.uiConfig.showDeprecated,
      maxResults = this.config.searchConfig.maxResults
    } = options;

    if (!query.trim()) {
      // Return all nodes if no query
      let nodes = this.getAll();
      
      // Apply filters
      if (category) {
        nodes = this.getByCategory(category);
      }
      
      nodes = nodes.filter(def => {
        if (!includeExperimental && def.experimental) return false;
        if (!includeDeprecated && def.deprecated) return false;
        return true;
      });

      return nodes
        .slice(0, maxResults)
        .map(definition => ({
          definition,
          score: 1,
          matchedFields: []
        }));
    }

    const results: NodeSearchResult[] = [];
    const queryLower = query.toLowerCase();

    // Search through all definitions
    for (const definition of this.definitions.values()) {
      // Apply filters
      if (category && definition.category !== category) continue;
      if (!includeExperimental && definition.experimental) continue;
      if (!includeDeprecated && definition.deprecated) continue;

      const matchedFields: string[] = [];
      let score = 0;

      // Search in configured fields
      this.config.searchConfig.searchFields.forEach(field => {
        let fieldValue = '';
        let fieldWeight = 1;

        switch (field) {
          case 'label':
            fieldValue = definition.label.toLowerCase();
            fieldWeight = 3; // Label matches are most important
            break;
          case 'type':
            fieldValue = definition.type.toLowerCase();
            fieldWeight = 2;
            break;
          case 'description':
            fieldValue = (definition.description || '').toLowerCase();
            fieldWeight = 1;
            break;
          case 'tags':
            fieldValue = (definition.tags || []).join(' ').toLowerCase();
            fieldWeight = 1.5;
            break;
        }

        if (fieldValue.includes(queryLower)) {
          matchedFields.push(field);
          
          // Calculate score based on match quality
          if (fieldValue === queryLower) {
            // Exact match
            score += fieldWeight * 1.0;
          } else if (fieldValue.startsWith(queryLower)) {
            // Starts with query
            score += fieldWeight * 0.8;
          } else {
            // Contains query
            score += fieldWeight * 0.5;
          }
        }
      });

      // Add fuzzy search if enabled and no exact matches
      if (this.config.searchConfig.fuzzySearch && matchedFields.length === 0) {
        const fuzzyScore = this.calculateFuzzyScore(queryLower, definition.label.toLowerCase());
        if (fuzzyScore > 0.3) { // Threshold for fuzzy matches
          matchedFields.push('label (fuzzy)');
          score += fuzzyScore * 0.3; // Lower weight for fuzzy matches
        }
      }

      if (score > 0) {
        results.push({
          definition,
          score,
          matchedFields
        });
      }
    }

    // Sort by score (descending) and limit results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }

  /**
   * Calculate fuzzy match score using simple algorithm
   */
  private calculateFuzzyScore(query: string, target: string): number {
    if (query.length === 0) return 0;
    if (target.length === 0) return 0;

    let matches = 0;
    let queryIndex = 0;

    for (let i = 0; i < target.length && queryIndex < query.length; i++) {
      if (target[i] === query[queryIndex]) {
        matches++;
        queryIndex++;
      }
    }

    return matches / query.length;
  }

  /**
   * Get context menu items for node creation
   */
  getContextMenuItems(options: {
    category?: NodeCategory;
    includeExperimental?: boolean;
    includeDeprecated?: boolean;
  } = {}): NodeMenuItem[] {
    const {
      category,
      includeExperimental = this.config.uiConfig.showExperimental,
      includeDeprecated = this.config.uiConfig.showDeprecated
    } = options;

    let definitions = category ? this.getByCategory(category) : this.getAll();

    // Apply filters
    definitions = definitions.filter(def => {
      if (!includeExperimental && def.experimental) return false;
      if (!includeDeprecated && def.deprecated) return false;
      return true;
    });

    // Convert to menu items
    return definitions.map(definition => ({
      label: definition.label,
      nodeType: definition.type,
      category: definition.category,
      description: definition.description,
      icon: definition.icon
    }));
  }

  /**
   * Get context menu organized by categories
   */
  getCategorizedContextMenu(options: {
    includeExperimental?: boolean;
    includeDeprecated?: boolean;
  } = {}): Record<NodeCategory, NodeMenuItem[]> {
    const result: Record<NodeCategory, NodeMenuItem[]> = {} as Record<NodeCategory, NodeMenuItem[]>;

    // Initialize all categories
    Object.keys(this.config.categories).forEach(category => {
      result[category as NodeCategory] = [];
    });

    // Get items for each category
    Object.keys(this.config.categories).forEach(category => {
      const items = this.getContextMenuItems({
        category: category as NodeCategory,
        ...options
      });
      result[category as NodeCategory] = items;
    });

    return result;
  }

  /**
   * Get registry statistics
   */
  getStats(): RegistryStats {
    const stats: RegistryStats = {
      totalNodes: this.definitions.size,
      nodesByCategory: {} as Record<NodeCategory, number>,
      experimentalNodes: 0,
      deprecatedNodes: 0
    };

    // Initialize category counts
    Object.keys(this.config.categories).forEach(category => {
      stats.nodesByCategory[category as NodeCategory] = 0;
    });

    // Count nodes
    for (const definition of this.definitions.values()) {
      stats.nodesByCategory[definition.category]++;
      
      if (definition.experimental) {
        stats.experimentalNodes++;
      }
      
      if (definition.deprecated) {
        stats.deprecatedNodes++;
      }
    }

    return stats;
  }

  /**
   * Clear all registered nodes
   */
  clear(): void {
    this.definitions.clear();
    this.categoryIndex.clear();
    this.tagIndex.clear();
    this.initializeIndices();
  }

  /**
   * Remove a node definition
   */
  unregister(type: string): boolean {
    const definition = this.definitions.get(type);
    if (!definition) return false;

    // Remove from main registry
    this.definitions.delete(type);

    // Remove from category index
    const categoryNodes = this.categoryIndex.get(definition.category);
    if (categoryNodes) {
      categoryNodes.delete(type);
    }

    // Remove from tag index
    if (definition.tags) {
      definition.tags.forEach(tag => {
        const tagNodes = this.tagIndex.get(tag.toLowerCase());
        if (tagNodes) {
          tagNodes.delete(type);
          if (tagNodes.size === 0) {
            this.tagIndex.delete(tag.toLowerCase());
          }
        }
      });
    }

    return true;
  }

  /**
   * Update registry configuration
   */
  updateConfig(config: Partial<NodeRegistryConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): NodeRegistryConfig {
    return { ...this.config };
  }

  /**
   * Export all definitions as JSON
   */
  export(): { definitions: NodeDefinition[]; config: NodeRegistryConfig } {
    return {
      definitions: this.getAll(),
      config: this.getConfig()
    };
  }

  /**
   * Import definitions from JSON
   */
  import(data: { definitions: NodeDefinition[]; config?: NodeRegistryConfig }): { success: number; failed: number } {
    if (data.config) {
      this.updateConfig(data.config);
    }

    return this.registerMany(data.definitions);
  }
}



