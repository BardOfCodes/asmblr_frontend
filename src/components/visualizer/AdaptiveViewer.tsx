import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useSettings } from '../../store/SettingsContext';
import { ViewerHandle } from '../../modes/types';
import HybridViewer from './HybridViewer';
import { HybridViewerHandle } from './HybridViewer';
import ShaderVisViewer, { ShaderVisViewerHandle } from './ShaderVisViewer';

export interface AdaptiveViewerHandle extends ViewerHandle {
  // Union of all possible viewer methods
  loadHTML?: (html: string) => void;
  loadShaderData?: (data: any) => void;
  updateUniforms?: (uniforms: Record<string, any>) => void;
  loadShaderCode?: (shaderCode: string, uniformsDict: Record<string, any>, textures?: Record<string, any>) => void;
}

const AdaptiveViewer = forwardRef<AdaptiveViewerHandle>((props, ref) => {
  const { settings } = useSettings();
  const iframeViewerRef = useRef<HybridViewerHandle>(null);
  const shaderViewerRef = useRef<ShaderVisViewerHandle>(null);
  
  // State for shader viewer props
  const [shaderCode, setShaderCode] = useState<string>();
  const [uniformsDict, setUniformsDict] = useState<Record<string, any>>();
  const [textures, setTextures] = useState<Record<string, any>>();
  
  const selectedViewer = settings.ui.components.selectedViewer;

  useImperativeHandle(ref, () => ({
    // Legacy methods for compatibility
    setShaderCode: () => console.log('setShaderCode not implemented in AdaptiveViewer'),
    setUniform: () => console.log('setUniform not implemented in AdaptiveViewer'),
    captureScreenshot: () => console.log('captureScreenshot not implemented in AdaptiveViewer'),
    
    loadHTML: (html: string) => {
      if (selectedViewer === 'iframe_viewer' && iframeViewerRef.current) {
        iframeViewerRef.current.loadHTML(html);
      } else {
        console.warn('loadHTML called but iframe viewer not active or available');
      }
    },
    loadShaderData: (data: any) => {
      if (selectedViewer === 'shader_viewer' && shaderViewerRef.current) {
        shaderViewerRef.current.loadShaderData(data);
      } else {
        console.warn('loadShaderData called but shader viewer not active or available');
      }
    },
    updateUniforms: (uniforms: Record<string, any>) => {
      if (selectedViewer === 'shader_viewer' && shaderViewerRef.current) {
        shaderViewerRef.current.updateUniforms(uniforms);
      } else {
        console.warn('updateUniforms called but shader viewer not active or available');
      }
    },
    loadShaderCode: (shaderCode: string, uniformsDict: Record<string, any>, textures?: Record<string, any>) => {
      if (selectedViewer === 'shader_viewer') {
        setShaderCode(shaderCode);
        setUniformsDict(uniformsDict);
        setTextures(textures);
      } else {
        console.warn('loadShaderCode called but shader viewer not active');
      }
    }
  }), [selectedViewer]);

  if (selectedViewer === 'shader_viewer') {
    return (
      <ShaderVisViewer 
        ref={shaderViewerRef} 
        shaderCode={shaderCode}
        uniformsDict={uniformsDict}
        textures={textures}
      />
    );
  } else {
    return <HybridViewer ref={iframeViewerRef} />;
  }
});

AdaptiveViewer.displayName = 'AdaptiveViewer';

export default AdaptiveViewer;
