/**
 * Control type definitions
 */

export type ControlType = 
  | 'float' 
  | 'string' 
  | 'vector2' 
  | 'vector3' 
  | 'vector4' 
  | 'checkbox' 
  | 'select' 
  | 'color'
  | 'slider'
  | 'range'
  | 'uniform_float'
  | 'uniform_vector2'
  | 'uniform_vector3'
  | 'uniform_vector4';

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

export interface ControlDefinition {
  key: string;
  type: ControlType;
  label: string;
  config: ControlConfig;
  linkedToInput?: string;
  hasSocket?: boolean;
  socketType?: string;
  showLabel?: boolean;
}

export interface ControlValue {
  key: string;
  value: any;
}
