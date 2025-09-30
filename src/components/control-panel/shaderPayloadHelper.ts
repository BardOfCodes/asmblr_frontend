/**
 * Shader Payload Helper
 * 
 * This module handles the business logic of preparing shader generation payloads
 * from editor data. It's responsible for:
 * - Extracting data from different editor types
 * - Serializing graph data using appropriate serializers
 * - Preparing payloads in the format expected by the backend
 * - Providing a clean interface for control panels
 * 
 * Design principles:
 * - Single responsibility: Only handles payload preparation
 * - Mode-agnostic: Works with any supported mode
 * - Editor-agnostic: Can handle different editor types
 * - Type-safe: Provides proper TypeScript interfaces
 */

import { debug } from '../../utils/debug';
import { GraphSerializer } from '../editors/reactflow_editor/utils/GraphSerializer';
import type { SupportedMode } from '../../API';

/**
 * Interface for editor objects that can provide graph data
 */
export interface GraphEditor {
  getNodes?: () => any[];
  getEdges?: () => any[];
}

/**
 * Interface for settings objects that contain shader generation settings
 */
export interface ShaderSettings {
  shaderGeneration?: {
    shaderSettings?: any;
  };
}

/**
 * The payload structure expected by the backend
 */
export interface ShaderPayload {
  modules: any;
  uniforms: any;
  shaderSettings: any;
  mode: string;
  geolipiSettings?: {
    mode: 'primitive' | 'singular';
  };
}

/**
 * Options for payload preparation
 */
export interface PayloadPreparationOptions {
  mode: SupportedMode;
  editor?: GraphEditor | null;
  settings?: ShaderSettings | null;
  uniforms?: any;
  customModules?: any;
  modeSpecificSettings?: any; // For mode-specific settings like geolipiSettings
}

/**
 * Result of payload preparation with metadata
 */
export interface PayloadPreparationResult {
  payload: ShaderPayload;
  metadata: {
    nodeCount: number;
    edgeCount: number;
    hasGraphData: boolean;
    serializationMethod: 'graph' | 'custom' | 'empty';
  };
}

/**
 * Extracts raw graph data from a ReactFlow editor
 */
function extractGraphDataFromEditor(editor: GraphEditor): { nodes: any[]; edges: any[] } | null {
  if (!editor || typeof editor !== 'object') {
    debug.log('No editor provided or editor is not an object');
    return null;
  }

  if (typeof editor.getNodes === 'function' && typeof editor.getEdges === 'function') {
    try {
      const nodes = editor.getNodes();
      const edges = editor.getEdges();
      
      if (Array.isArray(nodes) && Array.isArray(edges)) {
        debug.log('Successfully extracted graph data from ReactFlow editor:', {
          nodeCount: nodes.length,
          edgeCount: edges.length
        });
        return { nodes, edges };
      } else {
        debug.warn('Editor getNodes/getEdges did not return arrays');
        return null;
      }
    } catch (error) {
      debug.error('Error extracting graph data from editor:', error);
      return null;
    }
  }

  debug.warn('Editor does not have getNodes/getEdges methods');
  return null;
}

/**
 * Serializes graph data using the appropriate serializer for the given mode
 */
function serializeGraphData(nodes: any[], edges: any[], mode: SupportedMode, nodeRegistry?: any): any {
  try {
    debug.log(`Serializing graph data for ${mode} mode`);
    const serializedData = GraphSerializer.serialize(nodes, edges, mode, nodeRegistry);
    debug.log('Graph serialization successful');
    return serializedData;
  } catch (error) {
    debug.error('Graph serialization failed:', error);
    // Return a safe fallback structure
    return { moduleList: {} };
  }
}

/**
 * Extracts shader settings from the settings object
 */
function extractShaderSettings(settings?: ShaderSettings | null): any {
  if (!settings?.shaderGeneration?.shaderSettings) {
    debug.log('No shader settings found, using empty object');
    return {};
  }

  debug.log('Extracted shader settings from settings object');
  return settings.shaderGeneration.shaderSettings;
}

/**
 * Main function to prepare a shader payload from editor data and settings
 * 
 * This is the primary interface for control panels to use.
 */
export function prepareShaderPayload(options: PayloadPreparationOptions): PayloadPreparationResult {
  const { mode, editor, settings, uniforms = {}, customModules, modeSpecificSettings } = options;

  debug.log(`Preparing shader payload for ${mode} mode`);

  let modules: any;
  let nodeCount = 0;
  let edgeCount = 0;
  let hasGraphData = false;
  let serializationMethod: 'graph' | 'custom' | 'empty' = 'empty';

  // Priority 1: Use custom modules if provided
  if (customModules !== undefined) {
    modules = customModules;
    serializationMethod = 'custom';
    debug.log('Using custom modules provided in options');
  }
  // Priority 2: Extract and serialize graph data from editor
  else {
    const graphData = extractGraphDataFromEditor(editor || {});
    
    if (graphData) {
      nodeCount = graphData.nodes.length;
      edgeCount = graphData.edges.length;
      hasGraphData = true;
      serializationMethod = 'graph';
      
      // Try to get nodeRegistry from editor for type conversion
      const nodeRegistry = (editor as any)?.nodeRegistry || (editor as any)?.registry;
      modules = serializeGraphData(graphData.nodes, graphData.edges, mode, nodeRegistry);
    } else {
      // Fallback: Empty module structure
      modules = { moduleList: {} };
      debug.log('No graph data available, using empty module structure');
    }
  }

  // Extract shader settings
  const shaderSettings = extractShaderSettings(settings);

  // Prepare the final payload
  const payload: ShaderPayload = {
    modules,
    uniforms,
    shaderSettings,
    mode,
    // Add mode-specific settings if provided
    ...(modeSpecificSettings && { [`${mode}Settings`]: modeSpecificSettings })
  };

  const result: PayloadPreparationResult = {
    payload,
    metadata: {
      nodeCount,
      edgeCount,
      hasGraphData,
      serializationMethod
    }
  };

  debug.log('Shader payload preparation complete:', {
    mode,
    serializationMethod,
    nodeCount,
    edgeCount,
    hasUniforms: Object.keys(uniforms).length > 0,
    hasShaderSettings: Object.keys(shaderSettings).length > 0
  });

  return result;
}

/**
 * Convenience function for preparing a payload with just an editor and settings
 * This is the most common use case for control panels
 */
export function prepareShaderPayloadFromEditor(
  mode: SupportedMode,
  editor?: GraphEditor | null,
  settings?: ShaderSettings | null
): PayloadPreparationResult {
  return prepareShaderPayload({ mode, editor, settings });
}

/**
 * Convenience function for preparing a test payload (empty graph data)
 * Useful for testing viewers without actual graph data
 */
export function prepareTestShaderPayload(
  mode: SupportedMode,
  settings?: ShaderSettings | null,
  modeSpecificSettings?: any
): PayloadPreparationResult {
  return prepareShaderPayload({ 
    mode, 
    settings,
    customModules: { moduleList: {} },
    modeSpecificSettings
  });
}

/**
 * Convenience function for preparing GeoLIPI payload with mode settings
 */
export function prepareGeolipiShaderPayload(
  editor?: GraphEditor | null,
  settings?: ShaderSettings | null,
  geolipiMode: 'primitive' | 'singular' = 'primitive'
): PayloadPreparationResult {
  return prepareShaderPayload({
    mode: 'geolipi',
    editor,
    settings,
    modeSpecificSettings: { mode: geolipiMode }
  });
}
