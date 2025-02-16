import axios from 'axios';

const generateShaderCodeFromGraph = async (program_data: any) => {
  try {
    const response = await axios.post('http://localhost:5000/generate-shadercode-graph', {
      moduleData: JSON.stringify(program_data),
    });
    const { shaderCode, uniforms } = response.data;
    return { shaderCode, uniforms };
  } catch (error) {
    console.error('Error fetching shader code and uniforms:', error);
    throw error;
  }
};

export default generateShaderCodeFromGraph;