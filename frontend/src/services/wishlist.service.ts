import { IProduct } from '@/types';
import { productService } from './product.service';

const WISHLIST_KEY = 'lemari_thrift_wishlist';

interface IWishlistItem {
  id: string;
  product: IProduct;
}

const getLocalWishlist = (): IWishlistItem[] => {
  try {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalWishlist = (wishlist: IWishlistItem[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

export const wishlistService = {
  getWishlist: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getLocalWishlist();
  },
  add: async (data: { productId: string | number }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const wishlist = getLocalWishlist();
    
    const existing = wishlist.find(w => String(w.product.id) === String(data.productId));
    if (existing) {
      return { success: true, data: existing };
    }
    
    try {
      const prodRes: any = await productService.getProduct(String(data.productId));
      const product = prodRes?.data || prodRes;
      if (!product || !product.id) throw new Error('Product not found');
      
      const newItem: IWishlistItem = {
        id: Date.now().toString(),
        product
      };
      
      wishlist.push(newItem);
      saveLocalWishlist(wishlist);
      return { success: true, data: newItem };
    } catch (e) {
      throw e;
    }
  },
  remove: async (id: string | number) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let wishlist = getLocalWishlist();
    // In wishlist, id might refer to wishlist item id OR product id. 
    // To be safe, we remove if either item.id or product.id matches.
    wishlist = wishlist.filter(w => String(w.id) !== String(id) && String(w.product.id) !== String(id));
    saveLocalWishlist(wishlist);
    return { success: true };
  },
};
