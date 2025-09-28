/**
 * Debug utility for development-only logging
 * 
 * This utility ensures that debug logs are only shown in development mode,
 * preventing performance issues and console spam in production.
 */

const isDevelopment = import.meta.env.MODE === 'development';
const isDebugEnabled = import.meta.env.VITE_DEBUG === 'true';

export const debug = {
  /**
   * Log general debug information (development only)
   */
  log: (...args: any[]): void => {
    if (isDevelopment && isDebugEnabled) {
      console.log('[DEBUG]', ...args);
    }
  },

  /**
   * Log warning information (development only)
   */
  warn: (...args: any[]): void => {
    if (isDevelopment) {
      console.warn('[WARN]', ...args);
    }
  },

  /**
   * Log error information (always shown)
   * Errors are important and should be visible in production for monitoring
   */
  error: (...args: any[]): void => {
    console.error('[ERROR]', ...args);
  },

  /**
   * Log performance metrics (development only)
   */
  time: (label: string): void => {
    if (isDevelopment && isDebugEnabled) {
      console.time(label);
    }
  },

  /**
   * End performance metric logging (development only)
   */
  timeEnd: (label: string): void => {
    if (isDevelopment && isDebugEnabled) {
      console.timeEnd(label);
    }
  },

  /**
   * Log grouped information (development only)
   */
  group: (label: string): void => {
    if (isDevelopment && isDebugEnabled) {
      console.group(label);
    }
  },

  /**
   * End grouped logging (development only)
   */
  groupEnd: (): void => {
    if (isDevelopment && isDebugEnabled) {
      console.groupEnd();
    }
  },

  /**
   * Log table data (development only)
   */
  table: (data: any): void => {
    if (isDevelopment && isDebugEnabled) {
      console.table(data);
    }
  },

  /**
   * Assert condition (development only)
   */
  assert: (condition: boolean, ...args: any[]): void => {
    if (isDevelopment && isDebugEnabled) {
      console.assert(condition, ...args);
    }
  },

  /**
   * Check if debug mode is enabled
   */
  isEnabled: (): boolean => {
    return isDevelopment && isDebugEnabled;
  }
};

// Export a shorthand for the most common use case
export const log = debug.log;
export const logError = debug.error;
export const logWarn = debug.warn;
