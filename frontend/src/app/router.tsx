import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { UserLayout } from '@/components/layout/UserLayout';
import { PageLoader } from '@/components/ui/PageLoader';

// Lazy loaded pages
const HomePage = React.lazy(() => import('@/features/home/pages/HomePage').then(module => ({ default: module.HomePage })));
const ShopPage = React.lazy(() => import('@/features/product/pages/ShopPage').then(module => ({ default: module.ShopPage })));
const ProductDetailPage = React.lazy(() => import('@/features/product/pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const WishlistPage = React.lazy(() => import('@/features/wishlist/pages/WishlistPage').then(module => ({ default: module.WishlistPage })));
const CartPage = React.lazy(() => import('@/features/cart/pages/CartPage').then(module => ({ default: module.CartPage })));
const CheckoutPage = React.lazy(() => import('@/features/orders/pages/CheckoutPage').then(module => ({ default: module.CheckoutPage })));
const OrdersPage = React.lazy(() => import('@/features/orders/pages/OrdersPage').then(module => ({ default: module.OrdersPage })));
const ProfilePage = React.lazy(() => import('@/features/profile/pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const LoginPage = React.lazy(() => import('@/features/auth/pages/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = React.lazy(() => import('@/features/auth/pages/RegisterPage').then(module => ({ default: module.RegisterPage })));

// Placeholder components for routing
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <h1 className="text-2xl font-bold uppercase tracking-machined">{title}</h1>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ShopPage /> },
      { path: 'product/:slug', element: <ProductDetailPage /> },
      { path: 'category/:slug', element: <ShopPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: 'profile',
    element: <UserLayout />,
    children: [
      { index: true, element: <ProfilePage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'address', element: <Placeholder title="Address Page" /> },
    ],
  }
]);

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
