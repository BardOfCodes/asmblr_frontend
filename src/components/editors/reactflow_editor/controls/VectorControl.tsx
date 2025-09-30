// Vector Control Components
// Handles vector inputs (Vec2, Vec3, Vec4) and single floats with theme integration

import React, { useCallback } from 'react';
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
    const inputValue = e.target.value;
    onChange(inputValue); // Pass the raw string value with no constraints
  }, [onChange]);

  const numValue = value !== undefined ? value : (config.defaultValue || '');

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
          value={numValue}
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
 * Base Vector Control Component - Simple and direct
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
  // Initialize vector with correct size - simple and direct
  const initializeVector = (): any[] => {
    const result = new Array(dimensions).fill(0);
    return result;
  };

  // Get current vector value - ensure it's always the right size
  const getCurrentVector = (): any[] => {
    if (Array.isArray(value) && value.length === dimensions) {
      return [...value]; // Use existing value if it's the right size
    }
    if (Array.isArray(config.defaultValue) && config.defaultValue.length === dimensions) {
      return [...config.defaultValue]; // Use default if it's the right size
    }
    return initializeVector(); // Otherwise create new vector
  };

  const vectorValue = getCurrentVector();

  const handleDimensionChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newVector = [...vectorValue]; // Copy current vector
    newVector[index] = inputValue; // Update the specific index - store as string for now
    onChange(newVector); // Send the complete vector
  }, [vectorValue, onChange]);

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
              value={vectorValue[index] ?? '0'}
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