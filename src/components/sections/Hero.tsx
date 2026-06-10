"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// Avatar initials chip — matches design system Avatar component visually
const TONE_COLORS: Record<string, string> = {
  rust:   "bg-[#B05432] text-white",
  teal:   "bg-[#2F7E78] text-white",
  rose:   "bg-[#C06B83] text-white",
  indigo: "bg-[#485684] text-white",
  moss:   "bg-[#6E7B46] text-white",
};

function Avatar({ initials, tone, size = 34 }: { initials: string; tone: string; size?: number }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-body font-semibold ${TONE_COLORS[tone] ?? "bg-fc-earth text-fc-wheat"}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".fc-hero-item", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.08,
      });
    },
    { scope: containerRef }
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="bg-fc-wheat border-b border-fc-night/[0.12] overflow-hidden"
    >
      <div
        className="max-w-[1280px] mx-auto px-8 py-[120px] grid items-center gap-16"
        style={{ gridTemplateColumns: "1.1fr 0.9fr" }}
      >

        {/* ── Left — copy ───────────────────────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <span
            className="fc-hero-item fc-eyebrow inline-block mb-4 font-body text-[11px] font-medium uppercase tracking-[0.08em] text-fc-rust"
          >
            Handmade in Nepal · Maker marketplace
          </span>

          {/* Headline */}
          <h1
            className="fc-hero-item m-0 font-display font-light text-fc-earth leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3.25rem, 6vw, 5.5rem)", fontVariationSettings: "'opsz' 144" }}
          >
            From her hands
            <br />
            <span className="italic text-fc-rust">to your home</span>
          </h1>

          {/* Body */}
          <p
            className="fc-hero-item max-w-[44ch] mt-4 font-body text-base leading-[1.65] text-[#6B5742]"
          >
            Connecting Nepal&apos;s crochet makers — mothers, artists, creators — with people
            who love handmade things. Not a factory. Not a middleman.
          </p>

          {/* CTAs */}
          <div className="fc-hero-item flex gap-4 mt-8 flex-wrap">
            <button
              type="button"
              onClick={() => scrollTo("shop")}
              className="font-body text-sm font-semibold text-fc-wheat bg-fc-night px-6 py-[13px] rounded-sm hover:bg-fc-earth transition-colors active:scale-[0.97]"
            >
              Shop the collection
            </button>
            <button
              type="button"
              onClick={() => scrollTo("makers")}
              className="font-body text-sm font-semibold text-fc-night bg-transparent border border-fc-night px-6 py-[13px] rounded-sm hover:bg-fc-night hover:text-fc-wheat transition-colors"
            >
              Meet the makers
            </button>
          </div>

          {/* Avatar cluster */}
          <div className="fc-hero-item flex items-center gap-3 mt-8">
            <div className="flex">
              {([["SS", "rust"], ["KT", "teal"], ["AG", "rose"], ["ML", "moss"]] as const).map(([i, t], k) => (
                <span
                  key={i}
                  className="inline-flex rounded-full border-2 border-fc-wheat"
                  style={{ marginLeft: k ? "-10px" : 0 }}
                >
                  <Avatar initials={i} tone={t} size={34} />
                </span>
              ))}
            </div>
            <span className="font-body text-[11px] tracking-[0.02em] text-[#6B5742]">
              47 verified makers across 8 districts
            </span>
          </div>
        </div>

        {/* ── Right — maker portrait panel ──────────────────────────────── */}
        <div className="fc-hero-item hidden md:block relative" style={{ aspectRatio: "4 / 5" }}>

          {/* Main gradient portrait */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(28,21,16,0.14)] grid place-items-center"
            style={{ background: "linear-gradient(160deg, #E7CFA6, #CDA978)" }}
          >
            <span
              className="font-display italic font-light text-[17px] text-fc-earth/40"
              style={{ fontVariationSettings: "'opsz' 48" }}
            >
              maker portrait
            </span>

            {/* "This week's maker" chip — top-left overlay */}
            <span
              className="absolute top-4 left-4 font-body text-[9px] font-semibold uppercase tracking-[0.1em] text-fc-earth bg-fc-paper/[0.82] backdrop-blur-sm px-[10px] py-[6px] rounded-full"
            >
              This week&apos;s maker
            </span>
          </div>

          {/* Floating maker card — bottom-left */}
          <div
            className="absolute -bottom-[18px] -left-[18px] bg-white border border-fc-night/[0.12] rounded-lg shadow-[0_4px_16px_rgba(28,21,16,0.08)] p-4 flex items-center gap-3"
          >
            <Avatar initials="SS" tone="rust" size={42} />
            <div className="flex flex-col">
              <span className="font-body text-[13px] font-semibold text-fc-night">Sita Shrestha</span>
              <span className="font-display italic font-light text-[12px] text-[#6B5742]">
                made your tote this week
              </span>
            </div>
          </div>

          {/* Floating rating chip — top-right */}
          <div
            className="absolute -top-[14px] -right-[14px] bg-fc-night rounded-lg shadow-[0_4px_16px_rgba(28,21,16,0.08)] px-[14px] py-[10px] flex flex-col gap-[2px]"
          >
            <span className="font-display font-light text-[22px] text-fc-paper">
              4.9 <span className="text-fc-marigold">★</span>
            </span>
            <span className="font-body text-[9px] uppercase tracking-[0.08em] text-fc-wheat/70">
              1,200+ reviews
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
