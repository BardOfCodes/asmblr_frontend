import { UniformSpec } from '../services/api/types';

export interface ViewerConfig {
  width?: number;
  height?: number;
  quality?: 'low' | 'medium' | 'high';
  antiAliasing?: boolean;
  backgroundColor?: string;
}

export interface ViewerCapabilities {
  supportsShaders: boolean;
  supportsUniforms: boolean;
  supports3D: boolean;
  supportsScreenshot: boolean;
  supportsExport: boolean;
}

export interface ViewerEvents {
  'shader-compiled': { success: boolean; error?: string };
  'uniform-changed': { name: string; value: any };
  'screenshot-ready': { blob: Blob };
  'error': { message: string; details?: any };
}

export type ViewerEventCallback<T = any> = (data: T) => void;

export abstract class BaseViewer {
  protected config: ViewerConfig = {};
  protected eventListeners: Map<keyof ViewerEvents, ViewerEventCallback[]> = new Map();

  abstract get capabilities(): ViewerCapabilities;
  abstract get name(): string;
  abstract get version(): string;

  // Core functionality
  abstract initialize(container: HTMLElement): Promise<void>;
  abstract destroy(): Promise<void>;
  abstract resize(width: number, height: number): void;
  abstract render(): void;

  // Shader support (optional)
  setShaderCode?(code: string): void;
  setUniforms?(uniforms: Record<string, UniformSpec>): void;
  setUniform?(name: string, value: any): void;

  // User interactions (optional)
  captureScreenshot?(): Promise<Blob>;
  exportMesh?(format: string): Promise<Blob>;

  // Configuration
  configure(config: Partial<ViewerConfig>): void {
    this.config = { ...this.config, ...config };
    this.onConfigChange();
  }

  protected onConfigChange(): void {
    // Override in subclasses if needed
  }

  // Event system
  on<K extends keyof ViewerEvents>(event: K, callback: ViewerEventCallback<ViewerEvents[K]>): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off<K extends keyof ViewerEvents>(event: K, callback: ViewerEventCallback<ViewerEvents[K]>): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  protected emit<K extends keyof ViewerEvents>(event: K, data: ViewerEvents[K]): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // Utility methods
  protected createCanvas(container: HTMLElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    return canvas;
  }

  protected handleError(message: string, details?: any): void {
    console.error(`${this.name} Error:`, message, details);
    this.emit('error', { message, details });
  }
}
