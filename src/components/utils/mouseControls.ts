import { Dispatch, SetStateAction, RefObject } from 'react';

export interface MouseControlParams {
  canvasRef: RefObject<HTMLCanvasElement>;
  setDynamicUniforms: Dispatch<SetStateAction<{ [key: string]: any }>>;
}

export function initializeMouseControls({ canvasRef, setDynamicUniforms }: MouseControlParams) {
  const dragging = { current: false };
  const shiftPressed = { current: false };
  const lastMousePos = { current: { x: 0, y: 0 } };

  const handleMouseDown = (e: MouseEvent) => {
    dragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      shiftPressed.current = true;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      shiftPressed.current = false;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;

    const deltaX = -e.clientX + lastMousePos.current.x;
    const deltaY = -e.clientY + lastMousePos.current.y;

    if (shiftPressed.current) {
      // If Shift is pressed, modify cameraOrigin based on the local camera axes
      setDynamicUniforms((prev) => {
        const { cameraOrigin, cameraDistance, cameraAngleX, cameraAngleY } = prev;

        const forward = [
          -Math.sin(cameraAngleY) * Math.cos(cameraAngleX),
          Math.sin(cameraAngleX),
          -Math.cos(cameraAngleY) * Math.cos(cameraAngleX),
        ];

        const worldUp = [0.0, 1.0, 0.0];
        const right = [
          forward[1] * worldUp[2] - forward[2] * worldUp[1],
          forward[2] * worldUp[0] - forward[0] * worldUp[2],
          forward[0] * worldUp[1] - forward[1] * worldUp[0],
        ];

        const rightLength = Math.sqrt(right[0] ** 2 + right[1] ** 2 + right[2] ** 2);
        const normalizedRight = right.map((v) => v / rightLength);

        const screenToWorldScale = 0.01;
        const newOrigin = [
          cameraOrigin[0] + deltaX * screenToWorldScale * normalizedRight[0],
          cameraOrigin[1] - deltaY * screenToWorldScale,
          cameraOrigin[2] + deltaX * screenToWorldScale * normalizedRight[2],
        ];

        return { ...prev, cameraOrigin: newOrigin };
      });
    } else {
      // Otherwise, rotate the camera
      setDynamicUniforms((prev) => ({
        ...prev,
        cameraAngleX: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev.cameraAngleX + deltaY * 0.01)),
        cameraAngleY: prev.cameraAngleY + deltaX * 0.01,
      }));
    }

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    setDynamicUniforms((prev) => ({
      ...prev,
      cameraDistance: Math.max(
        0.1,
        Math.min(10, e.deltaY < 0 ? prev.cameraDistance * 0.98 : prev.cameraDistance * 1.02)
      ),
    }));
  };

  const canvas = canvasRef.current;
  if (!canvas) return;

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return () => {
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('wheel', handleWheel);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}