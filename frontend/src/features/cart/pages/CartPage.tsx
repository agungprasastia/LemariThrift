import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Container, Section, Breadcrumb } from '@/components/layout';
import { Button, Skeleton } from '@/components/ui';
import { useCart, useUpdateCart, useDeleteCart } from '@/features/cart/hooks/useCart';
import { ICartItem } from '@/types';

export function CartPage() {
  const navigate = useNavigate();
  const { data: cartData, isLoading } = useCart();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: deleteCart } = useDeleteCart();

  const cartItems = cartData?.data || [];
  
  // Calculation
  const subtotal = cartItems.reduce((acc: number, item: ICartItem) => {
    const price = item.product?.price || 0;
    return acc + (price * item.quantity);
  }, 0);
  const shipping = cartItems.length > 0 ? 25000 : 0; // Flat dummy shipping
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col w-full bg-canvas min-h-screen">
      <Section className="py-8 md:py-12 border-b border-hairline">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cart' }
            ]} 
            className="mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-machined">
            Keranjang Belanja
          </h1>
        </Container>
      </Section>

      <Section className="py-8 md:py-16">
        <Container>
          {isLoading ? (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1 space-y-6">
                {[1, 2].map(i => (
                  <Skeleton key={i} className="w-full h-32" />
                ))}
              </div>
              <div className="w-full lg:w-96 shrink-0">
                <Skeleton className="w-full h-64" />
              </div>
            </div>
          ) : cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              {/* Cart Items */}
              <div className="flex-1 w-full flex flex-col border-t border-hairline">
                {cartItems.map((item: ICartItem) => {
                  const product = item.product;
                  const maxStock = product.stock || 1;
                  const image = product.image || product.images?.[0] || product.imageUrls?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop';
                  
                  return (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 py-6 border-b border-hairline relative group">
                      <Link to={`/product/${product.slug}`} className="w-24 sm:w-32 aspect-[3/4] shrink-0 bg-surface-elevated">
                        <img src={image} alt={product.name} className="w-full h-full object-cover" />
                      </Link>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <Link to={`/product/${product.slug}`}>
                              <h3 className="font-bold uppercase tracking-machined text-sm sm:text-base hover:text-brand-blue-light transition-colors line-clamp-2 mb-1">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-muted text-xs mb-2">Ukuran: {product.size || 'All Size'}</p>
                          </div>
                          <span className="font-display font-bold whitespace-nowrap">
                            Rp {product.price?.toLocaleString('id-ID')}
                          </span>
                        </div>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <div className="flex items-center border border-hairline bg-surface-card">
                            <button 
                              disabled={item.quantity <= 1}
                              onClick={() => updateCart({ id: item.id, data: { quantity: item.quantity - 1 } })}
                              className="p-2 sm:p-3 text-muted hover:text-ink disabled:opacity-20 transition-colors"
                              aria-label="Kurangi jumlah barang"
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <span className="w-8 sm:w-12 text-center text-xs sm:text-sm font-bold select-none">{item.quantity}</span>
                            <button 
                              disabled={item.quantity >= maxStock}
                              onClick={() => updateCart({ id: item.id, data: { quantity: item.quantity + 1 } })}
                              className="p-2 sm:p-3 text-muted hover:text-ink disabled:opacity-20 transition-colors"
                              aria-label="Tambah jumlah barang"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => deleteCart(item.id)}
                            className="text-body hover:text-brand-red flex items-center gap-2 text-xs font-bold uppercase tracking-machined transition-colors"
                            aria-label={`Hapus ${product.name} dari keranjang`}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-96 shrink-0 bg-surface-card border border-hairline p-6 sticky top-24">
                <h2 className="text-xl font-display font-bold uppercase tracking-machined mb-6 border-b border-hairline pb-4">
                  Ringkasan Pesanan
                </h2>
                
                <div className="flex flex-col space-y-4 text-sm mb-6 border-b border-hairline pb-6">
                  <div className="flex justify-between">
                    <span className="text-body">Subtotal</span>
                    <span className="font-bold">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body">Pengiriman</span>
                    <span className="font-bold">Rp {shipping.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="font-bold uppercase tracking-machined">Total</span>
                  <span className="text-2xl font-display font-bold text-brand-blue-light">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={() => navigate('/checkout')}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Checkout Sekarang
                </Button>
                
                <p className="text-xs text-muted text-center mt-6">
                  Pajak dan biaya pengiriman aktual akan dihitung pada saat checkout.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-hairline bg-surface-card/50">
              <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-muted" />
              </div>
              <h2 className="text-xl font-display font-bold uppercase tracking-machined mb-2">Keranjang Kosong</h2>
              <p className="text-body mb-8 max-w-sm font-light">
                Wah, keranjang Anda masih kosong. Cari *fashion items* impian Anda sekarang!
              </p>
              <Button asChild>
                <Link to="/products">Mulai Belanja</Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
