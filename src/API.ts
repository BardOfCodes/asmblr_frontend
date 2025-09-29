import axios, { AxiosResponse } from 'axios';
import { debug } from './utils/debug';

// Configuration
const BASE_URL = 'http://127.0.0.1:5000';
const TIMEOUT = 30000; // 30 seconds

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface UniformSpec {
  type: 'float' | 'vec2' | 'vec3' | 'vec4';
  init_value: number | number[];
  min: number[];
  max: number[];
}

export interface ShaderHtmlResponse {
  html: string;
}

export interface ShaderCodeResponse {
  shaderCode: string;
  uniforms: Record<string, UniformSpec>;
  textures?: Record<string, any>;
}

export interface ConversionPayload {
  moduleData?: any;
  uniforms?: any;
  shaderSettings?: any;
}

// Error handling
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Helper function to handle API responses
const handleResponse = async <T>(response: AxiosResponse<T>): Promise<T> => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new APIError(
    `Request failed with status ${response.status}`,
    response.status
  );
};

// Helper function to handle API errors
const handleError = (error: any, endpoint: string): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Request failed';
    throw new APIError(message, status, endpoint);
  }
  throw new APIError(`Unexpected error: ${error.message}`, undefined, endpoint);
};

// =============================================================================
// SHADER GENERATION APIs
// =============================================================================

/**
 * Generate shader HTML from node graph (GEOLIPI ENDPOINT)
 */
export const generateGeolipiShaderHtml = async (payload: ConversionPayload = {}): Promise<ShaderHtmlResponse> => {
  try {
    debug.log('API: Calling /api/geolipi/generate-shader with payload:', payload);
    const response = await apiClient.post<ShaderHtmlResponse>('/api/geolipi/generate-shader', payload);
    return handleResponse(response);
  } catch (error) {
    return handleError(error, '/api/geolipi/generate-shader');
  }
};


export const generateSySLShaderHtml = async (payload: ConversionPayload = {}): Promise<ShaderHtmlResponse> => {
  try {
    debug.log('API: Calling /api/sysl/generate-shader with payload:', payload);
    const response = await apiClient.post<ShaderHtmlResponse>('/api/sysl/generate-shader', payload);
    return handleResponse(response);
  } catch (error) {
    return handleError(error, '/api/sysl/generate-shader');
  }
};

export const generateGeolipiTWGLShaderCode = async (payload: ConversionPayload = {}): Promise<ShaderCodeResponse> => {
  try {
    debug.log('API: Calling /api/geolipi/generate-twgl-shader with payload:', payload);
    const response = await apiClient.post<ShaderCodeResponse>('/api/geolipi/generate-twgl-shader', payload);
    return handleResponse(response);
  } catch (error) {
    return handleError(error, '/api/geolipi/generate-twgl-shader');
  }
};
/**
 * Generate TWGL shader code, uniforms, and textures (SYSL TWGL ENDPOINT)
 */
export const generateSySLTWGLShaderCode = async (payload: ConversionPayload = {}): Promise<ShaderCodeResponse> => {
  try {
    debug.log('API: Calling /api/sysl/generate-twgl-shader with payload:', payload);
    const response = await apiClient.post<ShaderCodeResponse>('/api/sysl/generate-twgl-shader', payload);
    return handleResponse(response);
  } catch (error) {
    return handleError(error, '/api/sysl/generate-twgl-shader');
  }
};

// =============================================================================
// TESTING APIs
// =============================================================================

/**
 * Test HTML endpoint for iframe testing
 */
export const getTestHtml = async (): Promise<string> => {
  try {
    const response = await apiClient.get<string>('/api/test-html');
    return handleResponse(response);
  } catch (error) {
    return handleError(error, '/api/test-html');
  }
};

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Update base URL for API calls
 */
export const setBaseURL = (url: string): void => {
  apiClient.defaults.baseURL = url;
};

/**
 * Update timeout for API calls
 */
export const setTimeout = (timeout: number): void => {
  apiClient.defaults.timeout = timeout;
};

/**
 * Get current configuration
 */
export const getConfig = () => ({
  baseURL: apiClient.defaults.baseURL,
  timeout: apiClient.defaults.timeout,
});