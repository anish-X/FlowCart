"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { categories, type YarnColor } from "@/services/mockData";
import ProductCard from "@/components/ui/ProductCard";
import { useQuickViewStore } from "@/stores/quickViewStore";

// ─── Skeleton — shown while fetch resolves ─────────────────────────────────
function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-fc-night/[0.12] rounded-lg overflow-hidden">
      <div className="aspect-[4/5] bg-fc-wheat animate-pulse" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-2 w-16 bg-fc-wheat rounded animate-pulse" />
        <div className="h-4 w-32 bg-fc-wheat rounded animate-pulse" />
        <div className="h-3 w-24 bg-fc-wheat rounded animate-pulse" />
        <div className="h-8 w-full bg-fc-wheat rounded animate-pulse mt-1" />
      </div>
    </div>
  );
}

// ─── Category rail ─────────────────────────────────────────────────────────
interface CategoryRailProps {
  active: string;
  onPick: (key: string) => void;
}
function CategoryRail({ active, onPick }: CategoryRailProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto px-8 pb-1 scrollbar-none"
      style={{ scrollbarWidth: "none" }}
    >
      {categories.map((c) => {
        const on = active === c.key;
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onPick(c.key)}
            className={`flex-none min-h-[40px] px-[18px] py-[9px] font-body text-sm font-medium tracking-[0.01em] rounded-full border transition-colors whitespace-nowrap cursor-pointer ${
              on
                ? "text-fc-wheat bg-fc-earth border-fc-earth"
                : "text-fc-night bg-white border-fc-night/[0.12] hover:border-fc-earth/40"
            }`}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Yarn filter chips ────────────────────────────────────────────────────
const YARN_CHIP_COLORS: Record<string, string> = {
  all:      "",
  moss:     "#6E7B46",
  teal:     "#2F7E78",
  rose:     "#C06B83",
  indigo:   "#485684",
  turmeric: "#D69A2D",
};
const YARN_CHIPS: [YarnColor | "all", string][] = [
  ["all", "All"], ["moss", "Moss"], ["teal", "Teal"],
  ["rose", "Rose"], ["indigo", "Indigo"], ["turmeric", "Turmeric"],
];

// ─── Main section ──────────────────────────────────────────────────────────
export default function FeaturedProducts() {
  const [category, setCategory] = useState("all");
  const [yarn, setYarn]         = useState<YarnColor | "all">("all");

  const openQuickView = useQuickViewStore((s) => s.open);
  const { data, isLoading, isError } = useProducts();

  const list   = data ?? [];
  const shown  = list.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (yarn === "all" || p.swatches.includes(yarn as YarnColor))
  );

  return (
    <section id="shop" className="pb-[120px]">

      {/* Category rail — full width, no container padding */}
      <div className="max-w-[1280px] mx-auto pt-8">
        <CategoryRail active={category} onPick={setCategory} />
      </div>

      <div className="max-w-[1280px] mx-auto px-8">

        {/* Section header + yarn chips */}
        <div className="flex items-end justify-between flex-wrap gap-4 my-6">
          <div>
            <span className="block font-body text-[11px] font-medium uppercase tracking-[0.08em] text-fc-rust mb-[6px]">
              Shop the collection
            </span>
            <h2
              className="m-0 font-display font-light text-fc-earth leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontVariationSettings: "'opsz' 48" }}
            >
              Made to be used, made by hand
            </h2>
          </div>

          {/* Yarn filter chips */}
          <div className="flex flex-wrap gap-2">
            {YARN_CHIPS.map(([c, label]) => {
              const active = yarn === c;
              const count  = c === "all" ? list.length : list.filter((p) => p.swatches.includes(c as YarnColor)).length;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setYarn(c)}
                  className={`flex items-center gap-[6px] px-3 py-[6px] rounded-full border font-body text-[12px] font-medium transition-colors cursor-pointer ${
                    active
                      ? "bg-fc-earth text-fc-wheat border-fc-earth"
                      : "bg-white text-fc-night border-fc-night/[0.12] hover:border-fc-earth/40"
                  }`}
                >
                  {c !== "all" && (
                    <span
                      className="w-[10px] h-[10px] rounded-full flex-none"
                      style={{ background: YARN_CHIP_COLORS[c] }}
                    />
                  )}
                  {label}
                  <span className={`text-[10px] ${active ? "text-fc-wheat/70" : "text-fc-night/40"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* States: loading → error → empty → grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : isError ? (
          <div className="text-center py-24 border border-dashed border-fc-night/20 rounded-lg">
            <p className="font-display italic font-light text-xl text-fc-night/40 m-0">
              Something went wrong loading products.
            </p>
          </div>
        ) : shown.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-fc-night/20 rounded-lg">
            <p className="font-display italic font-light text-xl text-fc-night/40 m-0">
              No pieces in this colour yet — a maker is on it.
            </p>
            <button
              type="button"
              onClick={() => { setCategory("all"); setYarn("all"); }}
              className="mt-4 bg-transparent border-none text-fc-rust font-body font-semibold text-sm cursor-pointer hover:underline"
            >
              Clear filters →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {shown.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                animationDelay={i * 0.05}
                onQuickView={() => openQuickView(p)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
