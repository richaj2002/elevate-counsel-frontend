import axios from 'axios';

export const API_URL = 'http://localhost:3000';

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      },
      { noAuth: true }
    );
    if (response.data.data && response.data.data.accessToken) {
      const now = new Date();
      const userData = {
        ...response.data.data,
        loginTime: now.getTime(),
      };
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } else {
      throw Error('Something went wrong.');
    }
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

      const response = await axios.post(
        `${API_URL}/auth/refresh-token`,
        {
          refreshToken: user.refreshToken,
        },
        { noAuth: true }
      );
      if (response.data.data && response.data.data.accessToken) {
        const userData = {
          ...response.data.data,
          loginTime: user.loginTime,
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }
      return userData.accessToken;
    }
    return null;
  },
};
