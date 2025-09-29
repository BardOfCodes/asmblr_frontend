// Checkbox Control Component
// Handles boolean inputs with radio button style

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BaseControl } from './BaseControl';
import { BaseControlProps } from '../../../../types/control';

const RadioContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const RadioOption = styled.label<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: var(--control-radius);
  background-color: ${props => props.selected ? 'var(--control-border-focus)20' : 'var(--control-bg)'};
  border: 1px solid ${props => props.selected ? 'var(--control-border-focus)' : 'var(--control-border)'};
  transition: all 0.2s ease;
  font-size: 11px;
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--control-border-focus)30' : 'var(--control-border-focus)10'};
    border-color: var(--control-border-focus);
  }
`;

const RadioDot = styled.div<{ selected: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? 'var(--control-border-focus)' : 'var(--control-border)'};
  background-color: ${props => props.selected ? 'var(--control-border-focus)' : 'transparent'};
  position: relative;
  transition: all 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: white;
    opacity: ${props => props.selected ? 1 : 0};
    transition: opacity 0.2s ease;
  }
`;

const RadioLabel = styled.span`
  font-size: 11px;
  color: inherit;
  user-select: none;
  font-weight: 500;
`;

/**
 * Checkbox Control Component (Radio Button Style)
 */
export const CheckboxControl: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  const handleChange = useCallback((newValue: boolean) => {
    onChange(newValue);
  }, [onChange]);

  const boolValue = typeof value === 'boolean' ? value : (config.defaultValue || false);

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`checkbox-control ${className || ''}`}
      disabled={disabled}
    >
      <RadioContainer>
        <RadioOption 
          selected={!boolValue}
          onClick={() => !disabled && handleChange(false)}
        >
          <RadioDot selected={!boolValue} />
          <RadioLabel>False</RadioLabel>
        </RadioOption>
        <RadioOption 
          selected={boolValue}
          onClick={() => !disabled && handleChange(true)}
        >
          <RadioDot selected={boolValue} />
          <RadioLabel>True</RadioLabel>
        </RadioOption>
      </RadioContainer>
    </BaseControl>
  );
};
