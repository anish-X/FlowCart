"use client";

interface PromoBannerProps {
  onShop: () => void;
}

export default function PromoBanner({ onShop }: PromoBannerProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-8 pt-16">
      <div className="relative bg-fc-rust rounded-xl px-16 py-16 flex items-center justify-between gap-8 flex-wrap overflow-hidden">

        {/* Stitched diagonal texture — decorative */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 11px)" }}
        />

        <div className="relative">
          <span className="block font-body text-[11px] font-medium uppercase tracking-[0.08em] text-white/80 mb-[10px]">
            Festival season · Limited offer
          </span>
          <h2
            className="m-0 mb-[6px] font-display italic font-light text-white leading-[1.1]"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.2rem)", fontVariationSettings: "'opsz' 48" }}
          >
            Free shipping on every order above NPR 2,000
          </h2>
          <p className="m-0 font-body text-[13px] text-white/[0.88]">
            Each order directly supports a Nepali maker · ends Dashain
          </p>
        </div>

        <button
          type="button"
          onClick={onShop}
          className="relative font-body text-sm font-semibold text-fc-night bg-fc-paper border-none rounded-sm px-7 py-[15px] cursor-pointer whitespace-nowrap min-h-[48px] hover:brightness-95 active:scale-[0.97] transition-all"
        >
          Shop the sale
        </button>
      </div>
    </section>
  );
}
