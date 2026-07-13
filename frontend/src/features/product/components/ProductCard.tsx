import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { useAddCart } from '@/features/cart/hooks/useCart';
import { useAddWishlist } from '@/features/wishlist/hooks/useWishlist';
import { cn } from '@/lib/utils';
import { IProduct } from '@/types';

export function ProductCard({ product, className }: { product: IProduct, className?: string }) {
  const { mutate: addToCart, isPending: addingCart } = useAddCart();
  const { mutate: addToWishlist, isPending: addingWishlist } = useAddWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ productId: product.id, quantity: 1 });
  };

  const handleAddWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist({ productId: product.id });
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className={cn("group flex flex-col relative border border-hairline bg-surface-card hover:border-ink transition-colors h-full", className)}>
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        {product.isNew && <Badge variant="new">New In</Badge>}
        {product.isSale && <Badge variant="sale">Sale</Badge>}
        {isOutOfStock && <Badge variant="danger">Sold Out</Badge>}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleAddWishlist}
        disabled={addingWishlist}
        className="absolute top-4 right-4 z-10 p-2 bg-canvas/80 backdrop-blur-sm text-body hover:text-brand-red transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-full"
        aria-label="Add to wishlist"
      >
        <Heart className="w-5 h-5" />
      </button>

      {/* Image */}
      <Link to={`/product/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-surface-elevated block">
        <img 
          src={product.image || product.images?.[0] || product.imageUrls?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop'} 
          alt={product.name}
          className={cn(
            "object-cover w-full h-full transition-transform duration-700 group-hover:scale-105",
            isOutOfStock && "grayscale opacity-80"
          )}
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-bold uppercase tracking-machined text-sm mb-2 line-clamp-1 hover:text-brand-blue-light transition-colors">{product.name}</h3>
        </Link>
        <p className="text-body text-xs mb-4 line-clamp-1">{typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized'}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-display font-bold text-base md:text-lg">
            Rp {product.price?.toLocaleString('id-ID')}
          </span>
          <Button 
            onClick={handleAddToCart}
            disabled={addingCart || isOutOfStock}
            variant="outline" 
            size="icon" 
            className="h-10 w-10 shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity bg-canvas/80 hover:bg-ink"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
