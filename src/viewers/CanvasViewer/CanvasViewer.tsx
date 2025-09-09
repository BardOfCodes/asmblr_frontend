import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { BaseViewer, ViewerCapabilities } from '../BaseViewer';
import { Text } from '../../design/components';
import { theme } from '../../design/theme';

export interface CanvasViewerHandle {
  setShaderCode: (code: string) => void;
  setUniform: (name: string, value: any) => void;
  captureScreenshot: () => Promise<void>;
}

class CanvasViewerCore extends BaseViewer {
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private animationFrame?: number;
  private geometryData: any = null;

  get name(): string { return 'CanvasViewer'; }
  get version(): string { return '1.0.0'; }
  get capabilities(): ViewerCapabilities {
    return {
      supportsShaders: false,
      supportsUniforms: false,
      supports3D: false,
      supportsScreenshot: true,
      supportsExport: false,
    };
  }

  async initialize(container: HTMLElement): Promise<void> {
    try {
      this.canvas = this.createCanvas(container);
      this.ctx = this.canvas.getContext('2d');
      
      if (!this.ctx) {
        throw new Error('Failed to get 2D context');
      }

      this.setupResize();
      this.startRenderLoop();
      
    } catch (error) {
      this.handleError('Failed to initialize Canvas viewer', error);
      throw error;
    }
  }

  async destroy(): Promise<void> {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  resize(width: number, height: number): void {
    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  render(): void {
    if (!this.ctx || !this.canvas) return;

    const { width, height } = this.canvas;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw background
    this.ctx.fillStyle = theme.colors.backgroundTertiary;
    this.ctx.fillRect(0, 0, width, height);

    if (this.geometryData) {
      this.drawGeometry();
    } else {
      this.drawPlaceholder();
    }
  }

  setShaderCode(code: string): void {
    // Canvas viewer doesn't support shaders, but we can parse for geometry data
    try {
      // This is a simplified example - in practice, you'd parse the shader
      // or receive processed geometry data from the backend
      this.geometryData = { type: 'shader', code };
      this.emit('shader-compiled', { success: true });
    } catch (error) {
      this.handleError('Failed to process shader code', error);
      this.emit('shader-compiled', { success: false, error: error.message });
    }
  }

  setUniform(name: string, value: any): void {
    // Canvas viewer doesn't support uniforms directly
    this.emit('uniform-changed', { name, value });
  }

  async captureScreenshot(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.canvas) {
        reject(new Error('Canvas not initialized'));
        return;
      }

      this.canvas.toBlob((blob) => {
        if (blob) {
          this.emit('screenshot-ready', { blob });
          resolve(blob);
        } else {
          reject(new Error('Failed to create screenshot'));
        }
      }, 'image/png');
    });
  }

  private setupResize(): void {
    if (!this.canvas) return;

    const handleResize = () => {
      if (this.canvas) {
        const rect = this.canvas.parentElement?.getBoundingClientRect();
        if (rect) {
          this.resize(rect.width, rect.height);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
  }

  private startRenderLoop(): void {
    const animate = () => {
      this.render();
      this.animationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  private drawGeometry(): void {
    if (!this.ctx || !this.canvas) return;

    const { width, height } = this.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw a simple geometric representation
    this.ctx.strokeStyle = theme.colors.primary;
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = theme.colors.primary + '20';

    // Draw some basic shapes to represent geometry
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, Math.min(width, height) * 0.2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Add some connecting lines
    this.ctx.beginPath();
    this.ctx.moveTo(centerX - 50, centerY - 50);
    this.ctx.lineTo(centerX + 50, centerY + 50);
    this.ctx.moveTo(centerX + 50, centerY - 50);
    this.ctx.lineTo(centerX - 50, centerY + 50);
    this.ctx.stroke();
  }

  private drawPlaceholder(): void {
    if (!this.ctx || !this.canvas) return;

    const { width, height } = this.canvas;
    
    // Draw placeholder text
    this.ctx.fillStyle = theme.colors.textTertiary;
    this.ctx.font = `16px ${theme.typography.fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    this.ctx.fillText('Canvas Viewer', width / 2, height / 2 - 20);
    this.ctx.fillText('Load geometry to view', width / 2, height / 2 + 20);
  }
}

export const CanvasViewer = forwardRef<CanvasViewerHandle, {}>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<CanvasViewerCore>();

  useImperativeHandle(ref, () => ({
    setShaderCode: (code: string) => {
      viewerRef.current?.setShaderCode(code);
    },
    setUniform: (name: string, value: any) => {
      viewerRef.current?.setUniform(name, value);
    },
    captureScreenshot: async () => {
      await viewerRef.current?.captureScreenshot();
    },
  }));

  useEffect(() => {
    if (containerRef.current && !viewerRef.current) {
      viewerRef.current = new CanvasViewerCore();
      viewerRef.current.initialize(containerRef.current);
    }

    return () => {
      viewerRef.current?.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
});
