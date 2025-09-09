import React, { useState } from 'react';
import styled from 'styled-components';
import { Stack, Text, Button } from '../../design/components';
import { theme } from '../../design/theme';

const ColorPreview = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${props => props.$color};
  border: 2px solid ${theme.colors.border};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.primary};
    transform: scale(1.05);
  }
`;

const ColorInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.backgroundTertiary};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
`;

const ColorSwatch = styled.div<{ $color: string; $selected?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.sm};
  background-color: ${props => props.$color};
  border: 2px solid ${props => props.$selected ? theme.colors.primary : theme.colors.border};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.primary};
    transform: scale(1.1);
  }
`;

const ColorValueInput = styled.input`
  font-family: monospace;
  font-size: ${theme.typography.fontSize.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  width: 100px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export interface ColorPickerWidgetProps {
  label: string;
  value: string; // hex color value
  disabled?: boolean;
  showPresets?: boolean;
  showInput?: boolean;
  onChange: (color: string) => void;
  onChangeComplete?: (color: string) => void;
}

const DEFAULT_COLORS = [
  '#FF0000', '#FF8000', '#FFFF00', '#80FF00',
  '#00FF00', '#00FF80', '#00FFFF', '#0080FF',
  '#0000FF', '#8000FF', '#FF00FF', '#FF0080',
  '#FFFFFF', '#C0C0C0', '#808080', '#404040',
  '#000000', '#800000', '#808000', '#008000',
  '#008080', '#000080', '#800080', '#804000',
];

export const ColorPickerWidget: React.FC<ColorPickerWidgetProps> = ({
  label,
  value,
  disabled = false,
  showPresets = true,
  showInput = true,
  onChange,
  onChangeComplete,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const colorInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    setInputValue(newColor);
    onChangeComplete?.(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    // Validate hex color
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexPattern.test(inputValue)) {
      handleColorChange(inputValue);
    } else {
      setInputValue(value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setInputValue(value);
    }
  };

  const handlePreviewClick = () => {
    if (!disabled) {
      colorInputRef.current?.click();
    }
  };

  const handleNativeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleColorChange(e.target.value);
  };

  const togglePicker = () => {
    if (!disabled) {
      setShowPicker(!showPicker);
    }
  };

  return (
    <Stack $gap="sm">
      <Text $size="sm" $weight="medium">
        {label}
      </Text>
      
      <Stack $direction="row" $gap="sm" $align="center">
        <ColorPreview 
          $color={value} 
          onClick={handlePreviewClick}
          style={{ opacity: disabled ? 0.5 : 1 }}
        />
        
        <ColorInput
          ref={colorInputRef}
          type="color"
          value={value}
          disabled={disabled}
          onChange={handleNativeColorChange}
        />
        
        {showInput && (
          <ColorValueInput
            value={inputValue}
            disabled={disabled}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            placeholder="#000000"
          />
        )}
        
        {showPresets && (
          <Button
            $variant="ghost"
            $size="small"
            onClick={togglePicker}
            disabled={disabled}
          >
            {showPicker ? 'Hide' : 'Presets'}
          </Button>
        )}
      </Stack>
      
      {showPicker && showPresets && (
        <ColorGrid>
          {DEFAULT_COLORS.map((color) => (
            <ColorSwatch
              key={color}
              $color={color}
              $selected={value.toLowerCase() === color.toLowerCase()}
              onClick={() => handleColorChange(color)}
              title={color}
            />
          ))}
        </ColorGrid>
      )}
    </Stack>
  );
};
