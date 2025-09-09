import React, { useEffect } from 'react';
import { useEditor } from '../../components/editors/NodeEditor';
import { useModeContext } from '../ModeContext';

export const NeoEditor: React.FC = () => {
  const { actions } = useModeContext();
  const editor = useEditor({ modeName: 'neo' });

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
