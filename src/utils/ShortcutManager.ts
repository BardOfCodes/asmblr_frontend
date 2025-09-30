/**
 * Keyboard Shortcut Manager
 * 
 * Centralized system for managing mode-specific keyboard shortcuts.
 * Each mode can register its main function, and the manager handles
 * the keyboard events and dispatches to the appropriate function.
 */

import { debug } from './debug';

export type MainFunction = () => Promise<void> | void;

export interface ShortcutRegistration {
  mode: string;
  mainFunction: MainFunction;
  description?: string;
}

class ShortcutManagerClass {
  private registrations = new Map<string, ShortcutRegistration>();
  private currentMode: string | null = null;
  private isListening = false;

  /**
   * Register a main function for a specific mode
   */
  register(mode: string, mainFunction: MainFunction, description?: string): void {
    const registration: ShortcutRegistration = {
      mode,
      mainFunction,
      description: description || `Main function for ${mode} mode`
    };

    this.registrations.set(mode, registration);
    debug.log(`[ShortcutManager] Registered main function for mode: ${mode}`);
  }

  /**
   * Unregister a mode's main function
   */
  unregister(mode: string): void {
    if (this.registrations.delete(mode)) {
      debug.log(`[ShortcutManager] Unregistered main function for mode: ${mode}`);
    }
  }

  /**
   * Set the current active mode
   */
  setCurrentMode(mode: string | null): void {
    this.currentMode = mode;
    debug.log(`[ShortcutManager] Current mode set to: ${mode}`);
  }

  /**
   * Get the current mode
   */
  getCurrentMode(): string | null {
    return this.currentMode;
  }

  /**
   * Execute the main function for the current mode
   */
  async executeMainFunction(): Promise<boolean> {
    if (!this.currentMode) {
      debug.warn('[ShortcutManager] No current mode set, cannot execute main function');
      return false;
    }

    const registration = this.registrations.get(this.currentMode);
    if (!registration) {
      debug.warn(`[ShortcutManager] No main function registered for mode: ${this.currentMode}`);
      return false;
    }

    try {
      debug.log(`[ShortcutManager] Executing main function for mode: ${this.currentMode}`);
      await registration.mainFunction();
      debug.log(`[ShortcutManager] Main function executed successfully for mode: ${this.currentMode}`);
      return true;
    } catch (error) {
      debug.error(`[ShortcutManager] Error executing main function for mode ${this.currentMode}:`, error);
      return false;
    }
  }

  /**
   * Handle keyboard events
   */
  private handleKeyDown = (event: KeyboardEvent): void => {
    // Check for Cmd+Enter (Mac) or Ctrl+Enter (Windows/Linux)
    const isMainShortcut = (event.metaKey || event.ctrlKey) && event.key === 'Enter';
    
    if (isMainShortcut) {
      event.preventDefault();
      event.stopPropagation();
      
      debug.log('[ShortcutManager] Main shortcut triggered (Cmd/Ctrl+Enter)');
      this.executeMainFunction();
    }
  };

  /**
   * Start listening for keyboard events
   */
  startListening(): void {
    if (this.isListening) {
      debug.warn('[ShortcutManager] Already listening for keyboard events');
      return;
    }

    document.addEventListener('keydown', this.handleKeyDown, true);
    this.isListening = true;
    debug.log('[ShortcutManager] Started listening for keyboard shortcuts');
  }

  /**
   * Stop listening for keyboard events
   */
  stopListening(): void {
    if (!this.isListening) {
      return;
    }

    document.removeEventListener('keydown', this.handleKeyDown, true);
    this.isListening = false;
    debug.log('[ShortcutManager] Stopped listening for keyboard shortcuts');
  }

  /**
   * Get all registered modes and their descriptions
   */
  getRegistrations(): ShortcutRegistration[] {
    return Array.from(this.registrations.values());
  }

  /**
   * Check if a mode has a registered main function
   */
  hasMainFunction(mode: string): boolean {
    return this.registrations.has(mode);
  }

  /**
   * Get registration info for a specific mode
   */
  getRegistration(mode: string): ShortcutRegistration | undefined {
    return this.registrations.get(mode);
  }

  /**
   * Clear all registrations (useful for cleanup/testing)
   */
  clear(): void {
    this.registrations.clear();
    this.currentMode = null;
    debug.log('[ShortcutManager] Cleared all registrations');
  }
}

// Export singleton instance
export const ShortcutManager = new ShortcutManagerClass();

/**
 * React hook for registering a main function
 */
export function useMainFunctionRegistration(
  mode: string, 
  mainFunction: MainFunction, 
  description?: string
): void {
  React.useEffect(() => {
    ShortcutManager.register(mode, mainFunction, description);
    
    return () => {
      ShortcutManager.unregister(mode);
    };
  }, [mode, mainFunction, description]);
}

/**
 * React hook for managing shortcut manager lifecycle
 */
export function useShortcutManager(currentMode: string | null): void {
  React.useEffect(() => {
    ShortcutManager.setCurrentMode(currentMode);
  }, [currentMode]);

  React.useEffect(() => {
    ShortcutManager.startListening();
    
    return () => {
      ShortcutManager.stopListening();
    };
  }, []);
}

// Import React for hooks
import React from 'react';
