import axios from 'axios';
import { clearAuthStorage, getAccessToken } from '@/utils/localStorageUtil';
import { isTokenExpired } from '@/utils/jwtUtils';

// Base axios instance (no auth)
export const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authenticated axios instance
export const axiosJWT = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - check token before sending
axiosJWT.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        clearAuthStorage();
        window.location.replace('/');
        return Promise.reject(new Error('Token expired'));
      }

      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle auth errors from server
axiosJWT.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthStorage();
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);