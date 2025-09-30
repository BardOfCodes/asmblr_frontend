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
 * Type conversion utilities for control values
 */
class TypeConverter {
  /**
   * Convert a string value to the appropriate type based on the control type
   */
  static convertValue(value: any, controlType: string): any {
    // If value is already the correct type (not a string), return as-is
    if (typeof value !== 'string') {
      return this.ensureCorrectType(value, controlType);
    }

    const normalizedType = controlType.toLowerCase().trim();

    // Handle boolean types
    if (normalizedType === 'bool' || normalizedType === 'boolean') {
      if (value === 'true' || value === '1' || value === 'yes') return true;
      if (value === 'false' || value === '0' || value === 'no') return false;
      return Boolean(value);
    }

    // Handle numeric types
    if (normalizedType === 'float' || normalizedType === 'int' || normalizedType === 'number') {
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    }

    // Handle string types (return as-is)
    if (normalizedType === 'str' || normalizedType === 'string') {
      return value;
    }

    // Handle vector types
    if (normalizedType === 'vec2' || normalizedType === 'vector[2]') {
      return this.parseVectorString(value, 2);
    }
    if (normalizedType === 'vec3' || normalizedType === 'vector[3]') {
      return this.parseVectorString(value, 3);
    }
    if (normalizedType === 'vec4' || normalizedType === 'vector[4]') {
      return this.parseVectorString(value, 4);
    }

    // Handle matrix types
    if (normalizedType.includes('matrix') || normalizedType.includes('mat')) {
      if (normalizedType.includes('2')) {
        return this.parseMatrixString(value, 2);
      }
      if (normalizedType.includes('3')) {
        return this.parseMatrixString(value, 3);
      }
    }

    // Handle list types
    const listMatch = normalizedType.match(/^list\[(.+)\]$/);
    if (listMatch) {
      return this.parseListString(value, listMatch[1]);
    }

    // Handle enum types (return as string)
    if (normalizedType.includes('enum') || controlType.match(/^Enum\[/)) {
      return value;
    }

    // Default: return as-is for unknown types
    return value;
  }

  /**
   * Parse a vector string like "1, 2, 3" or handle array input
   */
  private static parseVectorString(value: any, dimensions: number): number[] {
    if (Array.isArray(value)) {
      // Convert array elements to numbers
      const result = value.slice(0, dimensions).map(v => {
        const num = parseFloat(String(v));
        return isNaN(num) ? 0 : num;
      });
      // Pad with zeros if needed
      while (result.length < dimensions) {
        result.push(0);
      }
      return result;
    }

    if (typeof value === 'string') {
      // Parse comma-separated string
      const parts = value.split(',').map(s => s.trim());
      const result = [];
      for (let i = 0; i < dimensions; i++) {
        const num = parseFloat(parts[i] || '0');
        result.push(isNaN(num) ? 0 : num);
      }
      return result;
    }

    // Fallback: create zero vector
    return new Array(dimensions).fill(0);
  }

  /**
   * Parse a matrix string or handle array input
   */
  private static parseMatrixString(value: any, dimensions: number): number[] {
    const size = dimensions * dimensions;
    
    if (Array.isArray(value)) {
      // Convert array elements to numbers
      const result = value.slice(0, size).map(v => {
        const num = parseFloat(String(v));
        return isNaN(num) ? 0 : num;
      });
      // Pad with identity matrix values if needed
      while (result.length < size) {
        const index = result.length;
        const row = Math.floor(index / dimensions);
        const col = index % dimensions;
        result.push(row === col ? 1 : 0); // Identity matrix
      }
      return result;
    }

    if (typeof value === 'string') {
      // Parse comma-separated string
      const parts = value.split(',').map(s => s.trim());
      const result = [];
      for (let i = 0; i < size; i++) {
        const num = parseFloat(parts[i] || '0');
        if (isNaN(num)) {
          // Use identity matrix value as fallback
          const row = Math.floor(i / dimensions);
          const col = i % dimensions;
          result.push(row === col ? 1 : 0);
        } else {
          result.push(num);
        }
      }
      return result;
    }

    // Fallback: create identity matrix
    const result = [];
    for (let i = 0; i < size; i++) {
      const row = Math.floor(i / dimensions);
      const col = i % dimensions;
      result.push(row === col ? 1 : 0);
    }
    return result;
  }

  /**
   * Parse a list string or handle array input
   */
  private static parseListString(value: any, innerType: string): any[] {
    if (Array.isArray(value)) {
      // Convert each element according to inner type
      return value.map(item => this.convertValue(item, innerType));
    }

    if (typeof value === 'string') {
      try {
        // Try to parse as JSON array first
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.map(item => this.convertValue(item, innerType));
        }
      } catch {
        // If JSON parsing fails, treat as empty list
      }
    }

    // Fallback: empty array
    return [];
  }

  /**
   * Ensure a value has the correct type structure (for non-string inputs)
   */
  private static ensureCorrectType(value: any, controlType: string): any {
    const normalizedType = controlType.toLowerCase().trim();

    // For arrays (vectors, matrices, lists), ensure all elements are numbers where appropriate
    if (Array.isArray(value)) {
      if (normalizedType.includes('vec') || normalizedType.includes('vector') || 
          normalizedType.includes('matrix') || normalizedType.includes('mat')) {
        return value.map(v => {
          const num = parseFloat(String(v));
          return isNaN(num) ? 0 : num;
        });
      }
      
      if (normalizedType.includes('list[')) {
        const listMatch = normalizedType.match(/^list\[(.+)\]$/);
        if (listMatch) {
          return value.map(item => this.convertValue(item, listMatch[1]));
        }
      }
    }

    // For numbers, ensure they're actually numbers
    if (normalizedType === 'float' || normalizedType === 'int' || normalizedType === 'number') {
      const num = parseFloat(String(value));
      return isNaN(num) ? 0 : num;
    }

    // For booleans, ensure they're actually booleans
    if (normalizedType === 'bool' || normalizedType === 'boolean') {
      return Boolean(value);
    }

    return value;
  }

  /**
   * Get default value for a given control type
   */
  static getDefaultValueForType(controlType: string): any {
    const normalizedType = controlType.toLowerCase().trim();
    
    // Boolean types
    if (this.isBooleanType(normalizedType)) {
      return false;
    }
    
    // Numeric types (float, int, number)
    if (this.isNumericType(normalizedType)) {
      return 0.0;
    }
    
    // String types
    if (this.isStringType(normalizedType)) {
      return '';
    }
    
    // Vector types
    const vectorDimensions = this.getVectorDimensions(normalizedType);
    if (vectorDimensions > 0) {
      return this.createZeroVector(vectorDimensions);
    }
    
    // Matrix types
    const matrixDimensions = this.getMatrixDimensions(normalizedType);
    if (matrixDimensions > 0) {
      return this.createIdentityMatrix(matrixDimensions);
    }
    
    // List types
    if (this.isListType(normalizedType)) {
      return [];
    }
    
    // Select/Choice types
    if (this.isSelectType(normalizedType)) {
      return '';
    }
    
    // Default fallback
    return 0.0;
  }

  /**
   * Type checking helper methods
   */
  private static isBooleanType(type: string): boolean {
    return type === 'bool' || type === 'boolean';
  }

  private static isNumericType(type: string): boolean {
    return type === 'float' || type === 'int' || type === 'number';
  }

  private static isStringType(type: string): boolean {
    return type === 'string' || type === 'str';
  }

  private static isListType(type: string): boolean {
    return type.startsWith('list[');
  }

  private static isSelectType(type: string): boolean {
    return type.startsWith('select') || type.startsWith('choice') || type.startsWith('enum');
  }

  /**
   * Get vector dimensions from type string
   * Returns 0 if not a vector type
   */
  private static getVectorDimensions(type: string): number {
    // Handle vec2, vec3, vec4 formats
    const vecMatch = type.match(/^vec(\d+)$/);
    if (vecMatch) {
      return parseInt(vecMatch[1], 10);
    }
    
    // Handle vector2, vector3, vector4 formats
    const vectorMatch = type.match(/^vector(\d+)$/);
    if (vectorMatch) {
      return parseInt(vectorMatch[1], 10);
    }
    
    // Handle vector[n] format
    const vectorBracketMatch = type.match(/^vector\[(\d+)\]$/);
    if (vectorBracketMatch) {
      return parseInt(vectorBracketMatch[1], 10);
    }
    
    return 0;
  }

  /**
   * Get matrix dimensions from type string
   * Returns 0 if not a matrix type
   */
  private static getMatrixDimensions(type: string): number {
    // Handle mat2, mat3, mat4 formats
    const matMatch = type.match(/^mat(\d+)$/);
    if (matMatch) {
      return parseInt(matMatch[1], 10);
    }
    
    // Handle matrix2x2, matrix3x3, matrix4x4 formats
    const matrixMatch = type.match(/^matrix(\d+)x\1$/);
    if (matrixMatch) {
      return parseInt(matrixMatch[1], 10);
    }
    
    // Handle matrix[nxn] format
    const matrixBracketMatch = type.match(/^matrix\[(\d+)x\1\]$/);
    if (matrixBracketMatch) {
      return parseInt(matrixBracketMatch[1], 10);
    }
    
    return 0;
  }

  /**
   * Create a zero vector of specified dimensions
   */
  private static createZeroVector(dimensions: number): number[] {
    return new Array(dimensions).fill(0.0);
  }

  /**
   * Create an identity matrix of specified dimensions (flattened row-major)
   */
  private static createIdentityMatrix(dimensions: number): number[] {
    const size = dimensions * dimensions;
    const matrix = new Array(size).fill(0.0);
    
    // Set diagonal elements to 1.0
    for (let i = 0; i < dimensions; i++) {
      matrix[i * dimensions + i] = 1.0;
    }
    
    return matrix;
  }

  /**
   * Convert all control values in a node's data
   */
  static convertNodeControlValues(nodeData: any, nodeRegistry?: any): Record<string, any> {
    const controlValues = nodeData.controlValues || {};
    const convertedValues: Record<string, any> = {};

    console.log(`[DEBUG] Converting node ${nodeData.nodeType}, controlValues:`, controlValues);

    // If we have a node registry, use it to get control type information
    if (nodeRegistry && nodeData.nodeType) {
      const definition = nodeRegistry.get(nodeData.nodeType);
      console.log(`[DEBUG] Node definition for ${nodeData.nodeType}:`, definition ? `${definition.controls?.length || 0} controls` : 'not found');
      if (definition && definition.controls) {
        
        // Convert each control value according to its type
        for (const control of definition.controls) {
          const controlId = control.key || control.id; // Use 'key' for auto-generated nodes, 'id' for legacy
          const controlType = control.type;
          const rawValue = controlValues[controlId];
          
          let valueToConvert = rawValue;
          
          // If no value is set, use the control's default value or type default
          if (rawValue === undefined) {
            // First try the control's configured default value
            const configDefault = control.config?.defaultValue;
            if (configDefault !== null && configDefault !== undefined) {
              valueToConvert = configDefault;
            } else {
              // Fall back to type-based default
              valueToConvert = this.getDefaultValueForType(controlType);
            }
          }
          
          const convertedValue = this.convertValue(valueToConvert, controlType);
          convertedValues[controlId] = convertedValue;
          
        }
        console.log(`[DEBUG] Final converted values for ${nodeData.nodeType}:`, convertedValues);
        return convertedValues;
      }
    }

    // Fallback: try to infer types from the control values themselves
    for (const [key, value] of Object.entries(controlValues)) {
      const convertedValue = this.inferAndConvertValue(value);
      convertedValues[key] = convertedValue;
      
    }

    return convertedValues;
  }

  /**
   * Infer type and convert value when no type information is available
   */
  private static inferAndConvertValue(value: any): any {
    if (typeof value !== 'string') {
      return value;
    }

    // Try to parse as number
    const num = parseFloat(value);
    if (!isNaN(num) && isFinite(num)) {
      return num;
    }

    // Try to parse as boolean
    if (value === 'true' || value === 'false') {
      return value === 'true';
    }

    // Try to parse as array (for vectors/matrices)
    if (value.includes(',')) {
      const parts = value.split(',').map(s => s.trim());
      const numbers = parts.map(p => parseFloat(p));
      if (numbers.every(n => !isNaN(n))) {
        return numbers;
      }
    }

    // Return as string
    return value;
  }
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
    moduleName: string = 'base',
    nodeRegistry?: any
  ): GraphFormat {
    // Convert nodes - use nodeType which is what SmartReactFlowNode expects
    const graphNodes: GraphNode[] = nodes.map(node => {
      const nodeData = node.data as any;
      const nodeType = nodeData.nodeType || nodeData.type || 'UnknownNode';
      
      // Convert control values to proper types
      const convertedControlValues = TypeConverter.convertNodeControlValues(nodeData, nodeRegistry);
      
      return {
        id: node.id,
        name: nodeType,
        data: convertedControlValues
      };
    });

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
    moduleName: string = 'base',
    nodeRegistry?: any
  ): void {
    try {
      const graphData = this.serialize(nodes, edges, moduleName, nodeRegistry);
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
    moduleName: string = 'base',
    nodeRegistry?: any
  ): void {
    try {
      const graphData = this.serialize(nodes, edges, moduleName, nodeRegistry);
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

// Export TypeConverter for testing and direct use
export { TypeConverter };
