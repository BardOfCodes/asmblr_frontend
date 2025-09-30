import React, { useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { generateShader, APIError } from '../../API';
import { useSettings } from '../../store/SettingsContext';
import { debug } from '../../utils/debug';
import { EditorHandle } from '../../types/editor';
import { ViewerHandle } from '../../types/viewer';
import { prepareShaderPayloadFromEditor,  } from './shaderPayloadHelper';
import { useMainFunctionRegistration } from '../../utils/ShortcutManager';
import { notifications } from '../../utils/notifications';

const Container = styled.div`
  padding: 20px;
  background: ${theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const Title = styled.h3`
  margin: 0 0 16px 0;
  color: ${theme.colors.textPrimary};
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid ${theme.colors.primary};
  padding-bottom: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActionButton = styled.button`
  padding: 12px 16px;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
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


interface SySLControlPanelProps {
  editor: EditorHandle;
  viewerRef: React.RefObject<ViewerHandle>;
}

export const SySLControlPanel: React.FC<SySLControlPanelProps> = ({
  editor,
  viewerRef
}) => {
  const { settings } = useSettings();

  const handleGenerateSySLShader = useCallback(async () => {
    debug.log('Generating SySL shader from node graph...');
    
    try {
      // Prepare payload using the helper
      const { payload, metadata } = prepareShaderPayloadFromEditor('sysl', editor, settings);
      
      debug.log('Payload prepared:', {
        nodeCount: metadata.nodeCount,
        edgeCount: metadata.edgeCount,
        serializationMethod: metadata.serializationMethod
      });
      
      // Call API with prepared payload
      const result = await generateShader('sysl', 'twgl', payload);
      
      debug.log('SySL shader generation successful:', {
        hasShaderCode: !!(result as any).shaderCode,
        uniformCount: Object.keys((result as any).uniforms || {}).length,
        textureCount: Object.keys((result as any).textures || {}).length
      });
      
      const shaderResult = result as any; // Type assertion for shader code response
      if (shaderResult.shaderCode && viewerRef.current && viewerRef.current.loadShaderCode) {
        viewerRef.current.loadShaderCode(shaderResult.shaderCode, shaderResult.uniforms, shaderResult.textures);
        debug.log('Successfully loaded SySL shader code into viewer');
      } else {
        debug.error('Backend response missing shaderCode or loadShaderCode method not available:', result);
      }
    } catch (error) {
      debug.error('SySL shader generation failed:', error);
      if (error instanceof APIError) {
        debug.error('API Error details:', error.backendError);
        // Show error dialog to user with backend error details if available
        const backendError = error.backendError;
        notifications.showErrorDialog({
          title: 'Shader Generation Failed',
          message: backendError?.message || error.message,
          traceback: backendError?.traceback || `Endpoint: ${error.endpoint}\nStatus: ${error.status}`,
          type: backendError?.type || 'APIError'
        });
      } else {
        // Handle unexpected errors
        notifications.showErrorDialog({
          title: 'Shader Generation Failed',
          message: error instanceof Error ? error.message : 'An unexpected error occurred during shader generation',
          traceback: error instanceof Error ? error.stack : String(error),
          type: 'UnexpectedError'
        });
      }
    }
  }, [editor, settings, viewerRef]);

  // Register this function as the main function for SySL mode
  useMainFunctionRegistration(
    'SySL', 
    handleGenerateSySLShader, 
    'Generate SySL shader from node graph (Cmd/Ctrl+Enter)'
  );

  return (
    <Container>
      <Title>Symbolic Scene Language (SySL) Controls</Title>
      <ButtonGroup>
        <ActionButton onClick={handleGenerateSySLShader}>
          Generate Shader
        </ActionButton>
      </ButtonGroup>
    </Container>
  );
};
