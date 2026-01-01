// Vector Control Components
// Handles vector inputs (Vec2, Vec3, Vec4) and single floats with theme integration

import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { BaseControl, ControlInputWrapper } from './BaseControl';
import { BaseControlProps } from '../../../../types/control';

const NumberInputWrapper = styled(ControlInputWrapper)`
  display: flex;
  align-items: center;
  gap: 6px;
  width: var(--control-float-width); /* Use theme-controlled float input width */
`;

const UnitsLabel = styled.span`
  font-size: 10px;
  color: var(--label-color-secondary);
  white-space: nowrap;
`;

/**
 * Float Control Component - Clean, theme-integrated number input
 * Accepts any string input to allow typing negative numbers, decimals, etc.
 */
export const FloatControl: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Pass the raw string value
  }, [onChange]);

  // Convert value to string for display, handling all edge cases
  const displayValue = value !== undefined && value !== null && !Number.isNaN(value) 
    ? String(value) 
    : (config.defaultValue !== undefined ? String(config.defaultValue) : '');

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`float-control ${className || ''}`}
      disabled={disabled}
    >
      <NumberInputWrapper>
        <input
          id={id}
          type="text"
          value={displayValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder=""
        />
        {config.units && <UnitsLabel>{config.units}</UnitsLabel>}
      </NumberInputWrapper>
    </BaseControl>
  );
};

const VectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
`;

const VectorInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DimensionLabel = styled.label`
  font-size: 11px;
  color: var(--label-color-secondary);
  font-weight: 600;
  min-width: 12px;
  text-align: left;
`;

const VectorInput = styled.input`
  background: transparent;
  border: 1px solid var(--control-border);
  border-radius: var(--control-input-border-radius);
  padding: var(--control-input-padding);
  font-size: var(--control-input-font-size);
  text-align: right;
  width: var(--control-vector-width);
  flex: 1;
  
  &:focus {
    border-color: var(--control-border-focus);
    outline: none;
  }
  
  &:hover:not(:focus) {
    border-color: var(--control-border-focus);
  }
`;

/**
 * Convert a value to a display string, handling edge cases
 */
function toDisplayString(val: any, defaultVal: string = '0'): string {
  if (val === undefined || val === null) return defaultVal;
  if (typeof val === 'number' && Number.isNaN(val)) return defaultVal;
  return String(val);
}

/**
 * Base Vector Control Component - Simple and direct
 * Uses refs to avoid stale closure issues with vector values
 */
const BaseVectorControl: React.FC<BaseControlProps & { 
  dimensions: number;
  labels: string[];
}> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled,
  dimensions,
  labels
}) => {
  // Use a ref to always have access to the latest value
  const valueRef = useRef<any[]>([]);
  
  // Get current vector value - ensure it's always the right size
  const getCurrentVector = (): any[] => {
    if (Array.isArray(value) && value.length === dimensions) {
      return value; // Return the actual value reference
    }
    if (Array.isArray(config.defaultValue) && config.defaultValue.length === dimensions) {
      return config.defaultValue;
    }
    return new Array(dimensions).fill(0);
  };

  // Update the ref with the current value
  const currentVector = getCurrentVector();
  valueRef.current = currentVector;

  // Handle dimension change using ref to avoid stale closure
  const handleDimensionChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Use the ref to get the latest value, not the closure
    const newVector = [...valueRef.current];
    newVector[index] = inputValue; // Store as string to preserve user input exactly
    onChange(newVector);
  }, [onChange, dimensions]); // Don't include valueRef.current - it's a ref

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={className}
      disabled={disabled}
    >
      <VectorContainer>
        {Array.from({ length: dimensions }, (_, index) => (
          <VectorInputGroup key={index}>
            <DimensionLabel>{labels[index]}:</DimensionLabel>
            <VectorInput
              type="text"
              value={toDisplayString(currentVector[index], '0')}
              onChange={(e) => handleDimensionChange(index, e)}
              disabled={disabled}
              placeholder="0"
            />
          </VectorInputGroup>
        ))}
        {config.units && <UnitsLabel>{config.units}</UnitsLabel>}
      </VectorContainer>
    </BaseControl>
  );
};

/**
 * Vector2 Control Component - 2D vector [x, y]
 */
export const Vector2Control: React.FC<BaseControlProps> = (props) => (
  <BaseVectorControl 
    {...props} 
    dimensions={2} 
    labels={['X', 'Y']}
    className={`vector2-control ${props.className || ''}`}
  />
);

/**
 * Vector3 Control Component - 3D vector [x, y, z]
 */
export const Vector3Control: React.FC<BaseControlProps> = (props) => (
  <BaseVectorControl 
    {...props} 
    dimensions={3} 
    labels={['X', 'Y', 'Z']}
    className={`vector3-control ${props.className || ''}`}
  />
);

/**
 * Vector4 Control Component - 4D vector [x, y, z, w]
 */
export const Vector4Control: React.FC<BaseControlProps> = (props) => (
  <BaseVectorControl 
    {...props} 
    dimensions={4} 
    labels={['X', 'Y', 'Z', 'W']}
    className={`vector4-control ${props.className || ''}`}
  />
);
