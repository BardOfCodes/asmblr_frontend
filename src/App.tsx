import React, { useRef, useState, useEffect } from 'react';
// import { CodeEditor } from './components/CodeEditor';
import { ModePicker } from './components/ModePicker';
import { AsmblrApp } from './AsmblrApp';

import { AvailableModes, loadModeFromDisk, saveModeToDisk } from './modes';
import type { ViewerHandle, EditorHandle, AsmblrMode } from './modes/types';

// import { NewReglViewer, ReglViewerHandle } from './components/NewReglViewer';
// import { ControlPanel } from './components/ControlPanel';
// import { useEditor } from './components/NodeEditor';


const App: React.FC = () => {
  const [modeName, setModeName] = useState<string | null>(null);
  const [mode, setMode] = useState<AsmblrMode | null>(null);

  useEffect(() => {
    const saved = loadModeFromDisk();
    if (saved && AvailableModes[saved]) {
      setModeName(saved);
      setMode(AvailableModes[saved]);
    }
  }, []);

  const handleModeChange = (name: string) => {
    saveModeToDisk(name);
    setModeName(name);
    setMode(AvailableModes[name]);
  };

  if (!mode) {
    return (
      <ModePicker
        selected={modeName ?? ''}
        options={Object.keys(AvailableModes)}
        onChange={handleModeChange}
      />
    );
  }

  return <AsmblrApp mode={mode} modeName={modeName!} setMode={handleModeChange} />;
};

export default App;