// lib/api/client.js
import axios from 'axios';

// Create an axios instance for frontend API requests
export const apiClient = axios.create({
    baseURL: '/', // Base URL for API requests (relative to your app)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Example of request interceptors (for logging, auth tokens, etc.)
apiClient.interceptors.request.use(
    config => {
        // You can add request modifications here (e.g., add auth token)
        // console.log('API Request:', config);
        return config;
    },
    error => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Example of response interceptors (for error handling, etc.)
apiClient.interceptors.response.use(
    response => {
        // You can process successful responses here
        // console.log('API Response:', response);
        return response;
    },
    error => {
        console.error('API Response Error:', error);
        // Global error handling - you might want to use a toast or notification service here
        // toast.error('API Error: ' + error.message); // Example using react-hot-toast
        return Promise.reject(error);
    }
);