import React, { useState, useEffect } from 'react';
import { AppProvider } from './store/AppContext';
import { SettingsProvider } from './store/SettingsContext';
import { EnhancedModularLayout } from './components/layout/EnhancedModularLayout';
import { EnhancedModePicker } from './components/header/EnhancedModePicker';
import { SimpleDebugLayout } from './components/layout/SimpleDebugLayout';
import { EnhancedModes, loadEnhancedModeFromDisk, saveEnhancedModeToDisk } from './modes/enhanced';
import { AsmblrMode } from './modes/types';

const EnhancedAppContent: React.FC = () => {
  const [modeName, setModeName] = useState<string | null>(null);
  const [mode, setMode] = useState<AsmblrMode | null>(null);

  useEffect(() => {
    console.log('Loading enhanced mode from disk...');
    const saved = loadEnhancedModeFromDisk();
    console.log('Saved mode:', saved);
    console.log('Available modes:', Object.keys(EnhancedModes));
    
    // Use saved mode if available, otherwise default to Neo Graph
    const selectedMode = (saved && EnhancedModes[saved]) ? saved : 'Neo Graph';
    
    if (selectedMode && EnhancedModes[selectedMode]) {
      console.log('Setting mode:', selectedMode);
      setModeName(selectedMode);
      setMode(EnhancedModes[selectedMode]);
      
      // Save the default mode if none was saved before
      if (!saved) {
        saveEnhancedModeToDisk(selectedMode);
      }
    }
  }, []);

  const handleModeChange = (name: string) => {
    console.log('Mode changed to:', name);
    saveEnhancedModeToDisk(name);
    setModeName(name);
    setMode(EnhancedModes[name]);
  };

  console.log('Current state - modeName:', modeName, 'mode:', mode);

  if (!mode) {
    console.log('Showing mode picker');
    return (
      <EnhancedModePicker
        selected={modeName ?? ''}
        options={Object.keys(EnhancedModes)}
        onChange={handleModeChange}
      />
    );
  }

  console.log('Showing enhanced modular layout');
  
  // Add error boundary
  try {
    return (
      <EnhancedModularLayout 
        mode={mode} 
        modeName={modeName!} 
        setMode={handleModeChange} 
      />
    );
  } catch (error) {
    console.error('Error in EnhancedModularLayout:', error);
    return (
      <SimpleDebugLayout 
        modeName={modeName!}
        error={error instanceof Error ? error.message : 'Unknown error'}
      />
    );
  }
};

/**
 * Enhanced ASMBLR App with modular interface system
 * 
 * Features:
 * - Modular panel system (show/hide node editor, viewer, control panel)
 * - Settings dialog for interface customization
 * - New service layer architecture
 * - Centralized state management
 * - Clean component separation
 */
export const EnhancedApp: React.FC = () => {
  return (
    <AppProvider>
      <SettingsProvider>
        <EnhancedAppContent />
      </SettingsProvider>
    </AppProvider>
  );
};
