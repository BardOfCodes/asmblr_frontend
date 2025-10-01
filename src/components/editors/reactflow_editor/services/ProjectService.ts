/**
 * ProjectService - Simple, lightweight project management service
 * 
 * This is a singleton service that handles project operations without React hooks
 * or complex state management. It's called directly when needed.
 */

import { Node, Edge } from 'reactflow';
import { ReactFlowNodeData } from '../types';
import { ProjectFileManager } from '../utils/ProjectFileManager';
import { NodeRegistry } from '../definitions/NodeRegistry';

class ProjectService {
  private projectManager: ProjectFileManager | null = null;
  private static instance: ProjectService | null = null;

  private constructor() {}

  static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  // Initialize with node registry (called once from ReactFlowEditor)
  initialize(nodeRegistry: NodeRegistry): void {
    console.log('🔧 ProjectService: Initializing with node registry');
    if (!this.projectManager) {
      this.projectManager = new ProjectFileManager(nodeRegistry);
      console.log('✅ ProjectService: ProjectFileManager created successfully');
    } else {
      console.log('ℹ️ ProjectService: Already initialized, skipping');
    }
  }

  // Simple save operation
  async saveProject(
    nodes: Node<ReactFlowNodeData>[],
    edges: Edge[],
    viewport: { x: number; y: number; zoom: number },
    key?: string
  ): Promise<{ success: boolean; message: string; key?: string }> {
    console.log('💾 ProjectService: Starting save operation', {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      viewport,
      providedKey: key
    });

    if (!this.projectManager) {
      console.error('❌ ProjectService: Save failed - service not initialized');
      return { success: false, message: 'Project service not initialized' };
    }

    try {
      const projectKey = key || `project-${Date.now()}`;
      console.log('📝 ProjectService: Using project key:', projectKey);
      
      this.projectManager.saveToLocalStorage(projectKey, nodes, edges, {
        name: projectKey,
        description: 'Saved from React Flow editor',
        viewport
      });

      console.log('✅ ProjectService: Project saved successfully with key:', projectKey);
      return { 
        success: true, 
        message: 'Project saved successfully', 
        key: projectKey 
      };
    } catch (error) {
      console.error('❌ ProjectService: Save failed with error:', error);
      return { 
        success: false, 
        message: `Failed to save project: ${error}` 
      };
    }
  }

  // Simple load operation
  async loadProject(key?: string): Promise<{
    success: boolean;
    message: string;
    data?: {
      nodes: Node<ReactFlowNodeData>[];
      edges: Edge[];
      viewport?: { x: number; y: number; zoom: number };
      metadata?: any;
    };
  }> {
    console.log('📂 ProjectService: Starting load operation', { providedKey: key });

    if (!this.projectManager) {
      console.error('❌ ProjectService: Load failed - service not initialized');
      return { success: false, message: 'Project service not initialized' };
    }

    try {
      // If no key provided, get the most recent project
      if (!key) {
        console.log('🔍 ProjectService: No key provided, searching for most recent project');
        const projects = this.projectManager.listLocalStorageProjects();
        console.log('📋 ProjectService: Found projects:', projects.map(p => ({ key: p.key, name: p.name, created: p.created })));
        
        if (projects.length === 0) {
          console.warn('⚠️ ProjectService: No saved projects found');
          return { success: false, message: 'No saved projects found' };
        }
        key = projects[0].key; // Most recent
        console.log('🎯 ProjectService: Using most recent project key:', key);
      }

      console.log('🔄 ProjectService: Attempting to load project with key:', key);
      const result = this.projectManager.loadFromLocalStorage(key);
      
      if (!result) {
        console.error('❌ ProjectService: Project not found in localStorage:', key);
        return { success: false, message: `Project "${key}" not found` };
      }

      console.log('📊 ProjectService: Project loaded successfully', {
        key,
        nodeCount: result.nodes?.length || 0,
        edgeCount: result.edges?.length || 0,
        hasViewport: !!result.viewport,
        hasMetadata: !!result.metadata
      });

      console.log('🔍 ProjectService: Loaded data structure:', {
        nodes: result.nodes?.map(n => ({ id: n.id, type: n.type, position: n.position })) || [],
        edges: result.edges?.map(e => ({ id: e.id, source: e.source, target: e.target })) || [],
        viewport: result.viewport,
        metadata: result.metadata
      });

      return {
        success: true,
        message: 'Project loaded successfully',
        data: {
          nodes: result.nodes,
          edges: result.edges,
          viewport: result.viewport,
          metadata: result.metadata
        }
      };
    } catch (error) {
      console.error('❌ ProjectService: Load failed with error:', error);
      console.error('📍 ProjectService: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      return { 
        success: false, 
        message: `Failed to load project: ${error}` 
      };
    }
  }

  // Export project to file
  async exportProject(
    nodes: Node<ReactFlowNodeData>[],
    edges: Edge[],
    viewport: { x: number; y: number; zoom: number },
    filename?: string
  ): Promise<{ success: boolean; message: string }> {
    if (!this.projectManager) {
      return { success: false, message: 'Project service not initialized' };
    }

    try {
      const exportName = filename || `project-${new Date().toISOString().split('T')[0]}`;
      
      this.projectManager.exportToFile(exportName, nodes, edges, {
        name: exportName,
        description: 'Exported from React Flow editor',
        viewport
      });

      return { success: true, message: 'Project exported successfully' };
    } catch (error) {
      return { 
        success: false, 
        message: `Failed to export project: ${error}` 
      };
    }
  }

  // Import project from file
  async importProject(file: File): Promise<{
    success: boolean;
    message: string;
    data?: {
      nodes: Node<ReactFlowNodeData>[];
      edges: Edge[];
      viewport?: { x: number; y: number; zoom: number };
      metadata?: any;
    };
  }> {
    console.log('📁 ProjectService: Starting import operation', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lastModified: new Date(file.lastModified).toISOString()
    });

    if (!this.projectManager) {
      console.error('❌ ProjectService: Import failed - service not initialized');
      return { success: false, message: 'Project service not initialized' };
    }

    try {
      console.log('🔄 ProjectService: Calling ProjectFileManager.importFromFile');
      const result = await this.projectManager.importFromFile(file);
      
      console.log('📊 ProjectService: File imported successfully', {
        nodeCount: result.nodes?.length || 0,
        edgeCount: result.edges?.length || 0,
        hasViewport: !!result.viewport,
        hasMetadata: !!result.metadata
      });

      console.log('🔍 ProjectService: Imported data structure:', {
        nodes: result.nodes?.map(n => ({ id: n.id, type: n.type, position: n.position })) || [],
        edges: result.edges?.map(e => ({ id: e.id, source: e.source, target: e.target })) || [],
        viewport: result.viewport,
        metadata: result.metadata
      });
      
      return {
        success: true,
        message: 'Project imported successfully',
        data: {
          nodes: result.nodes,
          edges: result.edges,
          viewport: result.viewport,
          metadata: result.metadata
        }
      };
    } catch (error) {
      console.error('❌ ProjectService: Import failed with error:', error);
      console.error('📍 ProjectService: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      return { 
        success: false, 
        message: `Failed to import project: ${error}` 
      };
    }
  }

  // List saved projects
  listProjects(): Array<{
    key: string;
    name?: string;
    description?: string;
    created: string;
    modified: string;
    version: string;
  }> {
    console.log('📋 ProjectService: Listing saved projects');
    
    if (!this.projectManager) {
      console.warn('⚠️ ProjectService: Cannot list projects - service not initialized');
      return [];
    }
    
    const projects = this.projectManager.listLocalStorageProjects();
    console.log('📊 ProjectService: Found projects:', projects.length);
    console.log('🔍 ProjectService: Project details:', projects.map(p => ({
      key: p.key,
      name: p.name,
      created: p.created,
      modified: p.modified,
      version: p.version
    })));
    
    return projects;
  }

  // Delete project
  deleteProject(key: string): { success: boolean; message: string } {
    console.log('🗑️ ProjectService: Deleting project with key:', key);
    
    if (!this.projectManager) {
      console.error('❌ ProjectService: Delete failed - service not initialized');
      return { success: false, message: 'Project service not initialized' };
    }

    const success = this.projectManager.deleteFromLocalStorage(key);
    
    if (success) {
      console.log('✅ ProjectService: Project deleted successfully:', key);
    } else {
      console.error('❌ ProjectService: Failed to delete project:', key);
    }
    
    return {
      success,
      message: success 
        ? 'Project deleted successfully' 
        : 'Failed to delete project'
    };
  }
}

// Export singleton instance
export const projectService = ProjectService.getInstance();
