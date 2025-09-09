import React from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${theme.spacing.lg};
  gap: ${theme.spacing.md};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  border: none;
  color: ${props => props.$variant === 'secondary' ? theme.colors.textPrimary : theme.colors.textInverse};
  background: ${props => props.$variant === 'secondary' ? theme.colors.backgroundSecondary : theme.colors.primary};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.normal};
  cursor: pointer;
  transition: background-color ${theme.transitions.fast};
  border-radius: 0;
  
  &:hover:not(:disabled) {
    background: ${props => props.$variant === 'secondary' ? theme.colors.backgroundTertiary : theme.colors.primaryHover};
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const InfoSection = styled.div`
  padding: ${theme.spacing.sm};
  background: ${theme.colors.backgroundSecondary};
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
`;

interface HybridControlPanelProps {
  editor: any;
  viewerRef: React.RefObject<any>;
}

export const HybridControlPanel: React.FC<HybridControlPanelProps> = ({ 
  editor, 
  viewerRef 
}) => {
  const [isTestingIframe, setIsTestingIframe] = React.useState(false);

  const handleGenerateShader = () => {
    // Generate a simple test shader
    const testShader = `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 color = vec3(uv.x, uv.y, sin(time * 2.0) * 0.5 + 0.5);
        gl_FragColor = vec4(color, 1.0);
      }
    `;
    
    if (viewerRef.current && viewerRef.current.setShaderCode) {
      viewerRef.current.setShaderCode(testShader);
      console.log('Generated test shader');
    }
  };

  const handleTestIframe = async () => {
    setIsTestingIframe(true);
    try {
      console.log('Testing iframe functionality...');
      
      // Load the simple_iframe_test.html file
      try {
        const response = await fetch('/src/assets/simple_iframe_test.html');
        if (response.ok) {
          const htmlContent = await response.text();
          
          if (viewerRef.current && viewerRef.current.loadHTML) {
            viewerRef.current.loadHTML(htmlContent);
            console.log('Loaded simple_iframe_test.html into iframe');
          } else {
            console.log('Viewer does not support loadHTML method');
          }
        } else {
          throw new Error(`Failed to load HTML file: ${response.status}`);
        }
      } catch (fetchError) {
        console.warn('Could not load simple_iframe_test.html, using fallback:', fetchError);
        
        // Fallback HTML if file loading fails
        const fallbackHTML = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Fallback Test HTML</title>
            <style>
              body { 
                font-family: 'Lato', sans-serif; 
                margin: 40px; 
                background: linear-gradient(45deg, #ff6b6b 0%, #ee5a24 100%);
                color: white;
                text-align: center;
              }
              .container {
                background: rgba(255,255,255,0.1);
                padding: 40px;
                border-radius: 10px;
                margin-top: 50px;
              }
              h1 { font-size: 2.5em; margin-bottom: 20px; }
              p { font-size: 1.2em; line-height: 1.6; }
              .error { 
                font-size: 0.9em; 
                opacity: 0.8; 
                margin-top: 20px;
                background: rgba(255,0,0,0.2);
                padding: 10px;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>⚠️ Fallback HTML Content</h1>
              <p>Could not load simple_iframe_test.html</p>
              <p>Using fallback content instead.</p>
              <div class="error">Error: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}</div>
            </div>
          </body>
          </html>
        `;
        
        if (viewerRef.current && viewerRef.current.loadHTML) {
          viewerRef.current.loadHTML(fallbackHTML);
          console.log('Loaded fallback HTML into iframe');
        }
      }
    } catch (error) {
      console.error('Error testing iframe:', error);
    } finally {
      setIsTestingIframe(false);
    }
  };

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={handleGenerateShader}>
          Generate Shader
        </Button>
        
        <Button 
          $variant="secondary" 
          onClick={handleTestIframe}
          disabled={isTestingIframe}
        >
          {isTestingIframe ? 'Loading...' : 'Test iframe'}
        </Button>
      </ButtonGroup>
      
      <InfoSection>
        <div>Editor: {editor ? 'Loaded' : 'Not loaded'}</div>
        <div>Viewer: {viewerRef.current ? 'Ready' : 'Not ready'}</div>
      </InfoSection>
    </Container>
  );
};
