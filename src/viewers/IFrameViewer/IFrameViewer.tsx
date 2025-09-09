import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { BaseViewer, ViewerCapabilities } from '../BaseViewer';
import { Stack, Text, Input, Button } from '../../design/components';
import { theme } from '../../design/theme';

export interface IFrameViewerHandle {
  setShaderCode: (code: string) => void;
  setUniform: (name: string, value: any) => void;
  captureScreenshot: () => Promise<void>;
  loadUrl: (url: string) => void;
}

class IFrameViewerCore extends BaseViewer {
  private iframe?: HTMLIFrameElement;
  private currentUrl: string = '';

  get name(): string { return 'IFrameViewer'; }
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
      this.iframe = document.createElement('iframe');
      this.iframe.style.width = '100%';
      this.iframe.style.height = '100%';
      this.iframe.style.border = 'none';
      this.iframe.style.borderRadius = theme.borderRadius.md;
      
      // Security settings
      this.iframe.sandbox.add('allow-scripts', 'allow-same-origin');
      
      container.appendChild(this.iframe);
      
    } catch (error) {
      this.handleError('Failed to initialize IFrame viewer', error);
      throw error;
    }
  }

  async destroy(): Promise<void> {
    if (this.iframe && this.iframe.parentNode) {
      this.iframe.parentNode.removeChild(this.iframe);
    }
  }

  resize(width: number, height: number): void {
    if (this.iframe) {
      this.iframe.style.width = `${width}px`;
      this.iframe.style.height = `${height}px`;
    }
  }

  render(): void {
    // IFrame renders itself
  }

  setShaderCode(code: string): void {
    // For IFrame viewer, we could potentially send the shader code to the iframe
    // via postMessage if the loaded content supports it
    if (this.iframe && this.iframe.contentWindow) {
      try {
        this.iframe.contentWindow.postMessage({
          type: 'shader-code',
          code: code
        }, '*');
        this.emit('shader-compiled', { success: true });
      } catch (error) {
        this.handleError('Failed to send shader code to iframe', error);
        this.emit('shader-compiled', { success: false, error: error.message });
      }
    }
  }

  setUniform(name: string, value: any): void {
    // Send uniform data to iframe
    if (this.iframe && this.iframe.contentWindow) {
      try {
        this.iframe.contentWindow.postMessage({
          type: 'uniform-update',
          name: name,
          value: value
        }, '*');
        this.emit('uniform-changed', { name, value });
      } catch (error) {
        this.handleError('Failed to send uniform to iframe', error);
      }
    }
  }

  async captureScreenshot(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.iframe) {
        reject(new Error('IFrame not initialized'));
        return;
      }

      // For iframe screenshots, we'd need to use a service like html2canvas
      // or request the iframe to provide its own screenshot
      // This is a simplified implementation
      
      try {
        // Create a canvas to draw the iframe (simplified approach)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        const rect = this.iframe.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Draw placeholder for iframe screenshot
        ctx.fillStyle = theme.colors.backgroundTertiary;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = theme.colors.textSecondary;
        ctx.font = `16px ${theme.typography.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText('IFrame Screenshot', canvas.width / 2, canvas.height / 2);
        ctx.fillText(`URL: ${this.currentUrl}`, canvas.width / 2, canvas.height / 2 + 30);

        canvas.toBlob((blob) => {
          if (blob) {
            this.emit('screenshot-ready', { blob });
            resolve(blob);
          } else {
            reject(new Error('Failed to create screenshot'));
          }
        }, 'image/png');

      } catch (error) {
        this.handleError('Failed to capture iframe screenshot', error);
        reject(error);
      }
    });
  }

  loadUrl(url: string): void {
    if (!this.iframe) return;

    try {
      // Basic URL validation
      new URL(url);
      
      this.currentUrl = url;
      this.iframe.src = url;
      
      // Listen for load events
      this.iframe.onload = () => {
        console.log(`IFrame loaded: ${url}`);
      };
      
      this.iframe.onerror = () => {
        this.handleError(`Failed to load URL: ${url}`);
      };
      
    } catch (error) {
      this.handleError('Invalid URL provided', error);
    }
  }
}

export const IFrameViewer = forwardRef<IFrameViewerHandle, {}>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<IFrameViewerCore>();
  const [url, setUrl] = React.useState('https://threejs.org/examples/webgl_geometry_cube.html');

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
    loadUrl: (url: string) => {
      viewerRef.current?.loadUrl(url);
    },
  }));

  useEffect(() => {
    if (containerRef.current && !viewerRef.current) {
      viewerRef.current = new IFrameViewerCore();
      viewerRef.current.initialize(containerRef.current);
      
      // Load default URL
      if (url) {
        viewerRef.current.loadUrl(url);
      }
    }

    return () => {
      viewerRef.current?.destroy();
    };
  }, []);

  const handleLoadUrl = () => {
    viewerRef.current?.loadUrl(url);
  };

  return (
    <Stack $gap="sm" style={{ height: '100%' }}>
      <Stack $direction="row" $gap="sm">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to load..."
          style={{ flex: 1 }}
        />
        <Button onClick={handleLoadUrl} $size="small">
          Load
        </Button>
      </Stack>
      <div ref={containerRef} style={{ flex: 1 }} />
    </Stack>
  );
});
