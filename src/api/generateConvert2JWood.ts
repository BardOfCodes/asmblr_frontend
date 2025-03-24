import axios from 'axios';

const generateConvert2JWood = async (payload: any) => {
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

export default generateConvert2JWood;