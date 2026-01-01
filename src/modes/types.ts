// modes/types.ts
import React from 'react';

// Re-export ViewerHandle from canonical source
export { ViewerHandle } from '../types/viewer';
import type { ViewerHandle } from '../types/viewer';

export interface EditorHandle {
  view: React.ReactNode;
  [key: string]: any;
}

// Mode interface used by all modes
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