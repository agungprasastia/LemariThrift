export interface ICategory {
  id: string | number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface IProduct {
  id: string | number;
  slug: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  images?: string[];
  imageUrls?: string[];
  category?: ICategory | string;
  isNew?: boolean;
  isSale?: boolean;
  stock?: number;
  brand?: string;
  condition?: string;
  size?: string;
}

export interface ICartItem {
  id: string | number;
  product: IProduct;
  quantity: number;
}

export interface IOrderItem {
  id: string | number;
  product: IProduct;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string | number;
  orderNumber: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled' | string;
  totalAmount: number;
  items: IOrderItem[];
}

export interface IUser {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
}
