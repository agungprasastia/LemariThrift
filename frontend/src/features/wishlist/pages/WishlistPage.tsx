import * as React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { ProductCard } from '@/features/product/components/ProductCard';
import { useWishlist, useRemoveWishlist } from '@/features/wishlist/hooks/useWishlist';
import { IProduct } from '@/types';

export function WishlistPage() {
  const { data: wishlistData, isLoading } = useWishlist();
  const { mutate: removeWishlist } = useRemoveWishlist();
  
  const wishlistItems = wishlistData?.data || [];

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-display font-bold uppercase tracking-machined">Wishlist Saya</h1>
        <p className="text-body text-sm mt-2">Koleksi kurasi fashion premium yang Anda simpan.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] w-full" />)}
        </div>
      ) : wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {wishlistItems.map((item: { id: string | number; product: IProduct }) => {
            const product = item.product;
            
            return (
              <div key={item.id} className="relative group flex flex-col h-full">
                <ProductCard product={product} className="flex-1" />
                
                {/* Remove Overlay Button */}
                <button
                  onClick={() => removeWishlist(item.id)}
                  className="absolute top-14 right-4 z-20 p-2 bg-brand-red/90 text-ink hover:bg-brand-red transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-full shadow-lg"
                  aria-label="Remove from wishlist"
                  title="Hapus dari Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-hairline bg-surface-card/50">
          <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-muted" />
          </div>
          <h2 className="text-xl font-display font-bold uppercase tracking-machined mb-2">Wishlist Kosong</h2>
          <p className="text-body mb-8 max-w-sm font-light">
            Anda belum menyimpan produk apapun. Temukan gaya unik dan simpan di sini sebelum kehabisan.
          </p>
          <Button asChild>
            <Link to="/products">Jelajahi Produk</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
