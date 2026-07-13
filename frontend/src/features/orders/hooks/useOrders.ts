import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services';
import { toast } from '@/components/ui/Toast';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrders(),
    gcTime: 0, // No Cache
  });
};

export const useOrderDetail = (id: string | number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderService.detail(id),
    gcTime: 0,
    enabled: !!id,
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => orderService.checkout(data),
    onSuccess: (res: any) => {
      // Clear cart cache and order cache after successful checkout
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(res.message || 'Checkout berhasil');
    },
  });
};
