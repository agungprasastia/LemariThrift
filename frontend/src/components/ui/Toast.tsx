import { toast as hotToast, ToastOptions } from 'react-hot-toast';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import * as React from 'react';

// Wrapper to match DESIGN.md styling
const toastStyles = {
  style: {
    borderRadius: '0px', // rounded-none
    background: '#1a1a1a', // surface-card
    color: '#ffffff', // ink
    border: '1px solid #3c3c3c', // hairline
    padding: '16px',
    fontSize: '14px',
    fontWeight: 300,
  }
};

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return hotToast.success(message, {
      ...toastStyles,
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      ...options,
    });
  },
  error: (message: string, options?: ToastOptions) => {
    return hotToast.error(message, {
      ...toastStyles,
      icon: <AlertCircle className="h-5 w-5 text-brand-red" />,
      ...options,
    });
  },
  warning: (message: string, options?: ToastOptions) => {
    return hotToast(message, {
      ...toastStyles,
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
      ...options,
    });
  },
  info: (message: string, options?: ToastOptions) => {
    return hotToast(message, {
      ...toastStyles,
      icon: <Info className="h-5 w-5 text-brand-blue-light" />,
      ...options,
    });
  },
};
