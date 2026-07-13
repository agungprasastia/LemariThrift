# API_MAPPING.md

# LemariThrift

Version : 1.0

---

# Overview

Dokumen ini menjadi penghubung antara Backend API dengan Frontend.

Setiap endpoint backend harus memiliki:

- Service
- Custom Hook
- Type
- Validation Schema
- UI Page

Sehingga seluruh komunikasi API bersifat konsisten.

---

# Authentication

| Backend Endpoint | Method | Service | Hook | Page |
|-----------------|--------|---------|------|------|
| /login | POST | authService.login | useLogin | Login |
| /register | POST | authService.register | useRegister | Register |
| /logout | POST | authService.logout | useLogout | Navbar |
| /me | GET | authService.me | useCurrentUser | Global Provider |

---

# Product

| Endpoint | Method | Service | Hook | Page |
|-----------|--------|---------|------|------|
| /products | GET | productService.getProducts | useProducts | Shop |
| /products/{slug} | GET | productService.getProduct | useProduct | Product Detail |
| /products/latest | GET | productService.getLatest | useLatestProduct | Home |
| /products/popular | GET | productService.getPopular | usePopularProduct | Home |

---

# Categories

| Endpoint | Method | Service | Hook | Page |
|-----------|--------|---------|------|------|
| /categories | GET | categoryService.getAll | useCategories | Navbar |
| /categories/{slug} | GET | categoryService.getCategory | useCategory | Category |

---

# Wishlist

| Endpoint | Method | Service | Hook | Page |
|-----------|--------|---------|------|------|
| /wishlist | GET | wishlistService.getWishlist | useWishlist | Wishlist |
| /wishlist | POST | wishlistService.add | useAddWishlist | Product Detail |
| /wishlist/{id} | DELETE | wishlistService.remove | useRemoveWishlist | Wishlist |

---

# Cart

| Endpoint | Method | Service | Hook | Page |
|-----------|--------|---------|------|------|
| /cart | GET | cartService.getCart | useCart | Cart |
| /cart | POST | cartService.add | useAddCart | Product Detail |
| /cart/{id} | PATCH | cartService.update | useUpdateCart | Cart |
| /cart/{id} | DELETE | cartService.remove | useDeleteCart | Cart |

---

# Orders

| Endpoint | Method | Service | Hook | Page |
|-----------|--------|---------|------|------|
| /orders | GET | orderService.getOrders | useOrders | Orders |
| /orders | POST | orderService.checkout | useCheckout | Checkout |
| /orders/{id} | GET | orderService.detail | useOrderDetail | Order Detail |

---

# Profile

| Endpoint | Method | Service | Hook | Page |
|-----------|--------|---------|------|------|
| /profile | GET | profileService.getProfile | useProfile | Profile |
| /profile | PUT | profileService.update | useUpdateProfile | Profile |

---

# Service Rules

Semua request dilakukan melalui folder:

services/

Tidak ada Axios langsung pada Components maupun Pages.

---

# Hook Rules

Setiap Service wajib memiliki Custom Hook.

Contoh

Product

↓

productService.ts

↓

useProducts.ts

↓

ProductGrid.tsx

---

# Error Handling

API harus mengembalikan

- success
- message
- data
- errors

Semua error ditampilkan menggunakan Toast.

---

# Cache Strategy

Products

10 menit

Categories

1 jam

Wishlist

Realtime

Cart

Realtime

Orders

No Cache

Profile

30 menit