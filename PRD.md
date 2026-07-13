# Product Requirements Document (PRD)

# LemariThrift

Version : 1.0
Status : Draft
Owner : LemariThrift Team

---

# 1. Product Overview

## Product Name

LemariThrift

## Vision

LemariThrift adalah platform e-commerce khusus fashion thrifting yang menyediakan pengalaman berbelanja barang thrift premium secara modern, cepat, aman, dan nyaman.

Platform ini memungkinkan pengguna menemukan pakaian thrift berkualitas, melakukan pencarian produk secara mudah, membeli produk secara online, serta mengikuti update koleksi terbaru.

Frontend akan dikembangkan menggunakan React + Vite yang terhubung dengan REST API Backend.

---

# 2. Problem Statement

Saat ini pembelian barang thrift masih banyak dilakukan melalui Instagram atau WhatsApp sehingga memiliki beberapa kendala:

- sulit mencari produk tertentu
- stok sering tidak terupdate
- proses checkout manual
- tidak memiliki histori transaksi
- sulit mengetahui barang terbaru

LemariThrift hadir untuk mendigitalisasi proses tersebut menjadi marketplace modern.

---

# 3. Goals

Website harus mampu:

- Menampilkan katalog produk thrift
- Mempermudah proses pembelian
- Mempercepat pencarian produk
- Menyediakan informasi produk secara lengkap
- Memberikan pengalaman pengguna yang modern

---

# 4. Target Users

Primary Users

- Mahasiswa
- Remaja
- Dewasa muda
- Pecinta fashion thrift

Secondary Users

- Reseller
- Kolektor vintage
- Fashion enthusiast

---

# 5. Product Scope

Frontend meliputi:

- Landing Page
- Authentication
- Product Catalog
- Product Detail
- Search
- Wishlist
- Cart
- Checkout
- Order History
- User Profile

Admin Panel berada pada Backend.

---

# 6. User Roles

## Guest

Dapat:

- melihat produk
- mencari produk
- melihat kategori

Tidak dapat:

- checkout
- wishlist
- order

---

## Customer

Dapat:

- login
- register
- logout
- checkout
- wishlist
- melihat riwayat pembelian
- mengubah profile

---

# 7. Functional Requirements

## Authentication

- Login
- Register
- Logout
- Forgot Password (Future)

---

## Home

Menampilkan

- Hero Banner
- Featured Product
- New Arrival
- Popular Product
- Categories
- Promo Banner

---

## Product

Fitur

- Product List
- Product Detail
- Related Product
- Product Search
- Product Filter
- Product Sorting

---

## Wishlist

- Tambah Wishlist
- Hapus Wishlist

---

## Cart

- Tambah Produk
- Hapus Produk
- Update Quantity

---

## Checkout

- Ringkasan Pesanan
- Alamat Pengiriman
- Metode Pembayaran
- Konfirmasi Pembelian

---

## Orders

- Pending
- Processing
- Shipping
- Completed
- Cancelled

---

## Profile

- Edit Profile
- Change Password
- Address Management

---

# 8. Non Functional Requirements

Website harus:

- Responsive
- Mobile First
- Fast Loading
- SEO Friendly
- Secure Authentication
- Reusable Components
- Accessible
- Clean Code

---

# 9. API Integration

Frontend akan menggunakan REST API dari repository Backend.

Endpoint meliputi:

- Authentication
- User
- Product
- Category
- Cart
- Wishlist
- Order
- Payment

Semua endpoint menggunakan JSON.

Authentication menggunakan JWT Token.

---

# 10. User Journey

Guest

↓

Landing Page

↓

Browse Product

↓

Product Detail

↓

Login/Register

↓

Add to Cart

↓

Checkout

↓

Payment

↓

Order Success

---

# 11. Success Metrics

Target keberhasilan:

- User dapat membeli produk tanpa hambatan
- Loading halaman < 2 detik
- Responsive pada seluruh device
- Bounce Rate rendah
- Conversion meningkat

---

# 12. Future Features

- Live Shopping
- Flash Sale
- Voucher
- Loyalty Point
- AI Recommendation
- Chat dengan Admin
- Product Review
- Notification
- Dark Mode

---

# 13. Dependencies

Frontend membutuhkan:

- Backend API
- Authentication Service
- Product Image Storage
- Payment Gateway
- Shipping API

---

# 14. Out of Scope

Versi pertama tidak mencakup:

- Admin Dashboard
- Live Streaming
- AI Recommendation
- Chat Customer Service
- Multi Vendor

---

# 15. Design Reference

Dokumen ini hanya menjelaskan kebutuhan produk.

Seluruh implementasi visual mengacu pada:

DESIGN.md

yang berisi:

- Design Language
- Color System
- Typography
- Components
- Grid
- Responsive Layout
- Motion
- UI Pattern
