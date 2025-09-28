import React from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { generateShaderHtml, generateTWGLShaderCode, APIError } from '../../API';
import { useSettings } from '../../store/SettingsContext';
import { debug } from '../../utils/debug';
import { EditorHandle } from '../../types/editor';
import { ViewerHandle } from '../../types/viewer';

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
  editor: EditorHandle;
  viewerRef: React.RefObject<ViewerHandle>;
}

export const HybridControlPanel: React.FC<HybridControlPanelProps> = ({ 
  editor, 
  viewerRef 
}) => {
  const { settings } = useSettings();
  const [isTestingIframe, setIsTestingIframe] = React.useState(false);
  const [isGeneratingShader, setIsGeneratingShader] = React.useState(false);
  
  const selectedViewer = settings.ui.components.selectedViewer;

  const handleGenerateShader = async () => {
    setIsGeneratingShader(true);
    try {
      debug.log('Generating shader via backend...');
      
      // Extract serializable data from editor (avoid circular references)
      let moduleData = {};
      try {
        if (editor && typeof editor === 'object') {
          debug.log('Editor keys:', Object.keys(editor));
          
          // ReactFlow editor - get nodes and edges
          if (editor.getNodes && editor.getEdges) {
            debug.log('Using ReactFlow editor data');
            moduleData = {
              nodes: editor.getNodes(),
              edges: editor.getEdges()
            };
          } else {
            // For now, send empty object to test backend connection
            debug.log('Editor structure not recognized, sending empty payload');
            debug.log('Available editor properties:', Object.keys(editor));
            moduleData = {};
          }
        } else {
          debug.log('Editor is null or not an object:', typeof editor);
          moduleData = {};
        }
      } catch (extractError) {
        debug.warn('Could not extract editor data, using empty payload:', extractError);
        moduleData = {};
      }
      
      debug.log('Sending moduleData:', moduleData);
      debug.log('Selected viewer:', selectedViewer);
      
      if (selectedViewer === 'shader_viewer') {
        // Generate shader code for TWGL viewer using the new TWGL endpoint
        const result = await generateTWGLShaderCode({
          moduleData: moduleData,
          uniforms: {}, // Pass uniforms (empty for now)
          shaderSettings: settings.shaderGeneration.shaderSettings, // Pass shader settings
        });
        
        if (result.shaderCode && viewerRef.current && viewerRef.current.loadShaderCode) {
          viewerRef.current.loadShaderCode(result.shaderCode, result.uniforms, result.textures);
          debug.log('Successfully loaded TWGL shader code into viewer');
        } else {
          debug.error('Backend response missing shaderCode or loadShaderCode method not available:', result);
        }
      } else {
        // Generate HTML for iframe viewer
        const result = await generateShaderHtml({
          moduleData: moduleData,
          uniforms: {}, // Pass uniforms (empty for now)
        });
        
        if (result.html && viewerRef.current && viewerRef.current.loadHTML) {
          viewerRef.current.loadHTML(result.html);
          debug.log('Successfully loaded generated shader HTML into iframe');
        } else {
          debug.error('Backend response missing html field or loadHTML method not available:', result);
        }
      }
    } catch (error) {
      if (error instanceof APIError) {
        debug.error(`API Error [${error.endpoint}]:`, error.message);
        if (error.status) {
          debug.error('Status:', error.status);
        }
      } else {
        debug.error('Unexpected error generating shader:', error);
      }
    } finally {
      setIsGeneratingShader(false);
    }
  };

  const handleTestIframe = async () => {
    setIsTestingIframe(true);
    try {
      debug.log('Testing iframe functionality...');
      
      // First, try to ping the backend for HTML content
      try {
        debug.log('Attempting to fetch HTML from backend...');
        const backendResponse = await fetch('/api/test-html', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (backendResponse.ok) {
          const htmlContent = await backendResponse.text();
          
          if (viewerRef.current && viewerRef.current.loadHTML) {
            viewerRef.current.loadHTML(htmlContent);
            debug.log('Successfully loaded HTML from backend into iframe');
            return; // Success, exit early
          } else {
            debug.log('Viewer does not support loadHTML method');
            return;
          }
        } else {
          throw new Error(`Backend responded with status: ${backendResponse.status}`);
        }
      } catch (backendError) {
        debug.warn('Backend request failed, falling back to default HTML file:', backendError);
        
        // Fallback: Load the default_iframe_load.html file
        try {
          debug.log('Loading default iframe HTML file...');
          const fileResponse = await fetch('/src/assets/default_iframe_load.html');
          
          if (fileResponse.ok) {
            const htmlContent = await fileResponse.text();
            
            if (viewerRef.current && viewerRef.current.loadHTML) {
              viewerRef.current.loadHTML(htmlContent);
              debug.log('Successfully loaded default_iframe_load.html into iframe');
            } else {
              debug.log('Viewer does not support loadHTML method');
            }
          } else {
            throw new Error(`Failed to load default HTML file: ${fileResponse.status}`);
          }
        } catch (fileError) {
          debug.error('Could not load default HTML file, using inline fallback:', fileError);
          
          // Final fallback: Inline HTML if both backend and file fail
          const fallbackHTML = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Error - Fallback HTML</title>
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
                  text-align: left;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>⚠️ Connection Error</h1>
                <p>Could not connect to backend or load default HTML file</p>
                <p>Using emergency fallback content.</p>
                <div class="error">
                  <strong>Backend Error:</strong> ${backendError instanceof Error ? backendError.message : 'Unknown backend error'}<br>
                  <strong>File Error:</strong> ${fileError instanceof Error ? fileError.message : 'Unknown file error'}
                </div>
                <p><small>Generated at: ${new Date().toLocaleString()}</small></p>
              </div>
            </body>
            </html>
          `;
          
          if (viewerRef.current && viewerRef.current.loadHTML) {
            viewerRef.current.loadHTML(fallbackHTML);
            debug.log('Loaded emergency fallback HTML into iframe');
          }
        }
      }
    } catch (error) {
      debug.error('Unexpected error in iframe testing:', error);
    } finally {
      setIsTestingIframe(false);
    }
  };

  return (
    <Container>
      <ButtonGroup>
        <Button 
          onClick={handleGenerateShader}
          disabled={isGeneratingShader}
        >
          {isGeneratingShader ? 'Generating...' : `Generate ${selectedViewer === 'shader_viewer' ? 'Shader' : 'HTML'}`}
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
        <div>Viewer: {selectedViewer === 'shader_viewer' ? 'TWGL Shader Viewer' : 'HTML/iframe Viewer'} {viewerRef.current ? '(Ready)' : '(Not ready)'}</div>
        <div>Status: {isGeneratingShader ? `Generating ${selectedViewer === 'shader_viewer' ? 'shader' : 'HTML'}...` : isTestingIframe ? 'Testing iframe...' : 'Ready'}</div>
      </InfoSection>
    </Container>
  );
};
