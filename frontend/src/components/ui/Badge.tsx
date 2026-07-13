import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'danger' | 'new' | 'sale' | 'default';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-surface-elevated text-ink border-hairline',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      danger: 'bg-brand-red/10 text-brand-red border-brand-red/20',
      new: 'bg-brand-blue-dark text-ink border-brand-blue-dark',
      sale: 'bg-brand-red text-ink border-brand-red',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-none border px-2.5 py-0.5 text-xs font-bold uppercase tracking-machined transition-colors focus:outline-none',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
