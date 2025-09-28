import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  createEventListenerManager, 
  safeAddEventListener,
  CleanupManager 
} from '../eventListeners';

describe('Event Listener Management', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
  });

  describe('createEventListenerManager', () => {
    it('should add and remove event listeners', () => {
      const manager = createEventListenerManager();
      const handler = vi.fn();
      
      const addSpy = vi.spyOn(mockElement, 'addEventListener');
      const removeSpy = vi.spyOn(mockElement, 'removeEventListener');
      
      // Add listener
      manager.add(mockElement, 'click', handler);
      expect(addSpy).toHaveBeenCalledWith('click', handler, undefined);
      
      // Remove all listeners
      manager.removeAll();
      expect(removeSpy).toHaveBeenCalledWith('click', handler, undefined);
    });

    it('should handle multiple listeners', () => {
      const manager = createEventListenerManager();
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      
      const removeSpy = vi.spyOn(mockElement, 'removeEventListener');
      
      manager.add(mockElement, 'click', handler1);
      manager.add(mockElement, 'keydown', handler2);
      manager.add(window, 'resize', handler1);
      
      manager.removeAll();
      
      expect(removeSpy).toHaveBeenCalledTimes(2);
      expect(removeSpy).toHaveBeenCalledWith('click', handler1, undefined);
      expect(removeSpy).toHaveBeenCalledWith('keydown', handler2, undefined);
    });
  });

  describe('safeAddEventListener', () => {
    it('should return cleanup function', () => {
      const handler = vi.fn();
      const addSpy = vi.spyOn(mockElement, 'addEventListener');
      const removeSpy = vi.spyOn(mockElement, 'removeEventListener');
      
      const cleanup = safeAddEventListener(mockElement, 'click', handler);
      expect(addSpy).toHaveBeenCalledWith('click', handler, undefined);
      
      cleanup();
      expect(removeSpy).toHaveBeenCalledWith('click', handler, undefined);
    });

    it('should handle options correctly', () => {
      const handler = vi.fn();
      const options = { passive: true, capture: false };
      const addSpy = vi.spyOn(mockElement, 'addEventListener');
      const removeSpy = vi.spyOn(mockElement, 'removeEventListener');
      
      const cleanup = safeAddEventListener(mockElement, 'wheel', handler, options);
      expect(addSpy).toHaveBeenCalledWith('wheel', handler, options);
      
      cleanup();
      expect(removeSpy).toHaveBeenCalledWith('wheel', handler, options);
    });
  });

  describe('CleanupManager', () => {
    it('should manage multiple cleanup functions', () => {
      const manager = new CleanupManager();
      const cleanup1 = vi.fn();
      const cleanup2 = vi.fn();
      const cleanup3 = vi.fn();
      
      manager.add(cleanup1);
      manager.add(cleanup2);
      manager.add(cleanup3);
      
      manager.cleanup();
      
      expect(cleanup1).toHaveBeenCalled();
      expect(cleanup2).toHaveBeenCalled();
      expect(cleanup3).toHaveBeenCalled();
    });

    it('should clear cleanups after calling cleanup()', () => {
      const manager = new CleanupManager();
      const cleanup = vi.fn();
      
      manager.add(cleanup);
      manager.cleanup();
      expect(cleanup).toHaveBeenCalledTimes(1);
      
      // Calling cleanup again should not call the function again
      manager.cleanup();
      expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it('should handle event listeners with addEventlistener', () => {
      const manager = new CleanupManager();
      const handler = vi.fn();
      const removeSpy = vi.spyOn(mockElement, 'removeEventListener');
      
      manager.addEventlistener(mockElement, 'click', handler);
      manager.cleanup();
      
      expect(removeSpy).toHaveBeenCalledWith('click', handler, undefined);
    });

    it('should handle timeouts', () => {
      vi.useFakeTimers();
      const manager = new CleanupManager();
      const callback = vi.fn();
      
      manager.addTimeout(callback, 1000);
      
      // Cleanup before timeout fires
      manager.cleanup();
      vi.advanceTimersByTime(1000);
      
      // Callback should not have been called
      expect(callback).not.toHaveBeenCalled();
      
      vi.useRealTimers();
    });

    it('should handle intervals', () => {
      vi.useFakeTimers();
      const manager = new CleanupManager();
      const callback = vi.fn();
      
      manager.addInterval(callback, 100);
      
      vi.advanceTimersByTime(250);
      expect(callback).toHaveBeenCalledTimes(2);
      
      manager.cleanup();
      vi.advanceTimersByTime(200);
      
      // Should still be 2 calls since we cleaned up
      expect(callback).toHaveBeenCalledTimes(2);
      
      vi.useRealTimers();
    });
  });

  describe('Memory leak prevention', () => {
    it('should prevent event listener memory leaks', () => {
      const manager = createEventListenerManager();
      const handlers: (() => void)[] = [];
      
      // Simulate adding many event listeners
      for (let i = 0; i < 100; i++) {
        const handler = vi.fn();
        handlers.push(handler);
        manager.add(mockElement, 'click', handler);
      }
      
      // All handlers should be removed
      const removeSpy = vi.spyOn(mockElement, 'removeEventListener');
      manager.removeAll();
      
      expect(removeSpy).toHaveBeenCalledTimes(100);
    });

    it('should handle cleanup manager with mixed cleanup types', () => {
      vi.useFakeTimers();
      const manager = new CleanupManager();
      
      const cleanupFn = vi.fn();
      const timeoutCallback = vi.fn();
      const intervalCallback = vi.fn();
      const eventHandler = vi.fn();
      
      // Add various types of cleanups
      manager.add(cleanupFn);
      manager.addTimeout(timeoutCallback, 1000);
      manager.addInterval(intervalCallback, 500);
      manager.addEventlistener(mockElement, 'click', eventHandler);
      
      // Verify interval runs
      vi.advanceTimersByTime(600);
      expect(intervalCallback).toHaveBeenCalledTimes(1);
      
      // Clean everything up
      const removeSpy = vi.spyOn(mockElement, 'removeEventListener');
      manager.cleanup();
      
      // Verify all cleanups occurred
      expect(cleanupFn).toHaveBeenCalled();
      expect(removeSpy).toHaveBeenCalledWith('click', eventHandler, undefined);
      
      // Advance time to verify timers were cleared
      vi.advanceTimersByTime(2000);
      expect(timeoutCallback).not.toHaveBeenCalled();
      expect(intervalCallback).toHaveBeenCalledTimes(1); // Should not have increased
      
      vi.useRealTimers();
    });
  });
});
