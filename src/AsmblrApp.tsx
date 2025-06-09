// src/AsmblrApp.tsx
import React, { useRef } from 'react';
import styled from 'styled-components';
import type { AsmblrMode, ViewerHandle } from './modes/types';

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "A A A"
    "B B C"
    "D D D";
  grid-gap: 1em;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  
  .space-a {
    grid-area: A;
  }
  .space-b {
    grid-area: B;
  }
  .space-c {
    grid-area: C;
  }
  .space-d {
    grid-area: D;
  }
`;

const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
`;

const SquareContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* Maintain 1:1 aspect ratio */
`;

const SquareContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
export const AsmblrApp: React.FC<{
  mode: AsmblrMode;
  modeName: string;
  setMode: (name: string) => void;
}> = ({ mode, modeName, setMode }) => {
  const viewerRef = useRef<ViewerHandle>(null);
  const editor = mode.useEditor();
  const Viewer = mode.ViewerComponent;
  const ControlPanel = mode.ControlPanelComponent;

  return (
    <Content>
      <Card className="space-a">
        {/* Replace with HeaderComponent from mode, or import Header directly */}
        <mode.HeaderComponent editor={editor} modeName={modeName} setMode={setMode} />

      </Card>
      <Card className="space-b">
        <Card>{editor.view}</Card>
      </Card>
      <Card className="space-c">
        <SquareContainer>
          <SquareContent>
            <Viewer ref={viewerRef} />
          </SquareContent>
        </SquareContainer>
      </Card>
      <Card className="space-d">
        <ControlPanel editor={editor} viewerRef={viewerRef} />
      </Card>
    </Content>
  );
};