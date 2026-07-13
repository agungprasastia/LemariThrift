import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Share2, Info, CheckCircle2 } from 'lucide-react';
import { Container, Section, Breadcrumb } from '@/components/layout';
import { Button, Badge, Skeleton } from '@/components/ui';
import { SEO } from '@/components/SEO';
import { ProductCard } from '@/features/product/components/ProductCard';
import { useProduct, useLatestProduct } from '@/features/product/hooks/useProducts';
import { useAddCart } from '@/features/cart/hooks/useCart';
import { useAddWishlist } from '@/features/wishlist/hooks/useWishlist';
import { toast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import { IProduct } from '@/types';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeImage, setActiveImage] = React.useState(0);
  
  // Data Fetching
  const { data: productData, isLoading, isError } = useProduct(slug || '');
  const { data: relatedData, isLoading: relatedLoading } = useLatestProduct();
  
  const { mutate: addToCart, isPending: addingCart } = useAddCart();
  const { mutate: addToWishlist, isPending: addingWishlist } = useAddWishlist();

  const product = productData?.data;
  const relatedProducts = relatedData?.data || [];

  // Reset active image when product changes
  React.useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full bg-canvas min-h-screen">
        <Section className="py-8 md:py-16 border-b border-hairline">
          <Container>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <Skeleton className="w-full aspect-[3/4]" />
                <div className="flex gap-4">
                  <Skeleton className="w-24 h-32" />
                  <Skeleton className="w-24 h-32" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <Skeleton className="w-1/2 h-10" />
                <Skeleton className="w-1/4 h-8" />
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-12 mt-8" />
              </div>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col w-full bg-canvas min-h-screen items-center justify-center py-24 text-center">
        <h1 className="text-4xl font-display font-bold uppercase tracking-machined mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-body mb-8">Produk yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
        <Button asChild>
          <Link to="/products">Kembali Belanja</Link>
        </Button>
      </div>
    );
  }

  // Handle defaults if image arrays are missing
  const images = product.images?.length > 0 ? product.images : (product.imageUrls?.length > 0 ? product.imageUrls : (product.image ? [product.image] : ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop']));
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: 1 });
  };

  const handleAddWishlist = () => {
    addToWishlist({ productId: product.id });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link disalin ke clipboard');
    }
  };

  return (
    <div className="flex flex-col w-full bg-canvas min-h-screen">
      <SEO 
        title={product.name} 
        description={product.description?.substring(0, 150) || `Beli ${product.name} original thrift di LemariThrift.`}
        image={images[0]}
        type="product"
      />
      <Section className="py-8 md:py-12 pb-16 border-b border-hairline">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/products' },
              { label: product.category?.name || 'Category', href: `/category/${product.category?.slug}` },
              { label: product.name }
            ]} 
            className="mb-8"
          />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left: Image Gallery */}
            <div className="w-full lg:w-1/2 flex flex-col md:flex-row-reverse gap-4">
              {/* Main Image */}
              <div className="w-full flex-1 relative aspect-[3/4] bg-surface-elevated border border-hairline overflow-hidden">
                <img 
                  src={images[activeImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && <Badge variant="new">New In</Badge>}
                  {product.isSale && <Badge variant="sale">Sale</Badge>}
                  {isOutOfStock && <Badge variant="danger">Sold Out</Badge>}
                </div>
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0 pb-2 md:pb-0 scrollbar-hide">
                  {images.map((img: string, idx: number) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn(
                        "relative aspect-[3/4] w-20 md:w-full shrink-0 border transition-colors",
                        activeImage === idx ? "border-ink" : "border-hairline hover:border-muted opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="mb-8 border-b border-hairline pb-8">
                <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-machined mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-end justify-between">
                  <span className="text-2xl md:text-3xl font-bold font-display">
                    Rp {product.price?.toLocaleString('id-ID')}
                  </span>
                  <button onClick={handleShare} className="text-body hover:text-ink transition-colors flex items-center text-sm font-bold uppercase tracking-machined gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>

              <div className="mb-8 space-y-6">
                <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-machined text-body">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Authentic</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Washed</span>
                </div>
                
                <div className="prose prose-invert prose-p:text-body prose-p:font-light prose-p:leading-relaxed max-w-none">
                  <p>{product.description || 'Tidak ada deskripsi tersedia untuk produk ini.'}</p>
                </div>

                {/* Info Table / Specs */}
                <div className="bg-surface-card border border-hairline p-4 md:p-6 grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <span className="block text-muted font-bold uppercase tracking-machined text-xs mb-1">Merek</span>
                    <span className="text-ink font-medium">{product.brand || 'Unbranded'}</span>
                  </div>
                  <div>
                    <span className="block text-muted font-bold uppercase tracking-machined text-xs mb-1">Kondisi</span>
                    <span className="text-ink font-medium">{product.condition || 'Pre-loved (Excellent)'}</span>
                  </div>
                  <div>
                    <span className="block text-muted font-bold uppercase tracking-machined text-xs mb-1">Ukuran</span>
                    <span className="text-ink font-medium">{product.size || 'All Size'}</span>
                  </div>
                  <div>
                    <span className="block text-muted font-bold uppercase tracking-machined text-xs mb-1">Stok</span>
                    <span className={cn("font-bold", isOutOfStock ? "text-brand-red" : "text-success")}>
                      {isOutOfStock ? 'Habis' : `${product.stock || 1} Tersedia`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={handleAddToCart}
                  loading={addingCart}
                  disabled={isOutOfStock}
                  icon={<ShoppingBag className="w-5 h-5" />}
                >
                  {isOutOfStock ? 'Sold Out' : 'Tambah ke Keranjang'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleAddWishlist}
                  loading={addingWishlist}
                  icon={<Heart className="w-5 h-5" />}
                  className="sm:w-16 px-0"
                  aria-label="Add to wishlist"
                />
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-hairline flex flex-col gap-3 text-sm text-muted">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 shrink-0" />
                  <p className="font-light">Barang thrift bersifat unik (hanya ada 1 stok). Siapa cepat, dia dapat.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      <Section className="bg-surface-soft">
        <Container>
          <div className="mb-12 border-b border-hairline pb-4 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold uppercase tracking-machined">You May Also Like</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedLoading 
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] w-full" />)
              : relatedProducts.filter((p: IProduct) => p.id !== product.id).slice(0, 4).map((related: IProduct) => (
                  <ProductCard key={related.id} product={related} />
                ))
            }
          </div>
        </Container>
      </Section>
    </div>
  );
}
