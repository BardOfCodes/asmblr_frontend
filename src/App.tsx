import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';
// import { CodeEditor } from './components/CodeEditor';
import { NewReglViewer, ReglViewerHandle } from './components/NewReglViewer';
import { ControlPanel } from './components/ControlPanel';
import { useEditor } from './components/NodeEditor';

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
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

const App: React.FC = () => {
  const reglViewerRef = useRef<ReglViewerHandle>(null);
  const editor = useEditor({}); // For the node editor

  return (
    <Content>
      <Card className="space-a">
        <Header editor={editor}/>
      </Card>
      <Card className="space-b">
          <Card> {editor.view} </Card> 
      </Card>
      <Card className="space-c">
        <SquareContainer>
          <SquareContent>
            <NewReglViewer ref={reglViewerRef} />
          </SquareContent>
        </SquareContainer>
      </Card>
      <Card className="space-d">
        <ControlPanel
          reglViewerRef={reglViewerRef}
          editor={editor} // Pass the editor
        />
      </Card>
    </Content>
  );
};

export default App;