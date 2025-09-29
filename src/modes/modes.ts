// Application modes with clean architecture
import { makeNeoMode } from './neo-mode';
import { makeSySLMode } from './sysl-mode';
import { makeGeoLIPIMode } from './geolipi-mode';
import { AsmblrMode } from './types';

export const Modes: Record<string, AsmblrMode> = {
  'Neo Graph': makeNeoMode(),
  'SySL Graph': makeSySLMode(),
  'GeoLIPI Graph': makeGeoLIPIMode(),
};

const MODE_STORAGE_KEY = 'asmblr-enhanced-mode';

export function saveModeToDisk(mode: string) {
  localStorage.setItem(MODE_STORAGE_KEY, mode);
}

export function loadModeFromDisk(): string | null {
  return localStorage.getItem(MODE_STORAGE_KEY);
}
