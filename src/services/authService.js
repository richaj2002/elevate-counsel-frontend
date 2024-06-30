import axios from 'axios';

export const API_URL = 'http://localhost:3000';

export const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    if (response.data.accessToken) {
      const userData = {
        ...response.data,
        loginTime: now.getTime(),
      };
      localStorage.setItem('user', JSON.stringify(userData));
    }
    return userData;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  isTokenExpired: (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = decodedToken.exp * 1000;
    return Date.now() > expiryTime;
  },

  refreshToken: async () => {
    const user = authService.getCurrentUser();
    if (user && user.refreshToken) {
      if (authService.isTokenExpired(user.refreshToken)) {
        authService.logout();
        return null;
      }

      const response = await axios.post(`${API_URL}/refresh-token`, {
        refreshToken: user.refreshToken,
      });
      if (response.data.accessToken) {
        const userData = {
          ...response.data,
          loginTime: user.loginTime,
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }
      return userData.accessToken;
    }
    return null;
  },
};
