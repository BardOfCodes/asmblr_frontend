import { apiClient, ApiError } from '../api/client';
import { 
  ConversionRequest, 
  ConversionResponse, 
  MeshResponse, 
  JWoodResponse 
} from '../api/types';

export interface ConversionOptions {
  moduleData: unknown;
  uniforms?: Record<string, unknown>;
}

export interface MeshFile {
  blob: Blob;
  filename: string;
}

export class ConversionService {
  async convertToInterlocking({ moduleData, uniforms }: ConversionOptions): Promise<unknown> {
    try {
      const response = await apiClient.post<ConversionResponse>('/convert-to-interlocking', {
        moduleData: JSON.stringify(moduleData),
        uniforms: uniforms ? JSON.stringify(uniforms) : undefined
      });
      
      return JSON.parse(response.moduleData);
    } catch (error) {
      throw new ApiError(
        `Failed to convert to interlocking: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof ApiError ? error.status : undefined
      );
    }
  }

  async convertToBBoxed({ moduleData, uniforms }: ConversionOptions): Promise<unknown> {
    try {
      const response = await apiClient.post<ConversionResponse>('/convert-to-bboxed', {
        moduleData: JSON.stringify(moduleData),
        uniforms: uniforms ? JSON.stringify(uniforms) : undefined
      });
      
      return JSON.parse(response.moduleData);
    } catch (error) {
      throw new ApiError(
        `Failed to convert to bboxed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof ApiError ? error.status : undefined
      );
    }
  }

  async convertToMCMesh(moduleData: unknown): Promise<MeshFile[]> {
    try {
      const response = await apiClient.post<MeshResponse>('/convert-to-mc-mesh', {
        moduleData: JSON.stringify(moduleData)
      });

      return response.meshData.map((mesh, index) => ({
        blob: new Blob([Uint8Array.from(atob(mesh.stl), c => c.charCodeAt(0))], {
          type: 'application/octet-stream'
        }),
        filename: `mesh_${index}.stl`
      }));
    } catch (error) {
      throw new ApiError(
        `Failed to convert to MC mesh: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof ApiError ? error.status : undefined
      );
    }
  }

  async convertToJWood({ moduleData, uniforms }: ConversionOptions): Promise<string> {
    try {
      const response = await apiClient.post<JWoodResponse>('/convert-to-jwood', {
        moduleData: JSON.stringify(moduleData),
        uniforms: uniforms ? JSON.stringify(uniforms) : undefined
      });
      
      return response.jwood_str;
    } catch (error) {
      throw new ApiError(
        `Failed to convert to JWood: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof ApiError ? error.status : undefined
      );
    }
  }

  downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  downloadText(content: string, filename: string, mimeType = 'text/plain'): void {
    const blob = new Blob([content], { type: mimeType });
    this.downloadFile(blob, filename);
  }
}

export const conversionService = new ConversionService();
