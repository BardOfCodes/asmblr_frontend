// Matrix Control Components
// Simple matrix inputs - 2x2 has 4 values, 3x3 has 9 values

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BaseControl } from './BaseControl';
import { BaseControlProps } from '../../../../types/control';

const MatrixContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: var(--control-matrix-padding);
  background: var(--control-bg-secondary);
  border-radius: 4px;
  border: 1px solid var(--control-border);
`;

const MatrixRow = styled.div`
  display: flex;
  gap: 3px;
  justify-content: center;
`;

const MatrixInput = styled.input`
  width: var(--control-matrix-width);
  padding: var(--control-input-padding);
  font-size: var(--control-input-font-size);
  text-align: center;
  background: var(--control-bg);
  border: 1px solid var(--control-border);
  border-radius: var(--control-input-border-radius);
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: var(--control-border-focus);
    outline: none;
    box-shadow: 0 0 0 1px var(--control-border-focus-shadow);
  }
  
  &:hover:not(:focus) {
    border-color: var(--control-border-focus);
  }
`;

const MatrixLabel = styled.div`
  font-size: 10px;
  color: var(--label-color-secondary);
  text-align: center;
  margin-bottom: 4px;
  font-weight: 500;
`;

/**
 * Matrix2x2 Control - 4 values in 2x2 grid
 */
export const Matrix2x2Control: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  // Initialize with identity matrix [1, 0, 0, 1]
  const getDefault2x2 = (): any[] => [1, 0, 0, 1];
  
  // Get current matrix - always 4 values
  const matrixValue = (() => {
    if (Array.isArray(value) && value.length === 4) {
      return [...value];
    }
    if (Array.isArray(config.defaultValue) && config.defaultValue.length === 4) {
      return [...config.defaultValue];
    }
    return getDefault2x2();
  })();

  const handleChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newMatrix = [...matrixValue];
    newMatrix[index] = inputValue;
    onChange(newMatrix);
  }, [matrixValue, onChange]);

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`matrix2x2-control ${className || ''}`}
      disabled={disabled}
    >
      <MatrixLabel>2×2 Matrix</MatrixLabel>
      <MatrixContainer>
        <MatrixRow>
          <MatrixInput
            type="text"
            value={matrixValue[0] ?? '1'}
            onChange={(e) => handleChange(0, e)}
            disabled={disabled}
            placeholder="1"
          />
          <MatrixInput
            type="text"
            value={matrixValue[1] ?? '0'}
            onChange={(e) => handleChange(1, e)}
            disabled={disabled}
            placeholder="0"
          />
        </MatrixRow>
        <MatrixRow>
          <MatrixInput
            type="text"
            value={matrixValue[2] ?? '0'}
            onChange={(e) => handleChange(2, e)}
            disabled={disabled}
            placeholder="0"
          />
          <MatrixInput
            type="text"
            value={matrixValue[3] ?? '1'}
            onChange={(e) => handleChange(3, e)}
            disabled={disabled}
            placeholder="1"
          />
        </MatrixRow>
      </MatrixContainer>
    </BaseControl>
  );
};

/**
 * Matrix3x3 Control - 9 values in 3x3 grid
 */
export const Matrix3x3Control: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  // Initialize with identity matrix [1, 0, 0, 0, 1, 0, 0, 0, 1]
  const getDefault3x3 = (): any[] => [1, 0, 0, 0, 1, 0, 0, 0, 1];
  
  // Get current matrix - always 9 values
  const matrixValue = (() => {
    if (Array.isArray(value) && value.length === 9) {
      return [...value];
    }
    if (Array.isArray(config.defaultValue) && config.defaultValue.length === 9) {
      return [...config.defaultValue];
    }
    return getDefault3x3();
  })();

  const handleChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newMatrix = [...matrixValue];
    newMatrix[index] = inputValue;
    onChange(newMatrix);
  }, [matrixValue, onChange]);

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`matrix3x3-control ${className || ''}`}
      disabled={disabled}
    >
      <MatrixLabel>3×3 Matrix</MatrixLabel>
      <MatrixContainer>
        <MatrixRow>
          <MatrixInput
            type="text"
            value={matrixValue[0] ?? '1'}
            onChange={(e) => handleChange(0, e)}
            disabled={disabled}
            placeholder="1"
          />
          <MatrixInput
            type="text"
            value={matrixValue[1] ?? '0'}
            onChange={(e) => handleChange(1, e)}
            disabled={disabled}
            placeholder="0"
          />
          <MatrixInput
            type="text"
            value={matrixValue[2] ?? '0'}
            onChange={(e) => handleChange(2, e)}
            disabled={disabled}
            placeholder="0"
          />
        </MatrixRow>
        <MatrixRow>
          <MatrixInput
            type="text"
            value={matrixValue[3] ?? '0'}
            onChange={(e) => handleChange(3, e)}
            disabled={disabled}
            placeholder="0"
          />
          <MatrixInput
            type="text"
            value={matrixValue[4] ?? '1'}
            onChange={(e) => handleChange(4, e)}
            disabled={disabled}
            placeholder="1"
          />
          <MatrixInput
            type="text"
            value={matrixValue[5] ?? '0'}
            onChange={(e) => handleChange(5, e)}
            disabled={disabled}
            placeholder="0"
          />
        </MatrixRow>
        <MatrixRow>
          <MatrixInput
            type="text"
            value={matrixValue[6] ?? '0'}
            onChange={(e) => handleChange(6, e)}
            disabled={disabled}
            placeholder="0"
          />
          <MatrixInput
            type="text"
            value={matrixValue[7] ?? '0'}
            onChange={(e) => handleChange(7, e)}
            disabled={disabled}
            placeholder="0"
          />
          <MatrixInput
            type="text"
            value={matrixValue[8] ?? '1'}
            onChange={(e) => handleChange(8, e)}
            disabled={disabled}
            placeholder="1"
          />
        </MatrixRow>
      </MatrixContainer>
    </BaseControl>
  );
};