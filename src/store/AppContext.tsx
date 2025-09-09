import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction } from './types';

const initialState: AppState = {
  mode: null,
  viewer: {
    shaderCode: '',
    uniforms: {},
    isLoading: false,
    error: null,
  },
  editor: {
    currentModule: null,
    modules: {},
    isProcessing: false,
    error: null,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    
    case 'SET_SHADER_CODE':
      return {
        ...state,
        viewer: { ...state.viewer, shaderCode: action.payload }
      };
    
    case 'SET_UNIFORMS':
      return {
        ...state,
        viewer: { ...state.viewer, uniforms: action.payload }
      };
    
    case 'UPDATE_UNIFORM':
      return {
        ...state,
        viewer: {
          ...state.viewer,
          uniforms: {
            ...state.viewer.uniforms,
            [action.payload.name]: {
              ...state.viewer.uniforms[action.payload.name],
              init_value: action.payload.value
            }
          }
        }
      };
    
    case 'SET_VIEWER_LOADING':
      return {
        ...state,
        viewer: { ...state.viewer, isLoading: action.payload }
      };
    
    case 'SET_VIEWER_ERROR':
      return {
        ...state,
        viewer: { ...state.viewer, error: action.payload }
      };
    
    case 'SET_CURRENT_MODULE':
      return {
        ...state,
        editor: { ...state.editor, currentModule: action.payload }
      };
    
    case 'SET_MODULES':
      return {
        ...state,
        editor: { ...state.editor, modules: action.payload }
      };
    
    case 'SET_EDITOR_PROCESSING':
      return {
        ...state,
        editor: { ...state.editor, isProcessing: action.payload }
      };
    
    case 'SET_EDITOR_ERROR':
      return {
        ...state,
        editor: { ...state.editor, error: action.payload }
      };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}
