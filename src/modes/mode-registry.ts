// Centralized Mode Registry - Improved type safety and organization
import { AsmblrMode } from './types';
import { makeSySLMode } from './sysl-mode';
import { makeGeoLIPIMode } from './geolipi-mode';
import { makeMigumiMode } from './migumi-mode';

/**
 * Mode identifiers - ensures consistency across the app
 */
export const MODE_IDS = {
  SYSL: 'sysl', 
  GEOLIPI: 'geolipi',
  MIGUMI: 'migumi',
} as const;

export type ModeId = typeof MODE_IDS[keyof typeof MODE_IDS];

/**
 * Mode configuration with metadata
 */
interface ModeRegistration {
  id: ModeId;
  displayName: string;
  factory: () => AsmblrMode;
  description?: string;
  experimental?: boolean;
  deprecated?: boolean;
}

/**
 * Registry of all available modes
 */
const MODE_REGISTRY: Record<ModeId, ModeRegistration> = {
  [MODE_IDS.SYSL]: {
    id: MODE_IDS.SYSL,
    displayName: 'SySL Graph', 
    factory: makeSySLMode,
    description: 'Symbolic Shader Language mode for advanced material and shader development',
  },
  [MODE_IDS.GEOLIPI]: {
    id: MODE_IDS.GEOLIPI,
    displayName: 'GeoLIPI Graph',
    factory: makeGeoLIPIMode,
    description: 'Geometric Language for Implicit Programming - focused on geometric operations',
  },
  [MODE_IDS.MIGUMI]: {
    id: MODE_IDS.MIGUMI,
    displayName: 'Migumi Graph',
    factory: makeMigumiMode,
    description: 'Minimal geometric operations with basic 3D primitives and transformations',
  },
};

/**
 * Get all available modes
 */
export function getAllModes(): Record<string, AsmblrMode> {
  const modes: Record<string, AsmblrMode> = {};
  
  Object.values(MODE_REGISTRY).forEach(registration => {
    modes[registration.displayName] = registration.factory();
  });
  
  return modes;
}

/**
 * Get a specific mode by ID
 */
export function getModeById(id: ModeId): AsmblrMode | null {
  const registration = MODE_REGISTRY[id];
  return registration ? registration.factory() : null;
}

/**
 * Get mode metadata
 */
export function getModeMetadata(id: ModeId): Omit<ModeRegistration, 'factory'> | null {
  const registration = MODE_REGISTRY[id];
  if (!registration) return null;
  
  const { factory, ...metadata } = registration;
  return metadata;
}

/**
 * Check if a mode exists
 */
export function modeExists(id: string): id is ModeId {
  return id in MODE_REGISTRY;
}

/**
 * Get all mode IDs
 */
export function getAllModeIds(): ModeId[] {
  return Object.keys(MODE_REGISTRY) as ModeId[];
}

/**
 * Get display names for all modes
 */
export function getAllModeDisplayNames(): string[] {
  return Object.values(MODE_REGISTRY).map(reg => reg.displayName);
}
