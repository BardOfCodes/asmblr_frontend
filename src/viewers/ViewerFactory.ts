import React from 'react';
import { BaseViewer } from './BaseViewer';

export type ViewerType = 'regl' | 'canvas' | 'iframe' | 'threejs';

export interface ViewerInfo {
  type: ViewerType;
  name: string;
  description: string;
  capabilities: string[];
  component: React.ComponentType<any>;
}

// Lazy imports for better performance
const ReglViewer = React.lazy(() => 
  import('./ReglViewer/ReglViewer').then(module => ({ default: module.ReglViewer }))
);

const CanvasViewer = React.lazy(() => 
  import('./CanvasViewer/CanvasViewer').then(module => ({ default: module.CanvasViewer }))
);

const IFrameViewer = React.lazy(() => 
  import('./IFrameViewer/IFrameViewer').then(module => ({ default: module.IFrameViewer }))
);

// Placeholder for ThreeJS viewer
const ThreeJSViewer = React.lazy(() => 
  Promise.resolve({ default: () => React.createElement('div', { 
    style: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '100%',
      color: '#666'
    } 
  }, 'ThreeJS Viewer - Coming Soon') })
);

export class ViewerFactory {
  private static readonly viewers: Record<ViewerType, ViewerInfo> = {
    regl: {
      type: 'regl',
      name: 'REGL Viewer',
      description: 'WebGL-based shader viewer with full 3D support',
      capabilities: ['Shaders', 'Uniforms', '3D', 'Screenshots'],
      component: ReglViewer,
    },
    canvas: {
      type: 'canvas',
      name: 'Canvas Viewer',
      description: '2D canvas-based viewer for simple geometry',
      capabilities: ['2D Rendering', 'Screenshots'],
      component: CanvasViewer,
    },
    iframe: {
      type: 'iframe',
      name: 'IFrame Viewer',
      description: 'Load external 3D viewers and applications',
      capabilities: ['External Content', 'URLs', 'Screenshots'],
      component: IFrameViewer,
    },
    threejs: {
      type: 'threejs',
      name: 'Three.js Viewer',
      description: 'Three.js-based 3D mesh viewer (Coming Soon)',
      capabilities: ['3D Meshes', 'Materials', 'Lighting'],
      component: ThreeJSViewer,
    },
  };

  static getAvailableViewers(): ViewerInfo[] {
    return Object.values(this.viewers);
  }

  static getViewerInfo(type: ViewerType): ViewerInfo | null {
    return this.viewers[type] || null;
  }

  static createViewer(type: ViewerType): React.ComponentType<any> | null {
    const viewerInfo = this.viewers[type];
    return viewerInfo ? viewerInfo.component : null;
  }

  static isViewerSupported(type: ViewerType): boolean {
    return type in this.viewers;
  }

  static getDefaultViewer(): ViewerType {
    return 'regl';
  }

  static getBestViewerForCapability(capability: string): ViewerType | null {
    for (const [type, info] of Object.entries(this.viewers)) {
      if (info.capabilities.some(cap => 
        cap.toLowerCase().includes(capability.toLowerCase())
      )) {
        return type as ViewerType;
      }
    }
    return null;
  }
}

// Hook for using viewer factory in React components
export function useViewerFactory() {
  return {
    getAvailableViewers: ViewerFactory.getAvailableViewers,
    getViewerInfo: ViewerFactory.getViewerInfo,
    createViewer: ViewerFactory.createViewer,
    isSupported: ViewerFactory.isViewerSupported,
    getDefault: ViewerFactory.getDefaultViewer,
    getBestFor: ViewerFactory.getBestViewerForCapability,
  };
}
