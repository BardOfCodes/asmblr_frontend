import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { NewReglViewer, ReglViewerHandle } from '../../components/visualizer/NewReglViewer';
import { IFrameViewer, IFrameViewerHandle } from '../../components/visualizer/IFrameViewer';
import { useModeContext } from '../ModeContext';
import { ViewerHandle } from '../types';

export const NeoViewer = forwardRef<ViewerHandle>((_, ref) => {
  const { data } = useModeContext();
  const shaderViewerRef = React.useRef<ReglViewerHandle>(null);
  const iframeViewerRef = React.useRef<IFrameViewerHandle>(null);

  // Update shader viewer when shader code or uniforms change
  useEffect(() => {
    if (shaderViewerRef.current && data.shaderCode) {
      shaderViewerRef.current.setShaderCode(data.shaderCode);
    }
  }, [data.shaderCode]);

  useEffect(() => {
    if (shaderViewerRef.current && data.uniforms) {
      Object.entries(data.uniforms).forEach(([name, value]) => {
        shaderViewerRef.current?.setUniform(name, value);
      });
    }
  }, [data.uniforms]);

  // Update iframe viewer when HTML content changes
  useEffect(() => {
    if (iframeViewerRef.current && data.htmlContent) {
      iframeViewerRef.current.loadHTML(data.htmlContent);
    }
  }, [data.htmlContent]);

  // Expose viewer methods to parent components
  useImperativeHandle(ref, () => ({
    setShaderCode: (code: string) => {
      shaderViewerRef.current?.setShaderCode(code);
    },
    setUniform: (name: string, value: any) => {
      shaderViewerRef.current?.setUniform(name, value);
    },
    captureScreenshot: () => {
      shaderViewerRef.current?.captureScreenshot();
    },
    // Additional methods for iframe viewer
    loadHTML: (html: string) => {
      iframeViewerRef.current?.loadHTML(html);
    },
    loadURL: (url: string) => {
      iframeViewerRef.current?.loadURL(url);
    },
  }));

  // Render the appropriate viewer based on mode
  if (data.viewerMode === 'iframe') {
    return <IFrameViewer ref={iframeViewerRef} />;
  } else {
    return <NewReglViewer ref={shaderViewerRef} />;
  }
});
