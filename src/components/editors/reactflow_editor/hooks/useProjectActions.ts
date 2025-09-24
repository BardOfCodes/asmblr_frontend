/**
 * useProjectActions - Simple hook for accessing project actions
 * 
 * This is a lightweight hook that provides access to the ProjectService
 * without any complex state management or memoization.
 */

import { useCallback } from 'react';
import { projectService } from '../services/ProjectService';

// Global reference to current React Flow instance
// This is set by ReactFlowEditor when it mounts
let globalReactFlowRef: {
  getNodes: () => any[];
  getEdges: () => any[];
  getViewport: () => { x: number; y: number; zoom: number };
  setNodes: (nodes: any[]) => void;
  setEdges: (edges: any[]) => void;
  setViewport: (viewport: { x: number; y: number; zoom: number }) => void;
  fitView: () => void;
} | null = null;

export function setReactFlowRef(ref: any) {
  console.log('Setting React Flow ref:', ref ? 'available' : 'null');
  globalReactFlowRef = ref;
}

export function useProjectActions() {
  const saveProject = useCallback(async (key?: string) => {
    if (!globalReactFlowRef) {
      console.warn('React Flow editor not available');
      return { success: false, message: 'Editor not available' };
    }

    const nodes = globalReactFlowRef.getNodes();
    const edges = globalReactFlowRef.getEdges();
    const viewport = globalReactFlowRef.getViewport();

    return await projectService.saveProject(nodes, edges, viewport, key);
  }, []);

  const loadProject = useCallback(async (key?: string) => {
    if (!globalReactFlowRef) {
      console.warn('React Flow editor not available');
      return { success: false, message: 'Editor not available' };
    }

    const result = await projectService.loadProject(key);
    
    if (result.success && result.data) {
      globalReactFlowRef.setNodes(result.data.nodes);
      globalReactFlowRef.setEdges(result.data.edges);
      
      if (result.data.viewport) {
        globalReactFlowRef.setViewport(result.data.viewport);
      } else {
        // Fit view after a short delay to ensure nodes are rendered
        setTimeout(() => globalReactFlowRef?.fitView(), 100);
      }
    }

    return result;
  }, []);

  const exportProject = useCallback(async (filename?: string) => {
    if (!globalReactFlowRef) {
      console.warn('React Flow editor not available');
      return { success: false, message: 'Editor not available' };
    }

    const nodes = globalReactFlowRef.getNodes();
    const edges = globalReactFlowRef.getEdges();
    const viewport = globalReactFlowRef.getViewport();

    return await projectService.exportProject(nodes, edges, viewport, filename);
  }, []);

  const newProject = useCallback(() => {
    if (!globalReactFlowRef) {
      console.warn('React Flow editor not available');
      return { success: false, message: 'Editor not available' };
    }

    globalReactFlowRef.setNodes([]);
    globalReactFlowRef.setEdges([]);
    
    return { success: true, message: 'New project created' };
  }, []);

  const importProject = useCallback(async (file: File) => {
    if (!globalReactFlowRef) {
      console.warn('React Flow editor not available');
      return { success: false, message: 'Editor not available' };
    }

    const result = await projectService.importProject(file);
    
    if (result.success && result.data) {
      globalReactFlowRef.setNodes(result.data.nodes);
      globalReactFlowRef.setEdges(result.data.edges);
      
      if (result.data.viewport) {
        globalReactFlowRef.setViewport(result.data.viewport);
      } else {
        // Fit view after a short delay to ensure nodes are rendered
        setTimeout(() => globalReactFlowRef?.fitView(), 100);
      }
    }

    return result;
  }, []);

  const listProjects = useCallback(() => {
    return projectService.listProjects();
  }, []);

  const isAvailable = useCallback(() => {
    const available = globalReactFlowRef !== null;
    console.log('Project actions available check:', available, globalReactFlowRef ? 'ref exists' : 'ref is null');
    return available;
  }, []);

  return {
    saveProject,
    loadProject,
    exportProject,
    importProject,
    newProject,
    listProjects,
    isAvailable
  };
}
