import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import createREGL from 'regl';
import vertShader from '../renderer/main.vert.glsl';
import { initializeMouseControls } from './mouseControls';

export interface ReglViewerHandle {
  setShaderCode: (fragShader: string, vertShader?: string) => void;
  setUniform: (name: string, value: any) => void;

  captureScreenshot: () => void;
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
    sunAzimuth:   0.0,   // 0…2π
    sunElevation: 0.0,   // –π…+π
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

  // ← new method
  captureScreenshot: () => {
    const canvas = canvasRef.current;
    const regl   = reglRef.current;
    if (!canvas || !regl) return;

    // 1) Draw one frame
    regl.clear({ color: [0, 0, 0, 1] });
    drawCommandRef.current && drawCommandRef.current();

    // 2) Force GPU flush
    const gl = regl._gl;
    gl.flush();

    // 3) Read back RGBA pixels (Uint8Array)
    const width  = canvas.width;
    const height = canvas.height;
    const pixels = regl.read(); // length = width * height * 4

    // 4) Blit into a 2D canvas (flip Y)
    const tmp = document.createElement('canvas');
    tmp.width  = width;
    tmp.height = height;
    const ctx = tmp.getContext('2d')!;
    const img = ctx.createImageData(width, height);

    for (let y = 0; y < height; y++) {
      const srcOffset  = (height - 1 - y) * width * 4;
      const dstOffset  = y * width * 4;
      img.data.set(pixels.subarray(srcOffset, srcOffset + width * 4), dstOffset);
    }
    ctx.putImageData(img, 0, 0);

    // 5) Export as PNG
    tmp.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href        = url;
      a.download    = 'screenshot.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  }
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