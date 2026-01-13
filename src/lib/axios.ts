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
    // You can add logic here to retrieve token from localStorage or cookies
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
      // Redirect to login or clear session
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export default api;
