import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean; // Mobile view uses "Load More" style per specs
}

export function Pagination({ currentPage, totalPages, onPageChange, isMobile = false, className, ...props }: PaginationProps) {
  if (totalPages <= 1) return null;

  if (isMobile) {
    return (
      <div className={cn("flex w-full justify-center mt-8", className)} {...props}>
        <Button 
          variant="outline" 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-full sm:w-auto"
        >
          LOAD MORE
        </Button>
      </div>
    );
  }

  // Generate page numbers logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className={cn('flex items-center justify-center space-x-2 mt-8', className)} {...props}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-none border border-hairline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((page, i) => (
        page === '...' ? (
          <div key={`ellipsis-${i}`} className="flex h-12 w-12 items-center justify-center">
            <MoreHorizontal className="h-4 w-4 text-muted" />
          </div>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? 'primary' : 'ghost'}
            className={cn('h-12 w-12 p-0 font-display', currentPage !== page && 'border border-hairline')}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        )
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="rounded-none border border-hairline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
