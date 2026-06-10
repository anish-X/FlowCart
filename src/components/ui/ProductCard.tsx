"use client";

import Image from "next/image";
import { useWishlistStore } from "@/stores/wishlistStore";
import { type Product, formatNPR } from "@/services/mockData";

const YARN_COLORS: Record<string, string> = {
  moss:     "#6E7B46",
  teal:     "#2F7E78",
  rose:     "#C06B83",
  indigo:   "#485684",
  turmeric: "#D69A2D",
};

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  new:     { bg: "rgba(47,126,120,0.12)",  color: "#2F7E78" },
  sale:    { bg: "rgba(192,107,131,0.12)", color: "#C06B83" },
  best:    { bg: "rgba(176,84,50,0.12)",   color: "#B05432" },
  eco:     { bg: "rgba(110,123,70,0.12)",  color: "#6E7B46" },
  limited: { bg: "rgba(72,86,132,0.12)",   color: "#485684" },
};

interface ProductCardProps {
  product: Product;
  onQuickView: () => void;
  animationDelay?: number;
}

export default function ProductCard({ product, onQuickView, animationDelay = 0 }: ProductCardProps) {
  const isSaved = useWishlistStore((s) => s.isSaved(product.id));
  const toggle  = useWishlistStore((s) => s.toggle);

  const badge = product.status ? BADGE_STYLES[product.status.tone] : null;

  return (
    <div
      onClick={onQuickView}
      className="group relative bg-white border border-fc-night/[0.12] rounded-lg overflow-hidden cursor-pointer flex flex-col"
      style={{
        animation: `fcPop 0.5s cubic-bezier(0.33, 1, 0.68, 1) ${animationDelay}s both`,
        transition: "transform 0.22s cubic-bezier(0.45,0,0.55,1), border-color 0.22s cubic-bezier(0.45,0,0.55,1), box-shadow 0.22s cubic-bezier(0.45,0,0.55,1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px) scale(1.015)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(176,84,50,0.30)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(28,21,16,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "";
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
      }}
    >
      {/* ── Image area ─────────────────────────────────────────────── */}
      <div
        className="relative"
        style={{ aspectRatio: "4 / 5", background: product.wash }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Status badge — top-left */}
        {badge && product.status && (
          <span
            className="absolute top-[10px] left-[10px] z-10 font-body text-[10px] font-semibold uppercase tracking-[0.06em] px-2 py-[3px] rounded-sm"
            style={{ background: badge.bg, color: badge.color }}
          >
            {product.status.label}
          </span>
        )}

        {/* Wishlist heart — top-right, always visible per design */}
        <button
          type="button"
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={(e) => { e.stopPropagation(); toggle(product.id); }}
          className="absolute top-2 right-2 z-10 w-[34px] h-[34px] grid place-items-center rounded-full border-none cursor-pointer transition-colors"
          style={{ background: "rgba(248,243,235,0.90)" }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ color: isSaved ? "#B05432" : "#4A2E1A" }}
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>

      {/* ── Card body ──────────────────────────────────────────────── */}
      <div className="p-4 flex flex-col gap-1">
        {/* Product name — font-body semibold per design spec */}
        <h3
          className="m-0 font-body font-semibold text-fc-night"
          style={{ fontSize: "0.9375rem" }}
        >
          {product.name}
        </h3>

        {/* Maker — Fraunces italic */}
        <span
          className="font-display italic font-light text-[13px]"
          style={{ color: "#6B5742", fontVariationSettings: "'opsz' 48" }}
        >
          by {product.maker}
        </span>

        {/* Price left · swatches right */}
        <div className="flex items-center justify-between mt-2">
          <span
            className="font-body font-semibold text-fc-earth"
            style={{ fontSize: "0.8125rem", fontVariantNumeric: "tabular-nums" }}
          >
            {formatNPR(product.price)}
          </span>

          {product.swatches.length > 0 && (
            <div className="flex gap-[5px]">
              {product.swatches.map((c) => (
                <span
                  key={c}
                  title={c}
                  className="rounded-full"
                  style={{
                    width: 11, height: 11,
                    background: YARN_COLORS[c],
                    border: "0.5px solid rgba(28,21,16,0.15)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes fcPop { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
