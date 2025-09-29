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
 * Base Vector Control Component - Reusable for Vec2, Vec3, Vec4
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
  const getDefaultVector = () => {
    const defaultArray = [];
    for (let i = 0; i < dimensions; i++) {
      defaultArray.push(0);
    }
    return defaultArray;
  };
  
  const vectorValue = Array.isArray(value) ? value : (config.defaultValue || getDefaultVector());
  
  const handleDimensionChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newVector = vectorValue.slice();
    newVector[index] = inputValue; // Store raw string value with no constraints
    onChange(newVector);
  }, [vectorValue, onChange]);

  const renderInputs = () => {
    const inputs = [];
    for (let index = 0; index < dimensions; index++) {
      inputs.push(
        <VectorInputGroup key={index}>
          <DimensionLabel>{labels[index]}:</DimensionLabel>
          <VectorInput
            type="text"
            value={vectorValue[index] !== undefined ? vectorValue[index] : ''}
            onChange={(e) => handleDimensionChange(index, e)}
            disabled={disabled}
            placeholder=""
          />
        </VectorInputGroup>
      );
    }
    return inputs;
  };

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={className}
      disabled={disabled}
    >
      <VectorContainer>
        {renderInputs()}
        {config.units && <UnitsLabel>{config.units}</UnitsLabel>}
      </VectorContainer>
    </BaseControl>
  );
};

/**
 * Vector2 Control Component - Clean, compact 2D vector input
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
 * Vector3 Control Component - Clean, compact 3D vector input
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
 * Vector4 Control Component - Clean, compact 4D vector input
 */
export const Vector4Control: React.FC<BaseControlProps> = (props) => (
  <BaseVectorControl 
    {...props} 
    dimensions={4} 
    labels={['X', 'Y', 'Z', 'W']}
    className={`vector4-control ${props.className || ''}`}
  />
);
