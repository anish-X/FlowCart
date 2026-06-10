"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Avatar from "@/components/ui/Avatar";
import { testimonials } from "@/services/mockData";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth="1.5"
          className={i < count ? "text-fc-marigold" : "text-fc-night/20"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-testimonial]", {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
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
    <section ref={containerRef} className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16 lg:py-[120px]">

      {/* Header */}
      <div className="text-center mb-16">
        <span className="block font-body text-[11px] font-medium uppercase tracking-[0.08em] text-fc-rust mb-2">
          Loved at home &amp; abroad
        </span>
        <h2
          className="m-0 font-display font-light text-fc-earth"
          style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontVariationSettings: "'opsz' 48" }}
        >
          From people who held it first
        </h2>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            data-testimonial
            className="bg-fc-paper border border-fc-night/[0.10] rounded-xl p-6 flex flex-col gap-4 transition-shadow hover:shadow-[0_8px_24px_rgba(28,21,16,0.09)] hover:border-fc-night/20"
          >
            <Stars count={t.rating} />

            {/* Quote */}
            <p
              className="m-0 flex-1 font-display italic font-light text-[17px] leading-[1.6] text-fc-earth"
              style={{ fontVariationSettings: "'opsz' 48" }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Reviewer */}
            <div className="flex items-center gap-3 border-t border-fc-night/[0.08] pt-4">
              <Avatar initials={t.initials} tone={t.tone} size={38} />
              <div className="flex flex-col gap-[2px]">
                <span className="font-body text-[13px] font-semibold text-fc-night">
                  {t.name}
                </span>
                <span className="font-body text-[11px] text-[#6B5742]">
                  {t.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
