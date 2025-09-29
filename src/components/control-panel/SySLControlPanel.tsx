import React from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { generateSySLShaderHtml, generateSySLTWGLShaderCode, APIError } from '../../API';
import { useSettings } from '../../store/SettingsContext';
import { debug } from '../../utils/debug';
import { EditorHandle } from '../../types/editor';
import { ViewerHandle } from '../../types/viewer';

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

const StatusText = styled.div`
  padding: 8px 12px;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 4px;
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  border-left: 3px solid ${theme.colors.info};
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

  const handleGenerateSySLShader = async () => {
    debug.log('🔥 Generating SySL shader from node graph...');
    
    try {
      // Get ReactFlow editor data
      let moduleData = {};
      if (editor && typeof editor === 'object') {
        debug.log('Editor keys:', Object.keys(editor));
        
        // ReactFlow editor - get nodes and edges
        if (editor.getNodes && editor.getEdges) {
          debug.log('Using ReactFlow editor data');
          moduleData = {
            nodes: editor.getNodes(),
            edges: editor.getEdges()
          };
        } else {
          debug.log('Editor structure not recognized, sending empty payload');
          moduleData = {};
        }
      }

      const payload = {
        modules: moduleData,
        shaderSettings: settings.shaderGeneration.shaderSettings,
        mode: 'sysl' // Specify SySL mode
      };

      debug.log('Sending SySL payload to backend:', payload);

      const result = await generateSySLTWGLShaderCode(payload);
      debug.log('✅ SySL shader generation successful:', {
        hasShaderCode: !!result.shaderCode,
        uniformCount: Object.keys(result.uniforms || {}).length,
        textureCount: Object.keys(result.textures || {}).length
      });
      
      if (result.shaderCode && viewerRef.current && viewerRef.current.loadShaderCode) {
        viewerRef.current.loadShaderCode(result.shaderCode, result.uniforms, result.textures);
        debug.log('Successfully loaded SySL shader code into viewer');
      } else {
        debug.error('Backend response missing shaderCode or loadShaderCode method not available:', result);
      }
    } catch (error) {
      debug.error('❌ SySL shader generation failed:', error);
      if (error instanceof APIError) {
        debug.error('API Error details:', (error as any).details);
      }
    }
  };

  const handleTestSySLViewer = async () => {
    debug.log('🧪 Testing SySL viewer with sample content...');
    
    try {
      const payload = {
        modules: {},
        shaderSettings: settings.shaderGeneration.shaderSettings,
        mode: 'sysl'
      };

      const result = await generateSySLShaderHtml(payload);
      debug.log('✅ SySL HTML generation successful');
      
      if (result.html && viewerRef.current && viewerRef.current.loadHTML) {
        viewerRef.current.loadHTML(result.html);
        debug.log('Successfully loaded SySL HTML into iframe');
      } else {
        debug.error('Backend response missing html field or loadHTML method not available:', result);
      }
    } catch (error) {
      debug.error('❌ SySL viewer test failed:', error);
    }
  };

  return (
    <Container>
      <Title>🧮 SySL Graph Controls</Title>
      
      <StatusText>
        SySL (Symbolic Shader Language) mode - Generate shaders from symbolic mathematical expressions
      </StatusText>

      <ButtonGroup>
        <ActionButton onClick={handleGenerateSySLShader}>
          🔥 Generate SySL Shader
        </ActionButton>
        
        <ActionButton onClick={handleTestSySLViewer}>
          🧪 Test SySL Viewer
        </ActionButton>
      </ButtonGroup>

      <StatusText>
        Available nodes: Mathematical operations, symbolic expressions, material definitions
      </StatusText>
    </Container>
  );
};
