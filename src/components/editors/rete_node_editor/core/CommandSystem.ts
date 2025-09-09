export interface Command {
  id: string;
  name: string;
  execute(): Promise<boolean> | boolean;
  undo(): Promise<boolean> | boolean;
  canUndo: boolean;
}

export interface CommandHistory {
  commands: Command[];
  currentIndex: number;
  maxSize: number;
}

export class CommandSystem {
  private history: CommandHistory;
  private eventListeners: Map<string, ((command: Command) => void)[]> = new Map();

  constructor(maxHistorySize: number = 50) {
    this.history = {
      commands: [],
      currentIndex: -1,
      maxSize: maxHistorySize,
    };
  }

  async executeCommand(command: Command): Promise<boolean> {
    try {
      const success = await command.execute();
      
      if (success) {
        // Remove any commands after current index (for branching undo/redo)
        this.history.commands = this.history.commands.slice(0, this.history.currentIndex + 1);
        
        // Add new command
        this.history.commands.push(command);
        this.history.currentIndex++;
        
        // Maintain max history size
        if (this.history.commands.length > this.history.maxSize) {
          this.history.commands.shift();
          this.history.currentIndex--;
        }
        
        this.emit('command-executed', command);
      }
      
      return success;
    } catch (error) {
      console.error('Command execution failed:', error);
      return false;
    }
  }

  async undo(): Promise<boolean> {
    if (!this.canUndo()) {
      return false;
    }

    const command = this.history.commands[this.history.currentIndex];
    
    try {
      const success = await command.undo();
      
      if (success) {
        this.history.currentIndex--;
        this.emit('command-undone', command);
      }
      
      return success;
    } catch (error) {
      console.error('Command undo failed:', error);
      return false;
    }
  }

  async redo(): Promise<boolean> {
    if (!this.canRedo()) {
      return false;
    }

    const command = this.history.commands[this.history.currentIndex + 1];
    
    try {
      const success = await command.execute();
      
      if (success) {
        this.history.currentIndex++;
        this.emit('command-redone', command);
      }
      
      return success;
    } catch (error) {
      console.error('Command redo failed:', error);
      return false;
    }
  }

  canUndo(): boolean {
    return this.history.currentIndex >= 0 && 
           this.history.commands[this.history.currentIndex]?.canUndo;
  }

  canRedo(): boolean {
    return this.history.currentIndex < this.history.commands.length - 1;
  }

  getUndoCommand(): Command | null {
    if (this.canUndo()) {
      return this.history.commands[this.history.currentIndex];
    }
    return null;
  }

  getRedoCommand(): Command | null {
    if (this.canRedo()) {
      return this.history.commands[this.history.currentIndex + 1];
    }
    return null;
  }

  clear(): void {
    this.history.commands = [];
    this.history.currentIndex = -1;
    this.emit('history-cleared', null as any);
  }

  getHistory(): CommandHistory {
    return { ...this.history };
  }

  // Event system
  on(event: string, callback: (command: Command) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: (command: Command) => void): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, command: Command): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(command));
    }
  }
}

// Concrete command implementations
export class AddNodeCommand implements Command {
  id: string;
  name: string;
  canUndo = true;

  constructor(
    private nodeType: string,
    private position: { x: number; y: number },
    private editorCore: any // Would be properly typed
  ) {
    this.id = `add-node-${Date.now()}`;
    this.name = `Add ${nodeType}`;
  }

  async execute(): Promise<boolean> {
    // Implementation would add the node to the editor
    return true;
  }

  async undo(): Promise<boolean> {
    // Implementation would remove the added node
    return true;
  }
}

export class RemoveNodeCommand implements Command {
  id: string;
  name: string;
  canUndo = true;

  constructor(
    private nodeIds: string[],
    private editorCore: any
  ) {
    this.id = `remove-nodes-${Date.now()}`;
    this.name = `Remove ${nodeIds.length} node(s)`;
  }

  async execute(): Promise<boolean> {
    // Implementation would remove the nodes
    return true;
  }

  async undo(): Promise<boolean> {
    // Implementation would restore the nodes
    return true;
  }
}

export class MoveNodeCommand implements Command {
  id: string;
  name: string;
  canUndo = true;

  constructor(
    private nodeId: string,
    private fromPosition: { x: number; y: number },
    private toPosition: { x: number; y: number },
    private editorCore: any
  ) {
    this.id = `move-node-${Date.now()}`;
    this.name = 'Move node';
  }

  async execute(): Promise<boolean> {
    // Implementation would move the node
    return true;
  }

  async undo(): Promise<boolean> {
    // Implementation would move the node back
    return true;
  }
}
