// modes/types.ts

export interface ViewerHandle {
  setShaderCode?: (code: string) => void;
  setUniform?: (name: string, value: any) => void;
  captureScreenshot?: () => void;
  [key: string]: any;
}
export interface EditorHandle {
  view: React.ReactNode;
  [key: string]: any;
}

// Make AsmblrMode generic over the viewer handle
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