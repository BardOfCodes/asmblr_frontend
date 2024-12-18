import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('# Write your Python code here\n');

  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      value={code}
      onChange={(value) => setCode(value || '')}
      theme="vs-dark"
    />
  );
};
