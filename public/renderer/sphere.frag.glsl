precision mediump float;

uniform vec3 iResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 center = vec2(0.5, 0.5);
  float dist = distance(uv, center);

  if (dist < 0.25) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Red color for the sphere
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);  // Black background
  }
}
