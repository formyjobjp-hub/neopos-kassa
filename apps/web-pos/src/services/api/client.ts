import axios, { AxiosError } from 'axios';
import { APP_CONFIG } from '@/config/constants';

// Create axios instance with base configuration
export const apiClient = axios.create({
    baseURL: APP_CONFIG.API.BASE_URL,
    timeout: APP_CONFIG.API.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token to all requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }

        // Handle 403 Forbidden - No permission
        if (error.response?.status === 403) {
            console.error('Permission denied');
        }

        // Handle 500 Server Error
        if (error.response?.status === 500) {
            console.error('Server error occurred');
        }

        return Promise.reject(error);
    }
);
