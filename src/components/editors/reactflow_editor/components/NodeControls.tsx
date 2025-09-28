// Node Controls Component
// Renders interactive controls for React Flow nodes

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ControlDefinition } from '../definitions';
import { ConnectionState } from '../hooks';

/**
 * Props for NodeControls component
 */
export interface NodeControlsProps {
  controls: ControlDefinition[];
  connectionState: ConnectionState;
  nodeData: Record<string, any>;
  onControlChange: (controlKey: string, value: any) => void;
  nodeId: string;
}

/**
 * Styled components
 */
const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`;

const ControlRow = styled.div<{ $hidden?: boolean; $disabled?: boolean }>`
  display: ${props => props.$hidden ? 'none' : 'flex'};
  flex-direction: column;
  gap: 4px;
  opacity: ${props => props.$disabled ? 0.6 : 1};
  transition: all 0.2s ease;
`;

const ControlLabel = styled.label<{ $required?: boolean }>`
  font-size: 11px;
  color: ${props => props.$required ? '#ff4d4f' : '#666'};
  font-weight: 500;
  margin-bottom: 2px;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HiddenReason = styled.span`
  font-size: 9px;
  color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
  padding: 1px 4px;
  border-radius: 2px;
`;

const ControlInput = styled.input<{ $error?: boolean }>`
  padding: 4px 6px;
  border: 1px solid ${props => props.$error ? '#ff4d4f' : '#d9d9d9'};
  border-radius: 4px;
  font-size: 11px;
  background: white;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$error ? '#ff4d4f' : '#1890ff'};
    box-shadow: 0 0 0 2px ${props => props.$error ? 'rgba(255, 77, 79, 0.2)' : 'rgba(24, 144, 255, 0.2)'};
  }
  
  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

const VectorContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const VectorLabel = styled.span`
  font-size: 9px;
  color: #999;
  min-width: 12px;
`;

const SelectInput = styled.select<{ $error?: boolean }>`
  padding: 4px 6px;
  border: 1px solid ${props => props.$error ? '#ff4d4f' : '#d9d9d9'};
  border-radius: 4px;
  font-size: 11px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$error ? '#ff4d4f' : '#1890ff'};
    box-shadow: 0 0 0 2px ${props => props.$error ? 'rgba(255, 77, 79, 0.2)' : 'rgba(24, 144, 255, 0.2)'};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ColorInput = styled.input`
  width: 40px;
  height: 24px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: 3px;
  }
`;

/**
 * NodeControls Component
 * Renders interactive controls with connection-aware visibility
 */
export const NodeControls: React.FC<NodeControlsProps> = ({
  controls,
  connectionState,
  nodeData,
  onControlChange
}) => {
  // Render control based on its type
  const renderControl = useCallback((control: ControlDefinition, value: any, isDisabled: boolean) => {
    const hasError = false; // TODO: Implement validation
    
    switch (control.type) {
      case 'float':
        return (
          <ControlInput
            type="number"
            value={value !== undefined ? value : control.config.defaultValue || 0}
            min={control.config.min as number}
            max={control.config.max as number}
            step={control.config.step || 0.1}
            disabled={isDisabled}
            $error={hasError}
            onChange={(e) => onControlChange(control.key, parseFloat(e.target.value) || 0)}
          />
        );
        
      case 'string':
        return (
          <ControlInput
            type="text"
            value={value !== undefined ? value : control.config.defaultValue || ''}
            placeholder={control.config.placeholder}
            disabled={isDisabled}
            $error={hasError}
            onChange={(e) => onControlChange(control.key, e.target.value)}
          />
        );
        
      case 'vector2':
      case 'vector3':
      case 'vector4':
        const dimensions = control.type === 'vector2' ? 2 : control.type === 'vector3' ? 3 : 4;
        const labels = ['X', 'Y', 'Z', 'W'];
        const vecValue = value || control.config.defaultValue || new Array(dimensions).fill(0);
        
        return (
          <VectorContainer>
            {Array.from({ length: dimensions }, (_, i) => (
              <React.Fragment key={i}>
                <VectorLabel>{labels[i]}</VectorLabel>
                <ControlInput
                  type="number"
                  value={vecValue[i] || 0}
                  step={control.config.step || 0.1}
                  disabled={isDisabled}
                  style={{ width: '50px' }}
                  onChange={(e) => {
                    const newVec = [...vecValue];
                    newVec[i] = parseFloat(e.target.value) || 0;
                    onControlChange(control.key, newVec);
                  }}
                />
              </React.Fragment>
            ))}
          </VectorContainer>
        );
        
      case 'select':
        return (
          <SelectInput
            value={value !== undefined ? value : control.config.defaultValue || ''}
            disabled={isDisabled}
            $error={hasError}
            onChange={(e) => onControlChange(control.key, e.target.value)}
          >
            {control.config.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        );
        
      case 'checkbox':
        return (
          <CheckboxContainer>
            <input
              type="checkbox"
              checked={value !== undefined ? value : control.config.defaultValue || false}
              disabled={isDisabled}
              onChange={(e) => onControlChange(control.key, e.target.checked)}
            />
            <span style={{ fontSize: '11px', color: '#666' }}>
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </CheckboxContainer>
        );
        
      case 'color':
        return (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <ColorInput
              type="color"
              value={value || control.config.defaultValue || '#000000'}
              disabled={isDisabled}
              onChange={(e) => onControlChange(control.key, e.target.value)}
            />
            <ControlInput
              type="text"
              value={value || control.config.defaultValue || '#000000'}
              disabled={isDisabled}
              style={{ width: '80px' }}
              onChange={(e) => onControlChange(control.key, e.target.value)}
            />
          </div>
        );
        
      case 'range':
        const rangeValue = value || control.config.defaultValue || [0, 1];
        return (
          <VectorContainer>
            <VectorLabel>Min</VectorLabel>
            <ControlInput
              type="number"
              value={rangeValue[0] || 0}
              step={control.config.step || 0.1}
              disabled={isDisabled}
              style={{ width: '60px' }}
              onChange={(e) => {
                const newRange = [...rangeValue];
                newRange[0] = parseFloat(e.target.value) || 0;
                onControlChange(control.key, newRange);
              }}
            />
            <VectorLabel>Max</VectorLabel>
            <ControlInput
              type="number"
              value={rangeValue[1] || 1}
              step={control.config.step || 0.1}
              disabled={isDisabled}
              style={{ width: '60px' }}
              onChange={(e) => {
                const newRange = [...rangeValue];
                newRange[1] = parseFloat(e.target.value) || 1;
                onControlChange(control.key, newRange);
              }}
            />
          </VectorContainer>
        );
        
      default:
        return (
          <ControlInput
            type="text"
            value={String(value !== undefined ? value : control.config.defaultValue || '')}
            disabled={isDisabled}
            onChange={(e) => onControlChange(control.key, e.target.value)}
          />
        );
    }
  }, [onControlChange]);

  if (controls.length === 0) {
    return null;
  }

  return (
    <ControlsContainer>
      {controls.map((control) => {
        // Determine if control should be hidden due to connected input
        const isHidden = control.linkedToInput && 
                        connectionState.isInputConnected(control.linkedToInput);
        
        // Determine if control should be disabled
        const isDisabled = false; // Could be extended for other conditions
        
        const currentValue = nodeData[control.key];
        
        return (
          <ControlRow 
            key={control.key} 
            $hidden={isHidden || false}
            $disabled={isDisabled || false}
          >
            <ControlLabel>
              {control.label}
              {control.linkedToInput && isHidden && (
                <HiddenReason>
                  Connected to {control.linkedToInput}
                </HiddenReason>
              )}
            </ControlLabel>
            
            {!isHidden && renderControl(control, currentValue, isDisabled)}
          </ControlRow>
        );
      })}
    </ControlsContainer>
  );
};

export default NodeControls;

