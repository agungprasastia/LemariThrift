import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, required, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-bold tracking-machined uppercase text-ink">
            {label} {required && <span className="text-brand-red">*</span>}
          </label>
        )}
        <input
          ref={ref}
          required={required}
          className={cn(
            'flex h-12 w-full rounded-none border border-hairline bg-surface-card px-4 py-3 text-sm text-ink transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:border-ink disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-brand-red focus-visible:border-brand-red',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-brand-red">{error}</span>}
        {!error && helperText && <span className="text-xs text-muted">{helperText}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
