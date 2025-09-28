// Custom Node Component for React Flow
// Renders nodes with embedded controls, following Rete.js patterns

import React, { useCallback, useMemo } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import { ReactFlowNodeData } from '../types';
import { getControlComponent, isUniformControl } from '../controls';

// Handle styling is now managed through CSS classes and CSS variables

/**
 * Custom Node Component
 */
export const CustomNode: React.FC<NodeProps<ReactFlowNodeData>> = ({ 
  data, 
  selected,
  id: nodeId
}) => {
  const { getEdges } = useReactFlow();
  
  // Get connected inputs to determine which controls to hide
  const connectedInputs = useMemo(() => {
    const edges = getEdges();
    const connected = new Set<string>();
    
    edges.forEach(edge => {
      if (edge.target === nodeId && edge.targetHandle) {
        connected.add(edge.targetHandle);
        console.log(`Node ${nodeId}: Input ${edge.targetHandle} is connected`); // Debug log
      }
    });
    
    console.log(`Node ${nodeId}: Connected inputs:`, Array.from(connected)); // Debug log
    return connected;
  }, [getEdges, nodeId]);

  // Handle control value changes
  const handleControlChange = useCallback((controlId: string, value: any) => {
    const event = new CustomEvent('nodeControlChange', {
      detail: { nodeId, controlId, value }
    });
    window.dispatchEvent(event);
  }, [nodeId]);

  // Let flexbox handle height automatically

  // Let React Flow handle positioning automatically

  // Handles are now rendered directly in the JSX return statement

  // Render controls (only show if corresponding input is not connected)
  const renderControls = useMemo(() => {
    return data.controls.map((control) => {
      // Check if this control has a corresponding input
      const hasInput = data.inputs.some(input => input.id === control.id);
      const isConnected = hasInput && connectedInputs.has(control.id);
      
      console.log(`Control ${control.id}: hasInput=${hasInput}, isConnected=${isConnected}, connectedInputs=`, Array.from(connectedInputs)); // Debug log
      
      // Hide control if input is connected
      if (isConnected) {
        console.log(`Hiding control ${control.id} because input is connected`); // Debug log
        return null;
      }
      
      const ControlComponent = getControlComponent(control.type);
      const currentValue = data.controlValues[control.id];
      
      return (
        <div key={control.id} className="reactflow-node-control">
          <ControlComponent
            id={`${nodeId}-${control.id}`}
            type={control.type}
            label={control.label}
            value={currentValue}
            config={control.config}
            onChange={(value) => handleControlChange(control.id, value)}
            className={isUniformControl(control.type) ? 'uniform-control' : ''}
          />
          {isUniformControl(control.type) && control.uniforms && (
            <div className="uniform-indicator">
              {control.uniforms.map(uniform => (
                <span key={uniform.name} className="uniform-name">
                  → {uniform.name}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }).filter(Boolean); // Remove null entries
  }, [data.controls, data.controlValues, data.inputs, connectedInputs, nodeId, handleControlChange]);

  // Calculate complexity-based width class
  const getComplexityClass = () => {
    const controlCount = data.controls.length;
    const inputCount = data.inputs.length;
    const hasVectorControls = data.controls.some(c => c.type.includes('vector'));
    const hasSelectControls = data.controls.some(c => c.type === 'select');
    
    let complexity = controlCount + inputCount;
    if (hasVectorControls) complexity += 2; // Vector controls are wider
    if (hasSelectControls) complexity += 1; // Select controls need more space
    
    if (complexity <= 2) return 'node-simple';
    if (complexity <= 4) return 'node-medium';
    if (complexity <= 6) return 'node-complex';
    return 'node-very-complex';
  };

  // Add dimension classes for theming
  const dimensionClass = data.dimensions ? 
    `node-${data.dimensions.width}x${data.dimensions.height}` : 
    getComplexityClass();

  return (
    <div 
      className={`reactflow-custom-node ${selected ? 'selected' : ''} ${dimensionClass}`}
      data-node-type={data.type}
      data-node-category={data.category}
    >
      {/* Input Handles - positioned by React Flow */}
      {data.inputs.map((input) => (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={Position.Left}
          id={input.id}
          className={`reactflow-handle reactflow-handle-input handle-${input.type.toLowerCase()}`}
          data-socket-type={input.type}
        />
      ))}
      
      {/* Output Handles - positioned by React Flow */}
      {data.outputs.map((output) => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={output.id}
          className={`reactflow-handle reactflow-handle-output handle-${output.type.toLowerCase()}`}
          data-socket-type={output.type}
        />
      ))}
      
      {/* Node Header */}
      <div className="reactflow-node-header">
        <div className="reactflow-node-title">{data.label}</div>
      </div>
      
      {/* Node Body */}
      <div className="reactflow-node-body">
        {renderControls.length > 0 && (
          <div className="reactflow-node-controls">
            {renderControls}
          </div>
        )}
      </div>
    </div>
  );
};
