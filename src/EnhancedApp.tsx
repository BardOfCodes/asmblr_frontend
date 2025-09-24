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
    
    // Only auto-load if there's a saved mode, otherwise show mode picker
    if (saved && EnhancedModes[saved]) {
      console.log('Loading saved mode:', saved);
      setModeName(saved);
      setMode(EnhancedModes[saved]);
    } else {
      console.log('No saved mode found, showing mode picker');
      // Leave modeName and mode as null to show the picker
    }
  }, []);

  const handleModeChange = (name: string) => {
    console.log('Mode changed to:', name);
    console.log('Available modes:', Object.keys(EnhancedModes));
    console.log('Selected mode exists:', !!EnhancedModes[name]);
    
    if (EnhancedModes[name]) {
      saveEnhancedModeToDisk(name);
      setModeName(name);
      setMode(EnhancedModes[name]);
      console.log('Mode set successfully:', name);
    } else {
      console.error('Mode not found:', name);
    }
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

  // Ensure we have a valid mode name
  if (!modeName) {
    console.warn('Mode is set but modeName is null, using fallback');
    const fallbackName = Object.keys(EnhancedModes)[0];
    setModeName(fallbackName);
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
