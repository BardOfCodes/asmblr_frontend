import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { generateShader, APIError } from '../../API';
import { useSettings } from '../../store/SettingsContext';
import { debug } from '../../utils/debug';
import { EditorHandle } from '../../types/editor';
import { ViewerHandle } from '../../types/viewer';
import { prepareGeolipiShaderPayload } from './shaderPayloadHelper';
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
  border-bottom: 2px solid #10b981; /* Green theme for GeoLIPI */
  padding-bottom: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActionButton = styled.button`
  padding: 12px 16px;
  background: #10b981; /* Green theme for GeoLIPI */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #059669;
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

const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 6px;
  border: 1px solid #10b981;
`;

const SettingsLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const ModeSelector = styled.select`
  padding: 8px 12px;
  border: 1px solid ${theme.colors.gray300};
  border-radius: 4px;
  background: ${theme.colors.background};
  color: ${theme.colors.textPrimary};
  font-size: 13px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
`;

const ModeDescription = styled.div`
  font-size: 11px;
  color: ${theme.colors.textSecondary};
  margin-top: 4px;
  line-height: 1.4;
`;

interface GeoLIPIControlPanelProps {
  editor: EditorHandle;
  viewerRef: React.RefObject<ViewerHandle>;
}

export const GeoLIPIControlPanel: React.FC<GeoLIPIControlPanelProps> = ({
  editor,
  viewerRef
}) => {
  const { settings } = useSettings();
  const [geolipiMode, setGeolipiMode] = useState<'primitive' | 'singular'>('primitive');

  const handleGenerateGeoLIPIShader = useCallback(async () => {
    debug.log('Generating GeoLIPI shader from node graph...');
    
    try {
      // Prepare payload using the GeoLIPI-specific helper
      const { payload, metadata } = prepareGeolipiShaderPayload(editor, settings, geolipiMode);
      
      debug.log('Payload prepared:', {
        nodeCount: metadata.nodeCount,
        edgeCount: metadata.edgeCount,
        serializationMethod: metadata.serializationMethod,
        geolipiMode: geolipiMode
      });
      
      // Call API with prepared payload
      const result = await generateShader('geolipi', 'twgl', payload);
      
      debug.log('GeoLIPI shader generation successful:', {
        hasShaderCode: !!(result as any).shaderCode,
        uniformCount: Object.keys((result as any).uniforms || {}).length,
        textureCount: Object.keys((result as any).textures || {}).length
      });
      
      const shaderResult = result as any; // Type assertion for shader code response
      if (shaderResult.shaderCode && viewerRef.current && viewerRef.current.loadShaderCode) {
        viewerRef.current.loadShaderCode(shaderResult.shaderCode, shaderResult.uniforms, shaderResult.textures);
        debug.log('Successfully loaded GeoLIPI shader code into viewer');
      } else {
        debug.error('Backend response missing shaderCode or loadShaderCode method not available:', result);
      }
    } catch (error) {
      debug.error('GeoLIPI shader generation failed:', error);
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
  }, [editor, settings, geolipiMode, viewerRef]);

  // Register this function as the main function for GeoLIPI mode
  useMainFunctionRegistration(
    'GeoLIPI', 
    handleGenerateGeoLIPIShader, 
    'Generate GeoLIPI shader from node graph (Cmd/Ctrl+Enter)'
  );

  return (
    <Container>
      <Title>GeoLIPI Controls</Title>
      <ButtonGroup>
        <ActionButton onClick={handleGenerateGeoLIPIShader}>
          Generate Shader
        </ActionButton>
        
      </ButtonGroup>

      <SettingsSection>
        <SettingsLabel htmlFor="geolipi-mode">GeoLIPI Generation Mode</SettingsLabel>
        <ModeSelector
          id="geolipi-mode"
          value={geolipiMode}
          onChange={(e) => setGeolipiMode(e.target.value as 'primitive' | 'singular')}
        >
          <option value="primitive">Primitive Mode</option>
          <option value="singular">Singular Mode</option>
        </ModeSelector>
        <ModeDescription>
          {geolipiMode === 'primitive' 
            ? 'Converts GeoLIPI expressions to SySL primitives for complex geometric operations'
            : 'Wraps GeoLIPI expressions in a single material for simple solid rendering'
          }
        </ModeDescription>
      </SettingsSection>

    </Container>
  );
};
