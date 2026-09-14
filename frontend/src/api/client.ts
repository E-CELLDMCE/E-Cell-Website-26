import axios from 'axios';

// Default fallback to configured base URL, with auto-fallback to localhost if on localhost
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:8000/api/v1';
  }
  return 'http://192.168.1.42:8000/api/v1';
};

export const API_BASE_URL = getBaseUrl();

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to attach Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle global 401 session expiry
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and cached user
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Dispatch global session-expired event so UI can show Toast
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('app:toast', {
            detail: {
              type: 'error',
              message: 'Session expired. Please log in again.',
            },
          })
        );

        // Redirect to login if not already on login page
        if (!window.location.pathname.startsWith('/login')) {
          setTimeout(() => {
            window.location.href = '/login';
          }, 800);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Helper to extract clean error message from Axios errors
export const getErrorMessage = (error: any, fallback = 'An unexpected error occurred'): string => {
  if (error.response?.data?.detail) {
    const detail = error.response.data.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    if (error.code === 'ERR_NETWORK') {
      return `Cannot connect to backend at ${API_BASE_URL}. Ensure FastAPI is running.`;
    }
    return error.message;
  }
  return fallback;
};

export default apiClient;
