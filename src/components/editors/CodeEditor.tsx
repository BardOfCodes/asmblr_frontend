import React, { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import styled from 'styled-components';
import { Button } from '../../design/components';
import { theme } from '../../design/theme';

interface CodeEditorProps {
  code: string;
  setCode: (newCode: string) => void;
}

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1e1e1e;
`;

const EditorToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: #2d2d30;
  border-bottom: 1px solid #3e3e42;
  flex-shrink: 0;
`;

const FontSizeControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: #cccccc;
  font-size: ${theme.typography.fontSize.sm};
`;

const FontSizeButton = styled.button`
  background: #0e639c;
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  
  &:hover {
    background: #1177bb;
  }
  
  &:disabled {
    background: #3e3e42;
    color: #858585;
    cursor: not-allowed;
  }
`;

const EditorWrapper = styled.div`
  flex: 1;
  min-height: 0;
`;

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  const editorRef = useRef<any>(null);
  const [fontSize, setFontSize] = useState(14);

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 1, 24);
    setFontSize(newSize);
    editorRef.current?.updateOptions({ fontSize: newSize });
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 1, 10);
    setFontSize(newSize);
    editorRef.current?.updateOptions({ fontSize: newSize });
  };

  const resetFontSize = () => {
    const defaultSize = 14;
    setFontSize(defaultSize);
    editorRef.current?.updateOptions({ fontSize: defaultSize });
  };

  const formatCode = () => {
    editorRef.current?.getAction('editor.action.formatDocument')?.run();
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Enable Python IntelliSense and validation
    monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: () => {
        // Basic Python completions
        const suggestions = [
          {
            label: 'print',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'print($1)',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Print to console'
          },
          {
            label: 'def',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'def ${1:function_name}($2):\n    $0',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a function'
          },
          {
            label: 'class',
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: 'class ${1:ClassName}:\n    def __init__(self$2):\n        $0',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a class'
          },
          {
            label: 'import',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'import $1',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Import a module'
          },
          {
            label: 'from',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'from $1 import $2',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Import from module'
          }
        ];
        
        return { suggestions };
      }
    });

    // Add keyboard shortcuts for font size  
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Equal, () => {
      increaseFontSize();
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Minus, () => {
      decreaseFontSize();
    });

    // Enable word wrap and other useful features
    editor.updateOptions({
      wordWrap: 'on',
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      insertSpaces: true,
      detectIndentation: false,
      renderWhitespace: 'selection',
      bracketPairColorization: { enabled: true },
      guides: {
        indentation: true,
        bracketPairs: true
      }
    });
  };

  return (
    <EditorContainer>
      <EditorToolbar>
        <FontSizeControl>
          <span>Font Size:</span>
          <FontSizeButton 
            onClick={decreaseFontSize}
            disabled={fontSize <= 10}
            title="Decrease font size (Ctrl+-)"
          >
            −
          </FontSizeButton>
          <span style={{ minWidth: '20px', textAlign: 'center' }}>{fontSize}</span>
          <FontSizeButton 
            onClick={increaseFontSize}
            disabled={fontSize >= 24}
            title="Increase font size (Ctrl+=)"
          >
            +
          </FontSizeButton>
          <FontSizeButton 
            onClick={resetFontSize}
            title="Reset font size"
            style={{ width: '32px' }}
          >
            ↺
          </FontSizeButton>
        </FontSizeControl>
        
        <Button 
          $variant="ghost" 
          $size="small" 
          onClick={formatCode}
          title="Format code (Shift+Alt+F)"
        >
          Format
        </Button>
      </EditorToolbar>
      
      <EditorWrapper>
        <Editor
          height="100%"
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            fontSize: fontSize,
            fontFamily: "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontLigatures: true,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            detectIndentation: false,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            minimap: { enabled: true },
            wordWrap: 'on',
            guides: {
              indentation: true,
              bracketPairs: true
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showClasses: true,
              showModules: true
            },
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false
            },
            parameterHints: { enabled: true },
            hover: { enabled: true },
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'mouseover',
            matchBrackets: 'always',
            autoIndent: 'full',
            formatOnPaste: true,
            formatOnType: true
          }}
        />
      </EditorWrapper>
    </EditorContainer>
  );
};