import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useSettings } from '../../store/SettingsContext';
import { ViewerHandle } from '../../modes/types';
import { debug } from '../../utils/debug';
import HybridViewer from './HybridViewer';
import { HybridViewerHandle } from './HybridViewer';
import ShaderVisViewer, { ShaderVisViewerHandle } from './ShaderVisViewer';
import NewReglViewer, { ReglViewerHandle } from './NewReglViewer';

export interface AdaptiveViewerHandle extends ViewerHandle {
  // Union of all possible viewer methods
  loadHTML?: (html: string) => void;
  loadShaderData?: (data: any) => void;
  updateUniforms?: (uniforms: Record<string, any>) => void;
  loadShaderCode?: (shaderCode: string, uniformsDict: Record<string, any>, textures?: Record<string, any>) => void;
  // REGL viewer methods
  setShaderCode?: (fragShader: string, vertShader?: string) => void;
  setUniform?: (name: string, value: any) => void;
  captureScreenshot?: () => void;
}

const AdaptiveViewer = forwardRef<AdaptiveViewerHandle>((_, ref) => {
  const { settings } = useSettings();
  const iframeViewerRef = useRef<HybridViewerHandle>(null);
  const shaderViewerRef = useRef<ShaderVisViewerHandle>(null);
  const reglViewerRef = useRef<ReglViewerHandle>(null);
  
  // State for shader viewer props
  const [shaderCode, setShaderCode] = useState<string>();
  const [uniformsDict, setUniformsDict] = useState<Record<string, any>>();
  const [textures, setTextures] = useState<Record<string, any>>();
  
  const selectedViewer = settings.ui.components.selectedViewer;

  useImperativeHandle(ref, () => ({
    // REGL viewer methods
    setShaderCode: (fragShader: string, vertShader?: string) => {
      if (selectedViewer === 'regl_viewer' && reglViewerRef.current) {
        reglViewerRef.current.setShaderCode(fragShader, vertShader);
      } else {
        debug.warn('setShaderCode called but REGL viewer not active or available');
      }
    },
    setUniform: (name: string, value: any) => {
      if (selectedViewer === 'regl_viewer' && reglViewerRef.current) {
        reglViewerRef.current.setUniform(name, value);
      } else {
        debug.warn('setUniform called but REGL viewer not active or available');
      }
    },
    captureScreenshot: () => {
      if (selectedViewer === 'regl_viewer' && reglViewerRef.current) {
        reglViewerRef.current.captureScreenshot();
      } else {
        debug.warn('captureScreenshot called but REGL viewer not active or available');
      }
    },
    
    loadHTML: (html: string) => {
      if (selectedViewer === 'iframe_viewer' && iframeViewerRef.current) {
        iframeViewerRef.current.loadHTML(html);
      } else {
        debug.warn('loadHTML called but iframe viewer not active or available');
      }
    },
    loadShaderData: (data: any) => {
      if (selectedViewer === 'shader_viewer' && shaderViewerRef.current) {
        shaderViewerRef.current.loadShaderData(data);
      } else {
        debug.warn('loadShaderData called but shader viewer not active or available');
      }
    },
    updateUniforms: (uniforms: Record<string, any>) => {
      if (selectedViewer === 'shader_viewer' && shaderViewerRef.current) {
        shaderViewerRef.current.updateUniforms(uniforms);
      } else {
        debug.warn('updateUniforms called but shader viewer not active or available');
      }
    },
    loadShaderCode: (shaderCode: string, uniformsDict: Record<string, any>, textures?: Record<string, any>) => {
      if (selectedViewer === 'shader_viewer') {
        setShaderCode(shaderCode);
        setUniformsDict(uniformsDict);
        setTextures(textures);
      } else if (selectedViewer === 'regl_viewer' && reglViewerRef.current) {
        debug.log('[AdaptiveViewer] Loading shader code for REGL viewer:', { shaderCode: shaderCode.length, uniformsCount: Object.keys(uniformsDict || {}).length });
        
        // Set uniforms first, then shader code to ensure they're available when the draw command is created
        if (uniformsDict) {
          debug.log('[AdaptiveViewer] Setting uniforms for REGL viewer:', uniformsDict);
          Object.entries(uniformsDict).forEach(([name, value]) => {
            reglViewerRef.current?.setUniform(name, value);
          });
        }
        
        // Set shader code after uniforms are set
        reglViewerRef.current.setShaderCode(shaderCode);
      } else {
        debug.warn('loadShaderCode called but no compatible viewer is active');
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
  } else if (selectedViewer === 'regl_viewer') {
    return <NewReglViewer ref={reglViewerRef} />;
  } else {
    return <HybridViewer ref={iframeViewerRef} />;
  }
});

AdaptiveViewer.displayName = 'AdaptiveViewer';

export default AdaptiveViewer;
