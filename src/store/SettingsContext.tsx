import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { debug } from '../utils/debug';

export interface PanelSettings {
  visible: boolean;
  size: { width?: number; height?: number };
  position: 'default' | 'floating';
}

export interface LayoutSettings {
  header: PanelSettings;
  nodeEditor: PanelSettings;
  viewer: PanelSettings;
  controlPanel: PanelSettings;
}

export type EditorType = 'code_editor' | 'reactflow_editor';
export type ViewerType = 'iframe_viewer' | 'shader_viewer' | 'regl_viewer';

export interface ShaderSettings {
  render_mode: string;
  variables: Record<string, any>;
  extract_vars: boolean;
  use_define_vars: boolean;
  // Allow additional arbitrary fields for backend compatibility
  [key: string]: any;
}

export interface ComponentSettings {
  selectedEditor: EditorType;
  selectedViewer: ViewerType;
}

export interface UISettings {
  theme: 'light' | 'dark';
  layout: LayoutSettings;
  components: ComponentSettings;
}

export interface ShaderGenerationSettings {
  shaderSettings: ShaderSettings;
}

interface SettingsState {
  ui: UISettings;
  shaderGeneration: ShaderGenerationSettings;
}

type SettingsAction =
  | { type: 'SET_PANEL_VISIBILITY'; payload: { panel: keyof LayoutSettings; visible: boolean } }
  | { type: 'SET_PANEL_SIZE'; payload: { panel: keyof LayoutSettings; size: { width?: number; height?: number } } }
  | { type: 'SET_PANEL_POSITION'; payload: { panel: keyof LayoutSettings; position: 'default' | 'floating' } }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_EDITOR_TYPE'; payload: EditorType }
  | { type: 'SET_VIEWER_TYPE'; payload: ViewerType }
  | { type: 'SET_SHADER_SETTINGS'; payload: ShaderSettings }
  | { type: 'RESET_LAYOUT' }
  | { type: 'LOAD_SETTINGS'; payload: SettingsState }
  | { type: 'LOAD_DEFAULT_SETTINGS' };

const defaultSettings: SettingsState = {
  ui: {
    theme: 'light',
    layout: {
      header: {
        visible: true,
        size: { height: 64 },
        position: 'default'
      },
      nodeEditor: {
        visible: true,
        size: { width: 50, height: 60 }, // percentages
        position: 'default'
      },
      viewer: {
        visible: true,
        size: { width: 50, height: 60 },
        position: 'default'
      },
      controlPanel: {
        visible: true,
        size: { height: 40 },
        position: 'default'
      }
    },
    components: {
      selectedEditor: 'reactflow_editor',
      selectedViewer: 'iframe_viewer'
    }
  },
  shaderGeneration: {
    shaderSettings: {
      render_mode: "v3",
      variables: {
        "_ADD_FLOOR_PLANE": false,
        "_RAYCAST_MAX_STEPS": 200,
        "_RAYCAST_CONSERVATIVE_STEPPING_RATE": 0.99,
        "_AA": 2,
        "castShadows": false
      },
      extract_vars: false,
      use_define_vars: true
    }
  }
};

const SETTINGS_STORAGE_KEY = 'asmblr-settings';

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_PANEL_VISIBILITY':
      return {
        ...state,
        ui: {
          ...state.ui,
          layout: {
            ...state.ui.layout,
            [action.payload.panel]: {
              ...state.ui.layout[action.payload.panel],
              visible: action.payload.visible
            }
          }
        }
      };

    case 'SET_PANEL_SIZE':
      return {
        ...state,
        ui: {
          ...state.ui,
          layout: {
            ...state.ui.layout,
            [action.payload.panel]: {
              ...state.ui.layout[action.payload.panel],
              size: { ...state.ui.layout[action.payload.panel].size, ...action.payload.size }
            }
          }
        }
      };

    case 'SET_PANEL_POSITION':
      return {
        ...state,
        ui: {
          ...state.ui,
          layout: {
            ...state.ui.layout,
            [action.payload.panel]: {
              ...state.ui.layout[action.payload.panel],
              position: action.payload.position
            }
          }
        }
      };

    case 'SET_THEME':
      return {
        ...state,
        ui: { ...state.ui, theme: action.payload }
      };

    case 'SET_EDITOR_TYPE':
      return {
        ...state,
        ui: {
          ...state.ui,
          components: {
            ...state.ui.components,
            selectedEditor: action.payload
          }
        }
      };

    case 'SET_VIEWER_TYPE':
      return {
        ...state,
        ui: {
          ...state.ui,
          components: {
            ...state.ui.components,
            selectedViewer: action.payload
          }
        }
      };

    case 'SET_SHADER_SETTINGS':
      return {
        ...state,
        shaderGeneration: {
          ...state.shaderGeneration,
          shaderSettings: action.payload
        }
      };

    case 'RESET_LAYOUT':
      return { ...state, ui: { ...state.ui, layout: defaultSettings.ui.layout } };

    case 'LOAD_SETTINGS':
      return action.payload;

    case 'LOAD_DEFAULT_SETTINGS':
      try {
        const defaultSettings = localStorage.getItem('asmblr-default-settings');
        if (defaultSettings) {
          return JSON.parse(defaultSettings) as SettingsState;
        }
      } catch (error) {
        debug.warn('Failed to load default settings:', error);
      }
      return state;

    default:
      return state;
  }
}

interface SettingsContextType {
  settings: SettingsState;
  dispatch: React.Dispatch<SettingsAction>;
  saveSettings: () => void;
  loadSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(settingsReducer, defaultSettings);

  const saveSettings = () => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      debug.warn('Failed to save settings:', error);
    }
  };

  const loadSettings = () => {
    try {
      // Try to load default settings first if they exist
      const defaultSettings = localStorage.getItem('asmblr-default-settings');
      
      if (defaultSettings) {
        debug.log('Loading saved default settings');
        const parsedSettings = JSON.parse(defaultSettings) as SettingsState;
        dispatch({ type: 'LOAD_SETTINGS', payload: parsedSettings });
      } else {
        // Fallback to current session settings if no defaults are saved
        const sessionSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (sessionSettings) {
          debug.log('Loading session settings (no defaults found)');
          const parsedSettings = JSON.parse(sessionSettings) as SettingsState;
          dispatch({ type: 'LOAD_SETTINGS', payload: parsedSettings });
        }
      }
    } catch (error) {
      debug.warn('Failed to load settings:', error);
    }
  };

  // Auto-save settings when they change
  useEffect(() => {
    saveSettings();
  }, [settings]);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, dispatch, saveSettings, loadSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
