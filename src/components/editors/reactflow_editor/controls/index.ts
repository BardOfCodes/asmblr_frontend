// Control Registry and Exports
// Central registry for all control types and their components

import React from 'react';
import { ControlType, BaseControlProps } from '../types';
import { BaseControl } from './BaseControl';
import { FloatControl, Vector2Control, Vector3Control, Vector4Control } from './VectorControl';
import { StringControl } from './StringControl';
import { SelectControl } from './SelectControl';

// Re-export control components
export { BaseControl } from './BaseControl';
export { FloatControl, Vector2Control, Vector3Control, Vector4Control } from './VectorControl';
export { StringControl } from './StringControl';
export { SelectControl } from './SelectControl';

// Control component map
export const ControlComponents: Record<ControlType, React.FC<BaseControlProps>> = {
  float: FloatControl,
  vector2: Vector2Control,
  vector3: Vector3Control,
  vector4: Vector4Control,
  string: StringControl,
  select: SelectControl,
  color: FloatControl, // Placeholder - will implement ColorControl later
  checkbox: FloatControl, // Placeholder - will implement CheckboxControl later
  range: FloatControl, // Placeholder - will implement RangeControl later
  uniform_float: FloatControl, // Same as float but with uniform generation
  uniform_vector2: Vector2Control, // Same as vector2 but with uniform generation
  uniform_vector3: Vector3Control, // Same as vector3 but with uniform generation
  uniform_vector4: Vector4Control, // Same as vector4 but with uniform generation
};

/**
 * Get the appropriate control component for a control type
 */
export const getControlComponent = (type: ControlType): React.FC<BaseControlProps> => {
  return ControlComponents[type] || FloatControl;
};

/**
 * Check if a control type generates uniforms
 */
export const isUniformControl = (type: ControlType): boolean => {
  return type.startsWith('uniform_');
};

/**
 * Get the base control type from a uniform control type
 */
export const getBaseControlType = (type: ControlType): ControlType => {
  if (type.startsWith('uniform_')) {
    return type.replace('uniform_', '') as ControlType;
  }
  return type;
};

/**
 * Control factory function
 */
export const createControl = (
  type: ControlType,
  props: Omit<BaseControlProps, 'type'>
): React.ReactElement => {
  const ControlComponent = getControlComponent(type);
  return React.createElement(ControlComponent, { ...props, type });
};
