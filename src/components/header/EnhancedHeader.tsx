import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SettingOutlined, SaveOutlined, FolderOpenOutlined, FileOutlined, AppstoreOutlined } from '@ant-design/icons';
import { HeaderContainer, HeaderContent, HeaderTitle, HeaderNav, HeaderButton } from '../../design/components';
import { theme } from '../../design/theme';
import { useProjectPicker } from '../utils/project-picker';
import { useProjectSaver } from '../utils/project-saver';
import { EnhancedModes, saveEnhancedModeToDisk } from '../../modes/enhanced';
import { SettingsDialog } from '../control-panel/SettingsDialog';

interface EnhancedHeaderProps {
  modeName: string;
  setMode: (name: string) => void;
}

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ModePicker = styled.select`
  background: transparent;
  border: none;
  color: ${theme.colors.textPrimary};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  padding-right: ${theme.spacing.lg};
  border-radius: 0;
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.normal};
  cursor: pointer;
  transition: color ${theme.transitions.fast};
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23525252' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right ${theme.spacing.xs} center;
  background-repeat: no-repeat;
  background-size: 12px;
  
  &:hover {
    color: ${theme.colors.textPrimary};
  }
  
  &:focus {
    outline: none;
  }
  
  option {
    background: ${theme.colors.white};
    color: ${theme.colors.textPrimary};
    padding: ${theme.spacing.xs};
    font-size: ${theme.typography.fontSize.md};
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: ${theme.colors.textMuted};
  margin: 0 ${theme.spacing.lg};
  opacity: 0.3;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  margin-right: ${theme.spacing.xs};
`;

export const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ 
  modeName, 
  setMode 
}) => {
  const [open, file] = useProjectPicker();
  const [save] = useProjectSaver('project.json');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSave = () => {
    // TODO: Implement project saving through mode context
    console.log('Save project');
    save({ modeName });
  };

  const handleLoad = () => {
    // TODO: Implement project loading through mode context
    console.log('Load project');
    open();
  };

  const handleNew = () => {
    if (confirm('Create a new project? This will clear the current work.')) {
      // TODO: Implement project clearing through mode context
      console.log('New project');
    }
  };

  const handleModeChange = (newMode: string) => {
    if (newMode !== modeName) {
      saveEnhancedModeToDisk(newMode);
      setMode(newMode);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (file) {
      // TODO: Implement project loading through mode context
      console.log('Loading project file:', file);
    }
  }, [file]);

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <HeaderSection>
            <HeaderTitle>ASMBLR</HeaderTitle>
            
            <Divider />
            
            <HeaderButton onClick={handleNew} title="New Project">
              <IconWrapper><FileOutlined /></IconWrapper>
              New
            </HeaderButton>
            
            <HeaderButton onClick={handleLoad} title="Open Project">
              <IconWrapper><FolderOpenOutlined /></IconWrapper>
              Open
            </HeaderButton>
            
            <HeaderButton onClick={handleSave} title="Save Project">
              <IconWrapper><SaveOutlined /></IconWrapper>
              Save
            </HeaderButton>
            
            <Divider />
            
            <ModePicker 
              value={modeName} 
              onChange={(e) => handleModeChange(e.target.value)}
              title="Select ASMBLR Mode"
            >
              {Object.entries(EnhancedModes).map(([key, mode]) => (
                <option key={key} value={key}>
                  {mode.label}
                </option>
              ))}
            </ModePicker>
          </HeaderSection>

          <HeaderNav>
            <HeaderButton
              onClick={() => setSettingsOpen(true)}
              title="Interface Settings"
              $active={settingsOpen}
            >
              <IconWrapper><SettingOutlined /></IconWrapper>
              Settings
            </HeaderButton>
          </HeaderNav>
        </HeaderContent>
      </HeaderContainer>

      <SettingsDialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />
    </>
  );
};