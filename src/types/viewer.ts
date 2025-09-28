/**
 * Viewer type definitions
 */

export interface ViewerCapabilities {
  supportsShaders: boolean;
  supportsUniforms: boolean;
  supports3D: boolean;
  supportsScreenshot: boolean;
  supportsExport: boolean;
}

export interface ViewerHandle {
  setShaderCode?: (fragShader: string, vertShader?: string) => void;
  setUniform?: (name: string, value: any) => void;
  captureScreenshot?: () => void;
  resize?: (width: number, height: number) => void;
  render?: () => void;
  destroy?: () => Promise<void>;
  loadShaderCode?: (code: string, uniforms?: any, textures?: any) => void;
  loadHTML?: (html: string) => void;
}

export interface AdaptiveViewerHandle extends ViewerHandle {
  type: 'iframe' | 'shader';
}
