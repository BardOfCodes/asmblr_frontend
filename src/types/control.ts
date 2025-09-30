/**
 * Control type definitions - Unified control system types
 */

// Control types for node parameters
export type ControlType = 
  | 'float'           // Single float input
  | 'int'             // Single integer input
  | 'Vector[2]'         // 2D vector input
  | 'Vector[3]'         // 3D vector input  
  | 'Vector[4]'         // 4D vector input
  | 'vector2'
  | 'vector3'
  | 'vector4'
  | 'string'          // Text input
  | 'str'
  | 'select'          // Dropdown selection
  | 'color'           // Color picker
  | 'checkbox'        // Boolean toggle
  | 'range'           // Min/max range slider
  | 'uniform_float'   // Uniform-generating float
  | 'uniform_vector2' // Uniform-generating vec2
  | 'uniform_vector3' // Uniform-generating vec3
  | 'uniform_vector4' // Uniform-generating vec4
  | 'Union[Vector[4]|str]';

// Control configuration options
export interface ControlConfig {
  defaultValue?: any;
  min?: number | number[];
  max?: number | number[];
  step?: number;
  placeholder?: string;
  options?: Array<{ value: string; label: string }> | string[];
  precision?: number;
  units?: string;
  multiline?: boolean;
}

// Control definition for node controls
export interface ControlDefinition {
  key: string;
  type: string; // Support all backend type strings - TypeParser handles conversion
  label: string;
  config: ControlConfig;
  linkedToInput?: string;
  hasSocket?: boolean;
  socketType?: string;
  showLabel?: boolean;
}

// Base props interface for all control components
export interface BaseControlProps {
  id: string;
  type: string; // Support all backend type strings - TypeParser handles conversion
  label: string;
  value: any;
  config: ControlConfig;
  onChange: (value: any) => void;
  className?: string;
  disabled?: boolean;
}

// Control value container
export interface ControlValue {
  key: string;
  value: any;
}

// Uniform mapping for controls that generate shader uniforms
export interface UniformMapping {
  name: string;           // Uniform name in shader
  type: 'float' | 'vec2' | 'vec3' | 'vec4';
  transform?: (value: any) => any; // Optional value transformation
}
