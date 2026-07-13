import api from './axios';

export const authService = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
  logout: () => {
    // Backend has no logout endpoint, just clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return Promise.resolve({ success: true });
  },
  me: async () => {
    // Backend has no /me endpoint, return dummy profile based on token
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not logged in');
    
    return {
      id: '1',
      name: 'User',
      email: 'user@example.com',
      role: 'USER'
    };
  },
};
