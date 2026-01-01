/**
 * useMigumiProjectActions - Specialized project actions for Migumi mode
 * 
 * Extends the standard project actions with old format compatibility
 */

import { useCallback } from 'react';
import { useProjectActions, getReactFlowRef } from './useProjectActions';
import { importMigumiProject, loadMigumiProject } from '../services/MigumiProjectService';
import { getMigumiSettings } from '../../../control-panel/MigumiControlPanel';
import { debug } from '../../../../utils/debug';

// Global reference to current React Flow instance (same as standard hook)
let globalReactFlowRef: {
  getNodes: () => any[];
  getEdges: () => any[];
  getViewport: () => { x: number; y: number; zoom: number };
  setNodes: (nodes: any[]) => void;
  setEdges: (edges: any[]) => void;
  setViewport: (viewport: { x: number; y: number; zoom: number }) => void;
  fitView: () => void;
} | null = null;

// Export the setter for ReactFlowEditor to use
export function setMigumiReactFlowRef(ref: any) {
  globalReactFlowRef = ref;
  // Note: We don't call setReactFlowRef here to avoid double-setting
  // The ReactFlowEditor will call both setters independently
}

export function useMigumiProjectActions() {
  // Get standard actions for non-import operations
  const standardActions = useProjectActions();

  // Override the import function with Migumi-specific logic
  const importProject = useCallback(async (file: File) => {
    // Try Migumi-specific ref first, fall back to standard ref
    const reactFlowRef = globalReactFlowRef || getReactFlowRef();
    
    debug.log('📁 useMigumiProjectActions: Starting Migumi import', {
      hasMigumiRef: !!globalReactFlowRef,
      hasStandardRef: !!getReactFlowRef(),
      usingRef: reactFlowRef ? 'available' : 'none'
    });
    
    if (!reactFlowRef) {
      debug.error('❌ useMigumiProjectActions: No ReactFlow reference available');
      return { success: false, message: 'Editor not available' };
    }
    
    // Get current Migumi settings
    const settings = getMigumiSettings();
    debug.log('🔧 useMigumiProjectActions: Using settings:', settings);

    // Use the specialized Migumi import function
    const result = await importMigumiProject(file, settings.useOldFormat);
    
    if (result.success && result.data) {
      debug.log('✅ useMigumiProjectActions: Import successful, updating editor');
      
      reactFlowRef.setNodes(result.data.nodes);
      reactFlowRef.setEdges(result.data.edges);
      
      if (result.data.viewport) {
        reactFlowRef.setViewport(result.data.viewport);
      } else {
        // Fit view after a short delay to ensure nodes are rendered
        setTimeout(() => reactFlowRef?.fitView(), 100);
      }
    } else {
      debug.error('❌ useMigumiProjectActions: Import failed:', result.message);
    }

    return result;
  }, []);

  // Override the load function with Migumi-specific logic
  const loadProject = useCallback(async (key?: string) => {
    // Try Migumi-specific ref first, fall back to standard ref
    const reactFlowRef = globalReactFlowRef || getReactFlowRef();
    
    debug.log('📂 useMigumiProjectActions: Starting Migumi load', {
      hasMigumiRef: !!globalReactFlowRef,
      hasStandardRef: !!getReactFlowRef(),
      usingRef: reactFlowRef ? 'available' : 'none'
    });
    
    if (!reactFlowRef) {
      debug.error('❌ useMigumiProjectActions: No ReactFlow reference available');
      return { success: false, message: 'Editor not available' };
    }
    
    // Get current Migumi settings
    const settings = getMigumiSettings();
    debug.log('🔧 useMigumiProjectActions: Using settings:', settings);

    // Use the specialized Migumi load function
    const result = await loadMigumiProject(key, settings.useOldFormat);
    
    if (result.success && result.data) {
      debug.log('✅ useMigumiProjectActions: Load successful, updating editor');
      
      reactFlowRef.setNodes(result.data.nodes);
      reactFlowRef.setEdges(result.data.edges);
      
      if (result.data.viewport) {
        reactFlowRef.setViewport(result.data.viewport);
      } else {
        // Fit view after a short delay to ensure nodes are rendered
        setTimeout(() => reactFlowRef?.fitView(), 100);
      }
    } else {
      debug.error('❌ useMigumiProjectActions: Load failed:', result.message);
    }

    return result;
  }, []);

  // Return all actions with Migumi-specific overrides
  return {
    ...standardActions,
    importProject, // Override with Migumi-specific version
    loadProject,   // Override with Migumi-specific version
  };
}
