import api from './axios';

export const orderService = {
  getOrders: () => api.get('/orders'),
  checkout: (data: any) => api.post('/orders', data),
  detail: (id: string | number) => api.get(`/orders/${id}`),
};
