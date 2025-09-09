import React from 'react';
import styled from 'styled-components';
import { Stack, Text } from '../../design/components';
import { theme } from '../../design/theme';

const SliderContainer = styled.div`
  width: 100%;
`;

const Slider = styled.input`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: ${theme.colors.gray300};
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${theme.colors.primary};
    cursor: pointer;
    transition: all ${theme.transitions.fast};
    
    &:hover {
      transform: scale(1.2);
      background: ${theme.colors.primaryHover};
    }
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${theme.colors.primary};
    cursor: pointer;
    border: none;
    transition: all ${theme.transitions.fast};
    
    &:hover {
      transform: scale(1.2);
      background: ${theme.colors.primaryHover};
    }
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &::-webkit-slider-thumb {
      cursor: not-allowed;
      &:hover {
        transform: none;
      }
    }
    
    &::-moz-range-thumb {
      cursor: not-allowed;
      &:hover {
        transform: none;
      }
    }
  }
`;

const ValueDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.xs};
`;

const ValueInput = styled.input`
  width: 60px;
  padding: ${theme.spacing.xs};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export interface SliderWidgetProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  showInput?: boolean;
  unit?: string;
  precision?: number;
  onChange: (value: number) => void;
  onChangeComplete?: (value: number) => void;
}

export const SliderWidget: React.FC<SliderWidgetProps> = ({
  label,
  value,
  min,
  max,
  step = 0.01,
  disabled = false,
  showValue = true,
  showInput = false,
  unit = '',
  precision = 2,
  onChange,
  onChangeComplete,
}) => {
  const [inputValue, setInputValue] = React.useState(value.toString());

  React.useEffect(() => {
    setInputValue(value.toFixed(precision));
  }, [value, precision]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  const handleSliderMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    const newValue = parseFloat((e.target as HTMLInputElement).value);
    onChangeComplete?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
      onChangeComplete?.(newValue);
    } else {
      setInputValue(value.toFixed(precision));
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setInputValue(value.toFixed(precision));
    }
  };

  const displayValue = `${value.toFixed(precision)}${unit}`;

  return (
    <SliderContainer>
      <Stack $gap="xs">
        <Text $size="sm" $weight="medium">
          {label}
        </Text>
        
        <Slider
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleSliderChange}
          onMouseUp={handleSliderMouseUp}
        />
        
        {(showValue || showInput) && (
          <ValueDisplay>
            <Text $size="xs" $variant="secondary">
              {min}{unit}
            </Text>
            
            <div>
              {showInput ? (
                <ValueInput
                  value={inputValue}
                  disabled={disabled}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                />
              ) : showValue ? (
                <Text $size="sm" $weight="medium">
                  {displayValue}
                </Text>
              ) : null}
            </div>
            
            <Text $size="xs" $variant="secondary">
              {max}{unit}
            </Text>
          </ValueDisplay>
        )}
      </Stack>
    </SliderContainer>
  );
};
