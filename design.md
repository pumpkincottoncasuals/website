# Pumkin Cotton Casuals — Design System & Specification

> **Reference source:** [FirstCry.com](https://www.firstcry.com/) — Landing Page, Catalogue/Boutique Page, and Product Detail Page.
> Measured from **513 rendered elements** at **1280 × 873 px** viewport.

---

## Table of Contents

1. [Brand Overview](#1-brand-overview)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Corner Radii](#5-corner-radii)
6. [Shadows & Elevation](#6-shadows--elevation)
7. [Motion & Animation](#7-motion--animation)
8. [Component Specifications](#8-component-specifications)
9. [Page-Level Layouts](#9-page-level-layouts)
10. [Responsive Strategy](#10-responsive-strategy)
11. [Tech Stack & Tooling](#11-tech-stack--tooling)
12. [Implementation Notes](#12-implementation-notes)

---

## 1. Brand Overview

**Pumkin Cotton Casuals** is an online children's clothing e-commerce store. The design language draws inspiration from leading Indian kids' e-commerce platforms, prioritizing:

- **Clean, white-dominant surfaces** for product visibility
- **Warm accent colors** (oranges, reds, greens) for CTAs and pricing
- **Neutral gray typography** for readability without visual heaviness
- **Minimal shadows** — flat, modern aesthetic
- **Dense, information-rich layouts** optimized for browsing large catalogues

### Design Principles

| Principle            | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| **Product-first**    | White backgrounds ensure product images are the visual hero                 |
| **Trust signals**    | Green badges, star ratings, and delivery info build purchase confidence     |
| **Scan-friendly**    | Consistent card grids and clear typographic hierarchy enable fast browsing  |
| **Action-oriented**  | High-contrast CTA buttons (green, orange) drive add-to-cart & checkout     |
| **Mobile-conscious** | Compact spacing and touch-friendly targets translate well to small screens |

---

## 2. Color System

### 2.1 Text Colors

| Token                  | CSS Value              | Hex       | Usage                                          | Occurrences |
| ---------------------- | ---------------------- | --------- | ---------------------------------------------- | ----------- |
| `--text-primary`       | `rgb(54, 54, 54)`      | `#363636` | Primary headings, navigation labels             | 23          |
| `--text-secondary`     | `rgb(72, 72, 72)`      | `#484848` | Subheadings, product titles                     | 39          |
| `--text-body`          | `rgb(87, 87, 87)`      | `#575757` | Body text, descriptions, meta info              | 55          |
| `--text-muted`         | `rgb(97, 97, 97)`      | `#616161` | Secondary labels, helper text                   | 35          |
| `--text-dark`          | `rgb(33, 33, 33)`      | `#212121` | Product detail page headings, bold labels       | 17          |
| `--text-subtle`        | `rgb(117, 117, 117)`   | `#757575` | Tertiary info, timestamps, metadata             | 10          |
| `--text-disabled`      | `rgb(158, 158, 158)`   | `#9E9E9E` | Disabled states, placeholder-like text          | 12          |
| `--text-placeholder`   | `rgb(149, 149, 149)`   | `#959595` | Form placeholders, light captions               | 8           |
| `--text-faint`         | `rgb(66, 66, 66)`      | `#424242` | Product detail secondary text                   | 11          |
| `--text-white`         | `rgb(255, 255, 255)`   | `#FFFFFF` | Text on dark/colored backgrounds                | 7           |

### 2.2 Accent / Action Colors

| Token                  | CSS Value              | Hex       | Usage                                           | Occurrences |
| ---------------------- | ---------------------- | --------- | ----------------------------------------------- | ----------- |
| `--accent-orange`      | `rgb(255, 112, 67)`    | `#FF7043` | Promotional tags, offer labels                   | 7           |
| `--accent-red`         | `rgb(252, 59, 59)`     | `#FC3B3B` | Sale price, urgency, discount badges             | 7           |
| `--accent-red-dark`    | `rgb(224, 52, 0)`      | `#E03400` | Strikethrough/original price, error states       | 4           |
| `--accent-green`       | `rgb(32, 136, 51)`     | `#208833` | In-stock, delivery confirmation, success         | 3           |
| `--accent-blue`        | `rgb(20, 106, 255)`    | `#146AFF` | Links, interactive text elements                 | 8           |
| `--accent-blue-dark`   | `rgb(7, 69, 125)`      | `#07457D` | Visited/dark links, trust badges                 | 4           |
| `--accent-danger`      | `rgb(227, 41, 38)`     | `#E32926` | Critical alerts, out-of-stock                    | 1           |
| `--accent-orange-sale` | `rgb(221, 88, 8)`      | `#DD5808` | Catalogue sale/discount label                    | 1           |

### 2.3 Surface Colors

| Token                  | CSS Value              | Hex       | Usage                                           | Occurrences |
| ---------------------- | ---------------------- | --------- | ----------------------------------------------- | ----------- |
| `--surface-white`      | `rgb(255, 255, 255)`   | `#FFFFFF` | Primary background, cards, modals                | 13          |
| `--surface-light`      | `rgb(248, 248, 248)`   | `#F8F8F8` | Subtle alternate sections, hover states          | 2           |
| `--surface-green`      | `rgb(111, 195, 65)`    | `#6FC341` | CTA button background (search, subscribe)        | 3           |
| `--surface-dark`       | `rgb(61, 61, 61)`      | `#3D3D3D` | Footer input, dark-themed sections               | 1           |
| `--surface-teal-light` | `rgb(217, 243, 244)`   | `#D9F3F4` | Newsletter/promo banner background (ancestor)    | —           |

### 2.4 Border Colors

| Token                  | CSS Value              | Hex       | Usage                                           | Occurrences |
| ---------------------- | ---------------------- | --------- | ----------------------------------------------- | ----------- |
| `--border-default`     | `rgb(212, 212, 212)`   | `#D4D4D4` | Card borders, section dividers                   | 20          |
| `--border-light`       | `rgb(218, 218, 218)`   | `#DADADA` | Catalogue card borders, filter panel             | 8           |
| `--border-subtle`      | `rgb(245, 245, 245)`   | `#F5F5F5` | Very light dividers on product page              | 8           |
| `--border-white`       | `rgb(255, 255, 255)`   | `#FFFFFF` | Border on white-on-white (invisible default)     | 3           |
| `--border-black`       | `rgb(0, 0, 0)`         | `#000000` | High-contrast border (selected state)            | 2           |
| `--border-dark`        | `rgb(54, 54, 54)`      | `#363636` | Active/focus border on landing page              | 1           |
| `--border-input-dark`  | `rgb(45, 45, 45)`      | `#2D2D2D` | Dark-themed input borders (footer)               | 1           |
| `--border-input`       | `rgb(224, 224, 224)`   | `#E0E0E0` | Standard form input borders                      | 1           |

### 2.5 Color Map (Visual Reference)

```
Text Grays:       ████ #212121  ████ #363636  ████ #424242  ████ #484848  ████ #575757  ████ #616161  ░░░░ #757575  ░░░░ #959595  ░░░░ #9E9E9E
Accents:          🟥 #FC3B3B   🟧 #FF7043   🟩 #208833   🟦 #146AFF   🔵 #07457D
Surfaces:         ⬜ #FFFFFF   ▫️ #F8F8F8    🟢 #6FC341   ⬛ #3D3D3D   🩵 #D9F3F4
Borders:          ░░ #F5F5F5   ░░ #DADADA   ░░ #D4D4D4   ░░ #E0E0E0   ██ #000000
```

---

## 3. Typography

### 3.1 Font Families

| Token               | Family                  | Fallback Stack          | Usage Context                                  |
| -------------------- | ----------------------- | ----------------------- | ---------------------------------------------- |
| `--font-heading`     | `Jakarta-Medium`        | system-ui, sans-serif   | Product page headings, detail labels           |
| `--font-subheading`  | `RobotoMB`              | Roboto, sans-serif      | Landing page subheadings (24 px)               |
| `--font-body`        | `SourceSansPro-Regular` | Source Sans Pro, sans   | Body copy, labels, small text                  |
| `--font-ui`          | `RobotoLR`              | Roboto, Arial, sans     | Buttons, navigation, section headings, inputs  |

> **Implementation note:** For the Next.js project, use Google Fonts via `next/font/google`:
> - `Source_Sans_3` (replacement for SourceSansPro)
> - `Roboto` (replacement for RobotoLR/RobotoMB variants)
> - `Plus_Jakarta_Sans` (replacement for Jakarta-Medium)

### 3.2 Type Scale

| Role              | Family              | Size   | Weight | Line Height | Letter Spacing | Text Transform | Page Context       |
| ----------------- | ------------------- | ------ | ------ | ----------- | -------------- | -------------- | ------------------ |
| **Subheading**    | RobotoMB            | 24 px  | 400    | 15 px       | normal         | none           | Landing            |
| **Section Head**  | RobotoLR            | 18 px  | 400    | 18 px       | normal         | none           | Catalogue          |
| **Label**         | SourceSansPro       | 16 px  | 400    | 16 px       | normal         | capitalize     | Landing            |
| **Body**          | SourceSansPro       | 15 px  | 400    | 18 px       | normal         | none           | Landing, Catalogue |
| **Body (alt)**    | SourceSansPro       | 15 px  | 400    | 15 px       | normal         | capitalize     | Landing            |
| **Heading (PDP)** | Jakarta-Medium      | 14 px  | 400    | 21 px       | normal         | none           | Product Detail     |
| **Label (PDP)**   | Jakarta-Medium      | 12 px  | 400    | 18 px       | normal         | none           | Product Detail     |
| **Small**         | SourceSansPro       | 12 px  | 400    | 18 px       | normal         | none           | Catalogue          |
| **Small (alt)**   | RobotoLR            | 12 px  | 400    | 12 px       | normal         | uppercase      | Landing            |
| **Button**        | RobotoLR            | 12 px  | 400    | 12 px       | normal         | none           | All pages          |
| **Micro**         | RobotoLR            | 10 px  | 400    | normal      | normal         | none           | Newsletter CTA     |

### 3.3 Tailwind CSS Mapping

```css
/* Suggested custom font-size utilities */
--text-micro: 10px;    /* 0.625rem */
--text-xs:    12px;    /* 0.75rem  */
--text-sm:    13px;    /* 0.8125rem — search input */
--text-base:  14px;    /* 0.875rem — PDP heading */
--text-md:    15px;    /* 0.9375rem — body */
--text-lg:    16px;    /* 1rem — labels */
--text-xl:    18px;    /* 1.125rem — section headings */
--text-2xl:   24px;    /* 1.5rem — subheadings */
```

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

The design uses a **non-standard spacing scale** (not strictly 4 px or 8 px base). The most frequent values form a practical scale:

| Token   | Value    | Frequency | Common Usage                                        |
| ------- | -------- | --------- | --------------------------------------------------- |
| `sp-0`  | 2 px     | 24        | Tight inline gaps, icon margins                     |
| `sp-1`  | 3 px     | 12        | Minimal separation, border-radius companion         |
| `sp-2`  | 5 px     | 67        | Button padding, card internal padding, input px     |
| `sp-3`  | 6 px     | **94**    | ⭐ Most common — card gaps, row spacing, margins    |
| `sp-4`  | 7 px     | 30        | Vertical rhythm between text lines                  |
| `sp-5`  | 8 px     | 10        | PDP section spacing                                 |
| `sp-6`  | 10 px    | 55        | Section padding, input horizontal padding           |
| `sp-7`  | 15 px    | **85**    | ⭐ Primary section/card padding, vertical gaps      |
| `sp-8`  | 16 px    | 12        | PDP content padding                                 |
| `sp-9`  | 19 px    | 12        | Landing page block spacing                          |
| `sp-10` | 20 px    | 15        | Large section padding, PDP vertical rhythm          |
| `sp-11` | 24 px    | 4         | Major section breaks                                |
| `sp-12` | 32 px    | 3         | Page-level vertical spacing                         |
| `sp-13` | 40 px    | 2         | Hero/banner padding                                 |

### 4.2 Recommended Tailwind Spacing Mapping

```
p-1  → 2px    (0.125rem)
p-1.5 → 3px
p-2  → 5px    — button/input inline padding
p-2.5 → 6px   — ⭐ default card gap
p-3  → 7-8px  — vertical rhythm
p-4  → 10px   — section inner padding
p-5  → 15px   — ⭐ primary content padding
p-6  → 16px   — PDP padding
p-7  → 19-20px — large section spacing
p-8  → 24px   — section breaks
p-10 → 32px   — page spacing
p-12 → 40px   — hero spacing
```

### 4.3 Content Widths

| Element          | Width      | Context                     |
| ---------------- | ---------- | --------------------------- |
| **Main content** | 1012 px    | Product page wrapper        |
| **Half column**  | 506 px     | PDP two-column layout       |
| **Inner column** | 483 px     | PDP content within column   |
| **Viewport**     | 1280 px    | Reference design width      |

### 4.4 Layout Gaps

No explicit CSS `gap` values were observed in the reference. Spacing between grid/flex children is achieved via **margins and padding**.

---

## 5. Corner Radii

| Token          | Value  | Occurrences | Usage                                               |
| -------------- | ------ | ----------- | --------------------------------------------------- |
| `--radius-xs`  | 3 px   | 16          | Small buttons, tags, newsletter input, badges        |
| `--radius-sm`  | 5 px   | 12          | Search input, standard card corners                  |
| `--radius-md`  | 6 px   | 4           | Form inputs on PDP (pincode input)                   |
| `--radius-lg`  | 12 px  | 6           | Larger cards, image containers on PDP                |
| `--radius-xl`  | 28 px  | 4           | Pill-shaped buttons, rounded CTAs                    |
| `--radius-full`| 50%    | 8           | Circular elements — avatars, icon buttons, badges    |

### Tailwind Config Mapping

```js
borderRadius: {
  'xs':   '3px',
  'sm':   '5px',
  'md':   '6px',
  'lg':   '12px',
  'xl':   '28px',
  'full': '50%',
}
```

---

## 6. Shadows & Elevation

**No box-shadow values were observed** across any of the three page captures. The design relies on:

- **Borders** (`#D4D4D4`, `#DADADA`) to separate cards
- **Background color contrast** (`#F8F8F8` vs `#FFFFFF`) for depth
- **White space** for visual grouping

> This is intentional — a flat, no-shadow approach keeps the focus on product imagery and avoids visual noise in dense catalogue grids.

---

## 7. Motion & Animation

### 7.1 Transition Durations

| Value  | Easing     | Context                          |
| ------ | ---------- | -------------------------------- |
| 0.3 s  | ease-out   | Product page interactions        |
| 0.4 s  | ease       | Landing page transitions/hovers  |

### 7.2 Keyframe Animations

| Name              | Description                         |
| ----------------- | ----------------------------------- |
| `fb_transform`    | Facebook/social button animation    |
| `rotateSpinner`   | Loading spinner rotation            |

### 7.3 Recommended Implementation

```css
/* Tailwind transition utilities */
.transition-default {
  transition-duration: 300ms;
  transition-timing-function: ease-out;
}

.transition-slow {
  transition-duration: 400ms;
  transition-timing-function: ease;
}
```

---

## 8. Component Specifications

### 8.1 Search Input

The global search bar appears consistently across all pages.

| Property          | Value                           |
| ----------------- | ------------------------------- |
| Background        | `#FFFFFF`                       |
| Border            | 1 px solid `#FFFFFF` (flush)    |
| Border radius     | 5 px                            |
| Text color        | `#676767`                       |
| Font              | RobotoLR, 13 px, weight 400    |
| Line height       | 30 px                           |
| Padding           | 0 10 px 0 20 px (T R B L)       |
| Display           | inline-block                    |

```tsx
// Tailwind approximation
<input
  className="inline-block rounded-sm bg-white text-[13px] font-normal
             leading-[30px] text-[#676767] px-2.5 py-0
             border border-white focus:border-gray-300
             font-[var(--font-ui)]"
  placeholder="Search"
/>
```

### 8.2 Location Selector Button

Top-bar utility button with right border separator.

| Property          | Value                                 |
| ----------------- | ------------------------------------- |
| Background        | transparent                           |
| Border right      | 1 px solid `#D4D4D4`                 |
| Text color        | `#575757`                             |
| Font              | RobotoLR, 12 px, weight 400          |
| Line height       | 12 px                                 |
| Padding           | 0 5 px (horizontal)                   |

### 8.3 Green CTA / Subscribe Button

Used for newsletter signup and search submit.

| Property          | Value                              |
| ----------------- | ---------------------------------- |
| Background        | `#6FC341` (green)                  |
| Border            | none                               |
| Border radius     | 3 px                               |
| Text color        | `#FFFFFF`                          |
| Font              | RobotoLR, Arial, sans-serif       |
| Font size         | 10 px                              |
| Display           | inline-block                       |

```tsx
<button
  className="inline-block rounded-xs bg-[#6FC341] text-white
             text-[10px] font-normal border-none px-3 py-1
             hover:bg-[#5fb535] transition-default"
>
  Subscribe
</button>
```

### 8.4 Pincode Input (Catalogue — Dark Theme)

Used in the catalogue page footer/delivery section.

| Property          | Value                              |
| ----------------- | ---------------------------------- |
| Background        | `#3D3D3D`                          |
| Border            | 1 px solid `#2D2D2D`              |
| Border radius     | 3 px                               |
| Text color        | `#BDBDBD`                          |
| Font              | RobotoLR, 12 px                    |
| Padding           | 0 10 px (horizontal)               |

### 8.5 Pincode Input (Product Detail — Light Theme)

Used on the product detail page for delivery estimation.

| Property          | Value                              |
| ----------------- | ---------------------------------- |
| Background        | `#FFFFFF`                          |
| Border            | 1 px solid `#E0E0E0`              |
| Border radius     | 6 px                               |
| Text color        | `#424242`                          |
| Font              | Jakarta-Medium, 14 px              |
| Line height       | 21 px                              |
| Padding           | 5 px 16 px                         |

```tsx
<input
  className="inline-block rounded-md bg-white text-sm font-normal
             leading-[21px] text-[#424242] px-4 py-1.5
             border border-[#E0E0E0] focus:border-[#146AFF]
             font-[var(--font-heading)]"
  placeholder="Enter Pincode"
/>
```

### 8.6 Product Card (Catalogue Grid)

Inferred from catalogue page color/typography/spacing data:

```
┌─────────────────────────────┐  border: 1px solid #DADADA
│                             │  border-radius: 5px
│       [Product Image]       │  bg: #FFFFFF
│                             │
├─────────────────────────────┤
│ Brand Name          #757575 │  12px SourceSansPro
│ Product Title       #484848 │  15px SourceSansPro
│ ★★★★☆ (4.2)       #FF7043 │  12px RobotoLR
│                             │
│ ₹599  ₹999  40% OFF        │  
│ #363636  #959595  #DD5808   │  
│                             │
│ [  Add to Cart  ]  #6FC341  │  12px RobotoLR, rounded
└─────────────────────────────┘
  padding: 6px 5px 15px 5px
  width: per grid column
```

### 8.7 Price Display Pattern

| Element           | Color     | Style            |
| ----------------- | --------- | ---------------- |
| Sale price        | `#363636` | Bold / prominent |
| Original price    | `#959595` | Strikethrough    |
| Discount badge    | `#DD5808` | "40% OFF" label  |
| Offer tag         | `#FF7043` | Promotional text |
| Out-of-stock      | `#E32926` | Warning text     |
| In-stock/delivery | `#208833` | Confirmation     |

---

## 9. Page-Level Layouts

### 9.1 Landing Page

```
┌──────────────────────────────────────────────────────┐
│  [Top Bar: Location | Search | Cart | Account]       │  bg: #FFFFFF
├──────────────────────────────────────────────────────┤
│  [Navigation Menu]                                    │  bg: #FFFFFF, border-bottom: #D4D4D4
├──────────────────────────────────────────────────────┤
│  [Hero Banner / Carousel]                             │  full-width, 0.4s ease transitions
├──────────────────────────────────────────────────────┤
│  [Category Grid]                                      │  24px RobotoMB subheading
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                 │  circular icons, 50% radius
│  └────┘ └────┘ └────┘ └────┘ └────┘                 │
├──────────────────────────────────────────────────────┤
│  [Featured Products / Deals Section]                  │  15px SourceSansPro body
│  Product cards in horizontal scroll / grid            │
├──────────────────────────────────────────────────────┤
│  [Newsletter Signup Banner]         bg: #D9F3F4       │  Green CTA button
├──────────────────────────────────────────────────────┤
│  [Footer]                                             │
└──────────────────────────────────────────────────────┘
```

### 9.2 Catalogue / Boutique Page

```
┌──────────────────────────────────────────────────────┐
│  [Shared Top Bar + Navigation]                        │
├──────────────────────────────────────────────────────┤
│  [Boutique Header]              15px SourceSansPro    │  bg: pattern image
│  "New Arrivals | up to 14Y"     line-height: 47px     │
├──────────┬───────────────────────────────────────────┤
│ Filters  │  [Sort Bar]                                │
│          │                                            │
│ Category │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│ Size     │  │ Card │ │ Card │ │ Card │ │ Card │     │  4-column grid
│ Price    │  └──────┘ └──────┘ └──────┘ └──────┘     │
│ Brand    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │  border: #DADADA
│ Color    │  │ Card │ │ Card │ │ Card │ │ Card │     │  radius: 5px
│          │  └──────┘ └──────┘ └──────┘ └──────┘     │
├──────────┴───────────────────────────────────────────┤
│  [Pagination]                                         │
├──────────────────────────────────────────────────────┤
│  [Footer with Dark Pin Code Input]   bg: #373737      │
└──────────────────────────────────────────────────────┘
```

### 9.3 Product Detail Page (PDP)

```
┌──────────────────────────────────────────────────────┐
│  [Shared Top Bar + Navigation]                        │
├──────────────────────────────────────────────────────┤
│  [Breadcrumbs]                     12px RobotoLR      │
├─────────────────────┬────────────────────────────────┤
│                     │                                 │
│  [Product Images]   │  Brand: link (#146AFF)          │  width: 506px each column
│   Main image        │  Title: 14px Jakarta-Medium     │  total: 1012px
│   Thumbnails        │  ★★★★☆ Rating                  │
│   (radius: 12px)    │                                 │
│                     │  ₹599    ₹999   40% OFF         │
│                     │  #212121 #959595 #E03400         │
│                     │                                 │
│                     │  Size: [2-3Y] [3-4Y] [4-5Y]    │  radius: 28px (pills)
│                     │                                 │
│                     │  [  ADD TO CART  ]  #6FC341     │
│                     │  [  BUY NOW      ]  #FF5924     │
│                     │                                 │
│                     │  Delivery: [Enter Pincode]      │  radius: 6px, Jakarta-Medium
│                     │  ✓ In Stock  #208833            │
│                     │                                 │
├─────────────────────┴────────────────────────────────┤
│  [Product Description]             padding: 20px 0    │  483px inner width
│  [Specifications Table]            border: #F5F5F5    │
│  [Reviews Section]                 bg: #F8F8F8        │
│  [Related Products Carousel]                          │
├──────────────────────────────────────────────────────┤
│  [Footer]                                             │
└──────────────────────────────────────────────────────┘

Layout measurements:
  section  1012px  block  padding: 0 0 10px 0
  section  1012px  flex   padding: 0 0 26px 0
  section   506px  block  padding: 0
  section   506px  flex   padding: 0
  section   483px  block  padding: 20px 0
```

---

## 10. Responsive Strategy

### 10.1 Observed Media Queries

```css
@media screen and (prefers-contrast: more) { /* High-contrast mode */ }
```

No breakpoint-based media queries were captured in the sample. The reference site uses a **desktop-first** layout at 1280 px.

### 10.2 Recommended Breakpoints for Implementation

| Breakpoint | Width     | Layout Changes                                         |
| ---------- | --------- | ------------------------------------------------------ |
| `sm`       | ≥ 640 px  | Stack → 2-column product grid                         |
| `md`       | ≥ 768 px  | Show sidebar filters, 3-column grid                    |
| `lg`       | ≥ 1024 px | Full sidebar + 4-column grid, PDP two-column           |
| `xl`       | ≥ 1280 px | Reference design width, max-width container            |

### 10.3 Content Container

```tsx
// Max-width wrapper for page content
<div className="mx-auto w-full max-w-[1012px] px-4 lg:px-0">
  {children}
</div>
```

---

## 11. Tech Stack & Tooling

| Layer              | Technology                                    |
| ------------------ | --------------------------------------------- |
| **Framework**      | Next.js 16.4.6 (App Router, RSC)             |
| **Language**       | TypeScript 5.x                                |
| **Styling**        | Tailwind CSS 4.3.3 + shadcn/ui (base-nova)   |
| **UI Components**  | shadcn/ui + @base-ui/react                    |
| **Icons**          | Lucide React                                  |
| **Forms**          | React Hook Form + Zod validation              |
| **Auth / DB**      | Supabase (SSR + client)                       |
| **Payments**       | Razorpay                                      |
| **Email**          | Resend                                        |
| **Analytics**      | Microsoft Clarity                             |
| **Fonts**          | next/font/google (currently Geist)            |

---

## 12. Implementation Notes

### 12.1 Font Migration

The current project uses **Geist** fonts. To match the reference design:

```tsx
// src/app/layout.tsx — replace Geist with:
import { Source_Sans_3, Roboto, Plus_Jakarta_Sans } from 'next/font/google';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '600', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-ui',
  weight: ['400', '500', '700'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
});
```

### 12.2 Custom CSS Variables

Add to `globals.css` alongside the existing shadcn theme:

```css
:root {
  /* Brand colors */
  --pumpkin-green: #6FC341;
  --pumpkin-orange: #FF7043;
  --pumpkin-red: #FC3B3B;
  --pumpkin-blue: #146AFF;

  /* Text scale */
  --text-primary: #363636;
  --text-secondary: #484848;
  --text-body: #575757;
  --text-muted: #616161;

  /* Borders */
  --border-card: #D4D4D4;
  --border-input: #E0E0E0;

  /* Surface */
  --surface-alt: #F8F8F8;
  --surface-promo: #D9F3F4;
}
```

### 12.3 Key Tailwind Overrides

```js
// tailwind.config.ts (or inline @theme in globals.css)
{
  extend: {
    colors: {
      pumpkin: {
        green:  '#6FC341',
        orange: '#FF7043',
        red:    '#FC3B3B',
        blue:   '#146AFF',
      },
    },
    maxWidth: {
      'content': '1012px',
    },
    fontSize: {
      'micro': ['10px', { lineHeight: 'normal' }],
      'xs':    ['12px', { lineHeight: '18px' }],
      'sm':    ['13px', { lineHeight: '30px' }],
      'base':  ['14px', { lineHeight: '21px' }],
      'md':    ['15px', { lineHeight: '18px' }],
      'lg':    ['16px', { lineHeight: '16px' }],
      'xl':    ['18px', { lineHeight: '18px' }],
      '2xl':   ['24px', { lineHeight: '15px' }],
    },
  },
}
```

### 12.4 Ancestor Background Patterns

Two background image patterns are used site-wide:

| Pattern              | URL / Description                                              | Used On          |
| -------------------- | -------------------------------------------------------------- | ---------------- |
| **Main BG**          | `main-bg.jpg` — subtle texture behind full page                | Landing, PDP     |
| **Boutique Pattern** | `Premium-Boutique-pattern.jpg` — premium texture for catalogue | Catalogue page   |

These should be replaced with custom Pumkin Cotton Casuals branded textures or solid colors.

### 12.5 Accessibility Considerations

- Maintain **WCAG AA** contrast ratios for all text/background combinations
- `#9E9E9E` on `#FFFFFF` fails AA for normal text — consider darkening disabled text to `#757575`
- Support `prefers-contrast: more` media query (already in reference)
- All interactive elements need visible focus indicators
- Loading spinners (`rotateSpinner`) should include `aria-label` and `role="status"`

---

> **This document is a living reference.** Update it as the design evolves during implementation. Each section maps directly to implementation decisions in the codebase.
