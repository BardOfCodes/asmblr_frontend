// String Control Component
// Handles text input controls

import React, { useCallback } from 'react';
import { Input } from 'antd';
import { BaseControl } from './BaseControl';
import { BaseControlProps } from '../types';

/**
 * String Control Component
 */
export const StringControl: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const stringValue = typeof value === 'string' ? value : (config.defaultValue || '');

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`string-control ${className || ''}`}
      disabled={disabled}
    >
      <input
        id={id}
        type="text"
        value={stringValue}
        onChange={handleChange}
        disabled={disabled}
        className="reactflow-string-input"
        placeholder={config.defaultValue || ''}
      />
    </BaseControl>
  );
};
