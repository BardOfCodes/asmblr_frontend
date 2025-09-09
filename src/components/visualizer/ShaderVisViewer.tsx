import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';
import { ViewerHandle } from '../../modes/types';

// Types for shader data - matching the sysl shader_vis interface
export interface UniformSpec {
  type: 'float' | 'vec2' | 'vec3' | 'vec4' | 'int' | 'bool';
  name: string;
  label?: string;
  default: number | number[] | boolean;
  min?: number | number[];
  max?: number | number[];
  step?: number;
  set_name?: string; // 'Knobs', 'Settings', 'Other', etc.
}

export interface ShaderData {
  title: string;
  frag_str: string;
  uniforms: UniformSpec[];
  textures?: Record<string, any>;
}

// Interface for the ShaderVisViewer - matching the requirements
export interface ShaderVisViewerProps {
  shaderCode?: string;
  uniformsDict?: Record<string, any>;
  textures?: Record<string, any>;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 1.5rem;
  padding: 1rem;
  background: white;
  overflow: hidden;
`;

const CanvasContainer = styled.div`
  flex-shrink: 0;
  width: 512px;
  height: 512px;
  background: #000000;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;

const ControlsContainer = styled.div`
  flex: 1;
  height: 512px;
  overflow-y: auto;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

const ControlGroup = styled.details`
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &[open] {
    /* Styling for open state */
  }
`;

const GroupTitle = styled.summary`
  padding: 0.5rem 0.75rem;
  font-weight: 500;
  color: #1f2937;
  cursor: pointer;
  list-style: none;
  
  &:hover {
    background: #e5e7eb;
  }
  
  &::-webkit-details-marker {
    display: none;
  }
  
  /* Custom arrow */
  &::before {
    content: '▶';
    display: inline-block;
    margin-right: 0.5rem;
    transition: transform 0.2s;
  }
  
  details[open] &::before {
    transform: rotate(90deg);
  }
`;

const GroupContent = styled.div`
  padding: 0.75rem;
  padding-top: 0;
  space-y: 1rem;
`;

const UniformControl = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const UniformLabel = styled.label`
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const UniformValue = styled.span`
  color: #2563eb;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.875rem;
  margin-left: 0.25rem;
`;

const Slider = styled.input`
  width: 100%;
  height: 0.5rem;
  border-radius: 0.5rem;
  background: #e5e7eb;
  outline: none;
  appearance: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #2563eb;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #2563eb;
    cursor: pointer;
    border: none;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  color: #2563eb;
  border-radius: 0.25rem;
`;

const VectorContainer = styled.div`
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin-top: 0.75rem;
`;

const VectorTitle = styled.h4`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const VectorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
`;

const VectorControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const VectorLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.25rem;
`;

const MouseControlsInfo = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #d1d5db;
`;

const MouseControlsTitle = styled.h4`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const MouseControlsContent = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 0.75rem;
`;

const MouseControlItem = styled.div`
  font-size: 0.875rem;
  color: #1e40af;
  margin-bottom: 0.25rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    font-weight: 600;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  padding: ${theme.spacing.md};
  text-align: center;
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
`;

const LoadingMessage = styled.div`
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacing.md};
  text-align: center;
  font-size: ${theme.typography.fontSize.md};
`;

// TWGL will be loaded from CDN
declare global {
  interface Window {
    twgl: any;
  }
}

export interface ShaderVisViewerHandle extends ViewerHandle {
  loadShaderData: (data: ShaderData) => void;
  updateUniforms: (uniforms: Record<string, any>) => void;
}

const ShaderVisViewer = forwardRef<ShaderVisViewerHandle, ShaderVisViewerProps>(({ shaderCode, uniformsDict, textures }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programInfoRef = useRef<any>(null);
  const bufferInfoRef = useRef<any>(null);
  const uniformValuesRef = useRef<Record<string, any>>({});
  const animationFrameRef = useRef<number | null>(null);
  const loadedTexturesRef = useRef<Record<string, any>>({});

  // Mouse control state (matching common_script.js.html.j2)
  const mouseStateRef = useRef({
    dragging: false,
    shiftPressed: false,
    last: { x: 0, y: 0 }
  });

  const [shaderData, setShaderData] = useState<ShaderData | null>(null);
  const [uniformValues, setUniformValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize WebGL and TWGL
  const initializeGL = useCallback(() => {
    if (!canvasRef.current || !window.twgl) {
      console.warn('Canvas or TWGL not available');
      return false;
    }

    try {
      const gl = canvasRef.current.getContext('webgl2') || canvasRef.current.getContext('webgl');
      if (!gl) {
        throw new Error('WebGL not supported');
      }

      glRef.current = gl;
      
      // Create fullscreen quad buffer
      const arrays = {
        position: {
          numComponents: 2,
          data: [
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
          ]
        }
      };
      bufferInfoRef.current = window.twgl.createBufferInfoFromArrays(gl, arrays);
      
      return true;
    } catch (err) {
      console.error('Failed to initialize WebGL:', err);
      setError(`WebGL initialization failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return false;
    }
  }, []);

  // Create shader program
  const createProgram = useCallback((fragmentShader: string) => {
    if (!glRef.current || !window.twgl) {
      return null;
    }

    const vertexShaderSource = `#version 300 es
      precision mediump float;
      in vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }`;

    try {
      const programInfo = window.twgl.createProgramInfo(glRef.current, [vertexShaderSource, fragmentShader]);
      return programInfo;
    } catch (err) {
      console.error('Shader compilation error:', err);
      setError(`Shader compilation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return null;
    }
  }, []);

  // Render function
  const render = useCallback(() => {
    if (!glRef.current || !programInfoRef.current || !bufferInfoRef.current) {
      return;
    }

    const gl = glRef.current;
    
    // Set viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    // Clear canvas
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use program
    gl.useProgram(programInfoRef.current.program);

    // Prepare uniforms (matching common_script.js.html.j2 logic)
    const uniforms = {
      time: performance.now() / 1000,
      // Add default camera controls (can be overridden by uniformValues)
      cameraAngleX: 0.0,
      cameraAngleY: 0.0,
      cameraDistance: 3.0,
      resolution: [gl.canvas.width, gl.canvas.height],
      // Apply all uniform values from controls
      ...uniformValuesRef.current,
      // Add loaded textures
      ...loadedTexturesRef.current
    };

    try {
      // Set uniforms
      window.twgl.setUniforms(programInfoRef.current, uniforms);

      // Set buffers and attributes
      window.twgl.setBuffersAndAttributes(gl, programInfoRef.current, bufferInfoRef.current);

      // Draw
      window.twgl.drawBufferInfo(gl, bufferInfoRef.current, gl.TRIANGLE_STRIP);
    } catch (error) {
      console.error('Render error:', error);
      setError(`Render error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, []);

  // Animation loop
  const startRenderLoop = useCallback(() => {
    const renderLoop = () => {
      render();
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };
    renderLoop();
  }, [render]);

  const stopRenderLoop = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  // Load textures
  const loadTextures = useCallback(async (textureData: Record<string, any>) => {
    if (!glRef.current || !window.twgl) return {};
    
    const gl = glRef.current;
    const loadedTextures: Record<string, any> = {};
    
    try {
      for (const [textureName, textureInfo] of Object.entries(textureData)) {
        // Basic texture loading - for now just create a simple texture
        // In a full implementation, this would handle the texture format from the backend
        const texture = window.twgl.createTexture(gl, {
          min: gl.LINEAR,
          mag: gl.LINEAR,
          wrap: gl.CLAMP_TO_EDGE,
        });
        loadedTextures[textureName] = texture;
      }
    } catch (error) {
      console.error('Failed to load textures:', error);
    }
    
    return loadedTextures;
  }, []);

  // Load shader data
  const loadShaderData = useCallback(async (data: ShaderData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Initialize uniforms with default values
      const initialUniforms: Record<string, any> = {};
      data.uniforms.forEach(uniform => {
        initialUniforms[uniform.name] = uniform.default;
      });
      
      setUniformValues(initialUniforms);
      uniformValuesRef.current = initialUniforms;
      setShaderData(data);
      
      // Load textures if any
      if (data.textures && Object.keys(data.textures).length > 0) {
        const textures = await loadTextures(data.textures);
        loadedTexturesRef.current = textures;
      } else {
        loadedTexturesRef.current = {};
      }
      
      // Create shader program
      const programInfo = createProgram(data.frag_str);
      if (programInfo) {
        programInfoRef.current = programInfo;
        startRenderLoop();
      }
      
    } catch (err) {
      console.error('Failed to load shader data:', err);
      setError(`Failed to load shader: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [createProgram, startRenderLoop, loadTextures]);

  // Update uniforms
  const updateUniforms = useCallback((uniforms: Record<string, any>) => {
    setUniformValues(prev => ({ ...prev, ...uniforms }));
    uniformValuesRef.current = { ...uniformValuesRef.current, ...uniforms };
  }, []);

  // Handle uniform control changes
  const handleUniformChange = useCallback((name: string, value: any) => {
    setUniformValues(prev => ({ ...prev, [name]: value }));
    uniformValuesRef.current = { ...uniformValuesRef.current, [name]: value };
  }, []);

  // Initialize on mount
  useEffect(() => {
    // Wait for TWGL to be available
    const checkTWGL = () => {
      if (window.twgl) {
        initializeGL();
      } else {
        setTimeout(checkTWGL, 100);
      }
    };
    checkTWGL();

    return () => {
      stopRenderLoop();
    };
  }, [initializeGL, stopRenderLoop]);

  // Convert SYSL uniforms format to React component format (matching generate_shader_html.py logic)
  const convertSYSLUniformsToSpecs = useCallback((syslUniforms: Record<string, any>): UniformSpec[] => {
    const uniformSpecs: UniformSpec[] = [];
    const renderUniforms = ["sunAzimuth", "sunElevation", "resolution", "castShadows"];
    const cameraUniforms = ["cameraAngleX", "cameraAngleY", "cameraDistance", "cameraOrigin"];
    
    Object.entries(syslUniforms).forEach(([uniformName, uniformData]) => {
      const uniformType = uniformData.type || 'float';
      const initValue = uniformData.init_value;
      const minVals = uniformData.min || [];
      const maxVals = uniformData.max || [];
      
      // Determine set_name (matching the Python logic)
      let setName = 'Knobs';
      if (renderUniforms.includes(uniformName) || cameraUniforms.includes(uniformName)) {
        setName = 'Settings';
      }
      
      // Skip UBO uniforms (they don't get UI controls)
      if (uniformType === 'uniform_buffer') {
        return;
      }
      
      // Format label (matching _format_label function)
      const label = uniformName
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      
      if (uniformType === 'bool') {
        uniformSpecs.push({
          type: 'bool',
          name: uniformName,
          label,
          set_name: setName,
          default: Boolean(initValue)
        });
      } else if (uniformType === 'float') {
        const minVal = Array.isArray(minVals) ? minVals[0] : minVals || 0.0;
        const maxVal = Array.isArray(maxVals) ? maxVals[0] : maxVals || 1.0;
        const stepSize = (maxVal - minVal) / 1000;
        
        uniformSpecs.push({
          type: 'float',
          name: uniformName,
          label,
          min: minVal,
          max: maxVal,
          step: stepSize,
          set_name: setName,
          default: Number(initValue)
        });
      } else if (uniformType === 'int') {
        const minVal = Array.isArray(minVals) ? minVals[0] : minVals || 0;
        const maxVal = Array.isArray(maxVals) ? maxVals[0] : maxVals || 100;
        
        uniformSpecs.push({
          type: 'int',
          name: uniformName,
          label,
          min: minVal,
          max: maxVal,
          step: 1,
          set_name: setName,
          default: Number(initValue)
        });
      } else if (['vec2', 'vec3', 'vec4'].includes(uniformType)) {
        const vectorSize = Array.isArray(initValue) ? initValue.length : parseInt(uniformType.slice(-1));
        
        // Build min/max arrays
        const minList: number[] = [];
        const maxList: number[] = [];
        for (let i = 0; i < vectorSize; i++) {
          const minVal = (Array.isArray(minVals) && i < minVals.length) ? minVals[i] : -1.0;
          const maxVal = (Array.isArray(maxVals) && i < maxVals.length) ? maxVals[i] : 1.0;
          minList.push(minVal);
          maxList.push(maxVal);
        }
        
        const stepSize = (maxList[0] - minList[0]) / 1000; // Use first component for step
        const defaultValue = Array.isArray(initValue) 
          ? initValue.slice(0, vectorSize)
          : new Array(vectorSize).fill(Number(initValue) || 0);
        
        uniformSpecs.push({
          type: uniformType as 'vec2' | 'vec3' | 'vec4',
          name: uniformName,
          label,
          min: minList,
          max: maxList,
          step: stepSize,
          set_name: setName,
          default: defaultValue
        });
      }
    });
    
    return uniformSpecs;
  }, []);

  // Handle prop changes (direct shader code interface)
  useEffect(() => {
    if (shaderCode && uniformsDict) {
      // Convert SYSL uniforms to component format
      const uniformSpecs = convertSYSLUniformsToSpecs(uniformsDict);

      const shaderData: ShaderData = {
        title: 'Generated Shader',
        frag_str: shaderCode,
        uniforms: uniformSpecs,
        textures: textures || {}
      };

      loadShaderData(shaderData);
    }
  }, [shaderCode, uniformsDict, textures, loadShaderData, convertSYSLUniformsToSpecs]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, []);

  // Mouse controls for camera (matching common_script.js.html.j2)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize camera uniforms with default values
    const cameraDefaults = {
      cameraAngleX: 0.0,
      cameraAngleY: 0.0,
      cameraDistance: 3.0,
      cameraOrigin: [0.0, 0.0, 0.0]
    };
    
    // Set initial camera values if not already set
    setUniformValues(prev => ({ ...cameraDefaults, ...prev }));
    uniformValuesRef.current = { ...cameraDefaults, ...uniformValuesRef.current };

    const handleMouseDown = (e: MouseEvent) => {
      mouseStateRef.current.dragging = true;
      mouseStateRef.current.last = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      mouseStateRef.current.dragging = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        mouseStateRef.current.shiftPressed = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        mouseStateRef.current.shiftPressed = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 1.1 : 0.9;
      const currentDistance = uniformValuesRef.current.cameraDistance || 3.0;
      const newDistance = Math.min(10, Math.max(0.1, currentDistance * delta));
      
      setUniformValues(prev => ({ ...prev, cameraDistance: newDistance }));
      uniformValuesRef.current = { ...uniformValuesRef.current, cameraDistance: newDistance };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseStateRef.current.dragging) return;
      
      const dx = mouseStateRef.current.last.x - e.clientX;
      const dy = mouseStateRef.current.last.y - e.clientY;
      
      if (mouseStateRef.current.shiftPressed) {
        // Pan: adjust cameraOrigin in world space (matching common_script.js.html.j2)
        const { cameraAngleX, cameraAngleY, cameraDistance } = uniformValuesRef.current;
        const currentOrigin = uniformValuesRef.current.cameraOrigin || [0, 0, 0];
        
        // Compute forward/right vectors
        const forward = [
          -Math.sin(cameraAngleY || 0) * Math.cos(cameraAngleX || 0),
           Math.sin(cameraAngleX || 0),
          -Math.cos(cameraAngleY || 0) * Math.cos(cameraAngleX || 0),
        ];
        const worldUp = [0, 1, 0];
        const right = [
          forward[1] * worldUp[2] - forward[2] * worldUp[1],
          forward[2] * worldUp[0] - forward[0] * worldUp[2],
          forward[0] * worldUp[1] - forward[1] * worldUp[0],
        ];
        const len = Math.hypot(...right);
        const normR = right.map(v => v / len);
        const scale = 0.005 * (cameraDistance || 3.0);
        
        const newOrigin = [
          currentOrigin[0] + dx * scale * normR[0],
          currentOrigin[1] - dy * scale,
          currentOrigin[2] + dx * scale * normR[2],
        ];
        
        setUniformValues(prev => ({ ...prev, cameraOrigin: newOrigin }));
        uniformValuesRef.current = { ...uniformValuesRef.current, cameraOrigin: newOrigin };
      } else {
        // Orbit: adjust camera angles
        const currentAngleX = uniformValuesRef.current.cameraAngleX || 0.0;
        const currentAngleY = uniformValuesRef.current.cameraAngleY || 0.0;
        
        const newAngleX = currentAngleX + dy * 0.01;
        const newAngleY = currentAngleY + dx * 0.01;
        
        setUniformValues(prev => ({ 
          ...prev, 
          cameraAngleX: newAngleX,
          cameraAngleY: newAngleY
        }));
        uniformValuesRef.current = { 
          ...uniformValuesRef.current, 
          cameraAngleX: newAngleX,
          cameraAngleY: newAngleY
        };
      }
      
      mouseStateRef.current.last = { x: e.clientX, y: e.clientY };
    };

    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    loadHTML: () => {
      console.warn('loadHTML not supported by ShaderVisViewer, use loadShaderData instead');
    },
    loadShaderData,
    updateUniforms
  }), [loadShaderData, updateUniforms]);

  // Group uniforms by set_name
  const groupedUniforms = shaderData ? shaderData.uniforms.reduce((groups, uniform) => {
    const groupName = uniform.set_name || 'Other';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(uniform);
    return groups;
  }, {} as Record<string, UniformSpec[]>) : {};

  // Render uniform control
  const renderUniformControl = (uniform: UniformSpec) => {
    const value = uniformValues[uniform.name] ?? uniform.default;
    
    switch (uniform.type) {
      case 'float':
      case 'int':
        const numValue = typeof value === 'number' ? value : 0;
        const min = typeof uniform.min === 'number' ? uniform.min : (Array.isArray(uniform.min) ? uniform.min[0] : 0);
        const max = typeof uniform.max === 'number' ? uniform.max : (Array.isArray(uniform.max) ? uniform.max[0] : 1);
        const step = uniform.step || (uniform.type === 'int' ? 1 : 0.01);
        
        return (
          <UniformControl key={uniform.name}>
            <UniformLabel>
              {uniform.label || uniform.name}:
              <UniformValue>{numValue.toFixed(uniform.type === 'int' ? 0 : 3)}</UniformValue>
            </UniformLabel>
            <Slider
              type="range"
              min={min}
              max={max}
              step={step}
              value={numValue}
              onChange={(e) => handleUniformChange(uniform.name, uniform.type === 'int' ? parseInt(e.target.value) : parseFloat(e.target.value))}
            />
          </UniformControl>
        );

      case 'bool':
        const boolValue = typeof value === 'boolean' ? value : false;
        return (
          <UniformControl key={uniform.name}>
            <UniformLabel>
              <Checkbox
                type="checkbox"
                checked={boolValue}
                onChange={(e) => handleUniformChange(uniform.name, e.target.checked)}
              />
              {uniform.label || uniform.name}
              <UniformValue>({boolValue.toString()})</UniformValue>
            </UniformLabel>
          </UniformControl>
        );

      case 'vec2':
      case 'vec3':
      case 'vec4':
        const vectorValue = Array.isArray(value) ? value : [0, 0, 0, 0];
        const vectorSize = parseInt(uniform.type.slice(-1));
        const components = ['x', 'y', 'z', 'w'];
        
        return (
          <UniformControl key={uniform.name}>
            <VectorContainer>
              <VectorTitle>{uniform.label || uniform.name} ({uniform.type})</VectorTitle>
              <VectorGrid>
                {Array.from({ length: vectorSize }, (_, i) => {
                  const compMin = Array.isArray(uniform.min) ? uniform.min[i] : -1;
                  const compMax = Array.isArray(uniform.max) ? uniform.max[i] : 1;
                  const step = uniform.step || 0.01;
                  
                  return (
                    <VectorControl key={i}>
                      <VectorLabel>
                        {components[i].toUpperCase()}:
                        <UniformValue>{(vectorValue[i] || 0).toFixed(3)}</UniformValue>
                      </VectorLabel>
                      <Slider
                        type="range"
                        min={compMin}
                        max={compMax}
                        step={step}
                        value={vectorValue[i] || 0}
                        onChange={(e) => {
                          const newVector = [...vectorValue];
                          newVector[i] = parseFloat(e.target.value);
                          handleUniformChange(uniform.name, newVector);
                        }}
                      />
                    </VectorControl>
                  );
                })}
              </VectorGrid>
            </VectorContainer>
          </UniformControl>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <CanvasContainer>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : isLoading ? (
          <LoadingMessage>Loading shader...</LoadingMessage>
        ) : (
          <Canvas ref={canvasRef} width={512} height={512} />
        )}
      </CanvasContainer>
      
      {shaderData && Object.keys(groupedUniforms).length > 0 && (
        <ControlsContainer>
          {Object.entries(groupedUniforms).map(([groupName, uniforms]) => (
            <ControlGroup key={groupName} open>
              <GroupTitle>{groupName}</GroupTitle>
              <GroupContent>
                {uniforms.map(renderUniformControl)}
              </GroupContent>
            </ControlGroup>
          ))}
          
          <MouseControlsInfo>
            <MouseControlsTitle>Mouse Controls</MouseControlsTitle>
            <MouseControlsContent>
              <MouseControlItem><strong>Drag:</strong> Orbit camera</MouseControlItem>
              <MouseControlItem><strong>Wheel:</strong> Zoom in/out</MouseControlItem>
              <MouseControlItem><strong>Shift + Drag:</strong> Pan camera</MouseControlItem>
            </MouseControlsContent>
          </MouseControlsInfo>
        </ControlsContainer>
      )}
    </Container>
  );
});

ShaderVisViewer.displayName = 'ShaderVisViewer';

export default ShaderVisViewer;
