import React, { useEffect, useRef, useState } from 'react';
import createREGL from 'regl';
// import glslify from 'glslify';
// import fragShader from '../renderer/raymarch_prim.frag.glsl';  // Import the GLSL file directly
import fragShader from '../renderer/raymarch_prim.frag.glsl';  // Import the GLSL file directly
import vertShader from '../renderer/main.vert.glsl';  // Import the GLSL file directly

export const ReglViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const reglRef = useRef<any>(null);  // Hold the regl instance here
  const [originX, setOriginX] = useState(0.0); // State for origin.x
  const [originY, setOriginY] = useState(0.5); // State for origin.x
  const [originZ, setOriginZ] = useState(0.0); // State for origin.x
  const [deltaXY, setDeltaXY] = useState(0.0); // State for origin.x
  const [innerParam, setInnerParam] = useState(0.5); // Rotation angle in Y
  const [cameraAngleX, setCameraAngleX] = useState(0.25); // Rotation angle in X
  const [cameraAngleY, setCameraAngleY] = useState(0.5); // Rotation angle in Y
  const [cameraDistance, setCameraDistance] = useState(4.0); // Initial zoom level
  
  const dragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });


  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const gl = canvas.getContext('webgl2', {
      antialias: true,
      stencil: false,
      alpha: false,
      depth: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
    });
  
    if (!gl) {
      console.error('Failed to create a WebGL 2.0 context. Falling back to WebGL 1.0.');
    } else {
      console.log('WebGL 2.0 context created successfully!');
    }
  
    // Initialize Regl with the manually created WebGL 2.0 context
    const regl  = createREGL({
      gl,  // Pass the manually created WebGL 2.0 context
      profile: true,
    });
    

    // Function to handle window resize
    const handleResize = () => {
      // Update the canvas width and height to match the window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Update the WebGL viewport to match the new canvas size
      regl._gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // Set the initial canvas size
    handleResize();

    // Add event listener to resize the canvas and viewport when the window is resized
    window.addEventListener('resize', handleResize);
    // Define the draw command for the circle
    const drawCircle = regl({
      frag: fragShader,  // Load the fragment shader

      vert: vertShader,

      attributes: {
        position: [
          [-1, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
        ],
      },

      uniforms: {
        // These names must match the uniform names in your shader
        resolution: ({ viewportWidth, viewportHeight }) => [viewportWidth, viewportHeight,],
        time: ({ tick }) => tick * 0.01,
        origin: () => [originX, originY, originZ],
        cameraAngleX: () => cameraAngleX,
        cameraAngleY: () => cameraAngleY, // Pass origin.x from the state
        cameraDistance: () => cameraDistance, 
        innerParam: () => innerParam,
        deltaXY: () => deltaXY,
        // iTime: () => 0.1,  // A constant time value for testing

      },

      // uniforms: {
      //   resolution: ({ viewportWidth, viewportHeight }) => {
      //     const resolution = [viewportWidth, viewportHeight,];
      //     console.log('iResolution:', resolution);  // Log the resolution
      //     return resolution;
      //   },
      //   time: ({ tick }) => {
      //     const time = tick * 0.1;
      //     console.log('Tick:', tick, 'Time:', time);  // Log the tick and time every frame
      //     return time;
      //   },
      // },


      // log the resolution
      count: 4,  // Number of vertices to draw the quad
      primitive: 'triangle strip',
    });
    
    let animationFrameId: number;

    const render = () => {
      // regl.clear({ color: [0, 0, 0, 1] });
      drawCircle();
      animationFrameId = requestAnimationFrame(render);
      regl.poll();  // Let Regl know the size has changed
    };

    render();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);  // Cancel the animation frame when unmounting
      regl.destroy();  // Properly clean up Regl context
    };
  }, [originX, originY, originZ, 
    cameraAngleX, cameraAngleY, cameraDistance,
    innerParam, deltaXY]);

  // Mouse event handlers
  const handleMouseDown = (e) => {
    dragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    // Use functional updates to capture the latest state
    setCameraAngleX((prevAngleX) => {
      const newAngleX = prevAngleX + deltaY * 0.01;
      console.log("Updated Camera Angle X:", newAngleX); // Log updated X angle
      return newAngleX;
    });
    setCameraAngleY((prevAngleY) => {
      const newAngleY = prevAngleY + deltaX * 0.01;
      console.log("Updated Camera Angle Y:", newAngleY); // Log updated Y angle
      return newAngleY;
    });

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp = () => {
    dragging.current = false;
  };

  // Handle zoom with mouse wheel
  const handleWheel = (e) => {
    e.preventDefault();
    setCameraDistance((prevDistance) => {
      // Scale the distance using an exponential factor
      const scaleFactor = 1.1;
      const newDistance = e.deltaY < 0
        ? prevDistance / scaleFactor // Zoom in
        : prevDistance * scaleFactor; // Zoom out

      // Clamp the distance between 0.1 and 5
      return Math.min(10, Math.max(0.1, newDistance));
    });
  };



  useEffect(() => {
    const canvas = canvasRef.current;
    canvas?.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvas?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        value={originX}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          console.log("Origin X:", newValue); // Log the new value
          setOriginX(newValue); // Update the state with the new value
        }}
      />
      <input
        type="range"
        min="-0.5"
        max="1.5"
        step="0.01"
        value={originY}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          console.log("Origin Y:", newValue); // Log the new value
          setOriginY(newValue); // Update the state with the new value
        }}
      />
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        value={originZ}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          console.log("Origin Z:", newValue); // Log the new value
          setOriginZ(newValue); // Update the state with the new value
        }}
      />
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        value={deltaXY}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          console.log("Delta XY:", newValue); // Log the new value
          setDeltaXY(newValue); // Update the state with the new value
        }}
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={innerParam}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          console.log("InnerParam:", newValue); // Log the new value
          setInnerParam(newValue); // Update the state with the new value
        }}
      />
    </div>
  );
};

export default ReglViewer;
