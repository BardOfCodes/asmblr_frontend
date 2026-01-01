/**
 * BaseControlPanel - Shared styles and utilities for control panels
 * 
 * This module provides:
 * - Common styled components for consistent control panel appearance
 * - Shared error handling logic for shader generation
 * - Type definitions for control panel configuration
 */

import styled from 'styled-components';
import { theme } from '../../design/theme';
import { APIError } from '../../API';
import { debug } from '../../utils/debug';
import { notifications } from '../../utils/notifications';

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

export const ControlPanelContainer = styled.div`
  padding: 20px;
  background: ${theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

export const ControlPanelTitle = styled.h3<{ $accentColor?: string }>`
  margin: 0 0 16px 0;
  color: ${theme.colors.textPrimary};
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid ${props => props.$accentColor || theme.colors.primary};
  padding-bottom: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ActionButton = styled.button<{ $accentColor?: string; $accentHover?: string }>`
  padding: 12px 16px;
  background: ${props => props.$accentColor || theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$accentHover || theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
    transform: none;
  }
`;

export const InfoSection = styled.div<{ $accentColor?: string }>`
  padding: 12px;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 6px;
  border-left: 3px solid ${props => props.$accentColor || theme.colors.primary};
  font-size: 12px;
  color: ${theme.colors.textSecondary};
`;

export const SettingsSection = styled.div<{ $accentColor?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 6px;
  border: 1px solid ${props => props.$accentColor || theme.colors.primary};
`;

export const SettingsLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.textPrimary};
  margin-bottom: 4px;
`;

// =============================================================================
// ERROR HANDLING
// =============================================================================

/**
 * Handles shader generation errors with consistent UX
 */
export function handleShaderError(error: unknown, context: string): void {
  debug.error(`${context} failed:`, error);
  
  if (error instanceof APIError) {
    debug.error('API Error details:', error.backendError);
    const backendError = error.backendError;
    notifications.showErrorDialog({
      title: 'Shader Generation Failed',
      message: backendError?.message || error.message,
      traceback: backendError?.traceback || `Endpoint: ${error.endpoint}\nStatus: ${error.status}`,
      type: backendError?.type || 'APIError'
    });
  } else {
    notifications.showErrorDialog({
      title: 'Shader Generation Failed',
      message: error instanceof Error ? error.message : 'An unexpected error occurred during shader generation',
      traceback: error instanceof Error ? error.stack : String(error),
      type: 'UnexpectedError'
    });
  }
}

