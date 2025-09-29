// Matrix Control Components
// Handles matrix inputs (2x2, 3x3) with theme integration

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
 * Base Matrix Control Component - Reusable for different matrix sizes
 */
const BaseMatrixControl: React.FC<BaseControlProps & {
  dimensions: number;
  matrixLabel: string;
}> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled,
  dimensions,
  matrixLabel
}) => {
  const getDefaultMatrix = () => {
    const size = dimensions * dimensions;
    const matrix = [];
    for (let i = 0; i < size; i++) {
      // Create identity matrix by default
      matrix.push(i % (dimensions + 1) === 0 ? 1 : 0);
    }
    return matrix;
  };

  const matrixValue = Array.isArray(value) && value.length === dimensions * dimensions
    ? value 
    : config.defaultValue || getDefaultMatrix();

  const handleChange = useCallback((row: number, col: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const currentMatrix = matrixValue.slice();
    const index = row * dimensions + col;
    currentMatrix[index] = inputValue; // Store raw string value with no constraints
    onChange(currentMatrix);
  }, [matrixValue, onChange, dimensions]);

  const renderMatrix = () => {
    const rows = [];
    for (let row = 0; row < dimensions; row++) {
      const cells = [];
      for (let col = 0; col < dimensions; col++) {
        const index = row * dimensions + col;
        cells.push(
          <MatrixInput
            key={`${row}-${col}`}
            type="text"
            value={matrixValue[index] !== undefined ? matrixValue[index] : ''}
            onChange={(e) => handleChange(row, col, e)}
            disabled={disabled}
            placeholder=""
          />
        );
      }
      rows.push(
        <MatrixRow key={row}>
          {cells}
        </MatrixRow>
      );
    }
    return rows;
  };

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={className}
      disabled={disabled}
    >
      <MatrixLabel>{matrixLabel}</MatrixLabel>
      <MatrixContainer>
        {renderMatrix()}
      </MatrixContainer>
    </BaseControl>
  );
};

/**
 * Matrix2x2 Control Component - Clean, theme-integrated 2x2 matrix
 */
export const Matrix2x2Control: React.FC<BaseControlProps> = (props) => (
  <BaseMatrixControl 
    {...props} 
    dimensions={2} 
    matrixLabel="2×2 Matrix"
    className={`matrix2x2-control ${props.className || ''}`}
  />
);

/**
 * Matrix3x3 Control Component - Clean, theme-integrated 3x3 matrix
 */
export const Matrix3x3Control: React.FC<BaseControlProps> = (props) => (
  <BaseMatrixControl 
    {...props} 
    dimensions={3} 
    matrixLabel="3×3 Matrix"
    className={`matrix3x3-control ${props.className || ''}`}
  />
);
