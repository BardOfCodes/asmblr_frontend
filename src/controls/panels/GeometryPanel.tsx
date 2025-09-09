import React from 'react';
import { geometryService } from '../../services/geometry/GeometryService';
import { conversionService } from '../../services/geometry/ConversionService';
import { useAppState } from '../../store/AppContext';
import { ViewerHandle, EditorHandle } from '../../types/components';
import { ApiError } from '../../services/api/client';
import { Button, Stack, Text, StatusBadge, Title } from '../../design/components';

interface GeometryPanelProps {
  viewerRef: React.RefObject<ViewerHandle>;
  editor: EditorHandle;
}

export const GeometryPanel: React.FC<GeometryPanelProps> = ({
  viewerRef,
  editor,
}) => {
  const { state, dispatch } = useAppState();
  const { viewer, editor: editorState } = state;

  const handleError = (error: unknown, operation: string) => {
    const message = error instanceof ApiError 
      ? error.message 
      : `Failed to ${operation}: ${error instanceof Error ? error.message : 'Unknown error'}`;
    
    dispatch({ type: 'SET_VIEWER_ERROR', payload: message });
    console.error(`Error in ${operation}:`, error);
  };

  const loadGeometry = async () => {
    try {
      dispatch({ type: 'SET_VIEWER_LOADING', payload: true });
      dispatch({ type: 'SET_VIEWER_ERROR', payload: null });

      editor.sync();
      const moduleData = editor.exportCurrent();
      
      if (!moduleData) {
        throw new Error('No module data available');
      }

      const { shaderCode, uniforms } = await geometryService.generateShaderFromGraph(moduleData);
      
      // Add default sun uniforms
      const enhancedUniforms = {
        sunAzimuth: {
          type: 'float' as const,
          init_value: Math.PI / 4,
          min: [0],
          max: [2 * Math.PI],
        },
        sunElevation: {
          type: 'float' as const,
          init_value: 0.5,
          min: [-Math.PI / 2],
          max: [Math.PI / 2],
        },
        ...uniforms,
      };

      dispatch({ type: 'SET_UNIFORMS', payload: enhancedUniforms });
      dispatch({ type: 'SET_SHADER_CODE', payload: shaderCode });
      
      viewerRef.current?.setShaderCode(shaderCode);
      
      // Set initial uniform values
      Object.entries(enhancedUniforms).forEach(([name, spec]) => {
        viewerRef.current?.setUniform(name, spec.init_value);
      });

    } catch (error) {
      handleError(error, 'load geometry');
    } finally {
      dispatch({ type: 'SET_VIEWER_LOADING', payload: false });
    }
  };

  const loadAll = async () => {
    try {
      dispatch({ type: 'SET_VIEWER_LOADING', payload: true });
      dispatch({ type: 'SET_VIEWER_ERROR', payload: null });

      editor.sync();
      const moduleData = editorState.modules;
      
      const { shaderCode, uniforms } = await geometryService.generateShaderFromGraphSet(moduleData);
      
      dispatch({ type: 'SET_UNIFORMS', payload: uniforms });
      dispatch({ type: 'SET_SHADER_CODE', payload: shaderCode });
      
      viewerRef.current?.setShaderCode(shaderCode);
      
      Object.entries(uniforms).forEach(([name, spec]) => {
        viewerRef.current?.setUniform(name, spec.init_value);
      });

    } catch (error) {
      handleError(error, 'load all modules');
    } finally {
      dispatch({ type: 'SET_VIEWER_LOADING', payload: false });
    }
  };

  const arrangeNodes = () => {
    try {
      editor.sync();
      editor.layout();
    } catch (error) {
      handleError(error, 'arrange nodes');
    }
  };

  const resetShader = () => {
    dispatch({ type: 'SET_UNIFORMS', payload: {} });
    dispatch({ type: 'SET_SHADER_CODE', payload: '' });
    viewerRef.current?.setShaderCode('');
  };

  const saveShaderCode = () => {
    if (!viewer.shaderCode) {
      dispatch({ type: 'SET_VIEWER_ERROR', payload: 'No shader code to save' });
      return;
    }
    
    conversionService.downloadText(viewer.shaderCode, 'shader.frag', 'text/plain');
  };

  return (
    <Stack $gap="md">
      <Title $level={4}>Geometry Operations</Title>
      
      {/* Error Messages */}
      {viewer.error && (
        <StatusBadge $status="error">
          {viewer.error}
        </StatusBadge>
      )}
      
      {editorState.error && (
        <StatusBadge $status="error">
          Editor: {editorState.error}
        </StatusBadge>
      )}

      {/* Primary Operations */}
      <Stack $gap="sm">
        <Text $size="sm" $weight="medium" $variant="secondary">
          Load & Process
        </Text>
        
        <Stack $direction="row" $gap="sm">
          <Button 
            $variant="primary"
            onClick={loadGeometry} 
            disabled={viewer.isLoading || editorState.isProcessing}
            $fullWidth
          >
            {viewer.isLoading ? 'Loading...' : 'Load Geometry'}
          </Button>
          
          <Button 
            onClick={loadAll} 
            disabled={viewer.isLoading || editorState.isProcessing}
            $fullWidth
          >
            Load All
          </Button>
        </Stack>
        
        <Button 
          onClick={arrangeNodes}
          $fullWidth
        >
          Arrange Nodes
        </Button>
      </Stack>

      {/* Utility Operations */}
      <Stack $gap="sm">
        <Text $size="sm" $weight="medium" $variant="secondary">
          Utilities
        </Text>
        
        <Stack $direction="row" $gap="sm">
          <Button 
            $variant="ghost"
            onClick={resetShader}
            $fullWidth
          >
            Reset Shader
          </Button>
          
          <Button 
            $variant="ghost"
            onClick={saveShaderCode} 
            disabled={!viewer.shaderCode}
            $fullWidth
          >
            Save Shader
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
