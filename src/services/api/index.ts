
import axios from 'axios';

const API_BASE_URL = 'https://backend-xdjn.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('API Request interceptor - token:', token ? 'exists' : 'not found');
    console.log('API Request URL:', config.baseURL + config.url);
    if (token) {
      config.headers['x-auth-token'] = token;
      console.log('Token added to request headers');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response successful:', response.config.url, 'Status:', response.status);
    return response;
  },
  (error) => {
    console.error('API Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      baseURL: error.config?.baseURL
    });
    if (error.response?.status === 401) {
      console.log('401 error detected, clearing auth data');
      // Token is invalid or expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
