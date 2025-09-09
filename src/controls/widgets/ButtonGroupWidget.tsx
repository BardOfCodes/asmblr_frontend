import React from 'react';
import styled from 'styled-components';
import { Stack, Text } from '../../design/components';
import { theme } from '../../design/theme';

const ButtonGroup = styled.div`
  display: inline-flex;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  background: ${theme.colors.white};
`;

const GroupButton = styled.button<{ $selected?: boolean; $disabled?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  background: ${props => props.$selected ? theme.colors.primary : theme.colors.white};
  color: ${props => props.$selected ? theme.colors.white : theme.colors.textPrimary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all ${theme.transitions.fast};
  border-right: 1px solid ${theme.colors.border};
  
  &:last-child {
    border-right: none;
  }
  
  &:hover:not(:disabled) {
    background: ${props => props.$selected ? theme.colors.primaryHover : theme.colors.gray100};
  }
  
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export interface ButtonGroupOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ButtonGroupWidgetProps {
  label?: string;
  value: string | number;
  options: ButtonGroupOption[];
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  onChange: (value: string | number) => void;
}

export const ButtonGroupWidget: React.FC<ButtonGroupWidgetProps> = ({
  label,
  value,
  options,
  disabled = false,
  size = 'medium',
  onChange,
}) => {
  const handleOptionClick = (optionValue: string | number) => {
    if (!disabled) {
      onChange(optionValue);
    }
  };

  const sizeStyles = {
    small: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: theme.typography.fontSize.xs,
    },
    medium: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.sm,
    },
    large: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.md,
    },
  };

  return (
    <Stack $gap="sm">
      {label && (
        <Text $size="sm" $weight="medium">
          {label}
        </Text>
      )}
      
      <ButtonGroup>
        {options.map((option) => (
          <GroupButton
            key={option.value}
            $selected={value === option.value}
            $disabled={disabled || option.disabled}
            disabled={disabled || option.disabled}
            onClick={() => handleOptionClick(option.value)}
            style={sizeStyles[size]}
          >
            {option.icon && (
              <span style={{ marginRight: theme.spacing.xs }}>
                {option.icon}
              </span>
            )}
            {option.label}
          </GroupButton>
        ))}
      </ButtonGroup>
    </Stack>
  );
};
