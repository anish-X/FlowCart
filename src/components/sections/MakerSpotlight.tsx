"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Avatar from "@/components/ui/Avatar";
import { spotlight } from "@/services/mockData";

export default function MakerSpotlight() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-spotlight]", {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      id="stories"
      ref={containerRef}
      className="bg-fc-night overflow-hidden"
    >
      <div
        className="max-w-[1280px] mx-auto px-8 py-[120px] grid items-center gap-16"
        style={{ gridTemplateColumns: "0.82fr 1.18fr" }}
      >
        {/* ── Left — portrait placeholder ──────────────────────────── */}
        <div
          data-spotlight
          className="relative rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(28,21,16,0.14)]"
          style={{ aspectRatio: "4 / 5" }}
        >
          <div
            className="absolute inset-0 grid place-items-center"
            style={{ background: "linear-gradient(160deg, #C98B5A, #9A5A33)" }}
          >
            <span
              className="font-display italic font-light text-[17px] text-fc-paper/60 select-none"
              style={{ fontVariationSettings: "'opsz' 48" }}
            >
              maker at work
            </span>
          </div>

          {/* Location chip — bottom overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-[10px] bg-fc-night/55 backdrop-blur-md px-3 py-2 rounded-full">
            <Avatar initials={spotlight.initials} tone={spotlight.tone} size={36} />
            <span className="font-body text-[11px] text-fc-paper">
              {spotlight.location}
            </span>
          </div>
        </div>

        {/* ── Right — maker profile ──────────────────────────────────── */}
        <div data-spotlight>
          <span className="block font-body text-[11px] font-medium uppercase tracking-[0.08em] text-fc-marigold mb-[10px]">
            Maker spotlight
          </span>

          <h2
            className="m-0 font-display font-light text-fc-paper leading-[1.05]"
            style={{ fontSize: "clamp(2.1rem, 4vw, 3rem)", fontVariationSettings: "'opsz' 48" }}
          >
            {spotlight.name}
          </h2>

          {/* Verified tag */}
          <div className="flex items-center gap-2 mt-[10px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#2F7E78] flex-shrink-0" />
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.06em] text-[#2F7E78]">
              Verified maker
            </span>
          </div>

          <p className="max-w-[52ch] mt-4 font-body text-[15px] leading-[1.65] text-fc-wheat/80">
            {spotlight.bio}
          </p>

          <p
            className="max-w-[52ch] mt-4 font-display italic font-light text-[19px] leading-[1.5] text-fc-wheat"
            style={{ fontVariationSettings: "'opsz' 48" }}
          >
            &ldquo;{spotlight.quote}&rdquo;
          </p>

          {/* Stats row */}
          <div className="flex gap-16 mt-8 flex-wrap">
            {spotlight.stats.map(([value, label]) => (
              <div key={label} className="flex flex-col gap-[2px]">
                <span
                  className="font-display font-light text-[30px] text-fc-paper"
                  style={{ fontVariationSettings: "'opsz' 48" }}
                >
                  {value}
                </span>
                <span className="font-body text-[11px] tracking-[0.04em] text-fc-wheat/70">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            type="button"
            className="mt-8 font-body text-sm font-semibold text-white bg-fc-rust px-6 py-[13px] rounded-sm hover:bg-fc-marigold hover:text-fc-night transition-colors active:scale-[0.97]"
          >
            Shop {spotlight.name.split(" ")[0]}&apos;s pieces
          </button>
        </div>
      </div>
    </section>
  );
}
