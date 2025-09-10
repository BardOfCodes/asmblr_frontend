// This utility is now deprecated - each visualizer should handle its own mouse events
// Keeping minimal interface for backward compatibility during transition

import { RefObject } from 'react';

export interface MouseControlParams {
  canvasRef: RefObject<HTMLCanvasElement>;
  setDynamicUniforms: (updateFn: any) => void;
}

export function initializeMouseControls({ canvasRef }: MouseControlParams) {
  console.warn('initializeMouseControls is deprecated - visualizers should handle their own mouse events');
  
  // Return empty cleanup function
  return () => {};
}