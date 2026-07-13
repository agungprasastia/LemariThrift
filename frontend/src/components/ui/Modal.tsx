import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface ModalProps {
  title?: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ title, description, open, onClose, children, className }: ModalProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'bg-surface-card border border-hairline p-6 w-full max-w-lg shadow-xl pointer-events-auto rounded-none',
                className
              )}
            >
              <div className="flex flex-col space-y-1.5 mb-6">
                <div className="flex items-center justify-between">
                  {title && <h2 className="text-2xl font-bold uppercase text-ink">{title}</h2>}
                  <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 ml-auto text-muted hover:text-ink">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                {description && <p className="text-sm text-body">{description}</p>}
              </div>
              <div className="relative">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
