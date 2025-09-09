export interface UniformSpec {
  type: 'float' | 'vec2' | 'vec3' | 'vec4';
  init_value: number | number[];
  min: number[];
  max: number[];
}

export interface ShaderResponse {
  shaderCode: string;
  uniforms: Record<string, UniformSpec>;
}

export interface ConversionRequest {
  moduleData: string;
  uniforms?: string;
}

export interface MeshData {
  stl: string; // Base64 encoded STL data
}

export interface MeshResponse {
  meshData: MeshData[];
}

export interface ConversionResponse {
  moduleData: string;
}

export interface JWoodResponse {
  jwood_str: string;
}
