# State Management

# LemariThrift

Version : 1.0

---

# Overview

Frontend menggunakan kombinasi:

TanStack Query

React Hooks

Context API

State dibagi menjadi dua kategori utama.

---

# Server State

Menggunakan TanStack Query.

Contoh:

Products

Orders

Categories

Wishlist

Cart

Profile

---

# Client State

Menggunakan React Hook.

Contoh

Modal

Drawer

Sidebar

Search

Theme

Loading

---

# Context API

Digunakan hanya untuk state global.

Contoh

Authentication

Shopping Cart Count

User Information

Application Settings

---

# Query Structure

Setiap feature memiliki query sendiri.

Contoh

Product

↓

useProducts()

↓

productService

↓

Backend

---

# Mutation Structure

Contoh

Add Wishlist

↓

Mutation

↓

Success

↓

Invalidate Query

↓

Refresh UI

---

# Query Key Convention

products

product-detail

categories

wishlist

cart

orders

profile

search

---

# Cache Time

Products

10 Minutes

Categories

1 Hour

Profile

30 Minutes

Wishlist

Realtime

Cart

Realtime

Orders

No Cache

---

# Invalidation Rules

Create Product

↓

Invalidate Products

Update Cart

↓

Invalidate Cart

Checkout

↓

Invalidate Cart

↓

Invalidate Orders

Update Profile

↓

Invalidate Profile

---

# Optimistic Update

Digunakan pada:

Wishlist

Cart

Like

Favorite

---

# Error Handling

Semua request wajib memiliki:

Loading

Error

Success

Tidak boleh hanya Success.

---

# Local Storage

Digunakan hanya untuk:

JWT

Theme

Remember Login

Tidak digunakan untuk data bisnis.

---

# State Rules

Komponen tidak boleh menyimpan data server.

Data server hanya berasal dari Query.

Mutation tidak boleh dipanggil langsung dari UI.

Semua mutation melalui Hook.

---

# Folder

```
hooks/

services/

providers/

```

---

# Best Practices

Gunakan Query untuk GET.

Gunakan Mutation untuk POST PUT DELETE.

Gunakan cache.

Gunakan invalidateQuery.

Hindari prop drilling.

Gunakan memo seperlunya.