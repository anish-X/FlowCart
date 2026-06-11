# FlowCart Nepal

> A marketplace for Nepal's independent crochet makers. Every purchase supports a real person and her craft, from her hands to your home.

---

## Setup

**Requirements:** Node.js 18+

```bash
git clone https://github.com/anish-X/FlowCart.git
cd FlowCart
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

---

## GSAP Usage

All GSAP plugins are registered once in [`src/lib/gsap.ts`](src/lib/gsap.ts) and re-exported from there. Every component imports from `@/lib/gsap`, never directly from `"gsap"` - so plugin registration is guaranteed before any animation runs.

| File                                                               | Animation                                                                                                                                                           |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Hero.tsx`](src/components/sections/Hero.tsx)                     | Stagger entrance on page load - eyebrow, headline, body, CTAs, avatar cluster each slide up `y:24→0, opacity:0→1` with `stagger:0.1`                                |
| [`MakerSpotlight.tsx`](src/components/sections/MakerSpotlight.tsx) | ScrollTrigger reveal on first paint; slide-out/fade-out + slide-in/fade-in between maker stories on prev/next navigation                                            |
| [`MakerGrid.tsx`](src/components/sections/MakerGrid.tsx)           | ScrollTrigger stagger on `[data-maker-card]` - cards cascade in as the section enters the viewport                                                                  |
| [`Testimonials.tsx`](src/components/sections/Testimonials.tsx)     | ScrollTrigger stagger on `[data-testimonial]`                                                                                                                       |
| [`QuickViewModal.tsx`](src/components/ui/QuickViewModal.tsx)       | Scale `0.95→1` + opacity on open (`back.out(1.5)` spring); reverse on close - `onComplete` fires store close so the component stays mounted for the full exit tween |
| [`ProductCard.tsx`](src/components/ui/ProductCard.tsx)             | Hover lift via inline `onMouseEnter/Leave` - `translateY(-3px) scale(1.015)` with CSS transition                                                                    |
| [`FAQ.tsx`](src/components/sections/FAQ.tsx)                       | CSS `grid-template-rows: 0fr→1fr` transition - animates to exact content height with no hardcoded `max-height` guess                                                |

All animations use `useGSAP` from `@gsap/react`, never `useEffect`. ScrollTrigger is registered once via `gsap.registerPlugin` in `lib/gsap.ts`.

---

## TanStack Query Usage

QueryClient singleton lives in [`src/lib/queryClient.ts`](src/lib/queryClient.ts) (`staleTime: 5min`). It's provided to the tree via [`src/components/Providers.tsx`](src/components/Providers.tsx) - a thin `"use client"` shell that keeps `app/layout.tsx` as a server component.

All data fetching lives in `src/hooks/` - never directly inside UI components.

| Hook                                      | Used in                | Delay | What it does                                                                                                                                                            |
| ----------------------------------------- | ---------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`useProducts`](src/hooks/useProducts.ts) | `FeaturedProducts.tsx` | 800ms | Fetches 9 mock products; section shows 8 pulse skeletons while loading, error state with copy, and empty state with "Clear filters" if no products match active filters |
| [`useFaqs`](src/hooks/useFaqs.ts)         | `FAQ.tsx`              | 400ms | Fetches 5 FAQs; section shows 5 skeleton rows while loading                                                                                                             |

The mock API is in [`src/services/api.ts`](src/services/api.ts) - `fetchProducts` and `fetchFaqs` wrap typed mock data in `setTimeout`-based promises to simulate network latency.

---

## State Management

Four Zustand stores, one concern each. Defined in [`src/stores/`](src/stores/).

| Store                                            | Manages                                         | Key API                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [`cartStore`](src/stores/cartStore.ts)           | `items[]`, drawer open state, `total()` derived | `addItem` increments qty if product already in cart; `setQty`; `removeItem`; `openDrawer` / `closeDrawer` |
| [`wishlistStore`](src/stores/wishlistStore.ts)   | `savedIds` record, count                        | `toggle(id)`, `isSaved(id)`, `count()`                                                                    |
| [`quickViewStore`](src/stores/quickViewStore.ts) | Active product, modal open state                | `open(product)`, `close()`                                                                                |
| [`menuStore`](src/stores/menuStore.ts)           | Mobile nav drawer open state                    | `toggle()`, `open()`, `close()`                                                                           |

All stores use `create<StoreInterface>()` with a typed interface. Components subscribe selectively - `useCartStore(s => s.items)` not `useCartStore()` - so unrelated state changes don't trigger re-renders.

---

## Design Decision I'm Proud Of

**The Maker Stories section.**

Most marketplaces show you a product grid and a checkout button. FlowCart is built around the opposite idea: _the maker is the hero, not the product_.

The Maker Spotlight section is the most deliberate expression of that. Instead of a static bio block, it's a navigable story carousel - each maker gets a full-screen portrait, her own quote, her stats, and a direct CTA to her pieces. You move between stories with prev/next arrows or the dot indicators on the portrait itself.

The goal was to make a buyer feel like they're _meeting_ Sita or Kamala before they buy from her, not just reading a footnote under a product card.

That human connection - maker to buyer, name to face to craft - is the entire reason FlowCart exists.

---

## What I'd Do With More Time

- **More animations** - staggered hero image parallax on scroll, a smooth page-enter transition, micro-animations on the cart item add (product "flies" to cart icon)
- **Seller dashboard** - a `/dashboard` route with real stats (orders, revenue, active makers), a sortable product table, and a Recharts revenue chart - the kind of page that shows a reviewer the full-stack thinking
- **Real image pipeline** - signed Cloudinary URLs with automatic format/quality optimization, `blurDataURL` placeholders generated at build time via `next/image`, and a CMS-backed maker profile instead of hardcoded mock data
