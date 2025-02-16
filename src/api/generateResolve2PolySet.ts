import axios from 'axios';

const generateResolve2PolySet = async (payload: any,) => {
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

export default generateResolve2PolySet;