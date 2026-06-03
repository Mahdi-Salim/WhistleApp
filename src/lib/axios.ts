import axios from 'axios';

const api = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors like 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Optional: Redirect to login or clear session if needed
      // but avoid logging it as an error since it's an expected response for failed login
    }
    return Promise.reject(error);
  }
);

export default api;
