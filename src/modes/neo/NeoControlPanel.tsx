import React from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { useModeContext } from '../ModeContext';

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

export const NeoControlPanel: React.FC = () => {
  const { data, actions } = useModeContext();
  const [isTestingIframe, setIsTestingIframe] = React.useState(false);

  const handleGenerateShader = () => {
    // Switch back to shader mode
    actions.setViewerMode('shader');
    
    // Neo-specific shader generation logic
    if (data.nodeGraph) {
      // This is where you'd implement the Neo graph to GLSL conversion
      const generatedShader = generateNeoShader(data.nodeGraph);
      actions.updateShaderCode(generatedShader);
      console.log('Generated Neo shader:', generatedShader);
    } else {
      console.log('No node graph available for shader generation');
    }
    
    actions.generateShader();
  };

  const handleTestIframe = async () => {
    setIsTestingIframe(true);
    try {
      await actions.testIframe();
    } catch (error) {
      console.error('Error testing iframe:', error);
    } finally {
      setIsTestingIframe(false);
    }
  };

  // Placeholder for Neo-specific shader generation
  const generateNeoShader = (nodeGraph: any): string => {
    // TODO: Implement Neo graph to GLSL conversion
    return `
      // Generated Neo Shader
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 color = vec3(uv.x, uv.y, sin(time));
        gl_FragColor = vec4(color, 1.0);
      }
    `;
  };

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={handleGenerateShader}>
          Generate Neo Shader
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
        <div>Viewer Mode: {data.viewerMode}</div>
        <div>Node Graph: {data.nodeGraph ? 'Loaded' : 'No graph'}</div>
        <div>Shader Code: {data.shaderCode ? 'Generated' : 'None'}</div>
        <div>HTML Content: {data.htmlContent ? 'Loaded' : 'None'}</div>
        <div>Uniforms: {Object.keys(data.uniforms || {}).length} variables</div>
      </InfoSection>
    </Container>
  );
};
