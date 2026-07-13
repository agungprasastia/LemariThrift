import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { Drawer } from '../ui/Drawer';

const navLinks = [
  { label: 'NEW IN', href: '/products?sort=newest' },
  { label: 'MENS', href: '/category/mens' },
  { label: 'WOMENS', href: '/category/womens' },
  { label: 'ACCESSORIES', href: '/category/accessories' },
  { label: 'SALE', href: '/products?sale=true' },
];

export const Navbar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
      <>
        <header
          ref={ref}
          className={cn('sticky top-0 z-40 w-full bg-canvas/95 backdrop-blur-md text-ink border-b border-hairline transition-all', className)}
          {...props}
        >
          <div className="h-16">
            <Container className="h-full flex items-center justify-between">
              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden w-1/3">
                <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-ink hover:text-muted transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              {/* Logo */}
              <div className="flex items-center justify-center md:justify-start w-1/3 md:w-auto">
                <Link to="/" className="text-xl md:text-2xl font-display font-bold uppercase tracking-machined text-ink hover:opacity-80 transition-opacity">
                  LemariThrift
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center justify-center flex-1 h-full mx-8 space-x-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.href}
                    className={({ isActive }) => cn(
                      "text-xs font-bold uppercase tracking-machined transition-colors h-full flex items-center border-b-2",
                      isActive ? "text-ink border-ink" : "text-body hover:text-ink border-transparent"
                    )}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center justify-end w-1/3 md:w-auto space-x-2 md:space-x-4">
                <button className="p-2 text-ink hover:text-muted transition-colors" aria-label="Search">
                  <Search className="w-5 h-5" />
                </button>
                <Link to="/profile/wishlist" className="p-2 text-ink hover:text-muted transition-colors hidden sm:block" aria-label="Wishlist">
                  <Heart className="w-5 h-5" />
                </Link>
                <Link to="/profile" className="p-2 text-ink hover:text-muted transition-colors hidden sm:block" aria-label="Profile">
                  <User className="w-5 h-5" />
                </Link>
                <Link to="/cart" className="p-2 text-ink hover:text-muted transition-colors relative" aria-label="Cart">
                  <ShoppingBag className="w-5 h-5" />
                  {/* Badge placeholder */}
                  <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-ink">
                    3
                  </span>
                </Link>
              </div>
            </Container>
          </div>

          {/* M-Stripe Decorative Element */}
          <div className="h-[2px] w-full flex">
            <div className="h-full w-1/3 bg-brand-blue-light"></div>
            <div className="h-full w-1/3 bg-brand-blue-dark"></div>
            <div className="h-full w-1/3 bg-brand-red"></div>
          </div>
        </header>

        {/* Mobile Drawer */}
        <Drawer side="left" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <div className="flex flex-col p-6 h-full">
            <h2 className="text-xl font-display font-bold uppercase tracking-machined mb-8 pb-4 border-b border-hairline">Menu</h2>
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "text-lg font-bold uppercase tracking-machined transition-colors",
                    isActive ? "text-ink" : "text-body"
                  )}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-hairline flex flex-col space-y-4">
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 text-body hover:text-ink font-bold uppercase tracking-machined">
                <User className="w-5 h-5" />
                <span>Akun Saya</span>
              </Link>
              <Link to="/profile/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 text-body hover:text-ink font-bold uppercase tracking-machined">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>
        </Drawer>
      </>
    );
  }
);
Navbar.displayName = 'Navbar';
