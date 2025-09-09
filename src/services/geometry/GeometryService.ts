import { apiClient, ApiError } from '../api/client';
import { 
  ShaderResponse, 
  ConversionRequest, 
  ConversionResponse, 
  MeshResponse, 
  JWoodResponse 
} from '../api/types';

export class GeometryService {
  async generateShaderFromGraph(moduleData: unknown): Promise<ShaderResponse> {
    try {
      return await apiClient.post<ShaderResponse>('/generate-shadercode-graph', {
        moduleData: JSON.stringify(moduleData)
      });
    } catch (error) {
      throw new ApiError(
        `Failed to generate shader from graph: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof ApiError ? error.status : undefined
      );
    }
  }

  async generateShaderFromGraphSet(moduleData: unknown): Promise<ShaderResponse> {
    try {
      return await apiClient.post<ShaderResponse>('/generate-shadercode-graphset', {
        moduleData: JSON.stringify(moduleData)
      });
    } catch (error) {
      throw new ApiError(
        `Failed to generate shader from graph set: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof ApiError ? error.status : undefined
      );
    }
  }
}

export const geometryService = new GeometryService();
