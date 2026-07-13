import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '@/services';
import { toast } from '@/components/ui/Toast';

export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistService.getWishlist(),
    // Realtime - no staleTime cache
  });
};

export const useAddWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => wishlistService.add(data),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      const previousWishlist = queryClient.getQueryData(['wishlist']);
      
      // Optimistic update
      queryClient.setQueryData(['wishlist'], (old: any) => {
        if (!old) return { data: [newItem] };
        return { ...old, data: [...old.data, newItem] };
      });
      
      return { previousWishlist };
    },
    onError: (err, newItem, context: any) => {
      queryClient.setQueryData(['wishlist'], context.previousWishlist);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onSuccess: (res: any) => {
      toast.success(res.message || 'Berhasil ditambahkan ke wishlist');
    },
  });
};

export const useRemoveWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string | number) => wishlistService.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      const previousWishlist = queryClient.getQueryData(['wishlist']);
      
      // Optimistic update
      queryClient.setQueryData(['wishlist'], (old: any) => {
        if (!old) return old;
        return { ...old, data: old.data.filter((item: any) => item.id !== id) };
      });
      
      return { previousWishlist };
    },
    onError: (err, id, context: any) => {
      queryClient.setQueryData(['wishlist'], context.previousWishlist);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};
