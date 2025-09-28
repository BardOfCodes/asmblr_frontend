// modes/types.ts
import React from 'react';

// Legacy interfaces for backward compatibility
export interface ViewerHandle {
  setShaderCode?: (code: string) => void;
  setUniform?: (name: string, value: any) => void;
  captureScreenshot?: () => void;
  loadShaderCode?: (code: string, uniforms?: any, textures?: any) => void;
  loadHTML?: (html: string) => void;
  [key: string]: any;
}

export interface EditorHandle {
  view: React.ReactNode;
  [key: string]: any;
}

// New clean mode architecture
export interface ModeEditor {
  Component: React.ComponentType;
  // Editor-specific configuration can go here
}

export interface ModeViewer {
  Component: React.ForwardRefExoticComponent<React.RefAttributes<ViewerHandle>>;
  // Viewer-specific configuration can go here
}

export interface ModeControlPanel {
  Component: React.ComponentType;
  // Control panel-specific configuration can go here
}

export interface CleanAsmblrMode {
  name: string;
  label: string;
  editor: ModeEditor;
  viewer: ModeViewer;
  controlPanel: ModeControlPanel;
  // Mode-specific initialization and configuration
  initialize?: () => void;
  cleanup?: () => void;
}

// Legacy mode interface for backward compatibility
export interface AsmblrMode<TViewerHandle extends ViewerHandle = ViewerHandle> {
  name: string;
  label: string;
  useEditor: () => EditorHandle;
  ViewerComponent: React.ForwardRefExoticComponent<React.RefAttributes<TViewerHandle>>;
  HeaderComponent: React.ComponentType<{
    editor: EditorHandle;
    modeName: string;
    setMode: (name: string) => void;
    }>;
  ControlPanelComponent: React.ComponentType<{
    editor: EditorHandle;
    viewerRef: React.RefObject<TViewerHandle>;
  }>;
}