// Definitions System Tests
// Tests for the node definition, registry, and factory systems

import { ReactFlowGraphManager } from './ReactFlowGraphManager';
import { SerializationAdapter } from './SerializationAdapter';
import { 
  NodeRegistry, 
  NodeFactory, 
  NodeDefinition,
  createInput,
  createOutput,
  createControl
} from '../definitions';
// Import auto-generated node definitions for testing
import { Box3DDefinition, Sphere3DDefinition, Cylinder3DDefinition } from '../nodes/auto_nodes/primitives_3d';
import { Translate3DDefinition, EulerRotate3DDefinition, Scale3DDefinition } from '../nodes/auto_nodes/transforms_3d';
import { UnionDefinition, DifferenceDefinition } from '../nodes/auto_nodes/combinators';

// Test node definitions array using auto-generated nodes
const TEST_NODE_DEFINITIONS = [
  Box3DDefinition,
  Sphere3DDefinition,
  Cylinder3DDefinition,
  Translate3DDefinition,
  EulerRotate3DDefinition,
  Scale3DDefinition,
  UnionDefinition,
  DifferenceDefinition
];

/**
 * Test the node registry system
 */
export function testNodeRegistry(): { success: boolean; log: string[] } {
  const log: string[] = [];
  
  try {
    log.push('🧪 Testing Node Registry...');
    
    // Create registry and register basic nodes
    const registry = new NodeRegistry();
    const result = registry.registerMany(TEST_NODE_DEFINITIONS);
    
    log.push(`📝 Registered ${result.success} nodes, ${result.failed} failed`);
    
    // Test getting nodes
    const box = registry.get('Box3D');
    if (box) {
      log.push(`✅ Retrieved Box3D: ${box.label}`);
    } else {
      log.push('❌ Failed to retrieve Box3D');
      return { success: false, log };
    }
    
    // Test search
    const searchResults = registry.search('vector');
    log.push(`🔍 Search 'vector' found ${searchResults.length} results`);
    
    // Test categories
    const categories = registry.getCategories();
    log.push(`📂 Found ${categories.length} categories`);
    
    // Test stats
    const stats = registry.getStats();
    log.push(`📊 Registry stats: ${stats.totalNodes} total nodes`);
    
    return { success: true, log };
    
  } catch (error) {
    log.push(`❌ Registry test failed: ${error instanceof Error ? error.message : String(error)}`);
    return { success: false, log };
  }
}

/**
 * Test the node factory system
 */
export function testNodeFactory(): { success: boolean; log: string[] } {
  const log: string[] = [];
  
  try {
    log.push('🧪 Testing Node Factory...');
    
    // Create registry and factory
    const registry = new NodeRegistry();
    registry.registerMany(TEST_NODE_DEFINITIONS);
    const factory = new NodeFactory(registry);
    
    // Test creating a Box3D node
    const cuboidResult = factory.createNode('Box3D', {
      position: { x: 100, y: 100 },
      data: { size: [2, 2, 2] }
    });
    
    if (cuboidResult.success && cuboidResult.node) {
      log.push(`✅ Created Box3D node: ${cuboidResult.node.id}`);
      log.push(`📏 Node data: ${JSON.stringify(cuboidResult.node.data)}`);
    } else {
      log.push(`❌ Failed to create Box3D: ${cuboidResult.errors.join(', ')}`);
      return { success: false, log };
    }
    
    // Test creating a Sphere3D node
    const vec3Result = factory.createNode('Sphere3D', {
      position: { x: 300, y: 100 }
    });
    
    if (vec3Result.success && vec3Result.node) {
      log.push(`✅ Created Sphere3D node: ${vec3Result.node.id}`);
    } else {
      log.push(`❌ Failed to create Sphere3D: ${vec3Result.errors.join(', ')}`);
      return { success: false, log };
    }
    
    // Test batch creation
    const batchResult = factory.createNodes([
      { type: 'Translate3D', options: { position: { x: 200, y: 200 } } },
      { type: 'Difference', options: { position: { x: 400, y: 200 } } }
    ]);
    
    log.push(`📦 Batch created ${batchResult.success} nodes, ${batchResult.failed} failed`);
    
    // Test auto positioning
    const existingNodes = [
      cuboidResult.node!,
      vec3Result.node!,
      ...batchResult.nodes
    ];
    
    const autoResult = factory.createNodeWithAutoPosition('Cylinder3D', existingNodes);
    if (autoResult.success && autoResult.node) {
      log.push(`🎯 Auto-positioned SuperQuadric3D at (${autoResult.node.position.x}, ${autoResult.node.position.y})`);
    }
    
    return { success: true, log };
    
  } catch (error) {
    log.push(`❌ Factory test failed: ${error instanceof Error ? error.message : String(error)}`);
    return { success: false, log };
  }
}

/**
 * Test integration with graph manager
 */
export function testDefinitionsIntegration(): { success: boolean; log: string[] } {
  const log: string[] = [];
  
  try {
    log.push('🧪 Testing Definitions Integration...');
    
    // Create the full system
    const registry = new NodeRegistry();
    registry.registerMany(TEST_NODE_DEFINITIONS);
    const factory = new NodeFactory(registry);
    const manager = new ReactFlowGraphManager();
    
    // Create nodes using factory
    const cuboidResult = factory.createNode('Box3D', {
      position: { x: 100, y: 100 },
      data: { size: [1.5, 1.5, 1.5] }
    });
    
    const vec3Result = factory.createNode('Sphere3D', {
      position: { x: 300, y: 100 },
      data: { value: [1, 0, 0] }
    });
    
    const translateResult = factory.createNode('Translate3D', {
      position: { x: 200, y: 200 }
    });
    
    if (!cuboidResult.success || !vec3Result.success || !translateResult.success) {
      log.push('❌ Failed to create nodes for integration test');
      return { success: false, log };
    }
    
    // Debug: Check node before adding to manager
    log.push(`🔍 Debug - Cuboid node before adding: type="${cuboidResult.node!.type}", id="${cuboidResult.node!.id}"`);
    log.push(`🔍 Debug - Cuboid serialize test: ${JSON.stringify(cuboidResult.node!.serialize())}`);
    
    // Add nodes to graph manager
    manager.addNode(cuboidResult.node!);
    manager.addNode(vec3Result.node!);
    manager.addNode(translateResult.node!);
    
    log.push(`✅ Added ${manager.getAllNodes().length} nodes to graph manager`);
    
    // Debug: Check node after adding to manager
    const retrievedNode = manager.getAllNodes()[0];
    log.push(`🔍 Debug - Retrieved node: type="${retrievedNode.type}", id="${retrievedNode.id}"`);
    log.push(`🔍 Debug - Retrieved serialize test: ${JSON.stringify(retrievedNode.serialize())}`);

    // Create connections (Box3D -> Translate3D, Sphere3D -> Translate3D)
    const conn1 = manager.addConnection(
      cuboidResult.node!.id,
      'expr',
      translateResult.node!.id,
      'expr'
    );
    
    if (conn1) {
      log.push(`🔗 Connected Box3D.expr → Translate3D.expr`);
    }
    
    // Test serialization with definition-created nodes
    const exported = manager.exportToGuideJson('test-definitions');
    log.push(`📤 Exported graph with ${Object.keys(exported.moduleList).length} modules`);
    
    // Debug: Log the first node to see its structure
    const module = exported.moduleList['test-definitions'];
    if (module && module.nodes && module.nodes.length > 0) {
      log.push(`🔍 Debug - First node: ${JSON.stringify(module.nodes[0])}`);
    }
    
    // Validate the exported format
    const validation = SerializationAdapter.validateGuideJson(exported);
    log.push(`🔍 Validation: ${validation.isValid ? 'PASSED' : 'FAILED'}`);
    
    if (validation.errors.length > 0) {
      validation.errors.forEach(error => log.push(`❌ Error: ${error}`));
    }
    
    return { success: true, log };
    
  } catch (error) {
    log.push(`❌ Integration test failed: ${error instanceof Error ? error.message : String(error)}`);
    return { success: false, log };
  }
}

/**
 * Test custom node definition creation
 */
export function testCustomNodeDefinition(): { success: boolean; log: string[] } {
  const log: string[] = [];
  
  try {
    log.push('🧪 Testing Custom Node Definition...');
    
    // Create a custom node definition
    const customDefinition: NodeDefinition = {
      type: 'TestCustomNode',
      label: 'Test Custom',
      category: 'Utilities',
      description: 'A test node for validation',
      
      inputs: [
        createInput('input1', 'Input 1', 'FloatSocket', true, 0, 'First input'),
        createInput('input2', 'Input 2', 'VectorSocket', false, [0, 0, 0], 'Second input')
      ],
      
      outputs: [
        createOutput('output1', 'Output 1', 'FloatSocket', 'Primary output'),
        createOutput('output2', 'Output 2', 'VectorSocket', 'Secondary output')
      ],
      
      controls: [
        createControl(
          'multiplier',
          'float',
          'Multiplier',
          {
            defaultValue: 1.0,
            min: 0,
            max: 10,
            step: 0.1
          },
          {
            linkedToInput: 'input1',
            description: 'Multiplication factor'
          }
        )
      ],
      
      factory: (data) => ({
        multiplier: data?.multiplier || 1.0
      }),
      
      validator: (data) => {
        const errors: string[] = [];
        const warnings: string[] = [];
        
        if (typeof data.multiplier !== 'number') {
          errors.push('Multiplier must be a number');
        }
        
        if (data.multiplier < 0) {
          warnings.push('Negative multiplier may produce unexpected results');
        }
        
        return {
          isValid: errors.length === 0,
          errors,
          warnings
        };
      },
      
      tags: ['test', 'custom', 'validation']
    };
    
    // Register the custom definition
    const registry = new NodeRegistry();
    const success = registry.register(customDefinition);
    
    if (success) {
      log.push(`✅ Registered custom node: ${customDefinition.type}`);
    } else {
      log.push('❌ Failed to register custom node');
      return { success: false, log };
    }
    
    // Test creating the custom node
    const factory = new NodeFactory(registry);
    const nodeResult = factory.createNode('TestCustomNode', {
      data: { multiplier: 2.5 }
    });
    
    if (nodeResult.success && nodeResult.node) {
      log.push(`✅ Created custom node: ${nodeResult.node.id}`);
      log.push(`📊 Node data: ${JSON.stringify(nodeResult.node.data)}`);
    } else {
      log.push(`❌ Failed to create custom node: ${nodeResult.errors.join(', ')}`);
      return { success: false, log };
    }
    
    // Test validation
    const validationResult = factory.validateNodeData(nodeResult.node!);
    log.push(`🔍 Validation: ${validationResult.isValid ? 'PASSED' : 'FAILED'}`);
    
    if (validationResult.warnings.length > 0) {
      validationResult.warnings.forEach(warning => log.push(`⚠️ Warning: ${warning}`));
    }
    
    return { success: true, log };
    
  } catch (error) {
    log.push(`❌ Custom definition test failed: ${error instanceof Error ? error.message : String(error)}`);
    return { success: false, log };
  }
}

/**
 * Run all definition system tests
 */
export function runAllDefinitionTests(): { success: boolean; log: string[] } {
  const log: string[] = [];
  
  log.push('🚀 Starting Definition System Tests...');
  
  const tests = [
    testNodeRegistry,
    testNodeFactory,
    testDefinitionsIntegration,
    testCustomNodeDefinition
  ];
  
  let allPassed = true;
  
  for (const test of tests) {
    const result = test();
    log.push(...result.log);
    
    if (!result.success) {
      allPassed = false;
      log.push('❌ Test failed, stopping execution');
      break;
    }
    
    log.push(''); // Add spacing between tests
  }
  
  if (allPassed) {
    log.push('🎉 All definition system tests passed!');
  }
  
  return { success: allPassed, log };
}
