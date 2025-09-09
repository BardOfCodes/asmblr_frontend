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
      
      // Create test HTML content
      const testHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Test HTML</title>
          <style>
            body { 
              font-family: 'Lato', sans-serif; 
              margin: 40px; 
              background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
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
            .timestamp { 
              font-size: 0.9em; 
              opacity: 0.8; 
              margin-top: 20px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 Test HTML Content</h1>
            <p>This HTML was generated for iframe testing!</p>
            <p>The iframe viewer is working correctly.</p>
            <div class="timestamp">Generated at: ${new Date().toLocaleString()}</div>
          </div>
        </body>
        </html>
      `;

      if (viewerRef.current && viewerRef.current.loadHTML) {
        viewerRef.current.loadHTML(testHTML);
        console.log('Loaded test HTML into iframe');
      } else {
        console.log('Viewer does not support loadHTML method');
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
