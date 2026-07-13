# Routing

# LemariThrift

Version : 1.0

---

# Routing Strategy

Menggunakan

React Router DOM

Nested Routing

Protected Route

Lazy Loading

---

# Public Routes

/

Home

/login

Register

/register

Shop

/shop

Product Detail

/product/:slug

Category

/category/:slug

Search

/search

About

/about

---

# Protected Routes

/cart

Wishlist

/wishlist

Checkout

/checkout

Orders

/orders

Profile

/profile

Settings

/settings

---

# Authentication Flow

Guest

↓

Login

↓

JWT

↓

Protected Route

↓

Dashboard User

---

# Route Structure

Main Layout

├── Home

├── Shop

├── Product

├── Category

├── Search

├── About

└── Contact

---

Auth Layout

├── Login

└── Register

---

User Layout

├── Profile

├── Wishlist

├── Orders

├── Checkout

└── Cart

---

# Route Guards

Guest

Tidak boleh mengakses

Checkout

Orders

Wishlist

Profile

---

Authenticated User

Tidak boleh kembali ke

Login

Register

---

# Lazy Loading

Seluruh halaman menggunakan lazy loading.

Contoh

Home

Shop

Product

Checkout

Orders

Profile

---

# Breadcrumb

Home

↓

Shop

↓

Category

↓

Product

---

# Navigation Rules

Navbar selalu tampil.

Footer tidak tampil pada

Checkout

Authentication

404

500

---

# Scroll Behavior

Pergantian halaman

↓

Scroll ke atas otomatis.

---

# Error Routes

404

500

Unauthorized

Forbidden

---

# SEO Routes

Title

Description

Open Graph

Canonical URL

dibuat dinamis berdasarkan halaman.

---

# Future Routes

/live

Flash Sale

/auction

Lelang

/community

Komunitas

/notifications

Notifikasi

/chat

Customer Service