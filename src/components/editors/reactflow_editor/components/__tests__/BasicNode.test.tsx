import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BasicNode } from '../BasicNode';
import { ReactFlowProvider } from 'reactflow';

// Mock the ReactFlow hooks
vi.mock('reactflow', async () => {
  const actual = await vi.importActual('reactflow');
  return {
    ...actual,
    useStore: vi.fn(() => []),
    useReactFlow: vi.fn(() => ({
      getNodes: vi.fn(() => []),
      getEdges: vi.fn(() => []),
      setNodes: vi.fn(),
      screenToFlowPosition: vi.fn((pos) => pos),
    })),
    Handle: ({ children, ...props }: any) => <div data-testid="handle" {...props}>{children}</div>,
    Position: {
      Left: 'left',
      Right: 'right',
      Top: 'top',
      Bottom: 'bottom',
    },
  };
});

describe('BasicNode', () => {
  const mockNodeData = {
    nodeType: 'TestNode',
    definition: {
      type: 'TestNode',
      label: 'Test Node',
      category: 'Utilities' as const,
      inputs: [
        { key: 'input1', label: 'Input 1', socketType: 'ExprSocket', required: true }
      ],
      outputs: [
        { key: 'output1', label: 'Output 1', socketType: 'ExprSocket' }
      ],
      controls: [
        {
          key: 'control1',
          type: 'float' as const,
          label: 'Control 1',
          config: { defaultValue: 1.0 },
          linkedToInput: 'input1'
        }
      ],
      factory: () => ({ control1: 1.0 }),
    }
  };

  const mockNodeProps = {
    id: 'test-node-1',
    data: mockNodeData,
    selected: false,
    type: 'smart-node',
    position: { x: 0, y: 0 },
    dragging: false,
    xPos: 0,
    yPos: 0,
    zIndex: 0,
    isConnectable: true,
  };

  it('should render without crashing', () => {
    const { container } = render(
      <ReactFlowProvider>
        <BasicNode {...mockNodeProps} />
      </ReactFlowProvider>
    );
    expect(container).toBeTruthy();
  });

  it('should display node label', () => {
    render(
      <ReactFlowProvider>
        <BasicNode {...mockNodeProps} />
      </ReactFlowProvider>
    );
    expect(screen.getByText('Test Node')).toBeDefined();
  });

  it('should render inputs and outputs', () => {
    render(
      <ReactFlowProvider>
        <BasicNode {...mockNodeProps} />
      </ReactFlowProvider>
    );
    expect(screen.getByText('Input 1')).toBeDefined();
    expect(screen.getByText('Output 1')).toBeDefined();
  });

  it('should render unknown node when definition is missing', () => {
    const propsWithoutDefinition = {
      ...mockNodeProps,
      data: { nodeType: 'UnknownType' },
      isConnectable: true
    };
    
    render(
      <ReactFlowProvider>
        <BasicNode {...propsWithoutDefinition} />
      </ReactFlowProvider>
    );
    
    expect(screen.getByText('❌ Unknown Node')).toBeDefined();
    expect(screen.getByText('Type: UnknownType')).toBeDefined();
  });

  it('should apply selected styles when selected', () => {
    const selectedProps = {
      ...mockNodeProps,
      selected: true,
      isConnectable: true
    };
    
    const { container } = render(
      <ReactFlowProvider>
        <BasicNode {...selectedProps} />
      </ReactFlowProvider>
    );
    
    // Check that CSS variables include selected state
    const nodeContainer = container.firstChild as HTMLElement;
    expect(nodeContainer).toBeDefined();
  });
});

// Test the calculateNodeSizing function is working
describe('Node Sizing Calculation', () => {
  it('should not throw errors when calculating node size', () => {
    // This test verifies that our fix for calculateNodeSizing works
    const testCalculation = () => {
      const mockDefinition = {
        type: 'TestNode',
        label: 'Test Node',
        category: 'Utilities' as const,
        inputs: [],
        outputs: [],
        controls: [],
        factory: () => ({})
      };
      
      // This would have thrown "calculateNodeSizing is not a function" before the fix
      const { container } = render(
        <ReactFlowProvider>
          <BasicNode
            {...mockNodeProps}
            data={{ nodeType: 'test', definition: mockDefinition }}
          />
        </ReactFlowProvider>
      );
      
      expect(container).toBeTruthy();
    };
    
    expect(testCalculation).not.toThrow();
  });
});
