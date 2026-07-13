import { authService } from './auth.service';

export const profileService = {
  getProfile: async () => {
    return authService.me();
  },
  update: async (data: any) => {
    // Backend has no profile update endpoint, mock it
    return new Promise(resolve => setTimeout(() => resolve({ success: true, data }), 500));
  },
};
