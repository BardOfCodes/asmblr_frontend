/**
 * ProjectFileManager - Extensible project file management system
 * 
 * This system handles saving/loading complete project files that can contain:
 * - Graph data (nodes, connections, positions)
 * - Interface specifications
 * - Editor settings and state
 * - Metadata and versioning
 */

import { Node, Edge } from 'reactflow';
import { ReactFlowNodeData } from '../types';
import { GraphSerializer, GraphFormat } from './GraphSerializer';
import { NodeRegistry } from '../definitions/NodeRegistry';

// Version for project file format - increment when making breaking changes
export const PROJECT_FILE_VERSION = '1.0.0';

// Core project file structure - designed to be extensible
export interface ProjectFile {
  // File metadata
  version: string;
  created: string;
  modified: string;
  name?: string;
  description?: string;
  
  // Core graph data (always present)
  graph: GraphFormat;
  
  // Interface specifications (extensible)
  interfaces?: {
    // Future: interface types can be added here
    // webgl?: WebGLInterfaceSpec;
    // terminal?: TerminalInterfaceSpec;
  };
  
  // Editor-specific settings (extensible)
  editorSettings?: {
    reactflow?: ReactFlowEditorSettings;
    // Future: settings for other editors
    // rete?: ReteEditorSettings;
  };
  
  // Application-level settings
  appSettings?: {
    selectedEditor?: string;
    theme?: string;
    layout?: any;
  };
  
  // Custom metadata (extensible for future use)
  metadata?: Record<string, any>;
}


// React Flow editor specific settings
export interface ReactFlowEditorSettings {
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
  selectedNodes?: string[];
  clipboardData?: any;
  // Future: minimap settings, connection styles, etc.
}

export class ProjectFileManager {
  private nodeRegistry: NodeRegistry;
  
  constructor(nodeRegistry: NodeRegistry) {
    this.nodeRegistry = nodeRegistry;
  }
  
  /**
   * Create a project file from current editor state
   */
  createProjectFile(
    nodes: Node<ReactFlowNodeData>[],
    edges: Edge[],
    options: {
      name?: string;
      description?: string;
      viewport?: { x: number; y: number; zoom: number };
      selectedNodes?: string[];
      appSettings?: ProjectFile['appSettings'];
      metadata?: Record<string, any>;
    } = {}
  ): ProjectFile {
    const now = new Date().toISOString();
    
    // Serialize the graph data
    const graphData = GraphSerializer.serialize(nodes, edges, options.name || 'project');
    
    const projectFile: ProjectFile = {
      // Metadata
      version: PROJECT_FILE_VERSION,
      created: now,
      modified: now,
      name: options.name,
      description: options.description,
      
      // Core graph data
      graph: graphData,
      
      // Editor settings
      editorSettings: {
        reactflow: {
          viewport: options.viewport,
          selectedNodes: options.selectedNodes,
        }
      },
      
      // App settings
      appSettings: options.appSettings,
      
      // Custom metadata
      metadata: options.metadata
    };
    
    return projectFile;
  }
  
  /**
   * Load project file and extract editor state
   */
  loadProjectFile(projectFile: ProjectFile): {
    nodes: Node<ReactFlowNodeData>[];
    edges: Edge[];
    viewport?: { x: number; y: number; zoom: number };
    selectedNodes?: string[];
    appSettings?: ProjectFile['appSettings'];
    metadata: {
      name?: string;
      description?: string;
      created: string;
      modified: string;
      version: string;
    };
  } {
    // Validate version compatibility
    if (!this.isVersionCompatible(projectFile.version)) {
      // Version mismatch - project may not be fully compatible
    }
    
    // Deserialize graph data - use the first available module name from the saved data
    const moduleNames = Object.keys(projectFile.graph.moduleList);
    const moduleName = moduleNames.length > 0 ? moduleNames[0] : 'project';
    const { nodes, edges } = GraphSerializer.deserialize(projectFile.graph, moduleName, this.nodeRegistry);
    
    return {
      nodes,
      edges,
      viewport: projectFile.editorSettings?.reactflow?.viewport,
      selectedNodes: projectFile.editorSettings?.reactflow?.selectedNodes,
      appSettings: projectFile.appSettings,
      metadata: {
        name: projectFile.name,
        description: projectFile.description,
        created: projectFile.created,
        modified: projectFile.modified,
        version: projectFile.version
      }
    };
  }
  
  /**
   * Save project file to local storage
   */
  saveToLocalStorage(
    key: string,
    nodes: Node<ReactFlowNodeData>[],
    edges: Edge[],
    options: Parameters<typeof this.createProjectFile>[2] = {}
  ): void {
    const projectFile = this.createProjectFile(nodes, edges, options);
    
    try {
      localStorage.setItem(`asmblr-project-${key}`, JSON.stringify(projectFile, null, 2));
    } catch (error) {
      throw new Error('Failed to save project. Storage may be full.');
    }
  }
  
  /**
   * Load project file from local storage
   */
  loadFromLocalStorage(key: string): ReturnType<typeof this.loadProjectFile> | null {
    try {
      const data = localStorage.getItem(`asmblr-project-${key}`);
      if (!data) return null;
      
      const projectFile: ProjectFile = JSON.parse(data);
      return this.loadProjectFile(projectFile);
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Export project file as downloadable JSON
   */
  exportToFile(
    filename: string,
    nodes: Node<ReactFlowNodeData>[],
    edges: Edge[],
    options: Parameters<typeof this.createProjectFile>[2] = {}
  ): void {
    const projectFile = this.createProjectFile(nodes, edges, options);
    
    const blob = new Blob([JSON.stringify(projectFile, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.endsWith('.asmblr.json') ? filename : `${filename}.asmblr.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  /**
   * Import project file from uploaded file
   */
  importFromFile(file: File): Promise<ReturnType<typeof this.loadProjectFile>> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const projectFile: ProjectFile = JSON.parse(content);
          
          // Validate project file structure
          if (!this.validateProjectFile(projectFile)) {
            throw new Error('Invalid project file format');
          }
          
          const result = this.loadProjectFile(projectFile);
          resolve(result);
        } catch (error) {
          reject(new Error(`Failed to import project file: ${error}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read project file'));
      };
      
      reader.readAsText(file);
    });
  }
  
  /**
   * List all projects saved in localStorage
   */
  listLocalStorageProjects(): Array<{
    key: string;
    name?: string;
    description?: string;
    created: string;
    modified: string;
    version: string;
  }> {
    const projects: Array<any> = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('asmblr-project-')) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const projectFile: ProjectFile = JSON.parse(data);
            projects.push({
              key: key.replace('asmblr-project-', ''),
              name: projectFile.name,
              description: projectFile.description,
              created: projectFile.created,
              modified: projectFile.modified,
              version: projectFile.version
            });
          }
        } catch (error) {
          // Failed to parse project file
        }
      }
    }
    
    return projects.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
  }
  
  /**
   * Delete project from localStorage
   */
  deleteFromLocalStorage(key: string): boolean {
    try {
      localStorage.removeItem(`asmblr-project-${key}`);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Check if project file version is compatible
   */
  private isVersionCompatible(version: string): boolean {
    // For now, simple major version check
    const [currentMajor] = PROJECT_FILE_VERSION.split('.');
    const [fileMajor] = version.split('.');
    return currentMajor === fileMajor;
  }
  
  /**
   * Validate project file structure
   */
  private validateProjectFile(projectFile: any): projectFile is ProjectFile {
    return (
      projectFile &&
      typeof projectFile === 'object' &&
      typeof projectFile.version === 'string' &&
      typeof projectFile.created === 'string' &&
      typeof projectFile.modified === 'string' &&
      projectFile.graph &&
      typeof projectFile.graph === 'object'
    );
  }
}
