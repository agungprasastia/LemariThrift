import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LogIn } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useLogin } from '@/features/auth/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { mutate: doLogin, isPending: isLoggingIn } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    doLogin(data, {
      onSuccess: () => {
        // Redirect to Home after successful login
        navigate('/');
      }
    });
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-machined mb-2">
          Selamat Datang
        </h1>
        <p className="text-body text-sm md:text-base">
          Masuk ke akun LemariThrift Anda untuk melanjutkan eksplorasi *fashion* berkelanjutan.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Input 
            label="Alamat Email" 
            type="email"
            placeholder="nama@email.com"
            error={errors.email?.message}
            {...register('email')} 
          />
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold tracking-machined uppercase text-ink">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-muted hover:text-ink font-bold uppercase tracking-machined transition-colors">
                Lupa Password?
              </Link>
            </div>
            <Input 
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')} 
            />
          </div>
        </div>

        {/* Checkbox Placeholder for "Remember Me" */}
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="remember" 
            className="w-4 h-4 border-hairline bg-surface-card checked:bg-ink checked:border-ink rounded-none focus:ring-ink focus:ring-offset-canvas transition-all cursor-pointer"
          />
          <label htmlFor="remember" className="text-sm text-body cursor-pointer select-none">
            Ingat saya di perangkat ini
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          size="lg" 
          loading={isLoggingIn}
          icon={<LogIn className="w-5 h-5" />}
        >
          Masuk ke Akun
        </Button>
      </form>

      <div className="mt-8 text-center border-t border-hairline pt-8">
        <p className="text-sm text-body">
          Belum memiliki akun?{' '}
          <Link to="/register" className="font-bold text-ink uppercase tracking-machined hover:text-brand-blue-light transition-colors underline underline-offset-4">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
