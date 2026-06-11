"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Avatar from "@/components/ui/Avatar";
import { stories } from "@/services/mockData";
import { useFilterStore } from "@/stores/filterStore";

// Direction is stored in a ref so the animate-in useGSAP can read it
// without it being a reactive dependency that triggers extra renders.

export default function MakerSpotlight() {
  const containerRef  = useRef<HTMLElement>(null);
  const textRef       = useRef<HTMLDivElement>(null);
  const portraitRef   = useRef<HTMLDivElement>(null);
  const slideDir      = useRef<1 | -1>(1);
  const isFirstRender = useRef(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const setMakerFilter = useFilterStore((s) => s.setMakerFilter);

  const shopMaker = (name: string) => {
    setMakerFilter(name);
    const el = document.getElementById("shop");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
  };

  // ── Scroll reveal on first paint ────────────────────────────────────────
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

  // ── Animate IN every time activeIndex changes (skip initial mount) ───────
  // useGSAP with dependencies re-runs after React commits the new story DOM.
  // revertOnUpdate: false — we don't want GSAP to revert (reset) the tween
  // state between runs because we're handling the start position with gsap.set.
  useGSAP(
    () => {
      if (isFirstRender.current) { isFirstRender.current = false; return; }
      gsap.set(textRef.current,    { x: slideDir.current * 32, opacity: 0 });
      gsap.set(portraitRef.current, { opacity: 0 });
      gsap.to(textRef.current,    { x: 0, opacity: 1, duration: 0.38, ease: "power2.out" });
      gsap.to(portraitRef.current, { opacity: 1, duration: 0.38, ease: "power2.out" });
    },
    { dependencies: [activeIndex], revertOnUpdate: false }
  );

  // Animate OUT → on GSAP onComplete → update React state → useGSAP animates IN
  const goTo = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    slideDir.current = nextIndex > activeIndex ? -1 : 1;

    gsap.to(textRef.current, {
      x: -slideDir.current * 24,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
    });
    gsap.to(portraitRef.current, {
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => setActiveIndex(nextIndex),
    });
  };

  const story = stories[activeIndex];

  return (
    <section id="stories" ref={containerRef} className="bg-fc-night overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-14 lg:py-[120px] grid items-center gap-10 lg:gap-16 lg:[grid-template-columns:0.82fr_1.18fr]">

        {/* ── Portrait ──────────────────────────────────────────────────── */}
        <div
          data-spotlight
          className="relative rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(28,21,16,0.22)] aspect-[4/3] lg:aspect-[4/5]"
        >
          <div ref={portraitRef} className="absolute inset-0">
            <Image
              src={story.portrait}
              alt={story.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority={activeIndex === 0}
            />
            {/* Dark gradient at bottom so chips stay legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-fc-night/70 via-transparent to-transparent" />
          </div>

          {/* Location chip — bottom-left */}
          <div className="absolute bottom-4 left-4 flex items-center gap-[10px] bg-fc-night/55 backdrop-blur-md px-3 py-2 rounded-full">
            <Avatar initials={story.initials} tone={story.tone} size={36} />
            <span className="font-body text-[11px] text-fc-paper">{story.location}</span>
          </div>

          {/* Story dots — bottom-right */}
          <div className="absolute bottom-[18px] right-4 flex gap-[7px] items-center">
            {stories.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${stories[i].name}'s story`}
                className="border-none cursor-pointer p-0 transition-all duration-200"
                style={{
                  width:  i === activeIndex ? 20 : 6,
                  height: 6,
                  borderRadius: 99,
                  background: i === activeIndex ? "white" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Text ──────────────────────────────────────────────────────── */}
        <div ref={textRef} data-spotlight>
          <span className="block font-body text-[11px] font-medium uppercase tracking-[0.08em] text-fc-marigold mb-[10px]">
            Maker spotlight · {activeIndex + 1} of {stories.length}
          </span>

          <h2
            className="m-0 font-display font-light text-fc-paper leading-[1.05]"
            style={{ fontSize: "clamp(2.1rem, 4vw, 3rem)", fontVariationSettings: "'opsz' 48" }}
          >
            {story.name}
          </h2>

          <div className="flex items-center gap-2 mt-[10px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#2F7E78] flex-shrink-0" />
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.06em] text-[#2F7E78]">
              Verified maker
            </span>
          </div>

          <p className="max-w-[52ch] mt-4 font-body text-[15px] leading-[1.65] text-fc-wheat/80">
            {story.bio}
          </p>

          <p
            className="max-w-[52ch] mt-4 font-display italic font-light text-[19px] leading-[1.5] text-fc-wheat"
            style={{ fontVariationSettings: "'opsz' 48" }}
          >
            &ldquo;{story.quote}&rdquo;
          </p>

          {/* Stats */}
          <div className="flex gap-8 lg:gap-16 mt-8 flex-wrap">
            {story.stats.map(([value, label]) => (
              <div key={label} className="flex flex-col gap-[2px]">
                <span
                  className="font-display font-light text-[30px] text-fc-paper"
                  style={{ fontVariationSettings: "'opsz' 48" }}
                >
                  {value}
                </span>
                <span className="font-body text-[11px] tracking-[0.04em] text-fc-wheat/70">{label}</span>
              </div>
            ))}
          </div>

          {/* Prev / Next + CTA */}
          <div className="flex items-center gap-3 mt-8 flex-wrap">
            <button
              type="button"
              onClick={() => goTo((activeIndex - 1 + stories.length) % stories.length)}
              aria-label="Previous maker"
              className="w-10 h-10 grid place-items-center rounded-full border border-fc-wheat/[0.28] text-fc-wheat hover:border-fc-wheat/60 hover:text-fc-marigold transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => goTo((activeIndex + 1) % stories.length)}
              aria-label="Next maker"
              className="w-10 h-10 grid place-items-center rounded-full border border-fc-wheat/[0.28] text-fc-wheat hover:border-fc-wheat/60 hover:text-fc-marigold transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => shopMaker(story.name)}
              className="ml-1 font-body text-sm font-semibold text-white bg-fc-rust px-6 py-[13px] rounded-sm hover:bg-fc-marigold hover:text-fc-night transition-colors active:scale-[0.97]"
            >
              Shop {story.name.split(" ")[0]}&apos;s pieces
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
