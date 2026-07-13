import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services';

const CACHE_TIME = 60 * 60 * 1000; // 1 hour

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
    staleTime: CACHE_TIME,
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['categories', slug],
    queryFn: () => categoryService.getCategory(slug),
    staleTime: CACHE_TIME,
    enabled: !!slug,
  });
};
