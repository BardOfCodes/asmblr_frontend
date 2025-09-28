import React, { useState, useEffect } from 'react';
import { AppProvider } from './store/AppContext';
import { SettingsProvider } from './store/SettingsContext';
import { ModularLayout } from './components/layout/ModularLayout';
import { ModePicker } from './components/header/ModePicker';
import { SimpleDebugLayout } from './components/layout/SimpleDebugLayout';
import { Modes, loadModeFromDisk, saveModeToDisk } from './modes/modes';
import { AsmblrMode } from './modes/types';
import { debug } from './utils/debug';

const AppContent: React.FC = () => {
  const [modeName, setModeName] = useState<string | null>(null);
  const [mode, setMode] = useState<AsmblrMode | null>(null);

  useEffect(() => {
    debug.log('Loading enhanced mode from disk...');
    const saved = loadModeFromDisk();
    debug.log('Saved mode:', saved);
    debug.log('Available modes:', Object.keys(Modes));
    
    // Only auto-load if there's a saved mode, otherwise show mode picker
    if (saved && Modes[saved]) {
      debug.log('Loading saved mode:', saved);
      setModeName(saved);
      setMode(Modes[saved]);
    } else {
      debug.log('No saved mode found, showing mode picker');
      // Leave modeName and mode as null to show the picker
    }
  }, []);

  const handleModeChange = (name: string) => {
    debug.log('Mode changed to:', name);
    debug.log('Available modes:', Object.keys(Modes));
    debug.log('Selected mode exists:', !!Modes[name]);
    
    if (Modes[name]) {
      saveModeToDisk(name);
      setModeName(name);
      setMode(Modes[name]);
      debug.log('Mode set successfully:', name);
    } else {
      debug.error('Mode not found:', name);
    }
  };

  debug.log('Current state - modeName:', modeName, 'mode:', mode);

  if (!mode) {
    debug.log('Showing mode picker');
    return (
      <ModePicker
        selected={modeName ?? ''}
        options={Object.keys(Modes)}
        onChange={handleModeChange}
      />
    );
  }

  // Ensure we have a valid mode name
  if (!modeName) {
    debug.warn('Mode is set but modeName is null, using fallback');
    const fallbackName = Object.keys(Modes)[0];
    setModeName(fallbackName);
  }

  debug.log('Showing enhanced modular layout');
  
  // Add error boundary
  try {
    return (
      <ModularLayout 
        mode={mode} 
        modeName={modeName!} 
        setMode={handleModeChange} 
      />
    );
  } catch (error) {
    debug.error('Error in ModularLayout:', error);
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
export const App: React.FC = () => {
  return (
    <AppProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </AppProvider>
  );
};
