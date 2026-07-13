import { Outlet, Link } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-canvas text-ink font-sans selection:bg-brand-blue-light selection:text-ink">
      {/* Left Panel: Image Placeholder */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-card border-r border-hairline items-center justify-center overflow-hidden">
        {/* Placeholder image that looks like editorial fashion */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 grayscale mix-blend-luminosity"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" />
        <div className="relative z-10 p-12 text-center flex flex-col items-center">
          <Link to="/" className="text-4xl font-display font-bold uppercase tracking-machined mb-4 hover:opacity-80 transition-opacity">
            LemariThrift
          </Link>
          <p className="text-body max-w-md mx-auto font-light leading-relaxed">
            Curated premium second-hand fashion. Redefining your style with sustainability and authenticity.
          </p>
        </div>
      </div>
      
      {/* Right Panel: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-canvas relative">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden text-2xl font-display font-bold uppercase tracking-machined mb-12 block text-center">
            LemariThrift
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
