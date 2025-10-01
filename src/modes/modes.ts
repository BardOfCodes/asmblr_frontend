// Application modes with clean architecture
import { AsmblrMode } from './types';
import { getAllModes } from './mode-registry';

export const Modes: Record<string, AsmblrMode> = getAllModes();

const MODE_STORAGE_KEY = 'asmblr-enhanced-mode';

export function saveModeToDisk(mode: string) {
  localStorage.setItem(MODE_STORAGE_KEY, mode);
}

export function loadModeFromDisk(): string | null {
  return localStorage.getItem(MODE_STORAGE_KEY);
}
