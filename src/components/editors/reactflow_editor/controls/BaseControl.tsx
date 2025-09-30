// Base Control Component
// Provides common functionality and styling for all node controls

import React from 'react';
import styled from 'styled-components';

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
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  
  * {
    pointer-events: auto;
    user-select: none;
    -webkit-user-drag: none;
  }
  
  /* Ensure all interactive elements stop event propagation and work properly */
  input, select, textarea, button {
    pointer-events: auto !important;
    user-select: auto; /* Allow text selection in inputs */
    -webkit-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
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
    // Only prevent default for non-interactive elements to avoid breaking select/input functionality
    const target = e.target as HTMLElement;
    if (!target.matches('select, input, textarea, button')) {
      e.preventDefault();
    }
  }, []);

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleMouseUp = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleDragStart = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <ControlContainer 
      className={`reactflow-control ${className}`}
      $disabled={disabled}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDragStart={handleDragStart}
      draggable={false}
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

