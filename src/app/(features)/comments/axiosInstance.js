// api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/comment-service/comments',
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
