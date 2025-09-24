# React Flow Node Editor Rewrite Plan

## Current State Analysis

### Problems with Current Implementation

1. **Poor Node Architecture**: Current nodes mix UI logic with data logic
2. **Inefficient Control Management**: Controls are always rendered, not hidden when connected
3. **Inconsistent Data Format**: Doesn't match the clean format from `guide.json`
4. **Tight Coupling**: Frontend and backend logic are intertwined
5. **Missing Core Abstractions**: No proper Node class, Input/Output management, or Connection system

### Rete.js Strengths to Emulate

1. **Clean Separation**: Core logic separated from UI rendering
2. **Proper Node Classes**: Each node type has a dedicated class with clear inputs/outputs
3. **Control System**: Controls are automatically hidden when inputs are connected
4. **Serialization**: Clean JSON format for saving/loading graphs
5. **Module System**: Reusable subgraphs and components

## Proposed Architecture

### Phase 1: Core System Rewrite

#### 1.1 Core Data Structures

```typescript
// Core Node System
class ReactFlowNodeCore {
  id: string;
  type: string;
  data: Record<string, any>; // Default values from controls
  position: { x: number; y: number };
}

class ReactFlowConnection {
  id: string;
  source: string;          // Source node ID
  sourceOutput: string;    // Source output socket name
  target: string;          // Target node ID  
  targetInput: string;     // Target input socket name
}

class ReactFlowGraph {
  nodes: ReactFlowNodeCore[];
  connections: ReactFlowConnection[];
  positions: Record<string, { x: number; y: number }>;
}
```

#### 1.2 Node Definition System

```typescript
interface NodeDefinition {
  type: string;
  label: string;
  category: string;
  inputs: InputDefinition[];
  outputs: OutputDefinition[];
  controls: ControlDefinition[];
  factory: (data?: any) => ReactFlowNodeCore;
}

interface InputDefinition {
  key: string;
  label: string;
  socketType: SocketType;
  required: boolean;
  defaultValue?: any;
}

interface OutputDefinition {
  key: string;
  label: string;
  socketType: SocketType;
}

interface ControlDefinition {
  key: string;
  type: ControlType;
  label: string;
  config: ControlConfig;
  linkedToInput?: string; // Which input this control provides default value for
}
```

#### 1.3 Graph Management System

```typescript
class ReactFlowGraphManager {
  private nodes: Map<string, ReactFlowNodeCore>;
  private connections: Map<string, ReactFlowConnection>;
  private nodeDefinitions: Map<string, NodeDefinition>;
  
  // Core operations
  addNode(type: string, position: { x: number; y: number }): string;
  removeNode(nodeId: string): boolean;
  addConnection(connection: ReactFlowConnection): boolean;
  removeConnection(connectionId: string): boolean;
  
  // Data access
  getConnectedInputs(nodeId: string): Set<string>;
  getNodeData(nodeId: string): Record<string, any>;
  updateNodeData(nodeId: string, key: string, value: any): void;
  
  // Serialization (matching guide.json format)
  serialize(): ReactFlowGraph;
  deserialize(graph: ReactFlowGraph): void;
}
```

### Phase 2: Frontend Component Rewrite

#### 2.1 Smart Node Component

```typescript
const SmartReactFlowNode: React.FC<NodeProps> = ({ data, id }) => {
  const graphManager = useGraphManager();
  const nodeDefinition = useNodeDefinition(data.type);
  const connectedInputs = useConnectedInputs(id);
  
  // Only render controls for inputs that aren't connected
  const visibleControls = nodeDefinition.controls.filter(control => {
    const linkedInput = control.linkedToInput;
    return !linkedInput || !connectedInputs.has(linkedInput);
  });
  
  return (
    <div className="smart-node">
      <NodeHeader title={nodeDefinition.label} />
      
      <NodeInputs 
        inputs={nodeDefinition.inputs}
        connectedInputs={connectedInputs}
      />
      
      <NodeControls 
        controls={visibleControls}
        values={data}
        onChange={(key, value) => graphManager.updateNodeData(id, key, value)}
      />
      
      <NodeOutputs outputs={nodeDefinition.outputs} />
    </div>
  );
};
```

#### 2.2 Connection-Aware Control System

```typescript
const useConnectedInputs = (nodeId: string) => {
  const graphManager = useGraphManager();
  return useMemo(() => graphManager.getConnectedInputs(nodeId), [nodeId]);
};

const NodeControls: React.FC<{
  controls: ControlDefinition[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
}> = ({ controls, values, onChange }) => {
  return (
    <div className="node-controls">
      {controls.map(control => (
        <ControlComponent
          key={control.key}
          definition={control}
          value={values[control.key]}
          onChange={(value) => onChange(control.key, value)}
        />
      ))}
    </div>
  );
};
```

### Phase 3: Node Type Definitions

#### 3.1 Node Registry System

```typescript
class ReactFlowNodeRegistry {
  private definitions = new Map<string, NodeDefinition>();
  
  register(definition: NodeDefinition): void;
  registerMany(definitions: NodeDefinition[]): void;
  get(type: string): NodeDefinition | undefined;
  getAllByCategory(category: string): NodeDefinition[];
  getContextMenuItems(): ContextMenuItem[];
}

// Example node definitions
const CuboidNodeDefinition: NodeDefinition = {
  type: 'Cuboid3D',
  label: 'Cuboid 3D',
  category: 'Primitives',
  inputs: [],
  outputs: [
    { key: 'expr', label: 'Expression', socketType: 'ExprSocket' }
  ],
  controls: [
    {
      key: 'size',
      type: 'vector3',
      label: 'Size',
      config: { defaultValue: [1, 1, 1], min: [0, 0, 0], max: [5, 5, 5] }
    }
  ],
  factory: (data) => new ReactFlowNodeCore('Cuboid3D', data || { size: [1, 1, 1] })
};
```

### Phase 4: Integration and Migration

#### 4.1 Serialization Compatibility

```typescript
// Convert to/from guide.json format
class SerializationAdapter {
  static toGuideFormat(graph: ReactFlowGraph): GuideJsonFormat {
    return {
      moduleList: {
        [moduleName]: {
          nodes: graph.nodes.map(node => ({
            id: node.id,
            name: node.type,
            data: node.data
          })),
          connections: graph.connections.map(conn => ({
            source: conn.source,
            sourceOutput: conn.sourceOutput,
            target: conn.target,
            targetInput: conn.targetInput
          })),
          positions: graph.positions
        }
      }
    };
  }
  
  static fromGuideFormat(guide: GuideJsonFormat): ReactFlowGraph;
}
```

#### 4.2 Hook Integration

```typescript
export const useReactFlowEditor = ({ modeName }: { modeName: string }) => {
  const graphManager = useRef(new ReactFlowGraphManager());
  const [nodes, setNodes] = useState<ReactFlowNode[]>([]);
  const [edges, setEdges] = useState<ReactFlowEdge[]>([]);
  
  // Convert internal representation to React Flow format
  const syncToReactFlow = useCallback(() => {
    const graph = graphManager.current.serialize();
    setNodes(convertNodesToReactFlow(graph.nodes));
    setEdges(convertConnectionsToReactFlow(graph.connections));
  }, []);
  
  return {
    view: (
      <ReactFlowEditor
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        nodeTypes={nodeTypes}
      />
    ),
    graphManager: graphManager.current,
    // Export in guide.json format for backend
    getSerializedData: () => SerializationAdapter.toGuideFormat(
      graphManager.current.serialize()
    )
  };
};
```

## Implementation Steps

### Step 1: Core Infrastructure
1. Create `ReactFlowNodeCore`, `ReactFlowConnection`, `ReactFlowGraph` classes
2. Implement `ReactFlowGraphManager` with basic CRUD operations
3. Set up serialization/deserialization to match guide.json format

### Step 2: Node Definition System
1. Create `NodeDefinition` interface and registration system
2. Port existing node definitions from current implementation
3. Implement node factory system

### Step 3: Smart Frontend Components
1. Rewrite `CustomNode` as `SmartReactFlowNode`
2. Implement connection-aware control visibility
3. Create modular input/output/control sub-components

### Step 4: Integration
1. Update `useReactFlowEditor` hook to use new system
2. Implement serialization adapter for backend compatibility
3. Add migration utilities for existing graphs

### Step 5: Node Definitions
1. Port all existing node types to new system
2. Add missing node types from Rete.js implementation
3. Organize nodes by category for context menu

## Benefits of This Approach

1. **Clean Architecture**: Separates data logic from UI rendering
2. **Automatic Control Management**: Controls hide when inputs are connected
3. **Consistent Serialization**: Matches guide.json format exactly
4. **Better Performance**: More efficient re-rendering and state management
5. **Extensibility**: Easy to add new node types and controls
6. **Maintainability**: Clear separation of concerns and modular design

## Migration Strategy

1. Implement new system alongside existing one
2. Add feature flag to switch between implementations
3. Provide migration utilities for existing graphs
4. Gradually phase out old implementation
5. Remove legacy code once new system is stable

This plan provides a solid foundation for a professional-grade visual programming interface that matches the quality and architecture of the Rete.js implementation while leveraging React Flow's modern React integration.
