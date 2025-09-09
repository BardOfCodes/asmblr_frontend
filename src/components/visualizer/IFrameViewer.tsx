import React, { useImperativeHandle, forwardRef, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { ViewerHandle } from '../../modes/types';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.backgroundSecondary};
`;

const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: white;
`;

const StatusBar = styled.div`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.backgroundTertiary};
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textSecondary};
  border-bottom: 1px solid ${theme.colors.border};
`;

export interface IFrameViewerHandle extends ViewerHandle {
  loadHTML: (htmlContent: string) => void;
  loadURL: (url: string) => void;
  getIFrameElement: () => HTMLIFrameElement | null;
}

export const IFrameViewer = forwardRef<IFrameViewerHandle>((_, ref) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<string>('Ready');
  const [currentSource, setCurrentSource] = useState<string>('');

  const loadHTML = (htmlContent: string) => {
    if (iframeRef.current) {
      try {
        // Create a blob URL for the HTML content
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        iframeRef.current.src = url;
        setCurrentSource('HTML Content');
        setStatus('Loaded HTML content');
        
        // Clean up the blob URL after a delay
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (error) {
        console.error('Error loading HTML content:', error);
        setStatus('Error loading HTML content');
      }
    }
  };

  const loadURL = (url: string) => {
    if (iframeRef.current) {
      try {
        iframeRef.current.src = url;
        setCurrentSource(url);
        setStatus(`Loading: ${url}`);
      } catch (error) {
        console.error('Error loading URL:', error);
        setStatus('Error loading URL');
      }
    }
  };

  const getIFrameElement = () => {
    return iframeRef.current;
  };

  // Handle iframe load events
  const handleIFrameLoad = () => {
    setStatus(`Loaded: ${currentSource}`);
  };

  const handleIFrameError = () => {
    setStatus(`Error loading: ${currentSource}`);
  };

  useImperativeHandle(ref, () => ({
    loadHTML,
    loadURL,
    getIFrameElement,
    // Legacy ViewerHandle methods (no-ops for iframe)
    setShaderCode: () => console.log('setShaderCode not supported in IFrameViewer'),
    setUniform: () => console.log('setUniform not supported in IFrameViewer'),
    captureScreenshot: () => console.log('captureScreenshot not supported in IFrameViewer'),
  }));

  return (
    <Container>
      <StatusBar>
        {status}
      </StatusBar>
      <IFrame
        ref={iframeRef}
        onLoad={handleIFrameLoad}
        onError={handleIFrameError}
        title="HTML Viewer"
      />
    </Container>
  );
});

IFrameViewer.displayName = 'IFrameViewer';

export default IFrameViewer;
