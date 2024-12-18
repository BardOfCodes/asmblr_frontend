#version 300 es
precision mediump float;

in vec2 position;  // Replacing 'attribute' with 'in'

void main() {
  gl_Position = vec4(position, 0.0, 1.0);  // Set the position in 3D space
}
