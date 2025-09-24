// Node Data Management Hook
// Provides reactive node data management with the graph manager

import { useCallback, useMemo } from 'react';
import { ReactFlowGraphManager } from '../core/ReactFlowGraphManager';
import { NodeDefinition } from '../definitions';

/**
 * Props for the useNodeData hook
 */
export interface UseNodeDataProps {
  nodeId: string;
  graphManager?: ReactFlowGraphManager;
  definition?: NodeDefinition;
}

/**
 * Node data management interface
 */
export interface NodeDataManager {
  // Current data
  data: Record<string, any>;
  
  // Data operations
  updateData: (key: string, value: any) => void;
  updateMultipleData: (updates: Record<string, any>) => void;
  resetToDefaults: () => void;
  
  // Validation
  isValid: boolean;
  errors: string[];
  warnings: string[];
  
  // Helpers
  getValue: (key: string, defaultValue?: any) => any;
  hasValue: (key: string) => boolean;
}

/**
 * Hook for managing node data with validation and graph manager integration
 */
export function useNodeData({
  nodeId,
  graphManager,
  definition
}: UseNodeDataProps): NodeDataManager {
  
  // Get current node data from graph manager
  const currentData = useMemo(() => {
    if (graphManager) {
      return graphManager.getNodeData(nodeId) || {};
    }
    return {};
  }, [graphManager, nodeId]);
  
  // Update single data property
  const updateData = useCallback((key: string, value: any) => {
    if (graphManager) {
      graphManager.updateNodeData(nodeId, key, value);
    } else {
      console.warn('No graph manager provided to useNodeData');
    }
  }, [graphManager, nodeId]);
  
  // Update multiple data properties
  const updateMultipleData = useCallback((updates: Record<string, any>) => {
    Object.entries(updates).forEach(([key, value]) => {
      updateData(key, value);
    });
  }, [updateData]);
  
  // Reset to default values from definition
  const resetToDefaults = useCallback(() => {
    if (definition) {
      const defaultData = definition.factory();
      updateMultipleData(defaultData);
    }
  }, [definition, updateMultipleData]);
  
  // Validate current data
  const validation = useMemo(() => {
    if (definition && definition.validator) {
      return definition.validator(currentData);
    }
    
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }, [definition, currentData]);
  
  // Helper to get value with fallback
  const getValue = useCallback((key: string, defaultValue?: any) => {
    if (currentData.hasOwnProperty(key)) {
      return currentData[key];
    }
    
    // Try to get default from definition
    if (definition) {
      const control = definition.controls.find(c => c.key === key);
      if (control) {
        return control.config.defaultValue;
      }
    }
    
    return defaultValue;
  }, [currentData, definition]);
  
  // Helper to check if value exists
  const hasValue = useCallback((key: string) => {
    return currentData.hasOwnProperty(key);
  }, [currentData]);
  
  return {
    data: currentData,
    updateData,
    updateMultipleData,
    resetToDefaults,
    isValid: validation.isValid,
    errors: validation.errors,
    warnings: validation.warnings,
    getValue,
    hasValue
  };
}

/**
 * Hook for managing control values specifically
 */
export function useControlValue(
  nodeId: string,
  controlKey: string,
  graphManager?: ReactFlowGraphManager,
  definition?: NodeDefinition
): {
  value: any;
  setValue: (value: any) => void;
  defaultValue: any;
  isDefault: boolean;
} {
  const { getValue, updateData } = useNodeData({ nodeId, graphManager, definition });
  
  // Get control definition
  const controlDef = useMemo(() => {
    return definition?.controls.find(c => c.key === controlKey);
  }, [definition, controlKey]);
  
  const defaultValue = controlDef?.config.defaultValue;
  const currentValue = getValue(controlKey, defaultValue);
  
  const setValue = useCallback((value: any) => {
    updateData(controlKey, value);
  }, [updateData, controlKey]);
  
  const isDefault = useMemo(() => {
    return JSON.stringify(currentValue) === JSON.stringify(defaultValue);
  }, [currentValue, defaultValue]);
  
  return {
    value: currentValue,
    setValue,
    defaultValue,
    isDefault
  };
}



