import React, { useState, useMemo } from 'react';
import { useSettings, EditorType } from '../../store/SettingsContext';
import { useEditor as useNodeEditor } from './NodeEditor';
import { CodeEditor } from './CodeEditor';
import { EditorHandle } from '../../modes/types';

interface AdaptiveEditorProps {
  modeName: string;
}

// Hook to create an adaptive editor that switches between node and code editor
export function useAdaptiveEditor({ modeName }: AdaptiveEditorProps): EditorHandle {
  const { settings } = useSettings();
  const selectedEditor = settings.ui.components.selectedEditor;
  
  // Node editor hook
  const nodeEditor = useNodeEditor({ modeName });
  
  // Code editor state
  const [code, setCode] = useState('# Python code editor\n# Write your code here...\n');
  
  // Code editor component
  const codeEditorView = useMemo(() => (
    <CodeEditor 
      code={code} 
      setCode={setCode}
    />
  ), [code]);

  // Return the appropriate editor based on settings
  return useMemo(() => {
    if (selectedEditor === 'code_editor') {
      return {
        view: codeEditorView,
        type: 'code_editor' as EditorType,
        getCode: () => code,
        setCode: setCode,
        // Add any other code editor specific methods
      };
    } else {
      return {
        ...nodeEditor,
        type: 'rete_node_editor' as EditorType,
        // Keep all existing node editor functionality
      };
    }
  }, [selectedEditor, codeEditorView, nodeEditor, code]);
}
