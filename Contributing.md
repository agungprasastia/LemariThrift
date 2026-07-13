# Contributing Guide

# LemariThrift

Version : 1.0

---

# Branch Strategy

main

Production

develop

Development

feature/*

New Feature

fix/*

Bug Fix

hotfix/*

Production Fix

---

# Git Flow

feature

↓

develop

↓

testing

↓

main

---

# Branch Naming

feature/login-page

feature/product-card

feature/wishlist

fix/navbar

fix/cart

hotfix/payment

---

# Commit Convention

Menggunakan Conventional Commit.

feat:

fix:

docs:

style:

refactor:

perf:

test:

build:

ci:

chore:

---

# Example Commit

```
feat(product): add wishlist feature

fix(cart): update quantity bug

docs: update PRD

refactor(home): simplify hero component
```

---

# Pull Request

Setiap Pull Request harus:

Menjelaskan perubahan.

Menyertakan screenshot jika ada perubahan UI.

Lulus lint.

Tidak memiliki conflict.

---

# Code Style

Menggunakan:

ESLint

Prettier

TypeScript Strict

Import Sorting

---

# File Naming

Pages

PascalCase

Components

PascalCase

Hooks

camelCase

Services

camelCase

Types

PascalCase

Constants

UPPER_SNAKE_CASE

---

# Folder Rules

Tidak membuat folder baru tanpa alasan.

Tidak membuat duplicate component.

Gunakan struktur Feature-Based.

---

# Component Rules

Component maksimal memiliki satu tanggung jawab.

Tidak boleh memanggil API.

Tidak boleh memiliki business logic.

---

# API Rules

Semua request melalui Service.

Tidak boleh menggunakan fetch langsung.

Gunakan Axios Instance.

---

# Review Checklist

Sebelum Merge pastikan:

Kode sudah di-format.

Lint berhasil.

Tidak ada console.log.

Tidak ada TODO.

Semua type aman.

Responsive.

Accessibility.

---

# Testing Checklist

Desktop

Tablet

Mobile

Chrome

Edge

Firefox

---

# Documentation

Jika membuat:

Feature baru

Component baru

API baru

Maka dokumentasi terkait wajib diperbarui:

PRD.md

API_MAPPING.md

COMPONENT_GUIDE.md

ROUTING.md

DESIGN_SYSTEM.md

STATE_MANAGEMENT.md

---

# AI Development Rules

Jika menggunakan AI Coding Assistant (Claude Code, Cursor, GitHub Copilot, Gemini CLI, dsb.), AI harus mengikuti seluruh dokumen berikut sebagai sumber kebenaran (single source of truth):

1. PRD.md
2. Frontend_Architecture.md
3. API_MAPPING.md
4. COMPONENT_GUIDE.md
5. ROUTING.md
6. DESIGN.md
7. DESIGN_SYSTEM.md
8. STATE_MANAGEMENT.md

AI tidak diperbolehkan:

- Membuat struktur folder di luar Frontend_Architecture.md.
- Menambahkan endpoint yang tidak terdapat pada API_MAPPING.md.
- Membuat komponen baru tanpa mengikuti COMPONENT_GUIDE.md.
- Mengubah design token di luar DESIGN.md dan DESIGN_SYSTEM.md.
- Menyimpan business logic di dalam komponen UI.

Setiap implementasi baru harus tetap konsisten dengan arsitektur, desain, dan standar proyek LemariThrift.