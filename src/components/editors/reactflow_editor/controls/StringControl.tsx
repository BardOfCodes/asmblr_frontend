// String Control Component
// Handles text input controls with theme integration

import React, { useCallback } from 'react';
import { BaseControl, ControlInputWrapper } from './BaseControl';
import { BaseControlProps } from '../../../../types/control';

/**
 * String Control Component - Clean, theme-integrated text input
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

  const stringValue = value !== undefined ? value : (config.defaultValue || '');

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`string-control ${className || ''}`}
      disabled={disabled}
    >
      <ControlInputWrapper>
        <input
          id={id}
          type="text"
          value={stringValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={config.placeholder || ''}
        />
      </ControlInputWrapper>
    </BaseControl>
  );
};
