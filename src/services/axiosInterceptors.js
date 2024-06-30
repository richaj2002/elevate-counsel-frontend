import axios from 'axios';
import { authService } from '@/services/authService';

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      const user = authService.getCurrentUser();
      if (user && user.accessToken) {
        if (authService.isTokenExpired(user.accessToken)) {
          const newAccessToken = await authService.refreshToken();
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        authService.logout();
        window.location.href = '/sign-in';
      }
      return Promise.reject(error);
    }
  );
};
