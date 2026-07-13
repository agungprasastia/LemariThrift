import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn('bg-canvas text-body py-16 border-t border-hairline mt-auto', className)}
        {...props}
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="flex flex-col space-y-4">
              <h4 className="text-xl text-ink uppercase font-bold tracking-machined mb-2">LemariThrift</h4>
              <p className="text-sm font-light leading-relaxed max-w-xs">
                Premium curated second-hand fashion. Redefining your style with sustainability and authenticity.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <a href="#" className="text-body hover:text-ink transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-body hover:text-ink transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-body hover:text-ink transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm text-ink uppercase font-bold tracking-machined mb-2">Belanja</h4>
              <Link to="/products?sort=newest" className="text-sm hover:text-ink transition-colors">Baru Masuk</Link>
              <Link to="/category/mens" className="text-sm hover:text-ink transition-colors">Pakaian Pria</Link>
              <Link to="/category/womens" className="text-sm hover:text-ink transition-colors">Pakaian Wanita</Link>
              <Link to="/products?sale=true" className="text-sm hover:text-ink transition-colors">Diskon</Link>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-sm text-ink uppercase font-bold tracking-machined mb-2">Bantuan & Dukungan</h4>
              <Link to="/faq" className="text-sm hover:text-ink transition-colors">FAQ</Link>
              <Link to="/shipping" className="text-sm hover:text-ink transition-colors">Pengiriman & Retur</Link>
              <Link to="/size-guide" className="text-sm hover:text-ink transition-colors">Panduan Ukuran</Link>
              <Link to="/contact" className="text-sm hover:text-ink transition-colors">Hubungi Kami</Link>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-sm text-ink uppercase font-bold tracking-machined mb-2">Newsletter</h4>
              <p className="text-sm font-light mb-2">Berlangganan untuk mendapatkan info terbaru dan promo eksklusif.</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email Anda" 
                  className="bg-surface-card border border-hairline border-r-0 px-4 py-3 text-sm flex-1 focus:outline-none focus:border-ink text-ink placeholder:text-muted"
                  required
                />
                <button type="submit" className="bg-ink text-canvas font-bold uppercase tracking-machined px-6 hover:bg-transparent hover:text-ink border border-ink transition-colors text-xs">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-hairline-strong flex flex-col md:flex-row items-center justify-between text-xs text-muted">
            <p>&copy; {new Date().getFullYear()} LemariThrift. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-ink transition-colors">Kebijakan Privasi</Link>
              <Link to="/terms" className="hover:text-ink transition-colors">Syarat & Ketentuan</Link>
            </div>
          </div>
        </Container>
      </footer>
    );
  }
);
Footer.displayName = 'Footer';
