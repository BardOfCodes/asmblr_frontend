/**
 * Viewer type definitions
 * 
 * This is the canonical source for all viewer-related types.
 * All viewer handles should extend or use ViewerHandle.
 */

export interface ViewerCapabilities {
  supportsShaders: boolean;
  supportsUniforms: boolean;
  supports3D: boolean;
  supportsScreenshot: boolean;
  supportsExport: boolean;
}

/**
 * Base interface for all viewer handles.
 * All methods are optional to support different viewer implementations.
 */
export interface ViewerHandle {
  // Shader methods
  setShaderCode?: (fragShader: string, vertShader?: string) => void;
  loadShaderCode?: (code: string, uniforms?: any, textures?: any) => void;
  setUniform?: (name: string, value: any) => void;
  
  // HTML/iframe methods
  loadHTML?: (html: string) => void;
  
  // Lifecycle methods
  resize?: (width: number, height: number) => void;
  render?: () => void;
  destroy?: () => Promise<void>;
  captureScreenshot?: () => void;
  
  // Allow additional methods for specific viewer implementations
  [key: string]: any;
}

export interface AdaptiveViewerHandle extends ViewerHandle {
  type: 'iframe' | 'shader';
}
