// Base Control Component
// Provides common functionality and styling for all node controls

import React from 'react';
import styled from 'styled-components';
import { ControlConfig } from '../../../../types/control';

interface BaseControlWrapperProps {
  id: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

// Styled container that integrates with NodeTheme
const ControlContainer = styled.div<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: ${props => props.$disabled ? 0.6 : 1};
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
  
  /* Prevent node dragging when interacting with controls */
  * {
    pointer-events: auto;
  }
`;

const ControlInput = styled.div`
  display: flex;
  align-items: center;
  background: var(--control-bg);
  border: 1px solid var(--control-border);
  border-radius: var(--control-input-border-radius);
  padding: var(--control-input-padding);
  font-size: var(--control-input-font-size);
  min-height: auto; /* Remove fixed height to let padding control size */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus-within {
    border-color: var(--control-border-focus);
    box-shadow: 0 0 0 2px var(--control-border-focus-shadow);
    outline: none;
  }
  
  &:hover:not(:focus-within) {
    border-color: var(--control-border-focus);
  }
  
  input, select, textarea {
    background: transparent;
    border: none;
    outline: none;
    font-size: inherit;
    color: var(--control-text-color);
    width: 100%;
    
    &::placeholder {
      color: var(--control-text-color-secondary);
    }
  }
  
  /* Number input styling */
  input[type="number"] {
    text-align: right;
    
    /* Hide number input spinners */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    &[type=number] {
      -moz-appearance: textfield;
    }
  }
`;

/**
 * Base control wrapper that provides common styling and behavior
 * Integrates with NodeTheme system through CSS variables
 */
export const BaseControl: React.FC<BaseControlWrapperProps> = ({
  children,
  className = '',
  disabled = false
}) => {
  // Prevent node dragging when interacting with controls
  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <ControlContainer 
      className={`reactflow-control ${className}`}
      $disabled={disabled}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {children}
    </ControlContainer>
  );
};

/**
 * Styled input wrapper for consistent control styling
 */
export const ControlInputWrapper: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <ControlInput className={className}>
    {children}
  </ControlInput>
);

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
 * Utility function to pass through control values with no constraints
 * (Previously clamped values within min/max bounds, now removed all constraints)
 */
export const clampControlValue = (value: any, _config?: any): any => {
  // Return value as-is with no constraints or validation
  return value;
};
