import axios from 'axios';

export const generateConvert2Interlocking = async (payload: any,) => {
  try {
    const response = await axios.post('http://localhost:5000/convert-to-interlocking', {
      moduleData: JSON.stringify(payload.moduleData),
      uniforms: JSON.stringify(payload.uniforms),
    });

    const { moduleData } = response.data; // Assuming the backend returns new_data
    const new_data = JSON.parse(moduleData);
    return new_data;
  } catch (error) {
    console.error('Error resolving to polyset:', error);
    throw error;
  }
};

export const generateConvert2JWood = async (payload: any) => {
  try {
    const response = await axios.post('http://localhost:5000/convert-to-jwood', {
      moduleData: JSON.stringify(payload.moduleData),
      uniforms: JSON.stringify(payload.uniforms),
    });

    const { jwood_str } = response.data; // Get the STL data from the backend

    return jwood_str;
  } catch (error) {
    console.error('Error resolving to Jwood format:', error);
    throw error;
  }
};


export const generateConvert2MCMesh = async (payload: any) => {
    try {
      const response = await axios.post('http://localhost:5000/convert-to-mc-mesh', {
        moduleData: JSON.stringify(payload.moduleData),
      });
  
      const { meshData } = response.data; // Get the STL data from the backend
  
      // Convert the Base64 STL data into downloadable Blobs
      const parsedMeshes = meshData.map((mesh: any, index: number) => {
        const stlBlob = new Blob([Uint8Array.from(atob(mesh.stl), c => c.charCodeAt(0))], {
          type: 'application/octet-stream',
        });
  
        return {
          blob: stlBlob,
          filename: `mesh_${index}.stl`,
        };
      });
  
      return parsedMeshes;
    } catch (error) {
      console.error('Error resolving to STL meshes:', error);
      throw error;
    }
  };
  
  export const generateConvert2Millable = async (payload: any,) => {
    try {
      const response = await axios.post('http://localhost:5000/convert-to-millable', {
        moduleData: JSON.stringify(payload.moduleData),
      });
  
      const { moduleData } = response.data; // Assuming the backend returns new_data
      const new_data = JSON.parse(moduleData);
      return new_data;
    } catch (error) {
      console.error('Error resolving to polyset:', error);
      throw error;
    }
  };
  

  export const generateConvert2STL = async (payload: any) => {
    try {
      const response = await axios.post('http://localhost:5000/convert-to-stl', {
        moduleData: JSON.stringify(payload.moduleData),
      });
  
      const { meshData } = response.data; // Get the STL data from the backend
  
      // Convert the Base64 STL data into downloadable Blobs
      const parsedMeshes = meshData.map((mesh: any, index: number) => {
        const stlBlob = new Blob([Uint8Array.from(atob(mesh.stl), c => c.charCodeAt(0))], {
          type: 'application/octet-stream',
        });
  
        return {
          blob: stlBlob,
          filename: `mesh_${index}.stl`,
        };
      });
  
      return parsedMeshes;
    } catch (error) {
      console.error('Error resolving to STL meshes:', error);
      throw error;
    }
  };
  

  export const generateResolve2PolySet = async (payload: any,) => {
    try {
      const response = await axios.post('http://localhost:5000/resolve-to-polyset', {
        moduleData: JSON.stringify(payload.moduleData),
        uniforms: JSON.stringify(payload.uniforms),
      });
  
      const { moduleData } = response.data; // Assuming the backend returns new_data
      const new_data = JSON.parse(moduleData);
      return new_data;
    } catch (error) {
      console.error('Error resolving to polyset:', error);
      throw error;
    }
  };
  

  export const generateShaderCodeFromGraph = async (program_data: any) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate-shadercode-graph', {
        moduleData: JSON.stringify(program_data),
      });
      const { shaderCode, uniforms } = response.data;
      return { shaderCode, uniforms };
    } catch (error) {
      console.error('Error fetching shader code and uniforms:', error);
      throw error;
    }
  };
  

  export const generateShaderCodeFromGraphSet = async (program_data: any) => {
    try {
      const response = await axios.post('http://localhost:5000/generate-shadercode-graphset', {
        moduleData: JSON.stringify(program_data),
      });
      const { shaderCode, uniforms } = response.data;
      return { shaderCode, uniforms };
    } catch (error) {
      console.error('Error fetching shader code and uniforms:', error);
      throw error;
    }
  };
  

  export const generateConvert2Bboxed = async (payload: any,) => {
    try {
      const response = await axios.post('http://localhost:5000/convert-to-bboxed', {
        moduleData: JSON.stringify(payload.moduleData),
        uniforms: JSON.stringify(payload.uniforms),
      });
  
      const { moduleData } = response.data; // Assuming the backend returns new_data
      const new_data = JSON.parse(moduleData);
      return new_data;
    } catch (error) {
      console.error('Error resolving to BBox:', error);
      throw error;
    }
  };
  