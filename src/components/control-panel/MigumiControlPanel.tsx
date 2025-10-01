import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { generateShader, APIError } from '../../API';
import { useSettings } from '../../store/SettingsContext';
import { debug } from '../../utils/debug';
import { EditorHandle } from '../../types/editor';
import { ViewerHandle } from '../../types/viewer';
import { prepareShaderPayload } from './shaderPayloadHelper';
import { useMainFunctionRegistration } from '../../utils/ShortcutManager';
import { notifications } from '../../utils/notifications';
import { useProjectActions, getReactFlowRef } from '../editors/reactflow_editor/hooks/useProjectActions';

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
  border-bottom: 2px solid #8b5cf6; /* Purple theme for Migumi */
  padding-bottom: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActionButton = styled.button`
  padding: 12px 16px;
  background: #8b5cf6; /* Purple theme for Migumi */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #7c3aed;
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

const InfoSection = styled.div`
  padding: 12px;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 6px;
  border-left: 3px solid #8b5cf6;
  font-size: 12px;
  color: ${theme.colors.textSecondary};
`;

const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 6px;
  border: 1px solid #8b5cf6;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${theme.colors.textPrimary};
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #8b5cf6;
  }
`;

const SettingsLabel = styled.div`
  font-weight: 600;
  color: ${theme.colors.textPrimary};
  font-size: 14px;
  margin-bottom: 4px;
`;

interface MigumiControlPanelProps {
  editor: EditorHandle;
  viewerRef: React.RefObject<ViewerHandle>;
}

// Export the old format state for use by other components
export interface MigumiSettings {
  useOldFormat: boolean;
}

// Global state for Migumi settings (simple approach)
let globalMigumiSettings: MigumiSettings = {
  useOldFormat: true
};

export function getMigumiSettings(): MigumiSettings {
  return { ...globalMigumiSettings };
}

export function setMigumiSettings(settings: Partial<MigumiSettings>): void {
  globalMigumiSettings = { ...globalMigumiSettings, ...settings };
  console.log('🔧 MigumiControlPanel: Settings updated:', globalMigumiSettings);
}

export const MigumiControlPanel: React.FC<MigumiControlPanelProps> = ({
  editor,
  viewerRef
}) => {
  const { settings } = useSettings();
  const [useOldFormat, setUseOldFormat] = useState(globalMigumiSettings.useOldFormat);
  const projectActions = useProjectActions();

  // Update global settings when local state changes
  const handleOldFormatChange = useCallback((checked: boolean) => {
    setUseOldFormat(checked);
    setMigumiSettings({ useOldFormat: checked });
  }, []);

  // Create a graph editor object that can provide nodes and edges
  const createGraphEditor = useCallback(() => {
    if (!projectActions.isAvailable()) {
      debug.warn('ReactFlow editor not available for graph data extraction');
      return null;
    }

    const reactFlowRef = getReactFlowRef();
    
    if (reactFlowRef) {
      return {
        getNodes: () => reactFlowRef.getNodes(),
        getEdges: () => reactFlowRef.getEdges(),
        nodeRegistry: (editor as any).nodeRegistry // Pass through the node registry if available
      };
    }

    debug.error('ReactFlow reference not available');
    return null;
  }, [projectActions, editor]);

  const handleGenerateMigumiShader = useCallback(async () => {
    debug.log('Generating Migumi shader from node graph...');
    
    try {
      // Create a proper graph editor that can provide nodes and edges
      const graphEditor = createGraphEditor();
      
      if (!graphEditor) {
        throw new Error('Unable to access ReactFlow graph data. Please ensure the editor is loaded.');
      }

      // Prepare payload using the helper with the proper graph editor
      const { payload, metadata } = prepareShaderPayload({
        mode: 'migumi',
        editor: graphEditor,
        settings
      });
      
      debug.log('Payload prepared:', {
        nodeCount: metadata.nodeCount,
        edgeCount: metadata.edgeCount,
        serializationMethod: metadata.serializationMethod
      });
      
      // Call API with prepared payload using Migumi backend
      const result = await generateShader('migumi', 'twgl', payload);
      
      debug.log('Migumi shader generation successful:', {
        hasShaderCode: !!(result as any).shaderCode,
        uniformCount: Object.keys((result as any).uniforms || {}).length,
        textureCount: Object.keys((result as any).textures || {}).length
      });
      
      const shaderResult = result as any; // Type assertion for shader code response
      if (shaderResult.shaderCode && viewerRef.current && viewerRef.current.loadShaderCode) {
        viewerRef.current.loadShaderCode(shaderResult.shaderCode, shaderResult.uniforms, shaderResult.textures);
        debug.log('Successfully loaded Migumi shader code into viewer');
      } else {
        debug.error('Backend response missing shaderCode or loadShaderCode method not available:', result);
      }
    } catch (error) {
      debug.error('Migumi shader generation failed:', error);
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
  }, [createGraphEditor, settings, viewerRef]);

  // Register this function as the main function for Migumi mode
  useMainFunctionRegistration(
    'Migumi', 
    handleGenerateMigumiShader, 
    'Generate Migumi shader from node graph (Cmd/Ctrl+Enter)'
  );

  return (
    <Container>
      <Title>Migumi Controls</Title>
      
      <ButtonGroup>
        <ActionButton onClick={handleGenerateMigumiShader}>
          Generate Shader
        </ActionButton>
      </ButtonGroup>

      <SettingsSection>
        <SettingsLabel>File Format Settings</SettingsLabel>
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={useOldFormat}
            onChange={(e) => handleOldFormatChange(e.target.checked)}
          />
          Use old format compatibility (Plane3D → PlaneV23D, Difference → DifferenceV2)
        </CheckboxContainer>
      </SettingsSection>

      <InfoSection>
        Migumi mode provides minimal geometric operations with basic 3D primitives and transformations.
        Perfect for simple geometric modeling and prototyping.
        {useOldFormat && (
          <>
            <br /><br />
            <strong>Old Format Mode:</strong> Automatically converts Plane3D → PlaneV23D and Difference → DifferenceV2 when importing files.
          </>
        )}
      </InfoSection>
    </Container>
  );
};
