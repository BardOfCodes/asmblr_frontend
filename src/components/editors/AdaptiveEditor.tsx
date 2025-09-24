import { useState, useMemo } from 'react';
import { useSettings, EditorType } from '../../store/SettingsContext';
import { useEditor as useNodeEditor } from './NodeEditor';
import { CodeEditor } from './CodeEditor';
import { useReactFlowEditor } from './reactflow_editor';
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
  
  // React Flow editor hook
  const reactFlowEditor = useReactFlowEditor({ modeName });
  
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
    switch (selectedEditor) {
      case 'reactflow_editor':
        return {
          ...reactFlowEditor,
          type: 'reactflow_editor' as EditorType,
        };
      case 'code_editor':
        return {
          view: codeEditorView,
          type: 'code_editor' as EditorType,
          getCode: () => code,
          setCode: setCode,
          // Add any other code editor specific methods
        };
      default:
        return {
          ...nodeEditor,
          type: 'rete_node_editor' as EditorType,
          // Keep all existing node editor functionality
        };
    }
  }, [selectedEditor, reactFlowEditor, codeEditorView, nodeEditor, code]);
}

// Ensure Fast Refresh compatibility
useAdaptiveEditor.displayName = 'useAdaptiveEditor';
