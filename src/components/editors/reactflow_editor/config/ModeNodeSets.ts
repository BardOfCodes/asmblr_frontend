import { ModeDefinition } from '../types';
import * as AutoNodes from '../nodes/auto_nodes';

/**
 * Mode-specific node configurations
 * Each mode defines which node categories and types are available
 */

// Get all available nodes from auto_nodes
const allNodes = Object.values(AutoNodes).filter(
  (item): item is any => item && typeof item === 'object' && 'type' in item
);

// Helper function to filter nodes by category patterns
const getNodesByCategories = (categories: string[]) => {
  return allNodes.filter(node => 
    categories.some(category => 
      node.category === category
    )
  );
};

// Helper function to exclude nodes by category patterns (currently unused but kept for future use)
// const excludeNodesByCategories = (excludeCategories: string[]) => {
//   return allNodes.filter(node => 
//     !excludeCategories.some(category => 
//       node.category === category || 
//       node.category.toLowerCase().includes(category.toLowerCase())
//     )
//   );
// };

/**
 * SySL Graph Mode - Symbolic Shader Language
 * Includes: Mathematical operations, symbolic expressions, materials
 * Excludes: Basic geometric primitives (those are for GeoLIPI)
 */
export const SySLModeDefinition: ModeDefinition = {
  name: 'sysl',
  label: 'SySL',
  nodeSet: {
    'Auto': getNodesByCategories(['auto']),
    "Colors": getNodesByCategories(['color']),
    "Combinators": getNodesByCategories(['combinators']),
    "Material Solid Combinators": getNodesByCategories(['mat_solid_combinators']),
    "Primitives 2D": getNodesByCategories(['primitives_2d']),
    "Primitives 3D": getNodesByCategories(['primitives_3d']),
    "SySL Base": getNodesByCategories(['sysl_base']),
    "SySL Combinators": getNodesByCategories(['sysl_combinators']),
    "SySL Materials": getNodesByCategories(['sysl_materials']),
    "Transforms 2D": getNodesByCategories(['transforms_2d']),
    "Transforms 3D": getNodesByCategories(['transforms_3d']),
    "Variables": getNodesByCategories(['variables']),
  }
};

/**
 * GeoLIPI Graph Mode - Geometric Language for Implicit Programming  
 * Includes: Geometric primitives, transformations, combinators
 * Excludes: Materials, SySL-specific nodes
 */
export const GeoLIPIModeDefinition: ModeDefinition = {
  name: 'geolipi',
  label: 'GeoLIPI',
  nodeSet: {
    'Auto': getNodesByCategories(['auto']),
    "Combinators": getNodesByCategories(['combinators']),
    "Primitives 2D": getNodesByCategories(['primitives_2d']),
    "Primitives 3D": getNodesByCategories(['primitives_3d']),
    "Transforms 2D": getNodesByCategories(['transforms_2d']),
    "Transforms 3D": getNodesByCategories(['transforms_3d']),
    "Variables": getNodesByCategories(['variables']),
  }
};

/**
 * Neo Graph Mode - Full feature set (original mode)
 * Includes: All available nodes
 */
export const NeoModeDefinition: ModeDefinition = {
  name: 'neo',
  label: 'SySL-Extended', 
  nodeSet: {
    'Auto': getNodesByCategories(['auto']),
    "Colors": getNodesByCategories(['color']),
    "Combinators": getNodesByCategories(['combinators']),
    "Material Solid Combinators": getNodesByCategories(['mat_solid_combinators']),
    "Primitives 2D": getNodesByCategories(['primitives_2d']),
    "Primitives 3D": getNodesByCategories(['primitives_3d']),
    "SySL Base": getNodesByCategories(['sysl_base']),
    "SySL Combinators": getNodesByCategories(['sysl_combinators']),
    "Materials": getNodesByCategories(['materials']),
    "Transforms 2D": getNodesByCategories(['transforms_2d']),
    "Transforms 3D": getNodesByCategories(['transforms_3d']),
    "Variables": getNodesByCategories(['variables']),
  }
};



/**
 * All mode definitions for registration
 */
export const AllModeDefinitions = [
  NeoModeDefinition,
  SySLModeDefinition,
  GeoLIPIModeDefinition,
];
