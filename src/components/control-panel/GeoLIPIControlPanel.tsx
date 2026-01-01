import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { generateShader } from '../../API';
import { useSettings } from '../../store/SettingsContext';
import { debug } from '../../utils/debug';
import { EditorHandle } from '../../types/editor';
import { ViewerHandle } from '../../types/viewer';
import { prepareGeolipiShaderPayload } from './shaderPayloadHelper';
import { useMainFunctionRegistration } from '../../utils/ShortcutManager';
import {
  ControlPanelContainer,
  ControlPanelTitle,
  ButtonGroup,
  ActionButton,
  SettingsSection,
  SettingsLabel,
  handleShaderError
} from './BaseControlPanel';

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
    border-color: ${theme.colors.modeGreen};
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
      const { payload, metadata } = prepareGeolipiShaderPayload(editor, settings, geolipiMode);
      
      debug.log('Payload prepared:', {
        nodeCount: metadata.nodeCount,
        edgeCount: metadata.edgeCount,
        serializationMethod: metadata.serializationMethod,
        geolipiMode: geolipiMode
      });
      
      const result = await generateShader('geolipi', 'twgl', payload);
      
      debug.log('GeoLIPI shader generation successful:', {
        hasShaderCode: !!(result as any).shaderCode,
        uniformCount: Object.keys((result as any).uniforms || {}).length,
        textureCount: Object.keys((result as any).textures || {}).length
      });
      
      const shaderResult = result as any;
      if (shaderResult.shaderCode && viewerRef.current && viewerRef.current.loadShaderCode) {
        viewerRef.current.loadShaderCode(shaderResult.shaderCode, shaderResult.uniforms, shaderResult.textures);
        debug.log('Successfully loaded GeoLIPI shader code into viewer');
      } else {
        debug.error('Backend response missing shaderCode or loadShaderCode method not available:', result);
      }
    } catch (error) {
      handleShaderError(error, 'GeoLIPI shader generation');
    }
  }, [editor, settings, geolipiMode, viewerRef]);

  const handleGenerateGeoLIPIShaderIFrame = useCallback(async () => {
    debug.log('Generating GeoLIPI shader IFrame from node graph...');
    
    try {
      const { payload, metadata } = prepareGeolipiShaderPayload(editor, settings, geolipiMode);
      
      debug.log('Payload prepared for IFrame:', {
        nodeCount: metadata.nodeCount,
        edgeCount: metadata.edgeCount,
        serializationMethod: metadata.serializationMethod,
        geolipiMode: geolipiMode
      });
      
      const result = await generateShader('geolipi', 'html', payload);
      
      debug.log('GeoLIPI HTML generation successful');
      
      const htmlResult = result as any;
      if (htmlResult.html && viewerRef.current && viewerRef.current.loadHTML) {
        viewerRef.current.loadHTML(htmlResult.html);
        debug.log('Successfully loaded GeoLIPI HTML into iframe');
      } else {
        debug.error('Backend response missing html field or loadHTML method not available:', result);
      }
    } catch (error) {
      handleShaderError(error, 'GeoLIPI IFrame generation');
    }
  }, [editor, settings, geolipiMode, viewerRef]);

  useMainFunctionRegistration(
    'GeoLIPI Graph', 
    handleGenerateGeoLIPIShaderIFrame, 
    'Generate GeoLIPI shader IFrame from node graph (Cmd/Ctrl+Enter)'
  );

  return (
    <ControlPanelContainer>
      <ControlPanelTitle $accentColor={theme.colors.modeGreen}>GeoLIPI Controls</ControlPanelTitle>
      <ButtonGroup>
        <ActionButton 
          $accentColor={theme.colors.modeGreen}
          $accentHover={theme.colors.modeGreenHover}
          onClick={handleGenerateGeoLIPIShader}
        >
          Generate Shader
        </ActionButton>
        <ActionButton 
          $accentColor={theme.colors.modeGreen}
          $accentHover={theme.colors.modeGreenHover}
          onClick={handleGenerateGeoLIPIShaderIFrame}
        >
          Generate Shader IFrame
        </ActionButton>
      </ButtonGroup>

      <SettingsSection $accentColor={theme.colors.modeGreen}>
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
    </ControlPanelContainer>
  );
};
