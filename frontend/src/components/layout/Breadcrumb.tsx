import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav ref={ref} aria-label="breadcrumb" className={cn('flex', className)} {...props}>
        <ol className="flex items-center space-x-2 text-xs font-normal tracking-wide text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={item.label} className="flex items-center">
                {item.href && !isLast ? (
                  <Link 
                    to={item.href} 
                    className="hover:text-ink transition-colors uppercase tracking-machined"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={cn("uppercase tracking-machined", isLast ? "text-ink font-bold" : "")}>
                    {item.label}
                  </span>
                )}
                {!isLast && <ChevronRight className="h-3 w-3 mx-2 text-hairline-strong" />}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';
