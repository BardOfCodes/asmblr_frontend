import React from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';
import { CodeEditor } from './components/CodeEditor';
import { ReglViewer } from './components/ReglViewer';

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: 
    "A A"
    "B C";
  grid-gap: 1em;
  height: 100vh; /* Full window height */
  width: 100%;
  overflow: hidden; /* Prevent overflow */
  
  .btn-a {
    grid-area: A;
  }
  .btn-b {
    grid-area: B;
  }
  .btn-c {
    grid-area: C;
  }
`;

const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
  border-radius: 5px;
  overflow: hidden;
  height: 100%; /* Ensure the card fills its grid area */
`;

const App: React.FC = () => {

  const fragmentShader = `
  void main(void) {
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    gl_FragColor = vec4(col ,1.0);
  }
`;

  return (
    <Content>
      <Card className="btn-a">
        <Header />
      </Card>
      <Card className="btn-b">
        <CodeEditor />
      </Card>
      <Card className="btn-c">

      <div style={{ height: '100vh' }}>
        <ReglViewer />
      </div>
      </Card>
    </Content>
  );
};

export default App;
