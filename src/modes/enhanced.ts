// Enhanced modes with new clean architecture
import { makeEnhancedNeoMode } from './neo-enhanced';
import { AsmblrMode } from './types';

export const EnhancedModes: Record<string, AsmblrMode> = {
  'Neo Graph': makeEnhancedNeoMode(),
};

const MODE_STORAGE_KEY = 'asmblr-enhanced-mode';

export function saveEnhancedModeToDisk(mode: string) {
  localStorage.setItem(MODE_STORAGE_KEY, mode);
}

export function loadEnhancedModeFromDisk(): string | null {
  return localStorage.getItem(MODE_STORAGE_KEY);
}
