import React, { useState, useEffect } from 'react';
import { SettingOutlined, SaveOutlined, FolderOpenOutlined, FileOutlined } from '@ant-design/icons';
import { 
  HeaderContainer, 
  HeaderContent, 
  HeaderTitle, 
  HeaderNav, 
  HeaderButton,
  HeaderSection,
  HeaderDivider,
  HeaderModePicker,
  HeaderIconWrapper
} from '../../design/components';
import { useProjectPicker } from '../utils/project-picker';
import { useProjectSaver } from '../utils/project-saver';
import { EnhancedModes, saveEnhancedModeToDisk } from '../../modes/enhanced';
import { SettingsDialog } from '../control-panel/SettingsDialog';

interface EnhancedHeaderProps {
  modeName: string;
  setMode: (name: string) => void;
}


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
            
            <HeaderDivider />
            
            <HeaderButton onClick={handleNew} title="New Project">
              <HeaderIconWrapper><FileOutlined /></HeaderIconWrapper>
              New
            </HeaderButton>
            
            <HeaderButton onClick={handleLoad} title="Open Project">
              <HeaderIconWrapper><FolderOpenOutlined /></HeaderIconWrapper>
              Open
            </HeaderButton>
            
            <HeaderButton onClick={handleSave} title="Save Project">
              <HeaderIconWrapper><SaveOutlined /></HeaderIconWrapper>
              Save
            </HeaderButton>
            
            <HeaderDivider />
            
            <HeaderModePicker 
              value={modeName} 
              onChange={(e) => handleModeChange(e.target.value)}
              title="Select ASMBLR Mode"
            >
              {Object.entries(EnhancedModes).map(([key, mode]) => (
                <option key={key} value={key}>
                  {mode.label}
                </option>
              ))}
            </HeaderModePicker>
          </HeaderSection>

          <HeaderNav>
            <HeaderButton
              onClick={() => setSettingsOpen(true)}
              title="Interface Settings"
              $active={settingsOpen}
            >
              <HeaderIconWrapper><SettingOutlined /></HeaderIconWrapper>
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