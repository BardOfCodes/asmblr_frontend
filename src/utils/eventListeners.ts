/**
 * Safe Event Listener Management Utility
 * 
 * This utility helps prevent memory leaks by automatically tracking
 * and cleaning up event listeners when components unmount.
 */

export type EventHandler = (event: any) => void;
export type CleanupFunction = () => void;

/**
 * Interface for managing event listeners safely
 */
export interface EventListenerManager {
  add: (
    target: EventTarget,
    event: string,
    handler: EventHandler,
    options?: boolean | AddEventListenerOptions
  ) => void;
  removeAll: () => void;
}

/**
 * Creates a manager for safe event listener handling
 * Call removeAll() in cleanup to prevent memory leaks
 */
export function createEventListenerManager(): EventListenerManager {
  const listeners: Array<{
    target: EventTarget;
    event: string;
    handler: EventHandler;
    options?: boolean | AddEventListenerOptions;
  }> = [];

  return {
    add(target, event, handler, options) {
      target.addEventListener(event, handler, options);
      listeners.push({ target, event, handler, options });
    },

    removeAll() {
      listeners.forEach(({ target, event, handler, options }) => {
        target.removeEventListener(event, handler, options);
      });
      listeners.length = 0; // Clear the array
    },
  };
}

/**
 * React hook for safe event listener management
 * Automatically cleans up on unmount
 */
export function useEventListeners(): EventListenerManager {
  const managerRef = React.useRef<EventListenerManager>();
  
  if (!managerRef.current) {
    managerRef.current = createEventListenerManager();
  }

  React.useEffect(() => {
    return () => {
      managerRef.current?.removeAll();
    };
  }, []);

  return managerRef.current;
}

/**
 * Utility to safely add event listener with automatic cleanup
 * Returns cleanup function
 */
export function safeAddEventListener(
  target: EventTarget,
  event: string,
  handler: EventHandler,
  options?: boolean | AddEventListenerOptions
): CleanupFunction {
  target.addEventListener(event, handler, options);
  
  return () => {
    target.removeEventListener(event, handler, options);
  };
}

/**
 * React hook for a single event listener with automatic cleanup
 */
export function useEventListener(
  target: EventTarget | null | undefined,
  event: string,
  handler: EventHandler,
  options?: boolean | AddEventListenerOptions,
  deps: React.DependencyList = []
): void {
  React.useEffect(() => {
    if (!target) return;

    const cleanup = safeAddEventListener(target, event, handler, options);
    return cleanup;
  }, [target, event, ...deps]);
}

/**
 * React hook for window resize event with debouncing
 */
export function useWindowResize(
  handler: (width: number, height: number) => void,
  debounceMs: number = 100
): void {
  React.useEffect(() => {
    let timeoutId: number;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handler(window.innerWidth, window.innerHeight);
      }, debounceMs);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [handler, debounceMs]);
}

/**
 * Cleanup manager for non-React classes
 * Useful for viewer classes that need to track multiple cleanups
 */
export class CleanupManager {
  private cleanups: CleanupFunction[] = [];

  add(cleanup: CleanupFunction): void {
    this.cleanups.push(cleanup);
  }

  addEventlistener(
    target: EventTarget,
    event: string,
    handler: EventHandler,
    options?: boolean | AddEventListenerOptions
  ): void {
    const cleanup = safeAddEventListener(target, event, handler, options);
    this.add(cleanup);
  }

  addTimeout(callback: () => void, delay: number): void {
    const timeoutId = setTimeout(callback, delay);
    this.add(() => clearTimeout(timeoutId));
  }

  addInterval(callback: () => void, delay: number): void {
    const intervalId = setInterval(callback, delay);
    this.add(() => clearInterval(intervalId));
  }

  cleanup(): void {
    this.cleanups.forEach(cleanup => cleanup());
    this.cleanups = [];
  }
}

// Import React for the hooks
import React from 'react';
