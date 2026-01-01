import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { generateShader } from '../../API';
import { useSettings } from '../../store/SettingsContext';
import { debug } from '../../utils/debug';
import { EditorHandle } from '../../types/editor';
import { ViewerHandle } from '../../types/viewer';
import { prepareShaderPayload } from './shaderPayloadHelper';
import { useMainFunctionRegistration } from '../../utils/ShortcutManager';
import { useProjectActions, getReactFlowRef } from '../editors/reactflow_editor/hooks/useProjectActions';
import {
  ControlPanelContainer,
  ControlPanelTitle,
  ButtonGroup,
  ActionButton,
  InfoSection,
  SettingsSection,
  handleShaderError
} from './BaseControlPanel';

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
    accent-color: ${theme.colors.modePurple};
  }
`;

const SettingsTitle = styled.div`
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

// Global state for Migumi settings
let globalMigumiSettings: MigumiSettings = {
  useOldFormat: true
};

export function getMigumiSettings(): MigumiSettings {
  return { ...globalMigumiSettings };
}

export function setMigumiSettings(settings: Partial<MigumiSettings>): void {
  globalMigumiSettings = { ...globalMigumiSettings, ...settings };
  debug.log('MigumiControlPanel: Settings updated:', globalMigumiSettings);
}

export const MigumiControlPanel: React.FC<MigumiControlPanelProps> = ({
  editor,
  viewerRef
}) => {
  const { settings } = useSettings();
  const [useOldFormat, setUseOldFormat] = useState(globalMigumiSettings.useOldFormat);
  const projectActions = useProjectActions();

  const handleOldFormatChange = useCallback((checked: boolean) => {
    setUseOldFormat(checked);
    setMigumiSettings({ useOldFormat: checked });
  }, []);

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
        nodeRegistry: (editor as any).nodeRegistry
      };
    }

    debug.error('ReactFlow reference not available');
    return null;
  }, [projectActions, editor]);

  const handleGenerateMigumiShader = useCallback(async () => {
    debug.log('Generating Migumi shader from node graph...');
    
    try {
      const graphEditor = createGraphEditor();
      
      if (!graphEditor) {
        throw new Error('Unable to access ReactFlow graph data. Please ensure the editor is loaded.');
      }

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
      
      const result = await generateShader('migumi', 'html', payload);
      
      debug.log('Migumi HTML generation successful');
        
      const htmlResult = result as any;
      if (htmlResult.html && viewerRef.current && viewerRef.current.loadHTML) {
        viewerRef.current.loadHTML(htmlResult.html);
        debug.log('Successfully loaded Migumi HTML into iframe');
      } else {
        debug.error('Backend response missing html field or loadHTML method not available:', result);
      }
    } catch (error) {
      handleShaderError(error, 'Migumi shader generation');
    }
  }, [createGraphEditor, settings, viewerRef]);

  useMainFunctionRegistration(
    'Migumi Graph', 
    handleGenerateMigumiShader, 
    'Generate Migumi shader IFrame from node graph (Cmd/Ctrl+Enter)'
  );

  return (
    <ControlPanelContainer>
      <ControlPanelTitle $accentColor={theme.colors.modePurple}>Migumi Controls</ControlPanelTitle>
      
      <ButtonGroup>
        <ActionButton 
          $accentColor={theme.colors.modePurple}
          $accentHover={theme.colors.modePurpleHover}
          onClick={handleGenerateMigumiShader}
        >
          Generate Shader IFrame
        </ActionButton>
      </ButtonGroup>

      <SettingsSection $accentColor={theme.colors.modePurple}>
        <SettingsTitle>File Format Settings</SettingsTitle>
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={useOldFormat}
            onChange={(e) => handleOldFormatChange(e.target.checked)}
          />
          Use old format compatibility (Plane3D → PlaneV23D)
        </CheckboxContainer>
      </SettingsSection>

      <InfoSection $accentColor={theme.colors.modePurple}>
        Migumi mode provides minimal geometric operations with basic 3D primitives and transformations.
        Perfect for simple geometric modeling and prototyping.
        {useOldFormat && (
          <>
            <br /><br />
            <strong>Old Format Mode:</strong> Automatically converts Plane3D → PlaneV23D and other edits when importing files.
          </>
        )}
      </InfoSection>
    </ControlPanelContainer>
  );
};
