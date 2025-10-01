/**
 * useProjectActions - Simple hook for accessing project actions
 * 
 * This is a lightweight hook that provides access to the ProjectService
 * without any complex state management or memoization.
 * 
 * Key Features:
 * - Automatic cleanup of stale connections before saving/exporting
 * - Validation of edge integrity (source/target nodes must exist)
 * - Proper handle validation for all connections
 * - Real-time data refresh from ReactFlow instance
 */

import { useCallback } from 'react';
import { projectService } from '../services/ProjectService';
import { Node, Edge } from 'reactflow';
import { debug } from '../../../../utils/debug';

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
  globalReactFlowRef = ref;
}

export function getReactFlowRef() {
  return globalReactFlowRef;
}

/**
 * Clean up edges to ensure they only reference existing nodes
 * This prevents saving stale connection data after nodes are deleted
 */
function cleanupEdges(nodes: Node[], edges: Edge[]): Edge[] {
  const nodeIds = new Set(nodes.map(node => node.id));
  
  return edges.filter(edge => {
    // Basic validation: check if source and target nodes exist
    const hasValidSource = nodeIds.has(edge.source);
    const hasValidTarget = nodeIds.has(edge.target);
    
    // Additional validation: check if edge has required properties
    const hasSourceHandle = edge.sourceHandle != null;
    const hasTargetHandle = edge.targetHandle != null;
    
    const isValid = hasValidSource && hasValidTarget && hasSourceHandle && hasTargetHandle;
    
    if (!isValid) {
      debug.log(`Removing invalid edge: ${edge.source}[${edge.sourceHandle}] -> ${edge.target}[${edge.targetHandle}]`, {
        sourceExists: hasValidSource,
        targetExists: hasValidTarget,
        hasSourceHandle,
        hasTargetHandle
      });
      return false;
    }
    
    return true;
  });
}

/**
 * Get clean nodes and edges data from ReactFlow instance
 * This ensures we have the most up-to-date data without stale connections
 */
function getCleanGraphData(): { nodes: Node[]; edges: Edge[] } | null {
  if (!globalReactFlowRef) {
    return null;
  }

  // Force a refresh by getting the current state
  // This ensures we have the most up-to-date data after any deletions
  const nodes = globalReactFlowRef.getNodes();
  const edges = globalReactFlowRef.getEdges();
  
  debug.log(`Raw data: ${nodes.length} nodes, ${edges.length} edges`);
  
  // Clean up edges to remove any stale connections
  const cleanEdges = cleanupEdges(nodes, edges);
  
  debug.log(`After cleanup: ${nodes.length} nodes, ${cleanEdges.length} edges`);
  
  return { nodes, edges: cleanEdges };
}

export function useProjectActions() {
  const saveProject = useCallback(async (key?: string) => {
    const graphData = getCleanGraphData();
    if (!graphData) {
      return { success: false, message: 'Editor not available' };
    }

    const viewport = globalReactFlowRef!.getViewport();

    debug.log(`Saving project with ${graphData.nodes.length} nodes and ${graphData.edges.length} clean edges`);
    return await projectService.saveProject(graphData.nodes, graphData.edges, viewport, key);
  }, []);

  const loadProject = useCallback(async (key?: string) => {
    if (!globalReactFlowRef) {
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
    const graphData = getCleanGraphData();
    if (!graphData) {
      return { success: false, message: 'Editor not available' };
    }

    const viewport = globalReactFlowRef!.getViewport();

    debug.log(`Exporting project with ${graphData.nodes.length} nodes and ${graphData.edges.length} clean edges`);
    return await projectService.exportProject(graphData.nodes, graphData.edges, viewport, filename);
  }, []);

  const newProject = useCallback(() => {
    if (!globalReactFlowRef) {
      return { success: false, message: 'Editor not available' };
    }

    globalReactFlowRef.setNodes([]);
    globalReactFlowRef.setEdges([]);
    
    return { success: true, message: 'New project created' };
  }, []);

  const importProject = useCallback(async (file: File) => {
    if (!globalReactFlowRef) {
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
    return globalReactFlowRef !== null;
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
