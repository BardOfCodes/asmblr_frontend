// Base Control Component
// Provides common functionality for all node controls

import React from 'react';
import { BaseControlProps, ControlConfig } from '../types';

interface BaseControlWrapperProps {
  id: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * Base control wrapper that provides common styling and behavior
 */
export const BaseControl: React.FC<BaseControlWrapperProps> = ({
  id,
  label,
  children,
  className = '',
  disabled = false
}) => {
  return (
    <div className={`reactflow-control ${className} ${disabled ? 'disabled' : ''}`}>
      {label && (
        <label htmlFor={id} className="reactflow-control-label">
          {label}
        </label>
      )}
      <div className="reactflow-control-input">
        {children}
      </div>
    </div>
  );
};

/**
 * Utility function to validate control values
 */
export const validateControlValue = (value: any, config: ControlConfig): boolean => {
  if (value === undefined || value === null) {
    return config.defaultValue !== undefined;
  }

  // Type-specific validation
  if (typeof config.min === 'number' && typeof value === 'number') {
    if (value < config.min) return false;
  }
  
  if (typeof config.max === 'number' && typeof value === 'number') {
    if (value > config.max) return false;
  }

  if (Array.isArray(config.min) && Array.isArray(value)) {
    for (let i = 0; i < config.min.length; i++) {
      if (value[i] < config.min[i]) return false;
    }
  }

  if (Array.isArray(config.max) && Array.isArray(value)) {
    for (let i = 0; i < config.max.length; i++) {
      if (value[i] > config.max[i]) return false;
    }
  }

  return true;
};

/**
 * Utility function to clamp control values to valid range
 */
export const clampControlValue = (value: any, config: ControlConfig): any => {
  if (typeof value === 'number') {
    let clampedValue = value;
    if (typeof config.min === 'number') {
      clampedValue = Math.max(clampedValue, config.min);
    }
    if (typeof config.max === 'number') {
      clampedValue = Math.min(clampedValue, config.max);
    }
    return clampedValue;
  }

  if (Array.isArray(value)) {
    return value.map((val, index) => {
      let clampedVal = val;
      if (Array.isArray(config.min) && config.min[index] !== undefined) {
        clampedVal = Math.max(clampedVal, config.min[index]);
      }
      if (Array.isArray(config.max) && config.max[index] !== undefined) {
        clampedVal = Math.min(clampedVal, config.max[index]);
      }
      return clampedVal;
    });
  }

  return value;
};
