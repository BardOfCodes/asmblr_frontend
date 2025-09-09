import { UniformSpec } from '../services/api/types';

export interface ViewerHandle {
  setShaderCode: (code: string) => void;
  setUniform: (name: string, value: number | number[]) => void;
  captureScreenshot: () => Promise<void>;
}

export interface EditorHandle {
  view: React.ReactNode;
  loadModules: (modules: Record<string, unknown>) => Promise<void>;
  exportCurrent: () => unknown;
  getCurrentModuleName: () => string | null;
  sync: () => void;
  clear: () => Promise<void>;
  process: () => void;
  layout: () => void;
}

export interface GeometryOperations {
  loadGeometry: () => Promise<void>;
  loadAll: () => Promise<void>;
  arrangeNodes: () => void;
  resetShader: () => void;
  convertToInterlocking: () => Promise<void>;
  convertToBBoxed: () => Promise<void>;
  convertToMCMesh: () => Promise<void>;
  convertToJWood: () => Promise<void>;
  saveShaderCode: () => void;
}

export interface UniformControls {
  uniforms: Record<string, UniformSpec>;
  onUniformChange: (name: string, value: number | number[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}
