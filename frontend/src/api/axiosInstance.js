import axios from 'axios';
const base_url=import.meta.env.VITE_BASE_URL;
const axiosInstance = axios.create({
    baseURL: base_url ,
    headers: {
        
        'Content-Type': 'application/json',
    },
    withCredentials:true
});
export default axiosInstance;
