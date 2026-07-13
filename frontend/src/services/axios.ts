import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from '@/components/ui/Toast';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors & Refresh Token
api.interceptors.response.use(
  (response) => {
    // API_MAPPING.md says API must return { success, message, data, errors }
    // We return response.data so services get the payload directly
    return response.data;
  },
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response) {
      const { status, data } = error.response;

      // Auto-logout or Refresh Token on 401 Unauthorized
      if (status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            // Attempt to refresh token
            const refreshRes = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
              refreshToken,
            });
            const newToken = refreshRes.data?.data?.token;
            if (newToken) {
              localStorage.setItem('token', newToken);
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              return api(originalRequest);
            }
          }
        } catch (refreshError) {
          // If refresh fails, cleanup and redirect
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }

        // If no refresh token exists
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }

      // Global Error Handler Toast Notification
      // Exclude 401 so we don't spam toasts while redirecting
      if (status !== 401) {
        if (data && data.message) {
          toast.error(data.message);
        } else {
          toast.error('Terjadi kesalahan pada server.');
        }
      }
    } else if (error.request) {
      // Network error (Server down, Timeout, CORS, etc.)
      toast.error('Koneksi bermasalah. Periksa jaringan Anda.');
    } else {
      toast.error('Terjadi kesalahan yang tidak terduga.');
    }

    return Promise.reject(error);
  }
);

export default api;
