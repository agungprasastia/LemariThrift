import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-canvas flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-surface-card border border-hairline p-8 flex flex-col items-center shadow-lg">
            <div className="w-16 h-16 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-display font-bold uppercase tracking-machined mb-4 text-ink">
              Terjadi Kesalahan Sistem
            </h1>
            <p className="text-body text-sm mb-8 leading-relaxed">
              Maaf, aplikasi mengalami kendala teknis saat memproses halaman ini. Tim kami telah diberitahu.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              icon={<RefreshCcw className="w-4 h-4" />}
              className="w-full"
            >
              Muat Ulang Halaman
            </Button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 text-left bg-surface-elevated p-4 border border-hairline w-full overflow-x-auto">
                <p className="text-xs font-mono text-brand-red whitespace-pre-wrap">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
