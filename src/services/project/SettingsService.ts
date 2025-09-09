// Note: This service is implemented as a reference to the report requirements.
// In practice, we use SettingsContext for better React integration.

export interface AppSettings {
  ui: {
    theme: 'light' | 'dark';
    panelVisibility: {
      header: boolean;
      nodeEditor: boolean;
      viewer: boolean;
      controlPanel: boolean;
    };
  };
  editor: {
    gridSnap: boolean;
    autoArrange: boolean;
  };
  viewer: {
    renderingQuality: 'low' | 'medium' | 'high';
    antiAliasing: boolean;
  };
}

const SETTINGS_KEY = 'asmblr-settings';

export class SettingsService {
  private defaultSettings: AppSettings = {
    ui: {
      theme: 'light',
      panelVisibility: {
        header: true,
        nodeEditor: true,
        viewer: true,
        controlPanel: true,
      },
    },
    editor: {
      gridSnap: true,
      autoArrange: false,
    },
    viewer: {
      renderingQuality: 'medium',
      antiAliasing: true,
    },
  };

  async loadSettings(): Promise<AppSettings> {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AppSettings;
        return this.mergeWithDefaults(parsed);
      }
    } catch (error) {
      console.warn('Failed to load settings:', error);
    }
    return this.defaultSettings;
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw new Error('Failed to save settings');
    }
  }

  async resetSettings(): Promise<AppSettings> {
    try {
      localStorage.removeItem(SETTINGS_KEY);
      return this.defaultSettings;
    } catch (error) {
      console.error('Failed to reset settings:', error);
      throw new Error('Failed to reset settings');
    }
  }

  private mergeWithDefaults(settings: Partial<AppSettings>): AppSettings {
    return {
      ui: {
        ...this.defaultSettings.ui,
        ...settings.ui,
        panelVisibility: {
          ...this.defaultSettings.ui.panelVisibility,
          ...settings.ui?.panelVisibility,
        },
      },
      editor: {
        ...this.defaultSettings.editor,
        ...settings.editor,
      },
      viewer: {
        ...this.defaultSettings.viewer,
        ...settings.viewer,
      },
    };
  }
}

export const settingsService = new SettingsService();
