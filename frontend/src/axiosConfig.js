// Import axios library
import axios from 'axios';

// Create a custom axios instance
const axiosInstance = axios.create({
  // Set the base URL for all requests
  baseURL: 'http://localhost:8000/api',
  // baseURL: "https://blog-app-api-roan.vercel.app/api",
  // Set default headers
  headers: {
    'Content-Type': 'application/json', // All requests will send JSON data
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  // Success handler
  (config) => {
    // Get the JWT from localStorage
    const token = localStorage.getItem('authToken');
    // If token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Return the modified config
    return config;
  },
  // Error handler
  (error) => {
    // Reject the Promise with the error
    return Promise.reject(error);
  }
);

// Export the customized axios instance
export default axiosInstance;