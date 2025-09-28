import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import createREGL from 'regl';
import { BaseViewer, ViewerCapabilities } from '../BaseViewer';
import { initializeMouseControls } from '../../components/utils/mouseControls';
import { CleanupManager } from '../../utils/eventListeners';
// Import vertex shader as string
const vertShader = `
attribute vec3 position;
uniform mat4 projection, view;
void main() {
  gl_Position = projection * view * vec4(position, 1.0);
}
`;

export interface ReglViewerHandle {
  setShaderCode: (fragShader: string, vertShader?: string) => void;
  setUniform: (name: string, value: any) => void;
  captureScreenshot: () => void;
}

class ReglViewerCore extends BaseViewer {
  private canvas?: HTMLCanvasElement;
  private regl?: any;
  private drawCommand?: any;
  private frameLoop?: any;
  private shaderCode = { frag: '', vert: vertShader };
  private cleanupManager = new CleanupManager();
  private dynamicUniforms: { [key: string]: any } = {
    cameraAngleX: 0.25,
    cameraAngleY: 0.5,
    cameraDistance: 4.0,
    cameraOrigin: [0.0, 0.0, 0.0],
    sunAzimuth: 0.0,
    sunElevation: 0.0,
  };

  get name(): string { return 'ReglViewer'; }
  get version(): string { return '1.0.0'; }
  get capabilities(): ViewerCapabilities {
    return {
      supportsShaders: true,
      supportsUniforms: true,
      supports3D: true,
      supportsScreenshot: true,
      supportsExport: false,
    };
  }

  async initialize(container: HTMLElement): Promise<void> {
    try {
      this.canvas = this.createCanvas(container);
      
      this.regl = createREGL({
        gl: this.canvas.getContext('webgl2')!,
        profile: true,
      });

      this.setupResize();
      this.startRenderLoop();
      
      // Initialize mouse controls
      this.setupMouseControls();
      
    } catch (error) {
      this.handleError('Failed to initialize ReGL viewer', error);
      throw error;
    }
  }

  async destroy(): Promise<void> {
    // Clean up all event listeners and timers
    this.cleanupManager.cleanup();
    
    if (this.frameLoop) {
      this.frameLoop.cancel();
      this.frameLoop = null;
    }
    if (this.regl) {
      this.regl.destroy();
      this.regl = null;
    }
    this.canvas = undefined;
    this.drawCommand = undefined;
    this.dynamicUniforms = {};
  }

  resize(width: number, height: number): void {
    if (this.canvas && this.regl) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.regl._gl.viewport(0, 0, width, height);
    }
  }

  render(): void {
    if (this.regl && this.drawCommand) {
      this.regl.clear({ color: [0, 0, 0, 1] });
      this.drawCommand();
    }
  }

  setShaderCode(fragShader: string, vertShader?: string): void {
    this.shaderCode = {
      frag: fragShader,
      vert: vertShader || this.shaderCode.vert,
    };
    this.updateDrawCommand();
    this.emit('shader-compiled', { success: true });
  }

  setUniform(name: string, value: any): void {
    this.dynamicUniforms[name] = value;
    this.emit('uniform-changed', { name, value });
  }

  async captureScreenshot(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.canvas || !this.regl) {
        reject(new Error('Viewer not initialized'));
        return;
      }

      try {
        // Render one frame
        this.regl.clear({ color: [0, 0, 0, 1] });
        if (this.drawCommand) this.drawCommand();

        // Force GPU flush
        const gl = this.regl._gl;
        gl.flush();

        // Read back pixels
        const width = this.canvas.width;
        const height = this.canvas.height;
        const pixels = this.regl.read();

        // Create temporary canvas for Y-flip
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const ctx = tempCanvas.getContext('2d')!;
        const imageData = ctx.createImageData(width, height);

        // Flip Y coordinate
        for (let y = 0; y < height; y++) {
          const srcOffset = (height - 1 - y) * width * 4;
          const dstOffset = y * width * 4;
          imageData.data.set(pixels.subarray(srcOffset, srcOffset + width * 4), dstOffset);
        }

        ctx.putImageData(imageData, 0, 0);

        tempCanvas.toBlob((blob) => {
          if (blob) {
            this.emit('screenshot-ready', { blob });
            resolve(blob);
          } else {
            reject(new Error('Failed to create screenshot blob'));
          }
        }, 'image/png');

      } catch (error) {
        this.handleError('Failed to capture screenshot', error);
        reject(error);
      }
    });
  }

  private setupResize(): void {
    if (!this.canvas) return;

    const handleResize = () => {
      if (this.canvas && this.regl) {
        const rect = this.canvas.parentElement?.getBoundingClientRect();
        if (rect) {
          this.resize(rect.width, rect.height);
        }
      }
    };

    // Use cleanup manager to track the resize listener
    this.cleanupManager.addEventlistener(window, 'resize', handleResize);
    handleResize();
  }

  private startRenderLoop(): void {
    if (!this.regl) return;

    this.frameLoop = this.regl.frame(() => this.render());
  }

  private updateDrawCommand(): void {
    if (!this.regl || !this.shaderCode.frag || !this.shaderCode.vert) return;

    try {
      this.drawCommand = this.regl({
        frag: this.shaderCode.frag,
        vert: this.shaderCode.vert,
        attributes: {
          position: [
            [-1, 1], [1, 1], [-1, -1], [1, -1],
          ],
        },
        uniforms: {
          resolution: ({ viewportWidth, viewportHeight }) => [viewportWidth, viewportHeight],
          time: ({ tick }) => tick * 0.001,
          castShadows: true,
          ...this.dynamicUniforms,
        },
        count: 4,
        primitive: 'triangle strip',
      });
    } catch (error) {
      this.handleError('Failed to compile shader', error);
      this.emit('shader-compiled', { success: false, error: error.message });
    }
  }

  private setupMouseControls(): void {
    if (!this.canvas) return;

    initializeMouseControls({
      canvasRef: { current: this.canvas },
      setDynamicUniforms: (uniforms) => {
        Object.assign(this.dynamicUniforms, uniforms);
      },
    });
  }
}

export const ReglViewer = forwardRef<ReglViewerHandle, {}>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ReglViewerCore>();

  useImperativeHandle(ref, () => ({
    setShaderCode: (fragShader: string, vertShader?: string) => {
      viewerRef.current?.setShaderCode(fragShader, vertShader);
    },
    setUniform: (name: string, value: any) => {
      viewerRef.current?.setUniform(name, value);
    },
    captureScreenshot: () => {
      viewerRef.current?.captureScreenshot();
    },
  }));

  useEffect(() => {
    if (containerRef.current && !viewerRef.current) {
      viewerRef.current = new ReglViewerCore();
      viewerRef.current.initialize(containerRef.current);
    }

    return () => {
      viewerRef.current?.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
});
