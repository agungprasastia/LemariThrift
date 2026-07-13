# Frontend Architecture

# LemariThrift

Version : 1.0

Status : Draft

---

# 1. Overview

Frontend LemariThrift dibangun menggunakan React dan Vite dengan pendekatan Feature-Based Architecture.

Arsitektur ini dipilih agar kode tetap scalable, mudah dipelihara, reusable, serta mempermudah pengembangan fitur baru tanpa memengaruhi modul lainnya.

Frontend akan berkomunikasi dengan Backend menggunakan REST API melalui Axios dengan autentikasi JWT.

---

# 2. Technology Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Library |
| Vite | Build Tool |
| React Router DOM | Routing |
| Axios | API Request |
| TanStack Query | Server State |
| React Hook Form | Form Handling |
| Zod | Validation |
| Tailwind CSS | Styling |
| Framer Motion | Animation |
| Lucide React | Icons |
| React Hot Toast | Notification |
| clsx | Conditional Styling |

---

# 3. Architecture Principles

Frontend mengikuti beberapa prinsip utama.

## Separation of Concerns

UI tidak boleh langsung memanggil API.

Setiap request dilakukan melalui Service Layer.

---

## Reusable Components

Semua komponen yang dapat digunakan kembali ditempatkan pada folder components.

---

## Feature Based

Kode dipisahkan berdasarkan fitur, bukan berdasarkan tipe file.

Contoh:

Authentication

Product

Wishlist

Checkout

Profile

Order

---

## Atomic UI

Komponen kecil digunakan untuk membentuk komponen yang lebih besar.

Contoh

Button

↓

Product Card

↓

Product Grid

↓

Home Page

---

## Single Responsibility

Satu file hanya memiliki satu tanggung jawab.

Contoh

ProductCard hanya bertugas menampilkan produk.

Tidak boleh melakukan request API.

---

# 4. Folder Structure

```text
src/

├── app/
│   ├── router.tsx
│   ├── providers.tsx
│   └── App.tsx
│
├── assets/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── common/
│   └── feedback/
│
├── features/
│
│   ├── auth/
│   ├── home/
│   ├── product/
│   ├── wishlist/
│   ├── cart/
│   ├── checkout/
│   ├── profile/
│   ├── orders/
│   └── search/
│
├── hooks/
│
├── services/
│
├── lib/
│
├── utils/
│
├── types/
│
├── constants/
│
├── styles/
│
└── main.tsx
```

---

# 5. Feature Structure

Setiap feature memiliki struktur yang sama.

```text
product/

├── api/
│
├── components/
│
├── hooks/
│
├── pages/
│
├── schemas/
│
├── services/
│
├── types/
│
└── index.ts
```

Penjelasan

api/

request API khusus Product.

components/

komponen Product.

hooks/

custom hook.

pages/

halaman.

schemas/

validasi.

services/

business logic.

types/

TypeScript types.

---

# 6. Routing

Menggunakan React Router DOM.

```text
/

├── Home

/login

/register

/shop

/product/:slug

/category/:slug

/cart

/checkout

/orders

/profile

/search
```

---

# 7. Layout Architecture

Website memiliki tiga layout utama.

```text
Main Layout

├── Navbar
├── Page
└── Footer

Dashboard Layout

├── Sidebar
└── Content

Auth Layout

└── Authentication Pages
```

---

# 8. State Management

Frontend menggunakan dua jenis state.

## Server State

Menggunakan TanStack Query.

Digunakan untuk:

- Product
- Category
- Order
- Wishlist
- Cart

---

## Client State

Menggunakan React Hooks.

Digunakan untuk:

- Modal
- Drawer
- Search Input
- Theme
- Sidebar

---

# 9. API Layer

Semua komunikasi API melalui folder services.

Contoh

```text
services/

axios.ts

auth.service.ts

product.service.ts

cart.service.ts

wishlist.service.ts

order.service.ts
```

UI tidak boleh menggunakan Axios secara langsung.

---

# 10. Authentication Flow

```text
Login

↓

Backend

↓

JWT Token

↓

Local Storage

↓

Axios Interceptor

↓

Protected Route
```

Jika token kadaluarsa

↓

Logout otomatis

↓

Redirect Login

---

# 11. API Flow

```text
Page

↓

Custom Hook

↓

Service

↓

Axios

↓

Backend API

↓

Response

↓

TanStack Query Cache

↓

UI
```

---

# 12. Data Fetching Strategy

Data dibagi menjadi dua.

### Static

- Categories
- Homepage Banner

Menggunakan cache.

---

### Dynamic

- Cart
- Wishlist
- Orders

Selalu sinkron dengan backend.

---

# 13. Error Handling

Error dibagi menjadi:

Validation Error

404

401

403

500

Semua error menggunakan komponen ErrorToast.

---

# 14. Loading Strategy

Menggunakan

Skeleton Loading

Spinner

Lazy Loading

Infinite Scroll (Future)

---

# 15. Security

Menggunakan

JWT Authentication

Protected Route

Axios Interceptor

HTTPS

Input Validation

XSS Protection

---

# 16. Performance Strategy

Code Splitting

Lazy Loading

Image Optimization

Memoization

React Query Cache

Pagination

Virtual Rendering (Future)

---

# 17. Responsive Strategy

Breakpoint

Mobile

Tablet

Laptop

Desktop

Semua halaman menggunakan Mobile First Design.

---

# 18. Naming Convention

Component

PascalCase

```text
ProductCard.tsx
```

Hooks

camelCase

```text
useProduct.ts
```

Service

camelCase

```text
productService.ts
```

Constants

UPPER_SNAKE_CASE

```text
API_URL
```

---

# 19. Coding Standards

Menggunakan

ESLint

Prettier

Husky

Lint Staged

Import Sorting

TypeScript Strict Mode

---

# 20. Future Scalability

Arsitektur dirancang agar mudah dikembangkan untuk:

- Mobile App
- PWA
- Multi Vendor
- Live Shopping
- AI Recommendation
- Real-time Notification
- Chat
- Payment Gateway
- Multi Language

---

# 21. Development Workflow

Feature baru dikembangkan dengan urutan berikut.

1. Membuat Type

↓

2. Membuat Schema

↓

3. Membuat API Service

↓

4. Membuat Custom Hook

↓

5. Membuat Components

↓

6. Membuat Pages

↓

7. Menambahkan Route

↓

8. Testing

↓

9. Code Review

↓

10. Merge

---

# 22. Architecture Summary

Frontend LemariThrift dibangun menggunakan Feature-Based Architecture dengan pemisahan yang jelas antara UI, Business Logic, dan API Layer.

Seluruh request dilakukan melalui Service Layer, data server dikelola menggunakan TanStack Query, sedangkan tampilan dibangun menggunakan reusable component berbasis React dan Tailwind CSS.

Arsitektur ini dirancang agar scalable, mudah dipelihara, dan siap mendukung pengembangan fitur di masa mendatang.