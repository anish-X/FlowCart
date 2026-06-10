"use client";

import { useState } from "react";

const SOCIAL_ICONS = [
  {
    label: "Instagram",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Pinterest",
    path: (
      <>
        <path d="M9 19c-.5-1.5 0-3.5.5-5.5C9 12 9 10.5 9.5 9.5 10.5 7.5 13 7 14.5 8c1.7 1.2 1 4.5-.5 5.5-1 .7-2.2.2-2-1" />
        <path d="M12 13l-1 6" />
      </>
    ),
  },
  {
    label: "Facebook",
    path: (
      <path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8c0-.3.2-.5.5-.5z" />
    ),
  },
];

const LINK_COLS = [
  {
    heading: "Marketplace",
    links: ["Browse all", "New arrivals", "Best sellers", "Maker stories"],
  },
  {
    heading: "Company",
    links: ["About", "How it works", "Sustainability", "Contact"],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/.+@.+\..+/.test(email)) {
      setSent(true);
      setEmail("");
    }
  };

  return (
    <footer id="sell" className="bg-fc-earth text-fc-wheat/[0.86]">
      {/* Main grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-16 lg:pt-[120px] pb-10 lg:pb-16 grid grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:1.5fr_1fr_1.5fr] gap-10 lg:gap-16">
        {/* ── Brand + social ──────────────────────────────────── */}
        <div>
          <span
            className="block font-display font-light text-[30px] text-fc-paper"
            style={{ fontVariationSettings: "'opsz' 48" }}
          >
            FlowCart
          </span>
          <p className="max-w-[36ch] mt-2 font-body text-[13px] leading-[1.65] text-fc-wheat/80">
            A marketplace for Nepal&apos;s crochet makers. Every purchase
            supports a real person and her craft — from her hands to your home.
          </p>

          {/* Social icons */}
          <div className="flex gap-2 mt-8">
            {SOCIAL_ICONS.map(({ label, path }) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={label}
                className="w-[42px] h-[42px] grid place-items-center rounded-full border border-fc-wheat/[0.28] text-fc-wheat no-underline hover:border-fc-wheat/60 hover:text-fc-marigold transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {path}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Link columns ────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-8">
          {LINK_COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="m-0 mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-fc-marigold">
                {heading}
              </h3>
              <ul className="list-none m-0 p-0 flex flex-col gap-[11px]">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="font-body text-[13px] text-fc-wheat/[0.86] no-underline hover:text-fc-marigold transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter ──────────────────────────────────────── */}
        <div>
          <h3
            className="m-0 mb-2 font-display font-light text-[22px] text-fc-paper"
            style={{ fontVariationSettings: "'opsz' 48" }}
          >
            Stay close to the makers
          </h3>
          <p className="m-0 mb-4 font-body text-[13px] text-fc-wheat/80">
            New pieces, maker stories, and early access — about once a month.
          </p>

          {sent ? (
            <p
              className="font-display italic font-light text-[18px] text-fc-wheat m-0"
              style={{ fontVariationSettings: "'opsz' 48" }}
            >
              Thank you — see you in your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 items-start">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-4 py-[11px] bg-white/[0.08] border border-fc-wheat/[0.22] rounded-sm font-body text-[13px] text-fc-wheat placeholder:text-fc-wheat/40 focus:outline-none focus:border-fc-wheat/50 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-[11px] bg-fc-rust text-white font-body text-[13px] font-semibold rounded-sm hover:bg-fc-marigold hover:text-fc-night transition-colors whitespace-nowrap"
              >
                Join
              </button>
            </form>
          )}

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-block mt-8 font-body text-sm font-semibold text-fc-marigold no-underline hover:underline"
          >
            Are you a maker? Sell with us →
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-fc-wheat/[0.18]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-4 flex justify-between items-center gap-4 flex-wrap font-body text-[11px] text-fc-wheat/60">
          <span>© 2026 FlowCart Nepal · Handmade, never mass-made</span>
          <div className="flex gap-6">
            <span>Made with love and care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
