import { UniformSpec } from '../API';

export interface ViewerState {
  shaderCode: string;
  uniforms: Record<string, UniformSpec>;
  isLoading: boolean;
  error: string | null;
}

export interface EditorState {
  currentModule: string | null;
  modules: Record<string, unknown>;
  isProcessing: boolean;
  error: string | null;
}

export interface AppState {
  mode: string | null;
  viewer: ViewerState;
  editor: EditorState;
}

export type AppAction =
  | { type: 'SET_MODE'; payload: string }
  | { type: 'SET_SHADER_CODE'; payload: string }
  | { type: 'SET_UNIFORMS'; payload: Record<string, UniformSpec> }
  | { type: 'UPDATE_UNIFORM'; payload: { name: string; value: number | number[] } }
  | { type: 'SET_VIEWER_LOADING'; payload: boolean }
  | { type: 'SET_VIEWER_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_MODULE'; payload: string | null }
  | { type: 'SET_MODULES'; payload: Record<string, unknown> }
  | { type: 'SET_EDITOR_PROCESSING'; payload: boolean }
  | { type: 'SET_EDITOR_ERROR'; payload: string | null };
