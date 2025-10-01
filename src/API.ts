import axios, { AxiosResponse } from 'axios';
import { debug } from './utils/debug';
import { processAPIMessages } from './utils/notifications';

// Configuration
const BASE_URL = 'http://127.0.0.1:5000';
const TIMEOUT = 30000; // 30 seconds

// Mode-based endpoint mapping
const MODE_ENDPOINTS = {
  geolipi: {
    html: '/api/geolipi/generate-shader',
    twgl: '/api/geolipi/generate-twgl-shader'
  },
  sysl: {
    html: '/api/sysl/generate-shader', 
    twgl: '/api/sysl/generate-twgl-shader'
  },
  neo: {
    html: '/api/neo/generate-shader',
    twgl: '/api/neo/generate-twgl-shader'
  },
  migumi: {
    html: '/api/migumi/generate-shader',
    twgl: '/api/migumi/generate-twgl-shader'
  }
} as const;

export type SupportedMode = keyof typeof MODE_ENDPOINTS;
export type EndpointType = 'html' | 'twgl';

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

// Standardized API response format
export interface APIResponse<T = any> {
  content: T | null;
  messages: string[];
  error: APIErrorInfo | null;
}

export interface APIErrorInfo {
  message: string;
  traceback?: string;
  type?: string;
}

export interface ConversionPayload {
  modules?: any;
  uniforms?: any;
  shaderSettings?: any;
  mode?: string;
  geolipiSettings?: {
    mode: 'primitive' | 'singular';
  };
}

// Error handling
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string,
    public backendError?: APIErrorInfo
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Helper function to handle standardized API responses
const handleResponse = async <T>(response: AxiosResponse<APIResponse<T>>): Promise<T> => {
  const apiResponse = response.data;
  
  // Check if we have a structured API response (with content, messages, error fields)
  if (apiResponse && typeof apiResponse === 'object' && 
      ('content' in apiResponse || 'messages' in apiResponse || 'error' in apiResponse)) {
    
    // Check for API-level errors (can happen with any status code)
    if (apiResponse.error) {
      throw new APIError(
        apiResponse.error.message,
        response.status,
        'server_error',
        apiResponse.error
      );
    }
    
    // Process any messages for successful responses
    if (response.status >= 200 && response.status < 300) {
      if (apiResponse.messages && apiResponse.messages.length > 0) {
        debug.log('[API] Server messages:', apiResponse.messages);
        processAPIMessages(apiResponse.messages);
      }
      
      // Return the content
      if (apiResponse.content === null || apiResponse.content === undefined) {
        throw new APIError('Server returned null content', response.status);
      }
      
      return apiResponse.content;
    }
  }
  
  // Fallback for non-structured responses or other errors
  throw new APIError(
    `Request failed with status ${response.status}`,
    response.status
  );
};

// Helper function for legacy API responses (without standardized format)
const handleLegacyResponse = async <T>(response: AxiosResponse<T>): Promise<T> => {
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
    const responseData = error.response?.data;
    
    // Check if the error response has structured error format
    if (responseData && typeof responseData === 'object' && responseData.error) {
      throw new APIError(
        responseData.error.message,
        status,
        endpoint,
        responseData.error
      );
    }
    
    // Fallback to generic error handling
    const message = responseData?.message || error.message || 'Request failed';
    throw new APIError(message, status, endpoint);
  }
  throw new APIError(`Unexpected error: ${error.message}`, undefined, endpoint);
};

// =============================================================================
// MODE-BASED SHADER GENERATION APIs (NEW)
// =============================================================================

/**
 * Generate shader HTML using mode-based endpoint lookup
 */
export const generateShaderHtml = async (
  mode: SupportedMode, 
  payload: ConversionPayload = {}
): Promise<ShaderHtmlResponse> => {
  const endpoint = MODE_ENDPOINTS[mode]?.html;
  if (!endpoint) {
    throw new APIError(`Unsupported mode: ${mode}`, undefined, 'generateShaderHtml');
  }

  try {
    debug.log(`API: Calling ${endpoint} with payload:`, payload);
    const response = await apiClient.post<APIResponse<ShaderHtmlResponse>>(endpoint, payload);
    return handleResponse(response);
  } catch (error) {
    return handleError(error, endpoint);
  }
};

/**
 * Generate TWGL shader code using mode-based endpoint lookup
 */
export const generateShaderCode = async (
  mode: SupportedMode,
  payload: ConversionPayload = {}
): Promise<ShaderCodeResponse> => {
  const endpoint = MODE_ENDPOINTS[mode]?.twgl;
  if (!endpoint) {
    throw new APIError(`Unsupported mode: ${mode}`, undefined, 'generateShaderCode');
  }

  try {
    debug.log(`API: Calling ${endpoint} with payload:`, payload);
    const response = await apiClient.post<APIResponse<ShaderCodeResponse>>(endpoint, payload);
    return handleResponse(response);
  } catch (error) {
    return handleError(error, endpoint);
  }
};

/**
 * Get available modes
 */
export const getSupportedModes = (): SupportedMode[] => {
  return Object.keys(MODE_ENDPOINTS) as SupportedMode[];
};

/**
 * Check if a mode is supported
 */
export const isModeSupported = (mode: string): mode is SupportedMode => {
  return mode in MODE_ENDPOINTS;
};

// =============================================================================
// UNIFIED SHADER GENERATION API (HTTP COMMUNICATION ONLY)
// =============================================================================

/**
 * Generate shader using mode-based endpoint lookup
 * This function only handles HTTP communication - payload preparation should be done by the caller
 */
export const generateShader = async (
  mode: SupportedMode,
  type: EndpointType,
  payload: ConversionPayload
): Promise<ShaderHtmlResponse | ShaderCodeResponse> => {
  // Validate mode
  if (!isModeSupported(mode)) {
    throw new APIError(`Unsupported mode: ${mode}`, undefined, 'generateShader');
  }

  // Validate endpoint type
  if (type !== 'html' && type !== 'twgl') {
    throw new APIError(`Invalid endpoint type: ${type}`, undefined, 'generateShader');
  }

  debug.log(`API: Sending ${mode} payload to ${type} endpoint:`, payload);

  // Call appropriate endpoint based on type
  if (type === 'html') {
    return generateShaderHtml(mode, payload);
  } else {
    return generateShaderCode(mode, payload);
  }
};

// =============================================================================
// LEGACY SHADER GENERATION APIs (DEPRECATED - Use mode-based functions above)
// =============================================================================

/**
 * Generate shader HTML from node graph (GEOLIPI ENDPOINT)
 */
export const generateGeolipiShaderHtml = async (payload: ConversionPayload = {}): Promise<ShaderHtmlResponse> => {
  try {
    debug.log('API: Calling /api/geolipi/generate-shader with payload:', payload);
    const response = await apiClient.post<ShaderHtmlResponse>('/api/geolipi/generate-shader', payload);
    return handleLegacyResponse(response);
  } catch (error) {
    return handleError(error, '/api/geolipi/generate-shader');
  }
};


export const generateSySLShaderHtml = async (payload: ConversionPayload = {}): Promise<ShaderHtmlResponse> => {
  try {
    debug.log('API: Calling /api/sysl/generate-shader with payload:', payload);
    const response = await apiClient.post<ShaderHtmlResponse>('/api/sysl/generate-shader', payload);
    return handleLegacyResponse(response);
  } catch (error) {
    return handleError(error, '/api/sysl/generate-shader');
  }
};

export const generateGeolipiTWGLShaderCode = async (payload: ConversionPayload = {}): Promise<ShaderCodeResponse> => {
  try {
    debug.log('API: Calling /api/geolipi/generate-twgl-shader with payload:', payload);
    const response = await apiClient.post<ShaderCodeResponse>('/api/geolipi/generate-twgl-shader', payload);
    return handleLegacyResponse(response);
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
    return handleLegacyResponse(response);
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
    return handleLegacyResponse(response);
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