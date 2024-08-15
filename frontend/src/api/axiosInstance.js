import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.VITE_BASE_URL || 'http://localhost:8000',
    headers: {
        
        'Content-Type': 'application/json',
    },
    withCredentials:true
});
export default axiosInstance;
