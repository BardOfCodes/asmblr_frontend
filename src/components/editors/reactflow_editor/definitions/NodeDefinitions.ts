// Node Definition System for React Flow Editor
// This module defines the structure for node types and their properties

/**
 * Socket types for node inputs and outputs
 * These define what types of data can flow between nodes
 */
export type SocketType = 
  | 'ExprSocket'     // Expression/geometry data
  | 'FloatSocket'    // Single float values
  | 'VectorSocket'   // Vector data (Vec2, Vec3, Vec4)
  | 'BoolSocket'     // Boolean values
  | 'StringSocket'   // String/text data
  | 'MaterialSocket' // Material definitions
  | 'StateSocket';   // State data

/**
 * Control types for node parameters
 * These define the UI controls that appear on nodes
 */
export type ControlType = 
  | 'float'           // Single float slider
  | 'vector2'         // 2D vector input
  | 'vector3'         // 3D vector input  
  | 'vector4'         // 4D vector input
  | 'string'          // Text input
  | 'select'          // Dropdown selection
  | 'color'           // Color picker
  | 'checkbox'        // Boolean toggle
  | 'range'           // Min/max range slider
  | 'uniform_float'   // Uniform-generating float
  | 'uniform_vector2' // Uniform-generating vec2
  | 'uniform_vector3' // Uniform-generating vec3
  | 'uniform_vector4'; // Uniform-generating vec4

/**
 * Node input definition
 * Defines what inputs a node accepts
 */
export interface InputDefinition {
  key: string;           // Unique identifier for this input
  label: string;         // Display name
  socketType: SocketType; // What type of data this input accepts
  required: boolean;     // Whether this input must be connected
  defaultValue?: any;    // Default value if not connected
  description?: string;  // Tooltip description
  variadic?: boolean;    // Whether this input accepts multiple connections
}

/**
 * Node output definition
 * Defines what outputs a node provides
 */
export interface OutputDefinition {
  key: string;           // Unique identifier for this output
  label: string;         // Display name
  socketType: SocketType; // What type of data this output provides
  description?: string;  // Tooltip description
}

/**
 * Control configuration
 * Defines the parameters for UI controls
 */
export interface ControlConfig {
  defaultValue: any;           // Initial value
  min?: number | number[];     // Minimum value(s)
  max?: number | number[];     // Maximum value(s)
  step?: number;               // Step size for numeric inputs
  options?: string[];          // Options for select controls
  precision?: number;          // Decimal precision
  units?: string;              // Display units (e.g., "px", "°")
  multiline?: boolean;         // For string controls
  placeholder?: string;        // Placeholder text
}

/**
 * Uniform mapping for shader generation
 * Defines how control values map to shader uniforms
 */
export interface UniformMapping {
  name: string;                           // Uniform name in shader
  type: 'float' | 'vec2' | 'vec3' | 'vec4'; // Shader uniform type
  transform?: (value: any) => any;        // Optional value transformation
}

/**
 * Node control definition
 * Defines a UI control that appears on the node
 */
export interface ControlDefinition {
  key: string;              // Unique identifier
  type: ControlType;        // Type of control
  label: string;            // Display name
  config: ControlConfig;    // Control configuration
  linkedToInput?: string;   // Which input this control provides default value for
  uniforms?: UniformMapping[]; // Shader uniform mappings
  description?: string;     // Tooltip description
  showLabel?: boolean;      // Whether to show the label (default: true)
  hasSocket?: boolean;      // Whether this control has an input socket (default: false)
  socketType?: SocketType;  // Socket type if hasSocket is true
  conditional?: {           // Show/hide based on other control values
    dependsOn: string;      // Control key to depend on
    condition: (value: any) => boolean; // Condition function
  };
}

/**
 * Node category for organization
 */
export type NodeCategory = 
  | 'Primitives'     // Basic 3D shapes
  | 'Transforms'     // Position, rotation, scale operations
  | 'Combinators'    // Union, difference, intersection
  | 'Math'           // Mathematical operations
  | 'Variables'      // Constants and uniforms
  | 'Materials'      // Material definitions
  | 'Utilities'      // Helper nodes
  | 'Advanced'       // Complex operations
  | 'auto';          // Auto-generated nodes

/**
 * Complete node definition
 * This defines everything about a node type
 */
export interface NodeDefinition {
  // Basic identification
  type: string;                    // Unique node type identifier
  label: string;                   // Display name
  category: NodeCategory;          // Category for organization
  description?: string;            // Detailed description
  
  // Node structure
  inputs: InputDefinition[];       // Input sockets
  outputs: OutputDefinition[];     // Output sockets
  controls: ControlDefinition[];   // UI controls
  
  // Visual properties
  dimensions?: {                   // Preferred node size
    width: number;
    height: number;
  };
  color?: string;                  // Node color theme
  icon?: string;                   // Icon identifier
  
  // Behavior
  factory: (data?: Record<string, any>) => Record<string, any>; // Creates default data
  validator?: (data: Record<string, any>) => ValidationResult;  // Validates node data
  
  // Metadata
  version?: string;                // Node definition version
  deprecated?: boolean;            // Whether this node is deprecated
  experimental?: boolean;          // Whether this node is experimental
  tags?: string[];                 // Search tags
}

/**
 * Validation result for node data
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Context menu item for node creation
 */
export interface NodeMenuItem {
  label: string;
  nodeType: string;
  category: NodeCategory;
  description?: string;
  icon?: string;
  shortcut?: string;
}

/**
 * Node registry configuration
 */
export interface NodeRegistryConfig {
  // Organization
  categories: Record<NodeCategory, {
    label: string;
    description: string;
    icon?: string;
    order: number;
  }>;
  
  // Search configuration
  searchConfig: {
    fuzzySearch: boolean;
    searchFields: ('label' | 'type' | 'description' | 'tags')[];
    maxResults: number;
  };
  
  // UI configuration
  uiConfig: {
    showExperimental: boolean;
    showDeprecated: boolean;
    defaultCategory: NodeCategory;
  };
}

/**
 * Default registry configuration
 */
export const DEFAULT_REGISTRY_CONFIG: NodeRegistryConfig = {
  categories: {
    'Primitives': {
      label: 'Primitives',
      description: 'Basic 3D shapes and geometry',
      icon: '🔷',
      order: 1
    },
    'Transforms': {
      label: 'Transforms',
      description: 'Position, rotation, and scale operations',
      icon: '🔄',
      order: 2
    },
    'Combinators': {
      label: 'Combinators',
      description: 'Union, difference, and intersection operations',
      icon: '🔗',
      order: 3
    },
    'Math': {
      label: 'Math',
      description: 'Mathematical operations and functions',
      icon: '🧮',
      order: 4
    },
    'Variables': {
      label: 'Variables',
      description: 'Constants, uniforms, and data sources',
      icon: '📊',
      order: 5
    },
    'Materials': {
      label: 'Materials',
      description: 'Material definitions and properties',
      icon: '🎨',
      order: 6
    },
    'Utilities': {
      label: 'Utilities',
      description: 'Helper nodes and tools',
      icon: '🔧',
      order: 7
    },
    'Advanced': {
      label: 'Advanced',
      description: 'Complex and specialized operations',
      icon: '⚡',
      order: 8
    },
    'auto': {
      label: 'Auto-Generated',
      description: 'Automatically generated nodes from backend',
      icon: '🤖',
      order: 9
    }
  },
  
  searchConfig: {
    fuzzySearch: true,
    searchFields: ['label', 'type', 'description', 'tags'],
    maxResults: 20
  },
  
  uiConfig: {
    showExperimental: true,
    showDeprecated: false,
    defaultCategory: 'Primitives'
  }
};

/**
 * Helper function to create input definitions
 */
export function createInput(
  key: string,
  label: string,
  socketType: SocketType,
  required: boolean = false,
  defaultValue?: any,
  description?: string,
  variadic?: boolean
): InputDefinition {
  return {
    key,
    label,
    socketType,
    required,
    defaultValue,
    description,
    variadic
  };
}

/**
 * Helper function to create output definitions
 */
export function createOutput(
  key: string,
  label: string,
  socketType: SocketType,
  description?: string
): OutputDefinition {
  return {
    key,
    label,
    socketType,
    description
  };
}

/**
 * Helper function to create control definitions
 */
export function createControl(
  key: string,
  type: ControlType,
  label: string,
  config: ControlConfig,
  options?: {
    linkedToInput?: string;
    description?: string;
    showLabel?: boolean;
    hasSocket?: boolean;
    socketType?: SocketType;
  }
): ControlDefinition {
  return {
    key,
    type,
    label,
    config,
    linkedToInput: options?.linkedToInput,
    description: options?.description,
    showLabel: options?.showLabel !== false, // Default to true
    hasSocket: options?.hasSocket || false,
    socketType: options?.socketType,
  };
}

/**
 * Helper function to validate node definition
 */
export function validateNodeDefinition(definition: NodeDefinition): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!definition.type) errors.push('Node type is required');
  if (!definition.label) errors.push('Node label is required');
  if (!definition.category) errors.push('Node category is required');

  // Check for duplicate keys
  const inputKeys = new Set<string>();
  const outputKeys = new Set<string>();
  const controlKeys = new Set<string>();

  definition.inputs.forEach(input => {
    if (inputKeys.has(input.key)) {
      errors.push(`Duplicate input key: ${input.key}`);
    }
    inputKeys.add(input.key);
  });

  definition.outputs.forEach(output => {
    if (outputKeys.has(output.key)) {
      errors.push(`Duplicate output key: ${output.key}`);
    }
    outputKeys.add(output.key);
  });

  definition.controls.forEach(control => {
    if (controlKeys.has(control.key)) {
      errors.push(`Duplicate control key: ${control.key}`);
    }
    controlKeys.add(control.key);

    // Check if linkedToInput references a valid input
    if (control.linkedToInput && !inputKeys.has(control.linkedToInput)) {
      errors.push(`Control ${control.key} references non-existent input: ${control.linkedToInput}`);
    }
  });

  // Check for orphaned controls (controls not linked to inputs)
  const linkedControls = new Set(definition.controls.map(c => c.linkedToInput).filter(Boolean));
  const unlinkedInputs = definition.inputs.filter(input => !linkedControls.has(input.key));
  
  if (unlinkedInputs.length > 0) {
    warnings.push(`Inputs without controls: ${unlinkedInputs.map(i => i.key).join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

