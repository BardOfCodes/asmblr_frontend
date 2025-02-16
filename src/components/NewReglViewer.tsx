import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import createREGL from 'regl';
import vertShader from '../renderer/main.vert.glsl';
import { initializeMouseControls } from './mouseControls';

export interface ReglViewerHandle {
  setShaderCode: (fragShader: string, vertShader?: string) => void;
  setUniform: (name: string, value: any) => void;
}

export const NewReglViewer = React.forwardRef<ReglViewerHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reglRef = useRef<any>(null);
  const drawCommandRef = useRef<any>(null);
  const frameLoopRef = useRef<any>(null);

  const [shaderCode, setShaderCodeState] = useState({
    frag: '',
    vert: vertShader,
  });

  const [dynamicUniforms, setDynamicUniforms] = useState<{ [key: string]: any }>({
    cameraAngleX: 0.25,
    cameraAngleY: 0.5,
    cameraDistance: 4.0,
    cameraOrigin: [0.0, 0.0, 0.0],
  });

  useImperativeHandle(ref, () => ({
    setShaderCode: (fragShader: string, vertShader?: string) => {
      setShaderCodeState({
        frag: fragShader,
        vert: vertShader || shaderCode.vert,
      });
    },
    setUniform: (name: string, value: any) => {
      setDynamicUniforms((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const regl = createREGL({
      gl: canvas.getContext('webgl2')!,
      profile: true,
    });
    reglRef.current = regl;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      regl._gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const render = () => {
      regl.clear({ color: [0, 0, 0, 1] });
      drawCommandRef.current && drawCommandRef.current();
    };

    frameLoopRef.current = regl.frame(() => render());

    return () => {
      window.removeEventListener('resize', handleResize);
      frameLoopRef.current?.cancel();
      regl.destroy();
    };
  }, []);

  useEffect(() => {
    if (!shaderCode.frag || !shaderCode.vert) return;

    drawCommandRef.current = reglRef.current({
      frag: shaderCode.frag,
      vert: shaderCode.vert,
      attributes: {
        position: [
          [-1, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
        ],
      },
      uniforms: {
        resolution: ({ viewportWidth, viewportHeight }) => [
          viewportWidth,
          viewportHeight,
        ],
        time: ({ tick }) => tick * 0.001,
        ...dynamicUniforms,
      },
      count: 4,
      primitive: 'triangle strip',
    });
  }, [shaderCode, dynamicUniforms]);

  useEffect(() => {
    return initializeMouseControls({ canvasRef, setDynamicUniforms });
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
});

export default NewReglViewer;