"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Avatar from "@/components/ui/Avatar";
import { makers } from "@/services/mockData";

export default function MakerGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-maker-card]", {
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
    <section
      id="makers"
      ref={containerRef}
      className="bg-fc-wheat"
    >
      <div className="max-w-[1280px] mx-auto px-8 py-[120px]">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="block font-body text-[11px] font-medium uppercase tracking-[0.08em] text-fc-rust mb-2">
            The human behind the stitch
          </span>
          <h2
            className="m-0 font-display italic font-light text-fc-earth"
            style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontVariationSettings: "'opsz' 48" }}
          >
            Stories behind the stitch
          </h2>
          <p className="max-w-[54ch] mx-auto mt-3 font-body text-[15px] leading-[1.65] text-[#6B5742]">
            Every piece is made by an independent maker in Nepal. When you buy here,
            you support her directly — not a factory, not a middleman.
          </p>
        </div>

        {/* 3-column maker cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {makers.map((maker) => (
            <div
              key={maker.id}
              data-maker-card
              className="bg-white border border-fc-night/[0.12] rounded-xl p-6 flex flex-col gap-4 hover:shadow-[0_8px_24px_rgba(28,21,16,0.1)] transition-shadow"
            >
              {/* Top row — avatar + name + verified */}
              <div className="flex items-start gap-4">
                <Avatar initials={maker.initials} tone={maker.tone} size={52} />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-body font-semibold text-[15px] text-fc-night truncate">
                    {maker.name}
                  </span>
                  <span className="font-body text-[12px] text-[#6B5742]">
                    {maker.location}
                  </span>
                  <div className="flex items-center gap-[5px] mt-[2px]">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#2F7E78] flex-shrink-0" />
                    <span className="font-body text-[10px] font-medium uppercase tracking-[0.06em] text-[#2F7E78]">
                      Verified · since {maker.joined}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <span className="font-body text-[12px] text-[#6B5742] border-t border-fc-night/[0.08] pt-4">
                {maker.stats}
              </span>

              {/* Quote */}
              <p
                className="m-0 font-display italic font-light text-[14px] leading-[1.6] text-fc-earth"
                style={{ fontVariationSettings: "'opsz' 48" }}
              >
                &ldquo;{maker.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
