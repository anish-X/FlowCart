"use client";

import { useState } from "react";
import { useFaqs } from "@/hooks/useFaqs";

// Skeleton for each FAQ row while loading
function FaqSkeleton() {
  return (
    <div className="border-b border-fc-night/[0.12] py-[18px] flex justify-between items-center gap-4">
      <div className="h-4 w-64 bg-fc-wheat rounded animate-pulse" />
      <div className="w-5 h-5 bg-fc-wheat rounded-full animate-pulse flex-none" />
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0); // first item open by default
  const { data: faqs, isLoading } = useFaqs();

  return (
    <section id="faq" className="bg-fc-paper">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16 lg:py-[120px] grid items-start gap-12 lg:gap-16 lg:[grid-template-columns:0.8fr_1.2fr]">

        {/* ── Left — sticky heading (sticky only on large screens) ── */}
        <div className="lg:sticky lg:top-24">
          <span className="block font-body text-[11px] font-medium uppercase tracking-[0.08em] text-fc-rust mb-2">
            Good to know
          </span>
          <h2
            className="m-0 mb-4 font-display font-light text-fc-earth leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontVariationSettings: "'opsz' 48" }}
          >
            Questions, answered
          </h2>
          <p className="max-w-[34ch] m-0 font-body text-[15px] leading-[1.65] text-[#6B5742]">
            Buying handmade should feel as easy as it feels good. Still curious?
            Message a maker any time.
          </p>
        </div>

        {/* ── Right — accordion ────────────────────────────────────── */}
        <div className="border-t border-fc-night/[0.12]">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <FaqSkeleton key={i} />)
            : (faqs ?? []).map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="border-b border-fc-night/[0.12]">

                    {/* Question row */}
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 py-[18px] px-1 min-h-[44px] bg-transparent border-none cursor-pointer text-left group hover:text-fc-rust transition-colors"
                    >
                      <span
                        className="font-display font-light text-fc-earth group-hover:text-fc-rust transition-colors"
                        style={{ fontSize: "1.125rem", fontVariationSettings: "'opsz' 48" }}
                      >
                        {item.q}
                      </span>
                      <span
                        className="flex-none w-[22px] h-[22px] grid place-items-center text-fc-rust text-xl leading-none select-none"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "none",
                          transition: "transform 0.28s cubic-bezier(0.175,0.885,0.32,1.275)",
                        }}
                      >
                        +
                      </span>
                    </button>

                    {/* Answer — grid-rows trick: animates to exact content height,
                        no hardcoded max-height guess needed */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        transition: "grid-template-rows 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
                      }}
                    >
                      <div
                        style={{
                          overflow: "hidden",
                          opacity: isOpen ? 1 : 0,
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        <p className="m-0 px-1 pb-5 max-w-[58ch] font-body text-[13px] leading-[1.65] text-[#6B5742]">
                          {item.a}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
