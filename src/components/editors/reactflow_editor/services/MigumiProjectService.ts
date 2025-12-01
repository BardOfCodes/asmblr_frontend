/**
 * MigumiProjectService - Specialized project service for Migumi mode
 * 
 * Handles old format compatibility by preprocessing JSON files before loading
 */

import { Node, Edge } from 'reactflow';
import { ReactFlowNodeData } from '../types';
import { projectService } from './ProjectService';

/**
 * Node name mappings for old format compatibility
 */
const OLD_FORMAT_NODE_MAPPINGS = {
  'Plane3D': 'PlaneV23D',
} as const;

/**
 * Connection input mappings for Difference nodes (old format)
 */
const DIFFERENCE_INPUT_MAPPINGS = {
  'expr1': 'expr_0',
  'expr2': 'expr_1',
} as const;

/**
 * Node data parameter mappings for old format compatibility
 */
const OLD_FORMAT_PARAM_MAPPINGS = {
  'Translate2D': {
    'param': 'offset'
  },
  'EulerRotate2D': {
    'param': 'angle'
  },
  'Translate3D': {
    'param': 'offset'
  },
  'EulerRotate3D': {
    'param': 'angles'
  }
} as const;

/**
 * Preprocesses old format JSON by updating node names and wrapping in new format structure
 */
function preprocessOldFormatJson(jsonData: any): any {
  console.log('🔄 MigumiProjectService: Preprocessing old format JSON');
  console.log('🔍 MigumiProjectService: Input data structure:', {
    hasGraph: !!jsonData.graph,
    hasModuleList: !!jsonData.moduleList,
    topLevelKeys: Object.keys(jsonData),
    isOldFormat: !!jsonData.moduleList && !jsonData.graph
  });
  
  // Create a deep copy to avoid mutating the original
  const processedData = JSON.parse(JSON.stringify(jsonData));
  
  // Check if this is old format (has moduleList at top level, no graph wrapper)
  if (processedData.moduleList && !processedData.graph) {
    console.log('📦 MigumiProjectService: Detected old format - wrapping moduleList in new format structure');
    
    let moduleList = processedData.moduleList;
    
    // Convert array moduleList to object format if needed
    if (Array.isArray(moduleList)) {
      console.log('🔄 MigumiProjectService: Converting array moduleList to object format');
      const moduleListObject: Record<string, any> = {};
      moduleList.forEach((module: any, index: number) => {
        const moduleKey = module.name || `module_${index}`;
        moduleListObject[moduleKey] = module;
      });
      moduleList = moduleListObject;
    }
    
    // Wrap the old format in the new structure
    const wrappedData = {
      version: "1.0.0",
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      name: "migumi-project-converted",
      description: "Converted from old format",
      graph: {
        moduleList: moduleList
      },
      editorSettings: {
        reactflow: {
          viewport: {
            x: 0,
            y: 0,
            zoom: 1
          }
        }
      }
    };
    
    // Update processedData to use the wrapped structure
    Object.assign(processedData, wrappedData);
  }
  
  // Navigate to the moduleList in the graph
  if (!processedData.graph?.moduleList) {
    console.warn('⚠️ MigumiProjectService: No moduleList found in graph, skipping preprocessing');
    return processedData;
  }
  
  let totalNodesProcessed = 0;
  let totalConversions = 0;
  
  // Handle different moduleList structures
  const moduleList = processedData.graph.moduleList;
  
  if (Array.isArray(moduleList)) {
    console.log(`📋 MigumiProjectService: Processing moduleList as array with ${moduleList.length} modules`);
    
    // Process each module in the moduleList array
    moduleList.forEach((module: any, moduleIndex: number) => {
      if (!module.nodes || !Array.isArray(module.nodes)) {
        console.log(`ℹ️ MigumiProjectService: Module ${moduleIndex} has no nodes array, skipping`);
        return;
      }
      
      console.log(`🔍 MigumiProjectService: Processing module ${moduleIndex} with ${module.nodes.length} nodes`);
      
      // Track IDs of nodes named "Difference" (before any renaming)
      const diffIds: Set<string> = new Set();
      
      // Process each node in the module
      module.nodes.forEach((node: any, nodeIndex: number) => {
        totalNodesProcessed++;
        
        if (!node.name) {
          return;
        }
        
        const originalName = node.name;
        let conversionsForThisNode = 0;
        
        // Track Difference nodes for connection updates
        if (originalName === 'Difference') {
          diffIds.add(node.id);
        }
        
        // Handle parameter mappings FIRST (using original node name)
        const paramMappings = OLD_FORMAT_PARAM_MAPPINGS[originalName as keyof typeof OLD_FORMAT_PARAM_MAPPINGS];
        if (paramMappings && node.data) {
          Object.entries(paramMappings).forEach(([oldParam, newParam]) => {
            if (node.data[oldParam] !== undefined) {
              console.log(`🔄 MigumiProjectService: Converting node[${nodeIndex}] parameter: "${oldParam}" → "${newParam}" (for ${originalName})`);
              node.data[newParam] = node.data[oldParam];
              delete node.data[oldParam];
              conversionsForThisNode++;
            }
          });
        }
        
        // Handle name mappings AFTER parameter mappings
        const newName = OLD_FORMAT_NODE_MAPPINGS[originalName as keyof typeof OLD_FORMAT_NODE_MAPPINGS];
        if (newName) {
          console.log(`🔄 MigumiProjectService: Converting node[${nodeIndex}] name: "${originalName}" → "${newName}"`);
          node.name = newName;
          conversionsForThisNode++;
        }
        
        totalConversions += conversionsForThisNode;
      });
      
      // Process connections to update targetInput for Difference nodes
      if (module.connections && Array.isArray(module.connections) && diffIds.size > 0) {
        console.log(`🔗 MigumiProjectService: Processing ${module.connections.length} connections for Difference node input updates`);
        module.connections.forEach((conn: any) => {
          if (diffIds.has(conn.target)) {
            const oldInput = conn.targetInput;
            const newInput = DIFFERENCE_INPUT_MAPPINGS[oldInput as keyof typeof DIFFERENCE_INPUT_MAPPINGS];
            if (newInput) {
              console.log(`🔄 MigumiProjectService: Updating connection targetInput: "${oldInput}" → "${newInput}" for target ${conn.target}`);
              conn.targetInput = newInput;
              totalConversions++;
            }
          }
        });
      }
    });
  } else if (typeof moduleList === 'object' && moduleList !== null) {
    console.log(`📋 MigumiProjectService: Processing moduleList as object with keys:`, Object.keys(moduleList));
    
    // Handle moduleList as an object (dictionary of modules)
    Object.entries(moduleList).forEach(([moduleKey, module]: [string, any]) => {
      if (!module.nodes || !Array.isArray(module.nodes)) {
        console.log(`ℹ️ MigumiProjectService: Module "${moduleKey}" has no nodes array, skipping`);
        return;
      }
      
      console.log(`🔍 MigumiProjectService: Processing module "${moduleKey}" with ${module.nodes.length} nodes`);
      
      // Track IDs of nodes named "Difference" (before any renaming)
      const diffIds: Set<string> = new Set();
      
      // Process each node in the module
      module.nodes.forEach((node: any, nodeIndex: number) => {
        totalNodesProcessed++;
        
        if (!node.name) {
          return;
        }
        
        const originalName = node.name;
        let conversionsForThisNode = 0;
        
        // Track Difference nodes for connection updates
        if (originalName === 'Difference') {
          diffIds.add(node.id);
        }
        
        // Handle parameter mappings FIRST (using original node name)
        const paramMappings = OLD_FORMAT_PARAM_MAPPINGS[originalName as keyof typeof OLD_FORMAT_PARAM_MAPPINGS];
        if (paramMappings && node.data) {
          Object.entries(paramMappings).forEach(([oldParam, newParam]) => {
            if (node.data[oldParam] !== undefined) {
              console.log(`🔄 MigumiProjectService: Converting node[${nodeIndex}] parameter: "${oldParam}" → "${newParam}" (for ${originalName})`);
              node.data[newParam] = node.data[oldParam];
              delete node.data[oldParam];
              conversionsForThisNode++;
            }
          });
        }
        
        // Handle name mappings AFTER parameter mappings
        const newName = OLD_FORMAT_NODE_MAPPINGS[originalName as keyof typeof OLD_FORMAT_NODE_MAPPINGS];
        if (newName) {
          console.log(`🔄 MigumiProjectService: Converting node[${nodeIndex}] name: "${originalName}" → "${newName}"`);
          node.name = newName;
          conversionsForThisNode++;
        }
        
        totalConversions += conversionsForThisNode;
      });
      
      // Process connections to update targetInput for Difference nodes
      if (module.connections && Array.isArray(module.connections) && diffIds.size > 0) {
        console.log(`🔗 MigumiProjectService: Processing ${module.connections.length} connections for Difference node input updates`);
        module.connections.forEach((conn: any) => {
          if (diffIds.has(conn.target)) {
            const oldInput = conn.targetInput;
            const newInput = DIFFERENCE_INPUT_MAPPINGS[oldInput as keyof typeof DIFFERENCE_INPUT_MAPPINGS];
            if (newInput) {
              console.log(`🔄 MigumiProjectService: Updating connection targetInput: "${oldInput}" → "${newInput}" for target ${conn.target}`);
              conn.targetInput = newInput;
              totalConversions++;
            }
          }
        });
      }
    });
  } else {
    console.error('❌ MigumiProjectService: moduleList is neither array nor object:', typeof moduleList, moduleList);
    return processedData;
  }
  
  console.log(`✅ MigumiProjectService: Preprocessing complete`, {
    totalNodesProcessed,
    totalConversions,
    nameConversions: Object.entries(OLD_FORMAT_NODE_MAPPINGS).map(([old, new_]) => `${old} → ${new_}`),
    paramConversions: Object.entries(OLD_FORMAT_PARAM_MAPPINGS).map(([nodeName, mappings]) => 
      `${nodeName}: ${Object.entries(mappings).map(([old, new_]) => `${old} → ${new_}`).join(', ')}`
    )
  });
  
  return processedData;
}

/**
 * Specialized import function for Migumi mode with old format support
 */
export async function importMigumiProject(
  file: File, 
  useOldFormat: boolean = false
): Promise<{
  success: boolean;
  message: string;
  data?: {
    nodes: Node<ReactFlowNodeData>[];
    edges: Edge[];
    viewport?: { x: number; y: number; zoom: number };
    metadata?: any;
  };
}> {
  console.log('📁 MigumiProjectService: Starting Migumi import', {
    fileName: file.name,
    fileSize: file.size,
    useOldFormat
  });

  try {
    // Read the file as text first
    const fileText = await file.text();
    console.log('📄 MigumiProjectService: File read successfully, parsing JSON');
    
    let jsonData;
    try {
      jsonData = JSON.parse(fileText);
    } catch (parseError) {
      console.error('❌ MigumiProjectService: JSON parse error:', parseError);
      return {
        success: false,
        message: `Invalid JSON file: ${parseError}`
      };
    }
    
    // Auto-detect old format or use explicit setting
    const isOldFormatFile = !jsonData.version && !jsonData.graph && !!jsonData.moduleList;
    const shouldPreprocess = useOldFormat || isOldFormatFile;
    
    if (shouldPreprocess) {
      if (isOldFormatFile && !useOldFormat) {
        console.log('🔍 MigumiProjectService: Auto-detected old format file, preprocessing...');
      } else {
        console.log('🔧 MigumiProjectService: Old format mode enabled, preprocessing...');
      }
      jsonData = preprocessOldFormatJson(jsonData);
    } else {
      console.log('ℹ️ MigumiProjectService: Using new format, no preprocessing needed');
    }
    
    // Validate the processed data structure before creating the file
    console.log('🔍 MigumiProjectService: Validating processed data structure:', {
      hasVersion: !!jsonData.version,
      hasCreated: !!jsonData.created,
      hasModified: !!jsonData.modified,
      hasGraph: !!jsonData.graph,
      graphKeys: jsonData.graph ? Object.keys(jsonData.graph) : [],
      topLevelKeys: Object.keys(jsonData)
    });
    
    // Create a new File object with the processed JSON
    const processedFileContent = JSON.stringify(jsonData, null, 2);
    const processedFile = new File([processedFileContent], file.name, {
      type: 'application/json',
      lastModified: file.lastModified
    });
    
    console.log('🔄 MigumiProjectService: Delegating to standard ProjectService.importProject');
    
    // Use the standard project service to handle the processed file
    const result = await projectService.importProject(processedFile);
    
    if (result.success) {
      console.log('✅ MigumiProjectService: Import successful');
    } else {
      console.error('❌ MigumiProjectService: Import failed:', result.message);
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ MigumiProjectService: Unexpected error during import:', error);
    console.error('📍 MigumiProjectService: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return {
      success: false,
      message: `Failed to import Migumi project: ${error}`
    };
  }
}

/**
 * Load project with old format support (for localStorage projects)
 */
export async function loadMigumiProject(
  key?: string,
  useOldFormat: boolean = false
): Promise<{
  success: boolean;
  message: string;
  data?: {
    nodes: Node<ReactFlowNodeData>[];
    edges: Edge[];
    viewport?: { x: number; y: number; zoom: number };
    metadata?: any;
  };
}> {
  console.log('📂 MigumiProjectService: Starting Migumi load', { key, useOldFormat });
  
  // For localStorage projects, we could potentially have old format data
  // Try to load and check if preprocessing is needed
  try {
    const result = await projectService.loadProject(key);
    
    // If loading failed and old format is enabled, we might need preprocessing
    // But for localStorage, this is less common since we usually save in new format
    if (!result.success && useOldFormat) {
      console.log('ℹ️ MigumiProjectService: Standard load failed, old format mode was enabled but localStorage projects are typically in new format');
    }
    
    return result;
  } catch (error) {
    console.error('❌ MigumiProjectService: Load error:', error);
    return {
      success: false,
      message: `Failed to load Migumi project: ${error}`
    };
  }
}
