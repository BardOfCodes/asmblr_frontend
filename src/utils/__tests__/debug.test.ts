import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debug } from '../debug';

describe('Debug Utility', () => {
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    time: console.time,
    timeEnd: console.timeEnd,
    group: console.group,
    groupEnd: console.groupEnd,
    table: console.table,
    assert: console.assert,
  };

  // Mock console methods
  beforeEach(() => {
    console.log = vi.fn();
    console.warn = vi.fn();
    console.error = vi.fn();
    console.time = vi.fn();
    console.timeEnd = vi.fn();
    console.group = vi.fn();
    console.groupEnd = vi.fn();
    console.table = vi.fn();
    console.assert = vi.fn();
  });

  // Restore original console methods
  afterEach(() => {
    console.log = originalConsole.log;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.time = originalConsole.time;
    console.timeEnd = originalConsole.timeEnd;
    console.group = originalConsole.group;
    console.groupEnd = originalConsole.groupEnd;
    console.table = originalConsole.table;
    console.assert = originalConsole.assert;
  });

  describe('In Production Mode', () => {
    beforeEach(() => {
      // Mock production environment
      (import.meta as any).env = { MODE: 'production', VITE_DEBUG: 'false' };
    });

    it('should not log debug messages in production', () => {
      debug.log('test message');
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should not log warnings in production', () => {
      debug.warn('warning message');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should always log errors even in production', () => {
      debug.error('error message');
      expect(console.error).toHaveBeenCalledWith('[ERROR]', 'error message');
    });

    it('should not run performance timing in production', () => {
      debug.time('test-timer');
      debug.timeEnd('test-timer');
      expect(console.time).not.toHaveBeenCalled();
      expect(console.timeEnd).not.toHaveBeenCalled();
    });
  });

  describe('In Development Mode', () => {
    describe('With Debug Disabled', () => {
      beforeEach(() => {
        // Mock development environment with debug disabled
        (import.meta as any).env = { MODE: 'development', VITE_DEBUG: 'false' };
      });

      it('should not log debug messages when debug is disabled', () => {
        debug.log('test message');
        expect(console.log).not.toHaveBeenCalled();
      });

      it('should log warnings in development', () => {
        debug.warn('warning message');
        expect(console.warn).toHaveBeenCalledWith('[WARN]', 'warning message');
      });

      it('should log errors in development', () => {
        debug.error('error message');
        expect(console.error).toHaveBeenCalledWith('[ERROR]', 'error message');
      });
    });

    describe('With Debug Enabled', () => {
      beforeEach(() => {
        // Mock development environment with debug enabled
        (import.meta as any).env = { MODE: 'development', VITE_DEBUG: 'true' };
      });

      it('should log debug messages when debug is enabled', () => {
        debug.log('test message', { data: 123 });
        expect(console.log).toHaveBeenCalledWith('[DEBUG]', 'test message', { data: 123 });
      });

      it('should handle performance timing', () => {
        debug.time('test-timer');
        debug.timeEnd('test-timer');
        expect(console.time).toHaveBeenCalledWith('test-timer');
        expect(console.timeEnd).toHaveBeenCalledWith('test-timer');
      });

      it('should handle grouped logging', () => {
        debug.group('test-group');
        debug.log('grouped message');
        debug.groupEnd();
        
        expect(console.group).toHaveBeenCalledWith('test-group');
        expect(console.log).toHaveBeenCalledWith('[DEBUG]', 'grouped message');
        expect(console.groupEnd).toHaveBeenCalled();
      });

      it('should handle table logging', () => {
        const data = [{ id: 1, name: 'test' }];
        debug.table(data);
        expect(console.table).toHaveBeenCalledWith(data);
      });

      it('should handle assertions', () => {
        debug.assert(false, 'Assertion failed');
        expect(console.assert).toHaveBeenCalledWith(false, 'Assertion failed');
      });

      it('should report debug enabled state correctly', () => {
        expect(debug.isEnabled()).toBe(true);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle null and undefined values', () => {
      (import.meta as any).env = { MODE: 'development', VITE_DEBUG: 'true' };
      
      debug.log(null);
      debug.log(undefined);
      debug.log('');
      
      expect(console.log).toHaveBeenCalledTimes(3);
    });

    it('should handle multiple arguments', () => {
      (import.meta as any).env = { MODE: 'development', VITE_DEBUG: 'true' };
      
      debug.log('message', 1, true, { key: 'value' }, ['array']);
      expect(console.log).toHaveBeenCalledWith(
        '[DEBUG]', 
        'message', 
        1, 
        true, 
        { key: 'value' }, 
        ['array']
      );
    });
  });
});
