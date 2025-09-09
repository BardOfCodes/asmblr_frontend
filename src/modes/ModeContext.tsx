import React, { createContext, useContext, useCallback, useState } from 'react';

// Data that flows between components in a mode
export interface ModeData {
  shaderCode?: string;
  uniforms?: Record<string, any>;
  nodeGraph?: any;
  htmlContent?: string;
  viewerMode?: 'shader' | 'iframe';
  [key: string]: any;
}

// Actions that components can perform
export interface ModeActions {
  updateShaderCode: (code: string) => void;
  updateUniform: (name: string, value: any) => void;
  updateUniforms: (uniforms: Record<string, any>) => void;
  updateNodeGraph: (graph: any) => void;
  updateHtmlContent: (html: string) => void;
  setViewerMode: (mode: 'shader' | 'iframe') => void;
  generateShader: () => void;
  testIframe: () => Promise<void>;
  [key: string]: any;
}

export interface ModeContextValue {
  data: ModeData;
  actions: ModeActions;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export const useModeContext = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useModeContext must be used within a ModeProvider');
  }
  return context;
};

interface ModeProviderProps {
  children: React.ReactNode;
  onShaderGenerated?: (shaderCode: string) => void;
}

export const ModeProvider: React.FC<ModeProviderProps> = ({ 
  children, 
  onShaderGenerated 
}) => {
  const [data, setData] = useState<ModeData>({
    shaderCode: '',
    uniforms: {},
    nodeGraph: null,
    htmlContent: '',
    viewerMode: 'shader',
  });

  const updateShaderCode = useCallback((code: string) => {
    setData(prev => ({ ...prev, shaderCode: code }));
  }, []);

  const updateUniform = useCallback((name: string, value: any) => {
    setData(prev => ({
      ...prev,
      uniforms: { ...prev.uniforms, [name]: value }
    }));
  }, []);

  const updateUniforms = useCallback((uniforms: Record<string, any>) => {
    setData(prev => ({ ...prev, uniforms }));
  }, []);

  const updateNodeGraph = useCallback((graph: any) => {
    setData(prev => ({ ...prev, nodeGraph: graph }));
  }, []);

  const updateHtmlContent = useCallback((html: string) => {
    setData(prev => ({ ...prev, htmlContent: html }));
  }, []);

  const setViewerMode = useCallback((mode: 'shader' | 'iframe') => {
    setData(prev => ({ ...prev, viewerMode: mode }));
  }, []);

  const generateShader = useCallback(() => {
    // This will be implemented by each mode's specific logic
    console.log('Generating shader from node graph:', data.nodeGraph);
    if (onShaderGenerated && data.shaderCode) {
      onShaderGenerated(data.shaderCode);
    }
  }, [data.nodeGraph, data.shaderCode, onShaderGenerated]);

  const testIframe = useCallback(async () => {
    try {
      console.log('Fetching HTML from backend...');
      
      // First, try to get HTML from backend
      try {
        const response = await fetch('/api/test-html', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (response.ok) {
          const htmlContent = await response.text();
          updateHtmlContent(htmlContent);
          setViewerMode('iframe');
          console.log('HTML loaded successfully from backend');
          return; // Success, exit early
        } else {
          throw new Error(`Backend responded with status: ${response.status}`);
        }
      } catch (backendError) {
        console.warn('Backend request failed, falling back to default HTML file:', backendError);
        
        // Fallback: Load the default_iframe_load.html file
        try {
          const fileResponse = await fetch('/src/assets/default_iframe_load.html');
          
          if (fileResponse.ok) {
            const htmlContent = await fileResponse.text();
            updateHtmlContent(htmlContent);
            setViewerMode('iframe');
            console.log('Successfully loaded default_iframe_load.html');
            return; // Success, exit early
          } else {
            throw new Error(`Failed to load default HTML file: ${fileResponse.status}`);
          }
        } catch (fileError) {
          console.error('Could not load default HTML file, using inline fallback:', fileError);
          
          // Final fallback: Inline HTML
          const errorHTML = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Connection Error</title>
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
          updateHtmlContent(errorHTML);
          setViewerMode('iframe');
        }
      }
    } catch (error) {
      console.error('Unexpected error in testIframe:', error);
    }
  }, [updateHtmlContent, setViewerMode]);

  const actions: ModeActions = {
    updateShaderCode,
    updateUniform,
    updateUniforms,
    updateNodeGraph,
    updateHtmlContent,
    setViewerMode,
    generateShader,
    testIframe,
  };

  return (
    <ModeContext.Provider value={{ data, actions }}>
      {children}
    </ModeContext.Provider>
  );
};
