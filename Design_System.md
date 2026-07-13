# Design System

# LemariThrift

Version : 1.0

Status : Draft

---

# Overview

Design System menjadi standar visual yang digunakan oleh seluruh halaman pada LemariThrift.

Dokumen ini melengkapi DESIGN.md dengan aturan implementasi teknis yang harus dipatuhi selama proses pengembangan.

Semua komponen UI harus menggunakan token yang didefinisikan di sini dan tidak diperbolehkan menggunakan nilai hardcoded.

---

# Design Principles

- Minimalis
- Modern
- Fashion Editorial
- High Contrast
- Image First
- Consistent
- Mobile First

---

# Color Tokens

## Primary

Digunakan untuk:

- Primary Button
- Active State
- CTA

```css
primary-50
primary-100
primary-200
primary-300
primary-400
primary-500
primary-600
primary-700
primary-800
primary-900
```

---

## Neutral

Background

Surface

Card

Border

Typography

---

## Semantic

Success

Warning

Danger

Info

---

# Typography

## Display

Hero

Section Title

Product Title

---

## Heading

H1

H2

H3

H4

---

## Body

Large

Medium

Small

Caption

---

# Spacing

Menggunakan kelipatan 4.

```
4
8
12
16
20
24
32
40
48
64
80
96
```

---

# Radius

```
0
4
8
12
16
9999
```

Gunakan radius sekecil mungkin agar selaras dengan identitas visual.

---

# Shadow

Shadow digunakan secara minimal.

```
shadow-sm

shadow-md

shadow-lg
```

Hero tidak menggunakan shadow.

---

# Grid System

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

---

# Responsive Breakpoint

Mobile

<768

Tablet

768

Laptop

1024

Desktop

1280

Wide

1536

---

# Icons

Library

Lucide React

Ukuran

16

20

24

32

40

---

# Buttons

Variant

Primary

Secondary

Outline

Ghost

Danger

Loading

Disabled

Semua button memiliki tinggi minimum 48px.

---

# Inputs

Variant

Default

Focus

Error

Disabled

Semua input memiliki label.

Placeholder bukan pengganti label.

---

# Cards

Card memiliki struktur:

Image

↓

Content

↓

Action

---

# Image Rules

Seluruh gambar menggunakan lazy loading.

Gunakan rasio:

1:1

4:5

16:9

Produk menggunakan object-cover.

---

# Motion

Gunakan Framer Motion.

Durasi

150ms

200ms

300ms

Animation hanya digunakan untuk:

Modal

Drawer

Dropdown

Hover

Page Transition

---

# Accessibility

Kontras minimum WCAG AA.

Keyboard Navigation.

Visible Focus Ring.

Alt Text wajib.

ARIA Label wajib.

---

# Dark Mode

Versi pertama menggunakan satu tema.

Dark Mode akan menjadi fitur pada versi berikutnya.

---

# Design Rules

Tidak menggunakan inline style.

Tidak menggunakan warna di luar token.

Tidak menggunakan font di luar DESIGN.md.

Tidak membuat komponen baru sebelum mengecek COMPONENT_GUIDE.md.

Semua halaman wajib responsive.