# Component Guide

# LemariThrift

Version : 1.0

---

# Overview

Seluruh komponen mengikuti prinsip:

Reusable

Composable

Accessible

Responsive

---

# Folder Structure

components/

ui/

layout/

common/

feedback/

forms/

---

# UI Components

## Button

Props

variant

size

loading

disabled

icon

onClick

Variant

Primary

Secondary

Outline

Ghost

Danger

---

## Input

Props

label

placeholder

error

helperText

required

disabled

---

## Badge

Variant

Success

Warning

Danger

New

Sale

---

## Card

Base Component

ProductCard

CategoryCard

OrderCard

WishlistCard

---

## Modal

Reusable

Props

title

description

open

onClose

children

---

## Drawer

Digunakan pada

Mobile Menu

Cart

Filter

---

## Skeleton

Jenis

Product Skeleton

Order Skeleton

Profile Skeleton

---

## Empty State

Digunakan ketika

Cart kosong

Wishlist kosong

Search kosong

Order kosong

---

## Pagination

Desktop

Pagination Number

Mobile

Load More

---

# Layout Components

Navbar

Footer

Container

Section

Breadcrumb

PageHeader

---

# Home Components

Hero

Category Section

Featured Product

Popular Product

Promo Banner

Newsletter

---

# Product Components

Product Card

Product Grid

Product Image

Product Gallery

Price Section

Variant Selector

Size Selector

Stock Badge

Add To Cart Button

Wishlist Button

Related Product

---

# Cart Components

Cart Item

Quantity Button

Summary Card

Coupon Input

Checkout Button

---

# Checkout Components

Shipping Form

Payment Method

Order Summary

Success Dialog

---

# Profile Components

Profile Card

Edit Profile Form

Address Card

Order History

---

# Feedback Components

Toast

Alert

Loading

Error Screen

404 Screen

500 Screen

---

# Naming Convention

Component

PascalCase

Folder

camelCase

Props

camelCase

Interface

IComponentProps

---

# Component Rules

Komponen tidak boleh memanggil API secara langsung.

Semua data berasal dari Hook.

Komponen wajib reusable.

Komponen wajib responsive.

Komponen wajib mengikuti DESIGN.md.

Tidak boleh menggunakan inline style.

Seluruh styling menggunakan Tailwind CSS.

---

# Accessibility

Semua Button

aria-label

Semua Input

label

Semua Image

alt

Semua Form

keyboard friendly