import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services';
import { toast } from '@/components/ui/Toast';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => authService.login(data),
    onSuccess: (res: any) => {
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }
      if (res.data?.refreshToken) {
        localStorage.setItem('refreshToken', res.data.refreshToken);
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(res.message || 'Login berhasil');
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: any) => authService.register(data),
    onSuccess: (res: any) => {
      toast.success(res.message || 'Registrasi berhasil');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      queryClient.clear();
      window.location.href = '/login';
    },
  });
};
