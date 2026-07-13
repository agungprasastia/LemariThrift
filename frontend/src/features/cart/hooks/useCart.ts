import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services';
import { toast } from '@/components/ui/Toast';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
    // Realtime - no staleTime cache
  });
};

export const useAddCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => cartService.add(data),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(res.message || 'Berhasil ditambahkan ke keranjang');
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number, data: any }) => cartService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData(['cart']);
      
      // Optimistic update
      queryClient.setQueryData(['cart'], (old: any) => {
        if (!old) return old;
        const newData = old.data.map((item: any) => 
          item.id === id ? { ...item, ...data } : item
        );
        return { ...old, data: newData };
      });
      
      return { previousCart };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(['cart'], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string | number) => cartService.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData(['cart']);
      
      // Optimistic update
      queryClient.setQueryData(['cart'], (old: any) => {
        if (!old) return old;
        return { ...old, data: old.data.filter((item: any) => item.id !== id) };
      });
      
      return { previousCart };
    },
    onError: (err, id, context: any) => {
      queryClient.setQueryData(['cart'], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
