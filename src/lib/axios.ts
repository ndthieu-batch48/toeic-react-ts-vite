import axios from 'axios';
import { clearUserSession, getUserSession } from '@/features/helper/authHelper';

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
    const userSession = getUserSession();

    if (userSession) {
      config.headers.Authorization = `Bearer ${userSession.access_token}`;
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
      clearUserSession();
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);