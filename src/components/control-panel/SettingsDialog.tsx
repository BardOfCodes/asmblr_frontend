import React from 'react';
import styled from 'styled-components';
import { Modal, Switch, Divider, Space, Typography, Button } from 'antd';
import { useSettings } from '../../store/SettingsContext';
import { theme } from '../../design/theme';

const { Title, Text } = Typography;

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

  const handlePanelVisibilityChange = (panel: keyof typeof layout, visible: boolean) => {
    dispatch({ type: 'SET_PANEL_VISIBILITY', payload: { panel, visible } });
  };

  const handleResetLayout = () => {
    dispatch({ type: 'RESET_LAYOUT' });
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
      width={600}
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
