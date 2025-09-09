import React, { useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import styled from 'styled-components';
import { NewReglViewer, ReglViewerHandle } from './NewReglViewer';
import { IFrameViewer, IFrameViewerHandle } from './IFrameViewer';
import { ViewerHandle } from '../../modes/types';
import { theme } from '../../design/theme';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ModeToggle = styled.div`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  z-index: 10;
  display: flex;
  gap: ${theme.spacing.xs};
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? theme.colors.primary : theme.colors.backgroundSecondary};
  color: ${props => props.$active ? theme.colors.textInverse : theme.colors.textPrimary};
  border: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.xs};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${props => props.$active ? theme.colors.primaryHover : theme.colors.backgroundTertiary};
  }
`;

export interface HybridViewerHandle extends ViewerHandle {
  loadHTML: (htmlContent: string) => void;
  loadURL: (url: string) => void;
  switchMode: (mode: 'shader' | 'iframe') => void;
}

export const HybridViewer = forwardRef<HybridViewerHandle>((_, ref) => {
  const [viewerMode, setViewerMode] = useState<'shader' | 'iframe'>('shader');
  const shaderViewerRef = React.useRef<ReglViewerHandle>(null);
  const iframeViewerRef = React.useRef<IFrameViewerHandle>(null);

  const switchMode = (mode: 'shader' | 'iframe') => {
    setViewerMode(mode);
  };

  useImperativeHandle(ref, () => ({
    // Shader viewer methods
    setShaderCode: (code: string) => {
      shaderViewerRef.current?.setShaderCode(code);
    },
    setUniform: (name: string, value: any) => {
      shaderViewerRef.current?.setUniform(name, value);
    },
    captureScreenshot: () => {
      shaderViewerRef.current?.captureScreenshot();
    },
    
    // Iframe viewer methods
    loadHTML: (htmlContent: string) => {
      setViewerMode('iframe');
      setTimeout(() => {
        iframeViewerRef.current?.loadHTML(htmlContent);
      }, 100);
    },
    loadURL: (url: string) => {
      setViewerMode('iframe');
      setTimeout(() => {
        iframeViewerRef.current?.loadURL(url);
      }, 100);
    },
    
    // Mode switching
    switchMode,
  }));

  return (
    <Container>
      <ModeToggle>
        <ToggleButton 
          $active={viewerMode === 'shader'} 
          onClick={() => switchMode('shader')}
        >
          Shader
        </ToggleButton>
        <ToggleButton 
          $active={viewerMode === 'iframe'} 
          onClick={() => switchMode('iframe')}
        >
          HTML
        </ToggleButton>
      </ModeToggle>
      
      {viewerMode === 'shader' ? (
        <NewReglViewer ref={shaderViewerRef} />
      ) : (
        <IFrameViewer ref={iframeViewerRef} />
      )}
    </Container>
  );
});
