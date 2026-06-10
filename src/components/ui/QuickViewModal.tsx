"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useQuickViewStore } from "@/stores/quickViewStore";
import { useCartStore } from "@/stores/cartStore";
import { type YarnColor, formatNPR } from "@/services/mockData";

const YARN_COLORS: Record<string, string> = {
  moss:     "#6E7B46",
  teal:     "#2F7E78",
  rose:     "#C06B83",
  indigo:   "#485684",
  turmeric: "#D69A2D",
};

const BADGE_STYLES: Record<string, string> = {
  new:     "bg-[#2F7E78]/10 text-[#2F7E78]",
  sale:    "bg-[#C06B83]/10 text-[#C06B83]",
  best:    "bg-fc-rust/10 text-fc-rust",
  eco:     "bg-[#6E7B46]/10 text-[#6E7B46]",
  limited: "bg-[#485684]/10 text-[#485684]",
};

export default function QuickViewModal() {
  const product   = useQuickViewStore((s) => s.product);
  const storeClose = useQuickViewStore((s) => s.close);
  const addItem   = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const panelRef   = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // selectedColor is local — resets every time the modal opens, no other
  // component needs it, so it does NOT belong in a store.
  const [selectedColor, setSelectedColor] = useState<YarnColor | null>(null);

  // Reset selected colour each time a new product opens
  const activeColor = selectedColor ?? product?.swatches[0] ?? null;

  // Animate IN on mount (when product becomes non-null)
  useGSAP(
    () => {
      if (!product) return;
      gsap.fromTo(
        panelRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(1.5)" }
      );
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power1.out" }
      );
    },
    { dependencies: [product?.id] }
  );

  // Animate OUT — GSAP runs first, store.close() fires in onComplete
  const handleClose = () => {
    gsap.to(panelRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: storeClose,
    });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.2 });
  };

  const handleAddToCart = () => {
    if (!product || !activeColor) return;
    addItem(
      { id: product.id, name: product.name, price: product.price, emoji: "🧶", maker: product.maker },
      activeColor
    );
    openDrawer();
    handleClose();
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-fc-night/50"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-[760px] bg-white rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(28,21,16,0.14)]"
      >
        {/* Close button */}
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 grid place-items-center rounded-full bg-fc-night/[0.06] text-fc-night hover:bg-fc-night/[0.12] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Two-column grid — stacks on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2">

          {/* Left — shorter on mobile so details are reachable without scrolling */}
          <div
            className="relative aspect-[4/3] sm:aspect-[4/5]"
            style={{ background: product.wash }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 380px"
            />
            {product.status && (
              <span
                className={`absolute top-[14px] left-[14px] z-10 font-body text-[10px] font-semibold uppercase tracking-[0.06em] px-2 py-1 rounded-sm ${BADGE_STYLES[product.status.tone] ?? ""}`}
              >
                {product.status.label}
              </span>
            )}
          </div>

          {/* Right — product details */}
          <div className="p-5 sm:p-8 flex flex-col gap-[10px]">
            {/* Category + material */}
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.06em] text-[#6B5742]">
              {product.category} · {product.material}
            </span>

            {/* Name */}
            <h2
              className="m-0 font-display font-light text-fc-earth leading-[1.05]"
              style={{ fontSize: "32px", fontVariationSettings: "'opsz' 48" }}
            >
              {product.name}
            </h2>

            {/* Maker */}
            <span
              className="font-display italic font-light text-[15px] text-[#6B5742]"
              style={{ fontVariationSettings: "'opsz' 48" }}
            >
              by {product.maker}
            </span>

            {/* Blurb */}
            <p className="m-0 mt-1 font-body text-[13px] leading-[1.65] text-fc-night">
              {product.blurb}
            </p>

            {/* Yarn colour picker */}
            <div className="flex items-center gap-3 mt-1">
              <span className="font-body text-[11px] text-[#6B5742]">Yarn</span>
              <div className="flex gap-[6px]">
                {product.swatches.map((c) => (
                  <button
                    key={c}
                    type="button"
                    title={c}
                    onClick={() => setSelectedColor(c as YarnColor)}
                    className="transition-transform"
                    style={{
                      width: activeColor === c ? 20 : 16,
                      height: activeColor === c ? 20 : 16,
                      borderRadius: "99px",
                      background: YARN_COLORS[c],
                      border: activeColor === c
                        ? "2px solid rgba(28,21,16,0.5)"
                        : "0.5px solid rgba(28,21,16,0.18)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Price — pushed to bottom */}
            <span
              className="font-display font-light text-[28px] text-fc-earth mt-auto"
              style={{ fontVariantNumeric: "tabular-nums", fontVariationSettings: "'opsz' 48" }}
            >
              {formatNPR(product.price)}
            </span>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-[13px] bg-fc-earth text-fc-wheat font-body text-sm font-semibold uppercase tracking-widest rounded-sm hover:bg-fc-night transition-colors active:scale-[0.98]"
            >
              Add to cart
            </button>

            {/* Made to order note */}
            <p className="m-0 text-center font-body text-[11px] text-[#6B5742]">
              Made to order · the maker will message you once it ships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
