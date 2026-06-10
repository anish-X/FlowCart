"use client";

import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { type Product, formatNPR } from "@/services/mockData";

// Yarn swatch dot colours — match design system tokens exactly
const YARN_COLORS: Record<string, string> = {
  moss:     "#6E7B46",
  teal:     "#2F7E78",
  rose:     "#C06B83",
  indigo:   "#485684",
  turmeric: "#D69A2D",
};

// Badge background + text per tone
const BADGE_STYLES: Record<string, string> = {
  new:     "bg-[#2F7E78]/10 text-[#2F7E78]",
  sale:    "bg-[#C06B83]/10 text-[#C06B83]",
  best:    "bg-fc-rust/10 text-fc-rust",
  eco:     "bg-[#6E7B46]/10 text-[#6E7B46]",
  limited: "bg-[#485684]/10 text-[#485684]",
};

interface ProductCardProps {
  product: Product;
  onQuickView: () => void;
  animationDelay?: number;
}

export default function ProductCard({ product, onQuickView, animationDelay = 0 }: ProductCardProps) {
  const isSaved   = useWishlistStore((s) => s.isSaved(product.id));
  const toggle    = useWishlistStore((s) => s.toggle);
  const addItem   = useCartStore((s) => s.addItem);

  return (
    <div
      className="group relative bg-white border border-fc-night/[0.12] rounded-lg overflow-hidden cursor-pointer"
      style={{
        animation: `fcPop 0.5s cubic-bezier(0.33, 1, 0.68, 1) ${animationDelay}s both`,
        boxShadow: "0 1px 2px rgba(28,21,16,0.06)",
      }}
    >
      {/* ── Image area (gradient wash) ─────────────────────────────── */}
      <div
        className="relative aspect-[4/5] grid place-items-center"
        style={{ background: product.wash }}
      >
        {/* Product name watermark — exact design pattern */}
        <span
          className="font-display italic font-light text-[15px] text-fc-earth/40 select-none"
          style={{ fontVariationSettings: "'opsz' 48" }}
        >
          {product.name}
        </span>

        {/* Badge */}
        {product.status && (
          <span
            className={`absolute top-3 left-3 font-body text-[10px] font-semibold uppercase tracking-[0.06em] px-2 py-1 rounded-sm ${BADGE_STYLES[product.status.tone] ?? ""}`}
          >
            {product.status.label}
          </span>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => { e.stopPropagation(); toggle(product.id); }}
          className={`absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-full border transition-all ${
            isSaved
              ? "bg-fc-rust border-fc-rust text-white"
              : "bg-white/80 border-fc-night/[0.12] text-fc-night/50 opacity-0 group-hover:opacity-100"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>

        {/* Quick-view overlay — appears on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            type="button"
            onClick={onQuickView}
            className="w-full py-3 bg-fc-night/90 backdrop-blur-sm text-fc-wheat font-body text-xs font-semibold uppercase tracking-widest hover:bg-fc-night transition-colors"
          >
            Quick view
          </button>
        </div>
      </div>

      {/* ── Card body ──────────────────────────────────────────────── */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category + material */}
        <span className="font-body text-[10px] uppercase tracking-[0.06em] text-fc-night/40">
          {product.category} · {product.material}
        </span>

        {/* Name */}
        <h3 className="m-0 font-display font-light text-[18px] text-fc-earth leading-[1.1]"
          style={{ fontVariationSettings: "'opsz' 48" }}>
          {product.name}
        </h3>

        {/* Maker — the human behind the stitch */}
        <span className="font-display italic font-light text-[12px] text-fc-night/50"
          style={{ fontVariationSettings: "'opsz' 48" }}>
          by {product.maker}
        </span>

        {/* Yarn swatches + price row */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-[5px]">
            {product.swatches.map((c) => (
              <span
                key={c}
                title={c}
                className="w-[14px] h-[14px] rounded-full border border-fc-night/[0.15]"
                style={{ background: YARN_COLORS[c] }}
              />
            ))}
          </div>
          <span className="font-display font-light text-[15px] text-fc-earth"
            style={{ fontVariantNumeric: "tabular-nums", fontVariationSettings: "'opsz' 48" }}>
            {formatNPR(product.price)}
          </span>
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={() => addItem(
            { id: product.id, name: product.name, price: product.price, emoji: "🧶", maker: product.maker },
            product.swatches[0]
          )}
          className="mt-1 w-full py-2 bg-fc-night text-fc-wheat font-body text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-fc-earth transition-colors"
        >
          Add to cart
        </button>
      </div>

      {/* Pop animation keyframe */}
      <style>{`
        @keyframes fcPop { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
