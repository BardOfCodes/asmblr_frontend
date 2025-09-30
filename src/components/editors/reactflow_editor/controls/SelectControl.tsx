// Select Control Component
// Handles dropdown selection controls with theme integration

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BaseControl, ControlInputWrapper } from './BaseControl';
import { BaseControlProps } from '../../../../types/control';

const SelectWrapper = styled(ControlInputWrapper)`
  position: relative;
  
  &::after {
    content: '▼';
    position: absolute;
    right: 8px;
    pointer-events: none;
    font-size: 10px;
    color: var(--control-text-color);
  }
  
  select {
    appearance: none;
    cursor: pointer;
    padding-right: 24px !important;
    /* Ensure the select element receives all pointer events */
    pointer-events: auto !important;
    /* Prevent the select from being draggable */
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;

/**
 * Select Control Component - Clean, theme-integrated dropdown
 */
export const SelectControl: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation(); // Prevent event from bubbling up to node
    onChange(e.target.value);
  }, [onChange]);

  // Comprehensive event handling to prevent node dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent node dragging when clicking select
    // Don't preventDefault() - let the select work normally
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent node selection when clicking select
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent any mouse move events from reaching the node
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent mouse up events from reaching the node
  }, []);

  const selectValue = value !== undefined ? value : config.defaultValue;
  const options = config.options || [];

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`select-control ${className || ''}`}
      disabled={disabled}
    >
      <SelectWrapper
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <select
          id={id}
          value={selectValue}
          onChange={handleChange}
          disabled={disabled}
        >
          {options.map((option) => {
            // Handle both string array and object array formats
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      </SelectWrapper>
    </BaseControl>
  );
};
