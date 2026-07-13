import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Container } from './Container';
import { Section } from './Section';
import { User, ShoppingBag, Heart, MapPin, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { icon: <User className="w-5 h-5" />, label: 'Profil Saya', href: '/profile' },
  { icon: <ShoppingBag className="w-5 h-5" />, label: 'Pesanan Saya', href: '/profile/orders' },
  { icon: <Heart className="w-5 h-5" />, label: 'Wishlist', href: '/profile/wishlist' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Alamat', href: '/profile/address' },
];

export function UserLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink font-sans selection:bg-brand-blue-light selection:text-ink">
      <Navbar />
      <main className="flex-1 w-full bg-surface-soft">
        <Section className="py-12 md:py-24">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Sidebar */}
              <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="bg-surface-card border border-hairline p-6 lg:sticky lg:top-32">
                  <h3 className="text-lg font-display font-bold uppercase tracking-machined mb-6 border-b border-hairline pb-4">Akun Saya</h3>
                  <nav className="flex flex-col space-y-1">
                    {sidebarLinks.map((link) => (
                      <NavLink
                        key={link.href}
                        to={link.href}
                        end
                        className={({ isActive }) => cn(
                          "flex items-center gap-4 px-4 py-3 text-sm font-bold transition-colors uppercase tracking-wider",
                          isActive 
                            ? "bg-surface-elevated text-ink border-l-2 border-brand-blue-light" 
                            : "text-body hover:text-ink border-l-2 border-transparent hover:bg-surface-elevated/50"
                        )}
                      >
                        {link.icon}
                        {link.label}
                      </NavLink>
                    ))}
                    
                    <button className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold text-brand-red transition-colors hover:bg-brand-red/10 border-l-2 border-transparent uppercase tracking-wider mt-6 pt-6 border-t border-hairline">
                      <LogOut className="w-5 h-5" />
                      Keluar
                    </button>
                  </nav>
                </div>
              </aside>
              
              {/* Content Area */}
              <div className="flex-1 min-w-0">
                <Outlet />
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
