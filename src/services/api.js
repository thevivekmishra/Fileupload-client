
import axios from 'axios';
// const API_URL = 'http://localhost:3000';
const BASE_URL = 'https://fileupload-server-spop.onrender.com'

export const uploadFile = async(data) => {
    try {
        const response = await axios.post(`${BASE_URL}/upload`, data);
        return response.data;
    } catch (error) {
        console.error('Error while calling API', error.message);
    }
};
