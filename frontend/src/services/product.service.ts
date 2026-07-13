import api from './axios';

export const productService = {
  getProducts: async (params?: any) => {
    return api.get('/products', { params });
  },
  getProduct: (id: string) => api.get(`/products/${id}`),
  getLatest: async () => {
    // Backend has no /latest endpoint, so we fetch all and slice
    const products: any = await api.get('/products');
    const data = Array.isArray(products) ? products : products?.data || [];
    // Sort by createdAt desc if possible, else just take first 10
    return data.slice(0, 10);
  },
  getPopular: async () => {
    // Backend has no /popular endpoint, so we fetch all and slice
    const products: any = await api.get('/products');
    const data = Array.isArray(products) ? products : products?.data || [];
    return data.slice(0, 8);
  },
};
