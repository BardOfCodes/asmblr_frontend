import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Switch, Divider, Space, Button, Select, Input } from 'antd';
import { useSettings, EditorType, ViewerType, ShaderSettings } from '../../store/SettingsContext';
import { theme } from '../../design/theme';

const { TextArea } = Input;

// const { Title } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.xl};
  }
  
  .ant-modal-header {
    border-bottom: 1px solid ${theme.colors.border};
    padding: ${theme.spacing.lg};
  }
  
  .ant-modal-title {
    font-family: ${theme.typography.fontFamily.sans};
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.textPrimary};
  }
  
  .ant-modal-body {
    padding: ${theme.spacing.lg};
  }
  
  .ant-modal-footer {
    border-top: 1px solid ${theme.colors.border};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.borderLight};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
  margin-right: ${theme.spacing.md};
`;

const SettingTitle = styled.div`
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.xs};
`;

const SettingDescription = styled.div`
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.typography.lineHeight.normal};
`;

const SectionTitle = styled.div`
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.sm};
`;

const SectionDescription = styled.div`
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.lg};
  line-height: ${theme.typography.lineHeight.normal};
`;

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose }) => {
  const { settings, dispatch } = useSettings();
  const { layout } = settings.ui;
  const [shaderSettingsText, setShaderSettingsText] = useState(() => {
    // Convert current shader settings to JSON string for editing
    const currentSettings = settings.shaderGeneration.shaderSettings;
    if (!currentSettings.render_mode && Object.keys(currentSettings.variables).length === 0) {
      return ''; // Empty if no custom settings
    }
    return JSON.stringify(currentSettings, null, 2);
  });

  const handlePanelVisibilityChange = (panel: keyof typeof layout, visible: boolean) => {
    dispatch({ type: 'SET_PANEL_VISIBILITY', payload: { panel, visible } });
  };

  const handleResetLayout = () => {
    dispatch({ type: 'RESET_LAYOUT' });
  };

  const handleShaderSettingsChange = (value: string) => {
    setShaderSettingsText(value);
    
    try {
      if (value.trim() === '') {
        // Empty settings - use default empty structure
        const emptySettings: ShaderSettings = {
          render_mode: "",
          variables: {},
          extract_vars: false,
          use_define_vars: false
        };
        dispatch({ type: 'SET_SHADER_SETTINGS', payload: emptySettings });
      } else {
        // Parse and validate JSON
        const parsedSettings = JSON.parse(value);
        
        // Ensure it has the required structure
        const validatedSettings: ShaderSettings = {
          render_mode: parsedSettings.render_mode || "",
          variables: parsedSettings.variables || {},
          extract_vars: parsedSettings.extract_vars || false,
          use_define_vars: parsedSettings.use_define_vars || false
        };
        
        dispatch({ type: 'SET_SHADER_SETTINGS', payload: validatedSettings });
      }
    } catch (error) {
      // Invalid JSON - don't update settings, just keep the text
      console.warn('Invalid JSON in shader settings:', error);
    }
  };

  return (
    <StyledModal
      title="Interface Settings"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="reset" onClick={handleResetLayout}>
          Reset to Default
        </Button>,
        <Button key="close" type="primary" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={900}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <SectionTitle>Panel Visibility</SectionTitle>
          <SectionDescription>
            Show or hide different parts of the interface to customize your workspace.
          </SectionDescription>
        </div>

        <div>
          <SettingRow>
            <SettingInfo>
              <SettingTitle>Header/Navigation</SettingTitle>
              <SettingDescription>
                Top navigation bar with menu items (always visible)
              </SettingDescription>
            </SettingInfo>
            <Switch
              checked={true}
              disabled={true}
              title="Header must remain visible to access settings"
            />
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingTitle>Node Editor</SettingTitle>
              <SettingDescription>
                Visual node-based programming interface for creating geometry
              </SettingDescription>
            </SettingInfo>
            <Switch
              checked={layout.nodeEditor.visible}
              onChange={(checked) => handlePanelVisibilityChange('nodeEditor', checked)}
            />
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingTitle>Viewer/Visualizer</SettingTitle>
              <SettingDescription>
                3D geometry and shader visualization with real-time rendering
              </SettingDescription>
            </SettingInfo>
            <Switch
              checked={layout.viewer.visible}
              onChange={(checked) => handlePanelVisibilityChange('viewer', checked)}
            />
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingTitle>Control Panel</SettingTitle>
              <SettingDescription>
                Operations, uniforms, and export controls for geometry processing
              </SettingDescription>
            </SettingInfo>
            <Switch
              checked={layout.controlPanel.visible}
              onChange={(checked) => handlePanelVisibilityChange('controlPanel', checked)}
            />
          </SettingRow>
        </div>

        <Divider />

        <div>
          <SectionTitle>Component Selection</SectionTitle>
          <SectionDescription>
            Choose which editor and viewer components to use in your workspace.
          </SectionDescription>
        </div>

        <div>
          <SettingRow>
            <SettingInfo>
              <SettingTitle>Node Editor Type</SettingTitle>
              <SettingDescription>
                Select the type of editor for creating and editing node graphs
              </SettingDescription>
            </SettingInfo>
            <Select
              value={settings.ui.components.selectedEditor}
              onChange={(value: EditorType) => dispatch({ type: 'SET_EDITOR_TYPE', payload: value })}
              style={{ width: 200 }}
              options={[
                { value: 'rete_node_editor', label: 'Rete.js Node Editor' },
                { value: 'code_editor', label: 'Code Editor' }
              ]}
            />
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingTitle>Viewer Type</SettingTitle>
              <SettingDescription>
                Select the type of viewer for visualizing your creations
              </SettingDescription>
            </SettingInfo>
            <Select
              value={settings.ui.components.selectedViewer}
              onChange={(value: ViewerType) => dispatch({ type: 'SET_VIEWER_TYPE', payload: value })}
              style={{ width: 200 }}
              options={[
                { value: 'iframe_viewer', label: 'HTML/iframe Viewer' },
                { value: 'shader_viewer', label: 'TWGL Shader Viewer' }
              ]}
            />
          </SettingRow>
        </div>

        <Divider />

        <div>
          <SectionTitle>Shader Generation Settings</SectionTitle>
          <SectionDescription>
            Configure shader generation parameters as JSON. Leave empty to use backend defaults.
          </SectionDescription>
        </div>

        <div>
          <SettingRow style={{ alignItems: 'flex-start' }}>
            <SettingInfo>
              <SettingTitle>Shader Settings JSON</SettingTitle>
              <SettingDescription>
                JSON configuration for shader generation (render_mode, variables, etc.). 
                Empty means backend will use default settings.
              </SettingDescription>
            </SettingInfo>
            <div style={{ width: '500px' }}>
              <TextArea
                value={shaderSettingsText}
                onChange={(e) => handleShaderSettingsChange(e.target.value)}
                placeholder={`{
  "render_mode": "v3",
  "variables": {
    "_ADD_FLOOR_PLANE": false,
    "_RAYCAST_MAX_STEPS": 200,
    "_RAYCAST_CONSERVATIVE_STEPPING_RATE": 0.99,
    "_AA": 2,
    "castShadows": false
  },
  "extract_vars": false,
  "use_define_vars": true
}`}
                rows={8}
                style={{ 
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  fontSize: '12px'
                }}
              />
            </div>
          </SettingRow>
        </div>

        <Divider />

        <div>
          <SectionTitle>Layout Information</SectionTitle>
          <SectionDescription>
            The interface automatically adjusts based on your panel visibility settings. 
            Hidden panels won't take up space in the layout. The header remains visible 
            so you can always access settings and navigation. You can resize panels by 
            dragging the borders between them.
          </SectionDescription>
        </div>
      </Space>
    </StyledModal>
  );
};
