import React, { useState, useEffect } from 'react';
import { SettingOutlined, SaveOutlined, FolderOpenOutlined, FileOutlined } from '@ant-design/icons';
import { notifications } from '../../utils/notifications';
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
import { Modes, saveModeToDisk } from '../../modes/modes';
import { SettingsDialog } from '../control-panel/SettingsDialog';
import { useProjectActions } from '../editors/reactflow_editor/hooks/useProjectActions';
import { useMigumiProjectActions } from '../editors/reactflow_editor/hooks/useMigumiProjectActions';
import { debug } from '../../utils/debug';

import { EditorHandle } from '../../types/editor';

interface HeaderProps {
  editor: EditorHandle;
  modeName: string;
  setMode: (name: string) => void;
}


export const Header: React.FC<HeaderProps> = ({ 
  editor: _editor, // Keep for interface compatibility but not used in ReactFlow mode
  modeName, 
  setMode 
}) => {
  const [_open, file] = useProjectPicker(); // Keep for potential future use
  const [_save] = useProjectSaver('project.json'); // Keep for potential future use
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Project management actions - use Migumi-specific actions for Migumi mode
  const standardProjectActions = useProjectActions();
  const migumiProjectActions = useMigumiProjectActions();
  const projectActions = modeName === 'Migumi Graph' ? migumiProjectActions : standardProjectActions;

  const handleSave = async () => {
    debug.log('Save clicked - current mode:', modeName);
    
    if (!projectActions.isAvailable()) {
      debug.warn('React Flow editor not available - please switch to React Flow editor mode to save projects');
      alert('Please switch to React Flow editor mode to save projects');
      return;
    }

    // Use React Flow export system with automatic cleanup
    const filename = `asmblr-project-${new Date().toISOString().split('T')[0]}`;
    debug.log('Exporting React Flow project with cleanup:', filename);
    
    const result = await projectActions.exportProject(filename);
    debug.log('Export result:', result);
    
    if (result.success) {
      debug.log('✅ Export successful (with cleanup):', result.message);
      notifications.success('Project exported successfully with cleaned connections');
    } else {
      debug.error('❌ Export failed:', result.message);
      notifications.error(`Export failed: ${result.message}`);
    }
  };

  const handleLoad = async () => {
    if (!projectActions.isAvailable()) {
      debug.warn('React Flow editor not available - please switch to React Flow editor mode to load projects');
      alert('Please switch to React Flow editor mode to load projects');
      return;
    }

    // Create file input for importing React Flow projects
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.asmblr.json,.json';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          debug.log('Importing React Flow project:', file.name);
          const result = await projectActions.importProject(file);
          debug.log('Import result:', result);
          
          if (result.success) {
            debug.log('✅ Import successful:', result.message);
            notifications.success('Project imported successfully');
          } else {
            debug.error('❌ Import failed:', result.message);
            notifications.error(`Import failed: ${result.message}`);
          }
        } catch (error) {
          debug.error('❌ Import error:', error);
          alert(`Import failed: ${error}`);
        }
      }
    };
    input.click();
  };

  const handleNew = () => {
    if (confirm('Create a new project? This will clear the current work.')) {
      if (!projectActions.isAvailable()) {
        debug.warn('React Flow editor not available - please switch to React Flow editor mode');
        alert('Please switch to React Flow editor mode to create new projects');
        return;
      }

      const result = projectActions.newProject();
      debug.log('New project result:', result);
      
      if (result.success) {
        debug.log('✅ New project successful:', result.message);
        notifications.success('New project created successfully');
      } else {
        debug.error('❌ New project failed:', result.message);
        notifications.error(`New project failed: ${result.message}`);
      }
    }
  };

  const handleModeChange = (newMode: string) => {
    if (newMode !== modeName) {
      saveModeToDisk(newMode);
      setMode(newMode);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (file) {
      // TODO: Implement project loading through mode context
      debug.log('Loading project file:', file);
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
              {Object.entries(Modes).map(([key, mode]) => (
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