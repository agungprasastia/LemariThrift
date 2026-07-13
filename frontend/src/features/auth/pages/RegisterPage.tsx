import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserPlus } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useRegister } from '@/features/auth/hooks/useAuth';
import { toast } from '@/components/ui/Toast';

const registerSchema = z.object({
  name: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  passwordConfirmation: z.string().min(6, 'Konfirmasi password minimal 6 karakter')
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Password tidak cocok",
  path: ["passwordConfirmation"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { mutate: doRegister, isPending: isRegistering } = useRegister();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  });

  const onSubmit = (data: RegisterFormValues) => {
    // Exclude passwordConfirmation when sending to API if necessary, 
    // but usually the service layer handles the precise mapping.
    const { passwordConfirmation, ...apiData } = data;
    
    doRegister(apiData, {
      onSuccess: () => {
        toast.success('Pendaftaran berhasil! Silakan login.');
        navigate('/login');
      }
    });
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-machined mb-2">
          Buat Akun Baru
        </h1>
        <p className="text-body text-sm md:text-base">
          Bergabunglah dengan komunitas LemariThrift dan mulai perjalanan belanja *fashion* *second-hand* premium Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Input 
            label="Nama Lengkap" 
            placeholder="Contoh: Budi Santoso"
            error={errors.name?.message}
            {...register('name')} 
          />
          
          <Input 
            label="Alamat Email" 
            type="email"
            placeholder="nama@email.com"
            error={errors.email?.message}
            {...register('email')} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')} 
            />
            
            <Input 
              label="Konfirmasi Password"
              type="password"
              placeholder="••••••••"
              error={errors.passwordConfirmation?.message}
              {...register('passwordConfirmation')} 
            />
          </div>
        </div>

        {/* Term & Conditions Checkbox Placeholder */}
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            id="terms" 
            required
            className="w-4 h-4 mt-0.5 border-hairline bg-surface-card checked:bg-ink checked:border-ink rounded-none focus:ring-ink focus:ring-offset-canvas transition-all cursor-pointer shrink-0"
          />
          <label htmlFor="terms" className="text-sm text-body cursor-pointer select-none leading-relaxed">
            Saya menyetujui <Link to="#" className="font-bold text-ink hover:underline">Syarat & Ketentuan</Link> serta <Link to="#" className="font-bold text-ink hover:underline">Kebijakan Privasi</Link> yang berlaku.
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          size="lg" 
          loading={isRegistering}
          icon={<UserPlus className="w-5 h-5" />}
        >
          Daftar Sekarang
        </Button>
      </form>

      <div className="mt-8 text-center border-t border-hairline pt-8">
        <p className="text-sm text-body">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="font-bold text-ink uppercase tracking-machined hover:text-brand-blue-light transition-colors underline underline-offset-4">
            Masuk di Sini
          </Link>
        </p>
      </div>
    </div>
  );
}
