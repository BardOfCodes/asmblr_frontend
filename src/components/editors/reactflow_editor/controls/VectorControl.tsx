// Vector Control Components
// Handles vector inputs (Vec2, Vec3, Vec4) and single floats

import React, { useCallback } from 'react';
import { InputNumber } from 'antd';
import { BaseControl, clampControlValue } from './BaseControl';
import { BaseControlProps } from '../types';

/**
 * Float Control Component
 */
export const FloatControl: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    const clampedValue = clampControlValue(newValue, config);
    onChange(clampedValue);
  }, [config, onChange]);

  const numValue = typeof value === 'number' ? value : (config.defaultValue || 0);

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`float-control ${className || ''}`}
      disabled={disabled}
    >
      <InputNumber
        id={id}
        value={numValue}
        min={typeof config.min === 'number' ? config.min : undefined}
        max={typeof config.max === 'number' ? config.max : undefined}
        step={config.step || 0.1}
        onChange={(value) => onChange(value || 0)}
        disabled={disabled}
        size="small"
        className="reactflow-float-input"
      />
      {config.units && (
        <span className="reactflow-control-units">{config.units}</span>
      )}
    </BaseControl>
  );
};

/**
 * Vector2 Control Component
 */
export const Vector2Control: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  const vectorValue = Array.isArray(value) ? value : (config.defaultValue || [0, 0]);
  
  const handleDimensionChange = useCallback((index: number, newValue: number) => {
    const newVector = [...vectorValue];
    newVector[index] = newValue;
    const clampedVector = clampControlValue(newVector, config);
    onChange(clampedVector);
  }, [vectorValue, config, onChange]);

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`vector2-control ${className || ''}`}
      disabled={disabled}
    >
      <div className="vector-inputs">
        {[0, 1].map(index => (
          <div key={index} className="vector-input-group">
            <label className="vector-dimension-label">
              {['X', 'Y'][index]}
            </label>
            <InputNumber
              value={vectorValue[index] || 0}
              min={Array.isArray(config.min) ? config.min[index] : config.min}
              max={Array.isArray(config.max) ? config.max[index] : config.max}
              step={config.step || 0.1}
              onChange={(value) => handleDimensionChange(index, value || 0)}
              disabled={disabled}
              size="small"
              className="reactflow-vector-input"
            />
          </div>
        ))}
      </div>
      {config.units && (
        <span className="reactflow-control-units">{config.units}</span>
      )}
    </BaseControl>
  );
};

/**
 * Vector3 Control Component
 */
export const Vector3Control: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  const vectorValue = Array.isArray(value) ? value : (config.defaultValue || [0, 0, 0]);
  
  const handleDimensionChange = useCallback((index: number, newValue: number) => {
    const newVector = [...vectorValue];
    newVector[index] = newValue;
    const clampedVector = clampControlValue(newVector, config);
    onChange(clampedVector);
  }, [vectorValue, config, onChange]);

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`vector3-control ${className || ''}`}
      disabled={disabled}
    >
      <div className="vector-inputs">
        {[0, 1, 2].map(index => (
          <div key={index} className="vector-input-group">
            <label className="vector-dimension-label">
              {['X', 'Y', 'Z'][index]}
            </label>
            <InputNumber
              value={vectorValue[index] || 0}
              min={Array.isArray(config.min) ? config.min[index] : config.min}
              max={Array.isArray(config.max) ? config.max[index] : config.max}
              step={config.step || 0.1}
              onChange={(value) => handleDimensionChange(index, value || 0)}
              disabled={disabled}
              size="small"
              className="reactflow-vector-input"
            />
          </div>
        ))}
      </div>
      {config.units && (
        <span className="reactflow-control-units">{config.units}</span>
      )}
    </BaseControl>
  );
};

/**
 * Vector4 Control Component
 */
export const Vector4Control: React.FC<BaseControlProps> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled
}) => {
  const vectorValue = Array.isArray(value) ? value : (config.defaultValue || [0, 0, 0, 0]);
  
  const handleDimensionChange = useCallback((index: number, newValue: number) => {
    const newVector = [...vectorValue];
    newVector[index] = newValue;
    const clampedVector = clampControlValue(newVector, config);
    onChange(clampedVector);
  }, [vectorValue, config, onChange]);

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`vector4-control ${className || ''}`}
      disabled={disabled}
    >
      <div className="vector-inputs">
        {[0, 1, 2, 3].map(index => (
          <div key={index} className="vector-input-group">
            <label className="vector-dimension-label">
              {['X', 'Y', 'Z', 'W'][index]}
            </label>
            <InputNumber
              value={vectorValue[index] || 0}
              min={Array.isArray(config.min) ? config.min[index] : config.min}
              max={Array.isArray(config.max) ? config.max[index] : config.max}
              step={config.step || 0.1}
              onChange={(value) => handleDimensionChange(index, value || 0)}
              disabled={disabled}
              size="small"
              className="reactflow-vector-input"
            />
          </div>
        ))}
      </div>
      {config.units && (
        <span className="reactflow-control-units">{config.units}</span>
      )}
    </BaseControl>
  );
};
