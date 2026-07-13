import * as React from 'react';
import { Slot } from '@radix-ui/react-slot'; // Not using radix but keeping standard structure
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  icon?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', loading = false, disabled, icon, children, asChild = false, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-ink text-canvas border border-ink hover:bg-transparent hover:text-ink',
      secondary: 'bg-surface-card text-ink hover:bg-surface-elevated',
      outline: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-canvas',
      ghost: 'bg-transparent text-ink hover:bg-surface-card',
      danger: 'bg-brand-red text-ink border border-brand-red hover:bg-transparent hover:text-brand-red',
    };

    const sizes = {
      default: 'h-12 px-8 py-4',
      sm: 'h-10 px-4 py-2 text-xs',
      lg: 'h-14 px-10 py-4 text-base',
      icon: 'h-12 w-12 rounded-full flex items-center justify-center p-0',
    };

    const isIconOnly = size === 'icon';
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-bold tracking-machined transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none uppercase whitespace-nowrap',
          !isIconOnly && 'rounded-none', // Enforce sharp edges per DESIGN.md unless icon button
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {!loading && icon && <span className={cn(children ? 'mr-2' : '')}>{icon}</span>}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button };
