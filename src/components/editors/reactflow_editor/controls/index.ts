// Control Registry and Exports
// Central registry for all control types and their components

import React from 'react';
import { ControlType, BaseControlProps } from '../../../../types/control';
import { FloatControl, Vector2Control, Vector3Control, Vector4Control } from './VectorControl';
import { StringControl } from './StringControl';
import { SelectControl } from './SelectControl';
import { CheckboxControl } from './CheckboxControl';
import { getControlForType } from './TypeParser';

// Re-export control components
export { BaseControl, ControlInputWrapper } from './BaseControl';
export { FloatControl, Vector2Control, Vector3Control, Vector4Control } from './VectorControl';
export { StringControl } from './StringControl';
export { SelectControl } from './SelectControl';
export { CheckboxControl } from './CheckboxControl';
export { Matrix2x2Control, Matrix3x3Control } from './MatrixControl';
export { ListFloatControl, ListVec2Control, ListVec3Control, ListVec4Control } from './ListControl';

// Re-export type parser functions
export { getControlForType } from './TypeParser';

// Legacy Control component map (for backward compatibility)
export const ControlComponents: Record<ControlType, React.FC<BaseControlProps>> = {
  float: FloatControl,
  vector2: Vector2Control,
  vector3: Vector3Control,
  vector4: Vector4Control,
  string: StringControl,
  select: SelectControl,
  color: FloatControl, // Placeholder - will implement ColorControl later
  checkbox: CheckboxControl,
  range: FloatControl, // Placeholder - will implement RangeControl later
  uniform_float: FloatControl, // Same as float but with uniform generation
  uniform_vector2: Vector2Control, // Same as vector2 but with uniform generation
  uniform_vector3: Vector3Control, // Same as vector3 but with uniform generation
  uniform_vector4: Vector4Control, // Same as vector4 but with uniform generation
};

/**
 * Get the appropriate control component for a control type
 * Now supports both legacy ControlType enum and dynamic type strings
 */
export const getControlComponent = (type: string): React.FC<BaseControlProps> => {
  // First try legacy enum lookup
  if (type in ControlComponents) {
    return ControlComponents[type as ControlType];
  }
  
  // Fall back to dynamic type parsing for new backend type strings
  return getControlForType(type);
};

/**
 * Check if a control type generates uniforms
 */
export const isUniformControl = (type: string): boolean => {
  return type.startsWith('uniform_');
};

/**
 * Get the base control type from a uniform control type
 */
export const getBaseControlType = (type: string): string => {
  if (type.startsWith('uniform_')) {
    return type.replace('uniform_', '');
  }
  return type;
};

/**
 * Control factory function
 */
export const createControl = (
  type: string,
  props: Omit<BaseControlProps, 'type'>
): React.ReactElement => {
  const ControlComponent = getControlComponent(type);
  return React.createElement(ControlComponent, { ...props, type });
};
