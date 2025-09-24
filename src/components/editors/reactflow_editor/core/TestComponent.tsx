// Test Component for Core System
// This component provides a simple UI to test our core system functionality

import React, { useState } from 'react';
import { ReactFlowGraphManager } from './ReactFlowGraphManager';
import { SerializationAdapter } from './SerializationAdapter';
import { runAllDefinitionTests } from './definitionsTest';
import { UITestComponent } from '../components/UITestComponent';
import type { GuideJsonFormat } from './ReactFlowCore';

const TestComponent: React.FC = () => {
  const [manager] = useState(() => new ReactFlowGraphManager());
  const [log, setLog] = useState<string[]>([]);
  const [guideJson, setGuideJson] = useState<GuideJsonFormat | null>(null);
  const [showUITest, setShowUITest] = useState(false);

  const addLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Set up event listeners
  React.useEffect(() => {
    manager.on('node-added', ({ node }) => {
      addLog(`✅ Node added: ${node.type} (${node.id})`);
    });

    manager.on('connection-added', ({ connection }) => {
      addLog(`🔗 Connection added: ${connection.source}.${connection.sourceOutput} → ${connection.target}.${connection.targetInput}`);
    });

    manager.on('node-updated', ({ nodeId, key, value }) => {
      addLog(`📝 Node updated: ${nodeId}.${key} = ${JSON.stringify(value)}`);
    });

    return () => {
      // Cleanup would go here if needed
    };
  }, [manager]);

  const testNodeOperations = () => {
    addLog('🧪 Testing node operations...');
    
    // Add some test nodes
    const node1Id = manager.addNode('Cuboid3D', { x: 100, y: 100 }, { size: [1, 1, 1] });
    const node2Id = manager.addNode('Vec3', { x: 300, y: 100 }, { value: [0, 0, 0] });
    
    // Update node data
    manager.updateNodeData(node1Id, 'size', [2, 2, 2]);
    
    addLog(`📊 Graph stats: ${JSON.stringify(manager.getGraphStats())}`);
  };

  const testConnectionOperations = () => {
    addLog('🧪 Testing connection operations...');
    
    const nodes = manager.getAllNodes();
    if (nodes.length >= 2) {
      const connectionId = manager.addConnection(nodes[0].id, 'expr', nodes[1].id, 'value');
      if (connectionId) {
        addLog(`🔗 Created connection: ${connectionId}`);
        
        // Test connection queries
        const connectedInputs = manager.getConnectedInputs(nodes[1].id);
        addLog(`📍 Connected inputs for ${nodes[1].id}: ${Array.from(connectedInputs).join(', ')}`);
      } else {
        addLog('❌ Failed to create connection');
      }
    } else {
      addLog('❌ Need at least 2 nodes to test connections');
    }
  };

  const testSerialization = () => {
    addLog('🧪 Testing serialization...');
    
    // Export to guide.json format
    const exported = manager.exportToGuideJson('test-module');
    setGuideJson(exported);
    addLog('✅ Exported to guide.json format');
    
    // Validate the JSON
    const validation = SerializationAdapter.validateGuideJson(exported);
    addLog(`🔍 Validation: ${validation.isValid ? 'PASSED' : 'FAILED'}`);
    
    if (validation.errors.length > 0) {
      validation.errors.forEach(error => addLog(`❌ Error: ${error}`));
    }
    
    if (validation.warnings.length > 0) {
      validation.warnings.forEach(warning => addLog(`⚠️ Warning: ${warning}`));
    }
    
    return exported; // Return the exported JSON for immediate use
  };

  const testImport = (jsonToImport?: any) => {
    const jsonData = jsonToImport || guideJson;
    
    if (!jsonData) {
      addLog('❌ No guide.json to import. Run serialization test first.');
      return;
    }
    
    addLog('🧪 Testing import...');
    
    // Create a new manager and import
    const newManager = new ReactFlowGraphManager();
    const success = newManager.loadFromGuideJson(jsonData, 'test-module');
    
    if (success) {
      addLog('✅ Import successful');
      addLog(`📊 Imported graph stats: ${JSON.stringify(newManager.getGraphStats())}`);
    } else {
      addLog('❌ Import failed');
    }
  };

  const runAllTests = () => {
    setLog([]);
    addLog('🚀 Starting all tests...');
    
    setTimeout(() => testNodeOperations(), 100);
    setTimeout(() => testConnectionOperations(), 200);
    setTimeout(() => {
      const exported = testSerialization();
      // Pass the exported JSON directly to import test
      setTimeout(() => testImport(exported), 100);
    }, 300);
    setTimeout(() => addLog('🎉 All tests completed!'), 600);
  };

  const runCodegen = async () => {
    addLog('🧩 Generating TS node definitions from asmblr/nodes.json...');
    addLog('ℹ️ Run in terminal: yarn gen:nodes --force');
  };

  const runDefinitionTests = () => {
    setLog([]);
    addLog('🚀 Starting definition system tests...');
    
    setTimeout(() => {
      const result = runAllDefinitionTests();
      result.log.forEach(logEntry => addLog(logEntry));
    }, 100);
  };

  const clearLog = () => {
    setLog([]);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2>🧪 React Flow Core System Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testNodeOperations}
          style={{ margin: '5px', padding: '10px' }}
        >
          Test Node Operations
        </button>
        <button 
          onClick={testConnectionOperations}
          style={{ margin: '5px', padding: '10px' }}
        >
          Test Connections
        </button>
        <button 
          onClick={testSerialization}
          style={{ margin: '5px', padding: '10px' }}
        >
          Test Serialization
        </button>
        <button 
          onClick={testImport}
          style={{ margin: '5px', padding: '10px' }}
        >
          Test Import
        </button>
        <button 
          onClick={runAllTests}
          style={{ margin: '5px', padding: '10px', backgroundColor: '#007bff', color: 'white' }}
        >
          Run Core Tests
        </button>
        <button 
          onClick={runDefinitionTests}
          style={{ margin: '5px', padding: '10px', backgroundColor: '#28a745', color: 'white' }}
        >
          Run Definition Tests
        </button>
        <button 
          onClick={runCodegen}
          style={{ margin: '5px', padding: '10px', backgroundColor: '#17a2b8', color: 'white' }}
        >
          Generate Node TS (one-time)
        </button>
        <button 
          onClick={() => setShowUITest(!showUITest)}
          style={{ margin: '5px', padding: '10px', backgroundColor: '#6f42c1', color: 'white' }}
        >
          {showUITest ? 'Hide UI Test' : 'Show UI Test'}
        </button>
        <button 
          onClick={clearLog}
          style={{ margin: '5px', padding: '10px', backgroundColor: '#dc3545', color: 'white' }}
        >
          Clear Log
        </button>
      </div>

      <div style={{
        border: '1px solid #ccc',
        padding: '10px',
        height: '300px',
        overflowY: 'auto',
        backgroundColor: '#f8f9fa',
        fontSize: '12px'
      }}>
        {log.length === 0 ? (
          <div style={{ color: '#6c757d' }}>Click "Run All Tests" to start testing the core system...</div>
        ) : (
          log.map((entry, index) => (
            <div key={index} style={{ marginBottom: '2px' }}>
              {entry}
            </div>
          ))
        )}
      </div>

      {guideJson && (
        <details style={{ marginTop: '20px' }}>
          <summary>📄 Generated Guide.json</summary>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '10px', 
            fontSize: '11px',
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {JSON.stringify(guideJson, null, 2)}
          </pre>
        </details>
      )}
      
      {/* UI Test Component */}
      {showUITest && (
        <div style={{ marginTop: '20px', border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px' }}>
          <UITestComponent />
        </div>
      )}
    </div>
  );
};

export default TestComponent;
