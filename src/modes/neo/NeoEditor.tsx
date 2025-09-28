import React, { useEffect } from 'react';
import { useReactFlowEditor } from '../../components/editors/reactflow_editor';
import { useModeContext } from '../ModeContext';

export const NeoEditor: React.FC = () => {
  const { actions } = useModeContext();
  const editor = useReactFlowEditor({ modeName: 'neo' });

  // Update the mode context when the editor changes
  useEffect(() => {
    if (editor) {
      // Listen for changes in the node graph and update the context
      // This is where you'd implement the logic to convert the node graph
      // to shader code and extract uniforms
      actions.updateNodeGraph(editor);
    }
  }, [editor, actions]);

  return <>{editor.view}</>;
};
