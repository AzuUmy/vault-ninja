import axios from 'axios';

export async function validateToken(token) {
  try {
    const response = await axios.post('http://192.168.1.103:3000/validateToken', { token });
    return response.data.valid;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}