import React from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { generateGeolipiShaderHtml, generateGeolipiTWGLShaderCode, APIError } from '../../API';
import { useSettings } from '../../store/SettingsContext';
import { debug } from '../../utils/debug';
import { EditorHandle } from '../../types/editor';
import { ViewerHandle } from '../../types/viewer';
import { GraphSerializer } from '../editors/reactflow_editor/utils/GraphSerializer';

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

const StatusText = styled.div`
  padding: 8px 12px;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 4px;
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  border-left: 3px solid #10b981;
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

  const handleGenerateGeoLIPIShader = async () => {
    debug.log('🌍 Generating GeoLIPI shader from node graph...');
    
    try {
      // Get ReactFlow editor data and serialize it
      let serializedGraph = {};
      if (editor && typeof editor === 'object') {
        debug.log('Editor keys:', Object.keys(editor));
        
        // ReactFlow editor - get nodes and edges
        if (editor.getNodes && editor.getEdges) {
          debug.log('Using ReactFlow editor data');
          const nodes = editor.getNodes() as any; // Cast to match GraphSerializer expectations
          const edges = editor.getEdges() as any; // Cast to match GraphSerializer expectations
          
          // Serialize the graph data using GraphSerializer
          serializedGraph = GraphSerializer.serialize(nodes, edges, 'geolipi');
          debug.log('Serialized graph data:', serializedGraph);
        } else {
          debug.log('Editor structure not recognized, sending empty payload');
          serializedGraph = { moduleList: {} };
        }
      } else {
        serializedGraph = { moduleList: {} };
      }

      const payload = {
        modules: serializedGraph,
        shaderSettings: settings.shaderGeneration.shaderSettings,
        mode: 'geolipi' // Specify GeoLIPI mode
      };

      debug.log('Sending GeoLIPI payload to backend:', payload);

      const result = await generateGeolipiTWGLShaderCode(payload);
      debug.log('✅ GeoLIPI shader generation successful:', {
        hasShaderCode: !!result.shaderCode,
        uniformCount: Object.keys(result.uniforms || {}).length,
        textureCount: Object.keys(result.textures || {}).length
      });
      
      if (result.shaderCode && viewerRef.current && viewerRef.current.loadShaderCode) {
        viewerRef.current.loadShaderCode(result.shaderCode, result.uniforms, result.textures);
        debug.log('Successfully loaded GeoLIPI shader code into viewer');
      } else {
        debug.error('Backend response missing shaderCode or loadShaderCode method not available:', result);
      }
    } catch (error) {
      debug.error('❌ GeoLIPI shader generation failed:', error);
      if (error instanceof APIError) {
        debug.error('API Error details:', (error as any).details);
      }
    }
  };

  const handleTestGeoLIPIViewer = async () => {
    debug.log('🧪 Testing GeoLIPI viewer with sample content...');
    
    try {
      const payload = {
        modules: {},
        shaderSettings: settings.shaderGeneration.shaderSettings,
        mode: 'geolipi'
      };

      const result = await generateGeolipiShaderHtml(payload);
      debug.log('✅ GeoLIPI HTML generation successful');
      
      if (result.html && viewerRef.current && viewerRef.current.loadHTML) {
        viewerRef.current.loadHTML(result.html);
        debug.log('Successfully loaded GeoLIPI HTML into iframe');
      } else {
        debug.error('Backend response missing html field or loadHTML method not available:', result);
      }
    } catch (error) {
      debug.error('❌ GeoLIPI viewer test failed:', error);
    }
  };

  return (
    <Container>
      <Title>🌍 GeoLIPI Graph Controls</Title>
      
      <StatusText>
        GeoLIPI (Geometric Language for Implicit Programming) mode - Generate geometric shapes and transformations
      </StatusText>

      <ButtonGroup>
        <ActionButton onClick={handleGenerateGeoLIPIShader}>
          🌍 Generate GeoLIPI Shader
        </ActionButton>
        
        <ActionButton onClick={handleTestGeoLIPIViewer}>
          🧪 Test GeoLIPI Viewer
        </ActionButton>
      </ButtonGroup>

      <StatusText>
        Available nodes: Geometric primitives, transformations, combinators (no materials or SySL nodes)
      </StatusText>
    </Container>
  );
};
