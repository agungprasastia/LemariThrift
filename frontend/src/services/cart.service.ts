import { ICartItem, IProduct } from '@/types';
import { productService } from './product.service';

const CART_KEY = 'lemari_thrift_cart';

const getLocalCart = (): ICartItem[] => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalCart = (cart: ICartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const cartService = {
  getCart: async () => {
    // Delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 300));
    return getLocalCart();
  },
  add: async (data: { productId: string | number, quantity: number }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const cart = getLocalCart();
    
    // Check if already in cart
    const existing = cart.find(c => String(c.product.id) === String(data.productId));
    if (existing) {
      existing.quantity += data.quantity;
      saveLocalCart(cart);
      return { success: true, data: existing };
    }
    
    // Need to fetch product details to store in cart (simulate backend behavior)
    try {
      const prodRes: any = await productService.getProduct(String(data.productId));
      const product = prodRes?.data || prodRes; // adapt to whatever axios returns
      if (!product || !product.id) throw new Error('Product not found');
      
      const newItem: ICartItem = {
        id: Date.now().toString(),
        product,
        quantity: data.quantity
      };
      
      cart.push(newItem);
      saveLocalCart(cart);
      return { success: true, data: newItem };
    } catch (e) {
      throw e;
    }
  },
  update: async (id: string | number, data: { quantity: number }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const cart = getLocalCart();
    const item = cart.find(c => String(c.id) === String(id));
    if (item) {
      item.quantity = data.quantity;
      saveLocalCart(cart);
    }
    return { success: true };
  },
  remove: async (id: string | number) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let cart = getLocalCart();
    cart = cart.filter(c => String(c.id) !== String(id));
    saveLocalCart(cart);
    return { success: true };
  },
};
