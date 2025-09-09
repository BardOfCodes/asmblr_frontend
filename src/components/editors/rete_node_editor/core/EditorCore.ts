import { NodeEditor } from 'rete';
import { DataflowEngine } from 'rete-engine';
import { Schemes } from '../types';

export interface EditorEvents {
  'nodes-changed': { added: string[]; removed: string[]; updated: string[] };
  'connections-changed': { added: string[]; removed: string[] };
  'selection-changed': { nodeIds: string[] };
  'graph-processed': { success: boolean; error?: string };
}

export type EditorEventCallback<T = any> = (data: T) => void;

export class EditorCore {
  private editor: NodeEditor<Schemes>;
  private engine: DataflowEngine<Schemes>;
  private eventListeners: Map<keyof EditorEvents, EditorEventCallback[]> = new Map();
  private selectedNodes: Set<string> = new Set();

  constructor(editor: NodeEditor<Schemes>, engine: DataflowEngine<Schemes>) {
    this.editor = editor;
    this.engine = engine;
    this.setupEventHandlers();
  }

  // Node Management
  async addNode(nodeType: string, position: { x: number; y: number }): Promise<string | null> {
    try {
      // This would be implemented with the actual node creation logic
      // For now, returning a placeholder
      const nodeId = `node_${Date.now()}`;
      
      this.emit('nodes-changed', { 
        added: [nodeId], 
        removed: [], 
        updated: [] 
      });
      
      return nodeId;
    } catch (error) {
      console.error('Failed to add node:', error);
      return null;
    }
  }

  async removeNodes(nodeIds: string[]): Promise<boolean> {
    try {
      for (const nodeId of nodeIds) {
        const node = this.editor.getNode(nodeId);
        if (node) {
          await this.editor.removeNode(nodeId);
        }
      }
      
      this.emit('nodes-changed', { 
        added: [], 
        removed: nodeIds, 
        updated: [] 
      });
      
      return true;
    } catch (error) {
      console.error('Failed to remove nodes:', error);
      return false;
    }
  }

  // Selection Management
  selectNodes(nodeIds: string[]): void {
    this.selectedNodes.clear();
    nodeIds.forEach(id => this.selectedNodes.add(id));
    this.emit('selection-changed', { nodeIds });
  }

  getSelectedNodes(): string[] {
    return Array.from(this.selectedNodes);
  }

  clearSelection(): void {
    this.selectedNodes.clear();
    this.emit('selection-changed', { nodeIds: [] });
  }

  // Graph Operations
  async processGraph(): Promise<boolean> {
    try {
      this.engine.reset();
      
      // Process all output nodes
      const nodes = this.editor.getNodes();
      for (const node of nodes) {
        await this.engine.fetch(node.id);
      }
      
      this.emit('graph-processed', { success: true });
      return true;
    } catch (error) {
      console.error('Graph processing failed:', error);
      this.emit('graph-processed', { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      return false;
    }
  }

  async clearGraph(): Promise<void> {
    const nodeIds = this.editor.getNodes().map(node => node.id);
    await this.editor.clear();
    this.selectedNodes.clear();
    
    this.emit('nodes-changed', { 
      added: [], 
      removed: nodeIds, 
      updated: [] 
    });
    this.emit('selection-changed', { nodeIds: [] });
  }

  // Data Export/Import
  exportGraph(): any {
    const nodes = this.editor.getNodes();
    const connections = this.editor.getConnections();
    
    return {
      nodes: nodes.map(node => ({
        id: node.id,
        label: node.label,
        // Add other node properties as needed
      })),
      connections: connections.map(conn => ({
        id: conn.id,
        source: conn.source,
        target: conn.target,
        sourceOutput: conn.sourceOutput,
        targetInput: conn.targetInput,
      })),
      metadata: {
        exportedAt: new Date().toISOString(),
        nodeCount: nodes.length,
        connectionCount: connections.length,
      }
    };
  }

  async importGraph(data: any): Promise<boolean> {
    try {
      await this.clearGraph();
      
      // Import nodes and connections
      // This would be implemented with the actual import logic
      
      await this.processGraph();
      return true;
    } catch (error) {
      console.error('Failed to import graph:', error);
      return false;
    }
  }

  // Layout Management
  async arrangeNodes(): Promise<void> {
    // This would use the auto-arrange plugin
    // Implementation depends on the specific layout algorithm
  }

  async fitToView(): Promise<void> {
    // This would fit all nodes into the current view
    // Implementation depends on the area plugin
  }

  // Event System
  on<K extends keyof EditorEvents>(event: K, callback: EditorEventCallback<EditorEvents[K]>): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off<K extends keyof EditorEvents>(event: K, callback: EditorEventCallback<EditorEvents[K]>): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit<K extends keyof EditorEvents>(event: K, data: EditorEvents[K]): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // Internal Event Handlers
  private setupEventHandlers(): void {
    // Set up editor event pipes
    this.editor.addPipe((context) => {
      if (context.type === 'nodeadded') {
        this.emit('nodes-changed', { 
          added: [context.data.id], 
          removed: [], 
          updated: [] 
        });
      } else if (context.type === 'noderemoved') {
        this.emit('nodes-changed', { 
          added: [], 
          removed: [context.data.id], 
          updated: [] 
        });
      } else if (context.type === 'connectioncreated') {
        this.emit('connections-changed', { 
          added: [context.data.id], 
          removed: [] 
        });
      } else if (context.type === 'connectionremoved') {
        this.emit('connections-changed', { 
          added: [], 
          removed: [context.data.id] 
        });
      }
      
      return context;
    });
  }

  // Getters
  get nodeCount(): number {
    return this.editor.getNodes().length;
  }

  get connectionCount(): number {
    return this.editor.getConnections().length;
  }

  get hasSelection(): boolean {
    return this.selectedNodes.size > 0;
  }
}
