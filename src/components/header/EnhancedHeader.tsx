import React, { useState, useEffect } from 'react';
import { SettingOutlined, SaveOutlined, FolderOpenOutlined, FileOutlined, ExperimentOutlined } from '@ant-design/icons';
import { message } from 'antd';
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
import TestComponent from '../editors/reactflow_editor/core/TestComponent';
import { useProjectActions } from '../editors/reactflow_editor/hooks/useProjectActions';

interface EnhancedHeaderProps {
  editor: any; // EditorHandle from modes/types
  modeName: string;
  setMode: (name: string) => void;
}


export const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ 
  editor,
  modeName, 
  setMode 
}) => {
  const [open, file] = useProjectPicker();
  const [save] = useProjectSaver('project.json');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [testOpen, setTestOpen] = useState(false);

  // Project management actions
  const projectActions = useProjectActions();

  const handleSave = async () => {
    console.log('Save clicked - current mode:', modeName);
    
    if (!projectActions.isAvailable()) {
      console.warn('React Flow editor not available - please switch to React Flow editor mode to save projects');
      alert('Please switch to React Flow editor mode to save projects');
      return;
    }

    // Use React Flow export system
    const filename = `asmblr-project-${new Date().toISOString().split('T')[0]}`;
    console.log('Exporting React Flow project:', filename);
    
    const result = await projectActions.exportProject(filename);
    console.log('Export result:', result);
    
    if (result.success) {
      console.log('✅ Export successful:', result.message);
    } else {
      console.error('❌ Export failed:', result.message);
      alert(`Export failed: ${result.message}`);
    }
  };

  const handleLoad = async () => {
    if (!projectActions.isAvailable()) {
      console.warn('React Flow editor not available - please switch to React Flow editor mode to load projects');
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
          console.log('Importing React Flow project:', file.name);
          const result = await projectActions.importProject(file);
          console.log('Import result:', result);
          
          if (result.success) {
            console.log('✅ Import successful:', result.message);
          } else {
            console.error('❌ Import failed:', result.message);
            alert(`Import failed: ${result.message}`);
          }
        } catch (error) {
          console.error('❌ Import error:', error);
          alert(`Import failed: ${error}`);
        }
      }
    };
    input.click();
  };

  const handleNew = () => {
    if (confirm('Create a new project? This will clear the current work.')) {
      if (!projectActions.isAvailable()) {
        console.warn('React Flow editor not available - please switch to React Flow editor mode');
        alert('Please switch to React Flow editor mode to create new projects');
        return;
      }

      const result = projectActions.newProject();
      console.log('New project result:', result);
      
      if (result.success) {
        console.log('✅ New project successful:', result.message);
      } else {
        console.error('❌ New project failed:', result.message);
        alert(`New project failed: ${result.message}`);
      }
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
              onClick={() => setTestOpen(true)}
              title="Test Core System (Development)"
              $active={testOpen}
            >
              <HeaderIconWrapper><ExperimentOutlined /></HeaderIconWrapper>
              Test
            </HeaderButton>
            
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

      {/* Full-screen test modal */}
      {testOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'white',
          zIndex: 9999,
          padding: '20px',
          overflow: 'auto'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={() => setTestOpen(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1890ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ← Back to Main
            </button>
          </div>
          <TestComponent />
        </div>
      )}
    </>
  );
};