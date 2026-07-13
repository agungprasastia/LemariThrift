import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services';

const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

export const useProducts = (params?: any) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
    staleTime: CACHE_TIME,
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product-detail', slug],
    queryFn: () => productService.getProduct(slug),
    staleTime: CACHE_TIME,
    enabled: !!slug,
  });
};

export const useLatestProduct = () => {
  return useQuery({
    queryKey: ['products', 'latest'],
    queryFn: () => productService.getLatest(),
    staleTime: CACHE_TIME,
  });
};

export const usePopularProduct = () => {
  return useQuery({
    queryKey: ['products', 'popular'],
    queryFn: () => productService.getPopular(),
    staleTime: CACHE_TIME,
  });
};
