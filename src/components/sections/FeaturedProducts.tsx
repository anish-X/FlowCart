"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { categories } from "@/services/mockData";
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
      className="flex gap-2 overflow-x-auto px-4 sm:px-8 pb-1 scrollbar-none"
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

// ─── Maker filter chips ───────────────────────────────────────────────────
const MAKER_CHIPS: { key: string; label: string; short: string; color: string }[] = [
  { key: "all",            label: "All makers",     short: "All", color: "" },
  { key: "Sita Shrestha",  label: "Sita Shrestha",  short: "SS",  color: "#B05432" },
  { key: "Kamala Tamang",  label: "Kamala Tamang",  short: "KT",  color: "#2F7E78" },
  { key: "Anita Gurung",   label: "Anita Gurung",   short: "AG",  color: "#C06B83" },
  { key: "Maya Lama",      label: "Maya Lama",       short: "ML",  color: "#6E7B46" },
];

// ─── Main section ──────────────────────────────────────────────────────────
export default function FeaturedProducts() {
  const [category, setCategory] = useState("all");
  const [maker, setMaker]       = useState("all");

  const openQuickView = useQuickViewStore((s) => s.open);
  const { data, isLoading, isError } = useProducts();

  const list  = data ?? [];
  const shown = list.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (maker === "all"    || p.maker === maker)
  );

  return (
    <section id="shop" className="pb-[120px]">

      <div className="max-w-[1280px] mx-auto pt-8">
        <CategoryRail active={category} onPick={setCategory} />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

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

          {/* Maker filter chips */}
          <div className="flex flex-wrap gap-2">
            {MAKER_CHIPS.map(({ key, label, short, color }) => {
              const active = maker === key;
              const count  = key === "all"
                ? list.length
                : list.filter((p) => p.maker === key).length;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMaker(key)}
                  className={`inline-flex items-center gap-[7px] min-h-[36px] px-[14px] py-[7px] rounded-full border font-body font-medium transition-colors cursor-pointer ${
                    active
                      ? "bg-fc-night text-fc-wheat border-fc-night"
                      : "bg-white text-fc-night border-fc-night/[0.12] hover:border-fc-night/30"
                  }`}
                  style={{ fontSize: "0.8125rem" }}
                >
                  {key !== "all" && (
                    <span
                      className="w-[18px] h-[18px] rounded-full flex-none grid place-items-center text-white flex-shrink-0"
                      style={{ background: color, fontSize: "7px", fontWeight: 700, letterSpacing: "0.02em" }}
                    >
                      {short}
                    </span>
                  )}
                  {key === "all" ? "All" : label.split(" ")[0]}
                  <span className="text-[11px] opacity-55 tabular-nums">{count}</span>
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
              Nothing here yet — try a different maker or category.
            </p>
            <button
              type="button"
              onClick={() => { setCategory("all"); setMaker("all"); }}
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
