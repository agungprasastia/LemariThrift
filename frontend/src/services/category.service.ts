import { ICategory } from '@/types';
import api from './axios';

// Mock categories since the railway backend doesn't support it natively
const MOCK_CATEGORIES: ICategory[] = [
  { id: '1', name: 'Tops', slug: 'tops' },
  { id: '2', name: 'Bottoms', slug: 'bottoms' },
  { id: '3', name: 'Outerwear', slug: 'outerwear' },
  { id: '4', name: 'Accessories', slug: 'accessories' },
];

export const categoryService = {
  getAll: async () => {
    return MOCK_CATEGORIES;
  },
  getCategory: async (slug: string) => {
    return MOCK_CATEGORIES.find(c => c.slug === slug);
  },
};
