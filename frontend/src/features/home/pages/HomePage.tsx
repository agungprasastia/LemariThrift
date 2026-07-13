import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Button, Skeleton } from '@/components/ui';
import { SEO } from '@/components/SEO';
import { useLatestProduct, usePopularProduct } from '@/features/product/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { ProductCard } from '@/features/product/components/ProductCard';
import { IProduct, ICategory } from '@/types';

export function HomePage() {
  const { data: latestData, isLoading: latestLoading } = useLatestProduct();
  const { data: popularData, isLoading: popularLoading } = usePopularProduct();
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  const latestProducts = latestData?.data || [];
  const popularProducts = popularData?.data || [];
  const categories = categoriesData?.data || [];

  return (
    <div className="flex flex-col w-full">
      <SEO title="Platform Thrifting Premium" />
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-surface-card flex items-center justify-center overflow-hidden border-b border-hairline">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity grayscale"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent"></div>
        
        <Container className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-machined mb-6 text-ink drop-shadow-lg">
            Curated <br /> Sustainable <br /> Style.
          </h1>
          <p className="text-body max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
            Discover premium, hand-picked second-hand fashion. Authentic pieces that redefine your wardrobe and our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/products?sort=newest">SHOP NEW ARRIVALS</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-canvas/50 backdrop-blur-sm">
              <Link to="/category/mens">SHOP MENSWEAR</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* New Arrivals */}
      <Section>
        <Container>
          <div className="flex items-end justify-between mb-12 border-b border-hairline pb-4">
            <h2 className="text-3xl font-display font-bold uppercase tracking-machined text-ink">New In</h2>
            <Link to="/products?sort=newest" className="flex items-center text-sm font-bold uppercase tracking-machined text-muted hover:text-ink transition-colors">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {latestLoading 
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] w-full" />)
              : latestProducts.slice(0, 4).map((product: IProduct) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </div>
        </Container>
      </Section>

      {/* Categories */}
      <Section className="bg-surface-soft border-y border-hairline">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold uppercase tracking-machined text-ink">Shop by Category</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categoriesLoading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-square w-full rounded-full max-w-[250px] mx-auto" />)
              : categories.slice(0, 3).map((category: ICategory) => (
                  <Link key={category.id} to={`/category/${category.slug}`} className="group flex flex-col items-center">
                    <div className="w-64 h-64 md:w-full md:aspect-square max-w-[320px] overflow-hidden mb-6 border border-hairline">
                      <img 
                        src={category.image || 'https://images.unsplash.com/photo-1558769132-cb1fac08b495?q=80&w=2070&auto=format&fit=crop'} 
                        alt={category.name}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-machined text-ink group-hover:text-brand-blue-light transition-colors">{category.name}</h3>
                  </Link>
                ))
            }
          </div>
        </Container>
      </Section>

      {/* Popular Items */}
      <Section>
        <Container>
          <div className="flex items-end justify-between mb-12 border-b border-hairline pb-4">
            <h2 className="text-3xl font-display font-bold uppercase tracking-machined text-ink">Most Wanted</h2>
            <Link to="/products?sort=popular" className="flex items-center text-sm font-bold uppercase tracking-machined text-muted hover:text-ink transition-colors">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {popularLoading 
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] w-full" />)
              : popularProducts.slice(0, 4).map((product: IProduct) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </div>
        </Container>
      </Section>
    </div>
  );
}
