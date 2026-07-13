import * as React from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Container, Section, Breadcrumb } from '@/components/layout';
import { Button, Drawer, Skeleton, Pagination } from '@/components/ui';
import { SEO } from '@/components/SEO';
import { ProductCard } from '@/features/product/components/ProductCard';
import { useProducts } from '@/features/product/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { cn } from '@/lib/utils';
import { IProduct, ICategory } from '@/types';

export function ShopPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);

  // Read URL params
  const currentCategory = slug || searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentPage = Number(searchParams.get('page')) || 1;

  // Fetch Data
  const { data: productsData, isLoading: productsLoading } = useProducts({
    category: currentCategory,
    sort: currentSort,
    page: currentPage,
    limit: 12,
  });
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  const products = productsData?.data || [];
  const totalPages = productsData?.meta?.totalPages || 1;
  const categories = categoriesData?.data || [];

  // Handlers
  const handleFilterChange = (key: string, value: string) => {
    if (key === 'category' && slug) {
      const search = value ? `?category=${value}` : '';
      navigate(`/products${search}`);
      return;
    }
    
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FiltersContent = () => (
    <div className="flex flex-col space-y-8">
      <div>
        <h3 className="font-bold uppercase tracking-machined mb-4 border-b border-hairline pb-2">Kategori</h3>
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => handleFilterChange('category', '')}
            className={cn(
              "text-left text-sm uppercase tracking-machined transition-colors",
              currentCategory === '' ? "text-ink font-bold" : "text-body hover:text-ink"
            )}
          >
            Semua Kategori
          </button>
          {categoriesLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ) : (
            categories.map((category: ICategory) => (
              <button
                key={category.slug}
                onClick={() => handleFilterChange('category', category.slug)}
                className={cn(
                  "text-left text-sm uppercase tracking-machined transition-colors",
                  currentCategory === category.slug ? "text-ink font-bold" : "text-body hover:text-ink"
                )}
              >
                {category.name}
              </button>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="font-bold uppercase tracking-machined mb-4 border-b border-hairline pb-2">Urutkan</h3>
        <select
          value={currentSort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="w-full bg-surface-card border border-hairline px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink appearance-none cursor-pointer"
        >
          <option value="newest">Terbaru</option>
          <option value="popular">Terpopuler</option>
          <option value="price_asc">Harga Terendah</option>
          <option value="price_desc">Harga Tertinggi</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full bg-canvas min-h-screen">
      <SEO 
        title={currentCategory ? currentCategory.replace('-', ' ') : 'Belanja'} 
        description={`Temukan koleksi ${currentCategory ? currentCategory.replace('-', ' ') : 'fashion second-hand'} terbaik dengan harga terjangkau.`}
      />
      <Section className="py-8 md:py-12 border-b border-hairline">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: currentCategory ? `Category: ${currentCategory}` : 'Shop' }
            ]} 
            className="mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-machined">
            {currentCategory ? currentCategory.replace('-', ' ') : 'Semua Produk'}
          </h1>
        </Container>
      </Section>

      <Section className="py-8 md:py-16">
        <Container>
          {/* Mobile Toolbar */}
          <div className="lg:hidden flex items-center justify-between mb-8 pb-4 border-b border-hairline">
            <span className="text-sm font-bold uppercase tracking-machined text-muted">
              {products.length} Hasil
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsMobileFilterOpen(true)}
              icon={<SlidersHorizontal className="w-4 h-4" />}
            >
              Filter & Urutkan
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FiltersContent />
              </div>
            </aside>

            {/* Main Product Grid */}
            <div className="flex-1 min-w-0">
              <div className="hidden lg:flex items-center justify-between mb-8 border-b border-hairline pb-4">
                <span className="text-sm font-bold uppercase tracking-machined text-muted">
                  Menampilkan {products.length} Produk
                </span>
              </div>

              {productsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-[3/4] w-full" />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {products.map((product: IProduct) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  <Pagination 
                    className="mt-16"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isMobile={window.innerWidth < 768}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-xl font-display uppercase tracking-machined mb-4">Tidak ada produk ditemukan.</p>
                  <Button variant="outline" onClick={() => handleFilterChange('category', '')}>
                    Lihat Semua Produk
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Mobile Filter Drawer */}
      <Drawer side="left" open={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-display font-bold uppercase tracking-machined mb-8 pb-4 border-b border-hairline">
            Filter
          </h2>
          <FiltersContent />
          <Button 
            className="w-full mt-12" 
            onClick={() => setIsMobileFilterOpen(false)}
          >
            Terapkan
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
