// Select Control Component
// Handles dropdown selection controls

import React, { useCallback } from 'react';
import { BaseControl } from './BaseControl';
import { BaseControlProps } from '../types';

/**
 * Select Control Component
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
    onChange(e.target.value);
  }, [onChange]);

  const selectValue = value !== undefined ? value : config.defaultValue;
  const options = config.options || [];

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`select-control ${className || ''}`}
      disabled={disabled}
    >
      <select
        id={id}
        value={selectValue}
        onChange={handleChange}
        disabled={disabled}
        className="reactflow-select-input"
      >
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </BaseControl>
  );
};
