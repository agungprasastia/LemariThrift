import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services';
import { toast } from '@/components/ui/Toast';

const CACHE_TIME = 30 * 60 * 1000; // 30 minutes

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
    staleTime: CACHE_TIME,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => profileService.update(data),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(res.message || 'Profil berhasil diperbarui');
    },
  });
};
