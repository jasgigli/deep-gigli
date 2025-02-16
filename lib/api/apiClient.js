// lib/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api', // Assuming your API routes are under /api
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;