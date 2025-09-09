import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { CleanAsmblrMode, ViewerHandle } from '../../modes/types';
import { ModeProvider } from '../../modes/ModeContext';

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "A A A"
    "B B C"
    "D D D";
  gap: 0;
  height: 100vh;
  width: 100vw;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  background: ${theme.colors.white};
  
  .space-a {
    grid-area: A;
    min-height: 56px;
  }
  .space-b {
    grid-area: B;
    min-height: 300px;
  }
  .space-c {
    grid-area: C;
    min-height: 300px;
  }
  .space-d {
    grid-area: D;
    min-height: 120px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    grid-template-areas: 
      "A"
      "B"
      "C"
      "D";
    gap: 0;
    padding: 0;
  }
`;

const Panel = styled.div`
  background: ${theme.colors.white};
  border: none;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
  height: 100%;
  transition: none;
`;

interface CleanModeLayoutProps {
  mode: CleanAsmblrMode;
  modeName: string;
  setMode: (name: string) => void;
  HeaderComponent: React.ComponentType<{
    modeName: string;
    setMode: (name: string) => void;
  }>;
}

export const CleanModeLayout: React.FC<CleanModeLayoutProps> = ({ 
  mode, 
  modeName, 
  setMode,
  HeaderComponent 
}) => {
  const viewerRef = useRef<ViewerHandle>(null);
  
  // Initialize mode when component mounts
  useEffect(() => {
    mode.initialize?.();
    
    // Cleanup when component unmounts
    return () => {
      mode.cleanup?.();
    };
  }, [mode]);

  const handleShaderGenerated = (shaderCode: string) => {
    console.log('Shader generated in layout:', shaderCode);
    // The viewer will automatically update through the context
  };

  const EditorComponent = mode.editor.Component;
  const ViewerComponent = mode.viewer.Component;
  const ControlPanelComponent = mode.controlPanel.Component;

  return (
    <ModeProvider onShaderGenerated={handleShaderGenerated}>
      <Content>
        <Panel className="space-a">
          <HeaderComponent 
            modeName={modeName} 
            setMode={setMode} 
          />
        </Panel>
        
        <Panel className="space-b">
          <EditorComponent />
        </Panel>
        
        <Panel className="space-c">
          <ViewerComponent ref={viewerRef} />
        </Panel>
        
        <Panel className="space-d">
          <ControlPanelComponent />
        </Panel>
      </Content>
    </ModeProvider>
  );
};
