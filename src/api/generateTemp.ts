import axios from 'axios';

const generateTemp = async (payload: any) => {
  try {
    const response = await axios.post('http://localhost:5000/convert-to-mesh', {
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

export default generateTemp;