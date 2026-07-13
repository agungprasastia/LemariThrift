import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Save, Mail, Phone, Calendar } from 'lucide-react';
import { Button, Input, Skeleton } from '@/components/ui';
import { useProfile, useUpdateProfile } from '@/features/profile/hooks/useProfile';
import { cn } from '@/lib/utils';

const profileSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfilePage() {
  const { data: profileData, isLoading } = useProfile();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();
  
  const user = profileData?.data;

  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    }
  });

  // Load user data into form
  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile(data);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-display font-bold uppercase tracking-machined">Profil Saya</h1>
        <p className="text-body text-sm mt-2">Kelola informasi data diri dan pengaturan akun Anda.</p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="w-48 h-6" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-12 max-w-3xl">
          
          {/* Avatar Header */}
          <div className="flex items-center gap-6 p-6 border border-hairline bg-surface-card">
            <div className="w-20 h-20 bg-ink text-canvas flex items-center justify-center shrink-0">
              <User className="w-10 h-10" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-display font-bold uppercase tracking-machined mb-1">{user?.name}</h2>
              <span className="text-muted text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" /> {user?.email}
              </span>
              <span className="text-muted text-xs mt-2 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Bergabung sejak {formatDate(user?.createdAt)}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Nama Lengkap" 
                placeholder="Nama Lengkap"
                error={errors.name?.message}
                {...register('name')} 
              />
              <Input 
                label="Alamat Email" 
                type="email"
                placeholder="Alamat Email"
                disabled // Usually email can't be changed easily
                className="opacity-70 cursor-not-allowed"
                error={errors.email?.message}
                {...register('email')} 
              />
              <div className="md:col-span-2">
                <Input 
                  label="Nomor Telepon" 
                  type="tel"
                  placeholder="Nomor Telepon yang dapat dihubungi"
                  error={errors.phone?.message}
                  {...register('phone')} 
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-hairline">
              <Button 
                type="submit" 
                disabled={!isDirty || updating} 
                loading={updating}
                icon={<Save className="w-4 h-4" />}
              >
                Simpan Perubahan
              </Button>
            </div>
          </form>

        </div>
      )}
    </div>
  );
}
