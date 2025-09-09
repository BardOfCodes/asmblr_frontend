import styled from 'styled-components';
import { theme } from './theme';

// Base Card Component - Minimal and borderless
export const Card = styled.div`
  background: ${theme.colors.panelBackground};
  border: none;
  border-radius: 0;
  box-shadow: none;
  transition: none;
`;

// Panel Container
export const Panel = styled.div<{ $area?: string }>`
  ${props => props.$area && `grid-area: ${props.$area};`}
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// Button Components - Minimal and clean
export const Button = styled.button<{ 
  $variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  $size?: 'small' | 'medium' | 'large';
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${props => {
    switch (props.$size) {
      case 'small': return theme.typography.fontSize.sm;
      case 'large': return theme.typography.fontSize.lg;
      default: return theme.typography.fontSize.md;
    }
  }};
  font-weight: ${theme.typography.fontWeight.normal};
  line-height: ${theme.typography.lineHeight.normal};
  
  padding: ${props => {
    switch (props.$size) {
      case 'small': return `${theme.spacing.sm} ${theme.spacing.md}`;
      case 'large': return `${theme.spacing.md} ${theme.spacing.xl}`;
      default: return `${theme.spacing.sm} ${theme.spacing.lg}`;
    }
  }};
  
  border-radius: 0;
  border: none;
  cursor: pointer;
  transition: background-color ${theme.transitions.fast};
  
  ${props => props.$fullWidth && 'width: 100%;'}
  
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: ${theme.colors.buttonPrimary};
          color: ${theme.colors.textInverse};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.buttonPrimaryHover};
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.textInverse};
          
          &:hover:not(:disabled) {
            background: #b91c1c;
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.textSecondary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.hoverBackground};
            color: ${theme.colors.textPrimary};
          }
        `;
      default:
        return `
          background: ${theme.colors.buttonSecondary};
          color: ${theme.colors.textPrimary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.buttonSecondaryHover};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: none;
  }
`;

// Input Components
export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.md};
  line-height: ${theme.typography.lineHeight.normal};
  
  background: ${theme.colors.inputBackground};
  border: 1px solid ${theme.colors.inputBorder};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textPrimary};
  
  transition: all ${theme.transitions.fast};
  
  &::placeholder {
    color: ${theme.colors.inputPlaceholder};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.inputBorderFocus};
    box-shadow: ${theme.shadows.focus};
  }
  
  &:disabled {
    background: ${theme.colors.gray100};
    color: ${theme.colors.textMuted};
    cursor: not-allowed;
  }
`;

// Text Components
export const Text = styled.span<{ 
  $variant?: 'primary' | 'secondary' | 'muted';
  $size?: 'xs' | 'sm' | 'md' | 'lg';
  $weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}>`
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${props => theme.typography.fontSize[props.$size || 'md']};
  font-weight: ${props => theme.typography.fontWeight[props.$weight || 'normal']};
  line-height: ${theme.typography.lineHeight.normal};
  
  color: ${props => {
    switch (props.$variant) {
      case 'secondary': return theme.colors.textSecondary;
      case 'muted': return theme.colors.textMuted;
      default: return theme.colors.textPrimary;
    }
  }};
`;

export const Title = styled.h2<{ $level?: 1 | 2 | 3 | 4 }>`
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${props => {
    switch (props.$level) {
      case 1: return theme.typography.fontSize['4xl'];
      case 3: return theme.typography.fontSize.lg;
      case 4: return theme.typography.fontSize.md;
      default: return theme.typography.fontSize.xl;
    }
  }};
  font-weight: ${props => {
    switch (props.$level) {
      case 1: return theme.typography.fontWeight.bold;
      case 2: return theme.typography.fontWeight.semibold;
      default: return theme.typography.fontWeight.semibold;
    }
  }};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${theme.colors.textPrimary};
  margin: 0 0 ${theme.spacing.md} 0;
  letter-spacing: ${theme.typography.letterSpacing.tight};
`;

// Layout Components
export const Container = styled.div<{ $padding?: boolean; $maxWidth?: boolean }>`
  width: 100%;
  ${props => props.$maxWidth && 'max-width: 1200px;'}
  ${props => props.$padding && `padding: ${theme.spacing.md};`}
  margin: 0 auto;
`;

export const Stack = styled.div<{ 
  $direction?: 'row' | 'column';
  $gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  $align?: 'start' | 'center' | 'end' | 'stretch';
  $justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
}>`
  display: flex;
  flex-direction: ${props => props.$direction || 'column'};
  gap: ${props => theme.spacing[props.$gap || 'md']};
  
  ${props => props.$align && `align-items: ${props.$align === 'start' ? 'flex-start' : props.$align === 'end' ? 'flex-end' : props.$align};`}
  ${props => props.$justify && `justify-content: ${props.$justify === 'start' ? 'flex-start' : props.$justify === 'end' ? 'flex-end' : props.$justify};`}
`;

// Divider
export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${theme.colors.border};
  margin: ${theme.spacing.lg} 0;
`;

// Status Components
export const StatusBadge = styled.span<{ $status: 'success' | 'warning' | 'error' | 'info' }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.sans};
  
  ${props => {
    switch (props.$status) {
      case 'success':
        return `
          background: ${theme.colors.successLight};
          color: ${theme.colors.success};
          border: 1px solid ${theme.colors.success};
        `;
      case 'warning':
        return `
          background: ${theme.colors.warningLight};
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warning};
        `;
      case 'error':
        return `
          background: ${theme.colors.errorLight};
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error};
        `;
      default:
        return `
          background: ${theme.colors.infoLight};
          color: ${theme.colors.info};
          border: 1px solid ${theme.colors.info};
        `;
    }
  }}
`;

// Ultra Minimal Header Component
export const HeaderContainer = styled.header`
  background: ${theme.colors.headerBackground};
  border-bottom: none;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.lg};
  height: 56px;
  max-width: none;
`;

export const HeaderTitle = styled.h1`
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.normal};
  color: ${theme.colors.headerText};
  margin: 0;
  letter-spacing: ${theme.typography.letterSpacing.normal};
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

export const HeaderButton = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  color: ${props => props.$active ? theme.colors.textPrimary : theme.colors.headerTextSecondary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 0;
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.normal};
  cursor: pointer;
  transition: color ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  &:hover {
    background: transparent;
    color: ${theme.colors.headerText};
  }
  
  &:focus-visible {
    outline: none;
  }
`;