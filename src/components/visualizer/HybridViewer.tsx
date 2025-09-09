import React, { useImperativeHandle, forwardRef } from 'react';
import IFrameViewer, { IFrameViewerHandle } from './IFrameViewer';
import { ViewerHandle } from '../../modes/types';

export interface HybridViewerHandle extends ViewerHandle {
  loadHTML: (htmlContent: string) => void;
  loadURL: (url: string) => void;
}

export const HybridViewer = forwardRef<HybridViewerHandle>((_, ref) => {
  const iframeViewerRef = React.useRef<IFrameViewerHandle>(null);

  useImperativeHandle(ref, () => ({
    // Legacy ViewerHandle methods (no-ops for iframe-only viewer)
    setShaderCode: () => console.log('setShaderCode not supported in iframe-only HybridViewer'),
    setUniform: () => console.log('setUniform not supported in iframe-only HybridViewer'),
    captureScreenshot: () => console.log('captureScreenshot not supported in iframe-only HybridViewer'),
    
    // Iframe viewer methods
    loadHTML: (htmlContent: string) => {
      iframeViewerRef.current?.loadHTML(htmlContent);
    },
    loadURL: (url: string) => {
      iframeViewerRef.current?.loadURL(url);
    },
  }));

  return <IFrameViewer ref={iframeViewerRef} />;
});

HybridViewer.displayName = 'HybridViewer';

export default HybridViewer;
