/**
 * ProjectService - Simple, lightweight project management service
 * 
 * This is a singleton service that handles project operations without React hooks
 * or complex state management. It's called directly when needed.
 */

import { Node, Edge } from 'reactflow';
import { ReactFlowNodeData } from '../types';
import { ProjectFileManager, ProjectFile } from '../utils/ProjectFileManager';
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
    if (!this.projectManager) {
      this.projectManager = new ProjectFileManager(nodeRegistry);
    }
  }

  // Simple save operation
  async saveProject(
    nodes: Node<ReactFlowNodeData>[],
    edges: Edge[],
    viewport: { x: number; y: number; zoom: number },
    key?: string
  ): Promise<{ success: boolean; message: string; key?: string }> {
    if (!this.projectManager) {
      return { success: false, message: 'Project service not initialized' };
    }

    try {
      const projectKey = key || `project-${Date.now()}`;
      
      this.projectManager.saveToLocalStorage(projectKey, nodes, edges, {
        name: projectKey,
        description: 'Saved from React Flow editor',
        viewport
      });

      return { 
        success: true, 
        message: 'Project saved successfully', 
        key: projectKey 
      };
    } catch (error) {
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
    if (!this.projectManager) {
      return { success: false, message: 'Project service not initialized' };
    }

    try {
      // If no key provided, get the most recent project
      if (!key) {
        const projects = this.projectManager.listLocalStorageProjects();
        if (projects.length === 0) {
          return { success: false, message: 'No saved projects found' };
        }
        key = projects[0].key; // Most recent
      }

      const result = this.projectManager.loadFromLocalStorage(key);
      if (!result) {
        return { success: false, message: `Project "${key}" not found` };
      }

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
    if (!this.projectManager) {
      return { success: false, message: 'Project service not initialized' };
    }

    try {
      const result = await this.projectManager.importFromFile(file);
      
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
    if (!this.projectManager) {
      return [];
    }
    return this.projectManager.listLocalStorageProjects();
  }

  // Delete project
  deleteProject(key: string): { success: boolean; message: string } {
    if (!this.projectManager) {
      return { success: false, message: 'Project service not initialized' };
    }

    const success = this.projectManager.deleteFromLocalStorage(key);
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
