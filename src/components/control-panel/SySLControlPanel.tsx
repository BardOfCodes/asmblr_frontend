import React, { useCallback } from 'react';
import { generateShader } from '../../API';
import { useSettings } from '../../store/SettingsContext';
import { debug } from '../../utils/debug';
import { EditorHandle } from '../../types/editor';
import { ViewerHandle } from '../../types/viewer';
import { prepareShaderPayloadFromEditor } from './shaderPayloadHelper';
import { useMainFunctionRegistration } from '../../utils/ShortcutManager';
import {
  ControlPanelContainer,
  ControlPanelTitle,
  ButtonGroup,
  ActionButton,
  handleShaderError
} from './BaseControlPanel';

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
      const { payload, metadata } = prepareShaderPayloadFromEditor('sysl', editor, settings);
      
      debug.log('Payload prepared:', {
        nodeCount: metadata.nodeCount,
        edgeCount: metadata.edgeCount,
        serializationMethod: metadata.serializationMethod
      });
      
      const result = await generateShader('sysl', 'twgl', payload);
      
      debug.log('SySL shader generation successful:', {
        hasShaderCode: !!(result as any).shaderCode,
        uniformCount: Object.keys((result as any).uniforms || {}).length,
        textureCount: Object.keys((result as any).textures || {}).length
      });
      
      const shaderResult = result as any;
      if (shaderResult.shaderCode && viewerRef.current && viewerRef.current.loadShaderCode) {
        viewerRef.current.loadShaderCode(shaderResult.shaderCode, shaderResult.uniforms, shaderResult.textures);
        debug.log('Successfully loaded SySL shader code into viewer');
      } else {
        debug.error('Backend response missing shaderCode or loadShaderCode method not available:', result);
      }
    } catch (error) {
      handleShaderError(error, 'SySL shader generation');
    }
  }, [editor, settings, viewerRef]);

  const handleGenerateSySLShaderIFrame = useCallback(async () => {
    debug.log('Generating SySL shader IFrame from node graph...');
    
    try {
      const { payload, metadata } = prepareShaderPayloadFromEditor('sysl', editor, settings);
      
      debug.log('Payload prepared for IFrame:', {
        nodeCount: metadata.nodeCount,
        edgeCount: metadata.edgeCount,
        serializationMethod: metadata.serializationMethod
      });
      
      const result = await generateShader('sysl', 'html', payload);
      
      debug.log('SySL HTML generation successful');
      
      const htmlResult = result as any;
      if (htmlResult.html && viewerRef.current && viewerRef.current.loadHTML) {
        viewerRef.current.loadHTML(htmlResult.html);
        debug.log('Successfully loaded SySL HTML into iframe');
      } else {
        debug.error('Backend response missing html field or loadHTML method not available:', result);
      }
    } catch (error) {
      handleShaderError(error, 'SySL IFrame generation');
    }
  }, [editor, settings, viewerRef]);

  useMainFunctionRegistration(
    'SySL Graph', 
    handleGenerateSySLShaderIFrame, 
    'Generate SySL shader IFrame from node graph (Cmd/Ctrl+Enter)'
  );

  return (
    <ControlPanelContainer>
      <ControlPanelTitle>Symbolic Scene Language (SySL) Controls</ControlPanelTitle>
      <ButtonGroup>
        <ActionButton onClick={handleGenerateSySLShader}>
          Generate Shader
        </ActionButton>
        <ActionButton onClick={handleGenerateSySLShaderIFrame}>
          Generate Shader IFrame
        </ActionButton>
      </ButtonGroup>
    </ControlPanelContainer>
  );
};
