// modes/index.ts
import { makeNeoMode } from './neo';
import { makeSplitWeaveMode } from './splitweave';
import { AsmblrMode } from './types';

export const AvailableModes: Record<string, AsmblrMode> = {
  Neo: makeNeoMode(),
  SplitWeave: makeSplitWeaveMode(),
};

const MODE_STORAGE_KEY = 'asmblr-mode';

export function saveModeToDisk(mode: string) {
  localStorage.setItem(MODE_STORAGE_KEY, mode);
}

export function loadModeFromDisk(): string | null {
  return localStorage.getItem(MODE_STORAGE_KEY);
}