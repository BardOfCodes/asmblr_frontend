// Core System Test
// Simple test functions to validate the core system functionality
// This file can be run in the browser console for testing

import { ReactFlowNodeCore, ReactFlowConnection, ReactFlowGraph } from './ReactFlowCore';
import { ReactFlowGraphManager } from './ReactFlowGraphManager';
import { SerializationAdapter } from './SerializationAdapter';

/**
 * Test basic node operations
 */
export function testNodeOperations() {
  console.log('🧪 Testing Node Operations...');
  
  // Create nodes
  const node1 = new ReactFlowNodeCore('Cuboid3D', { size: [1, 1, 1] }, { x: 100, y: 100 });
  const node2 = new ReactFlowNodeCore('Vec3', { value: [0, 0, 0] }, { x: 300, y: 100 });
  
  console.log('✅ Created nodes:', { node1: node1.id, node2: node2.id });
  
  // Test data operations
  node1.updateData('size', [2, 2, 2]);
  console.log('✅ Updated node data:', node1.getData('size'));
  
  return { node1, node2 };
}

/**
 * Test connection operations
 */
export function testConnectionOperations() {
  console.log('🧪 Testing Connection Operations...');
  
  const { node1, node2 } = testNodeOperations();
  
  // Create connection
  const connection = new ReactFlowConnection(node1.id, 'expr', node2.id, 'value');
  console.log('✅ Created connection:', connection.id);
  
  // Test connection queries
  console.log('✅ Connection involves node1:', connection.involvesNode(node1.id));
  console.log('✅ Connection connects to input:', connection.connectsToInput(node2.id, 'value'));
  
  return { node1, node2, connection };
}

/**
 * Test graph operations
 */
export function testGraphOperations() {
  console.log('🧪 Testing Graph Operations...');
  
  const { node1, node2, connection } = testConnectionOperations();
  
  // Create graph
  const graph = new ReactFlowGraph([node1, node2], [connection]);
  console.log('✅ Created graph with stats:', graph.getStats());
  
  // Test graph queries
  const connectedInputs = graph.getConnectedInputs(node2.id);
  console.log('✅ Connected inputs for node2:', Array.from(connectedInputs));
  
  // Test node removal
  const removed = graph.removeNode(node1.id);
  console.log('✅ Removed node1:', removed);
  console.log('✅ Graph stats after removal:', graph.getStats());
  
  return graph;
}

/**
 * Test graph manager operations
 */
export function testGraphManager() {
  console.log('🧪 Testing Graph Manager...');
  
  const manager = new ReactFlowGraphManager();
  
  // Add event listeners
  manager.on('node-added', ({ node }) => {
    console.log('📢 Node added event:', node.id);
  });
  
  manager.on('connection-added', ({ connection }) => {
    console.log('📢 Connection added event:', connection.id);
  });
  
  // Add nodes
  const nodeId1 = manager.addNode('Cuboid3D', { x: 100, y: 100 }, { size: [1, 1, 1] });
  const nodeId2 = manager.addNode('Vec3', { x: 300, y: 100 }, { value: [0, 0, 0] });
  
  console.log('✅ Added nodes via manager:', { nodeId1, nodeId2 });
  
  // Add connection
  const connectionId = manager.addConnection(nodeId1, 'expr', nodeId2, 'value');
  console.log('✅ Added connection via manager:', connectionId);
  
  // Test queries
  const connectedInputs = manager.getConnectedInputs(nodeId2);
  console.log('✅ Connected inputs via manager:', Array.from(connectedInputs));
  
  return manager;
}

/**
 * Test serialization operations
 */
export function testSerialization() {
  console.log('🧪 Testing Serialization...');
  
  const manager = testGraphManager();
  
  // Export to guide.json format
  const guideJson = manager.exportToGuideJson('test-module');
  console.log('✅ Exported to guide.json:', guideJson);
  
  // Test validation
  const validation = SerializationAdapter.validateGuideJson(guideJson);
  console.log('✅ Validation result:', validation);
  
  // Test import
  const newManager = new ReactFlowGraphManager();
  const importSuccess = newManager.loadFromGuideJson(guideJson, 'test-module');
  console.log('✅ Import success:', importSuccess);
  console.log('✅ Imported graph stats:', newManager.getGraphStats());
  
  return { guideJson, validation };
}

/**
 * Run all tests
 */
export function runAllTests() {
  console.log('🚀 Starting Core System Tests...\n');
  
  try {
    testNodeOperations();
    console.log('');
    
    testConnectionOperations();
    console.log('');
    
    testGraphOperations();
    console.log('');
    
    testGraphManager();
    console.log('');
    
    testSerialization();
    console.log('');
    
    console.log('🎉 All tests completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

// Auto-run tests if this file is imported in browser console
if (typeof window !== 'undefined') {
  console.log('Core system test functions available:');
  console.log('- testNodeOperations()');
  console.log('- testConnectionOperations()');
  console.log('- testGraphOperations()');
  console.log('- testGraphManager()');
  console.log('- testSerialization()');
  console.log('- runAllTests()');
}
