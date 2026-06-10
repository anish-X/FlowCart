"use client";

import { useCartStore } from "@/stores/cartStore";
import { useMenuStore } from "@/stores/menuStore";
import { useWishlistStore } from "@/stores/wishlistStore";

// ─── SVG icon helper ────────────────────────────────────────────────────────
function Icon({ children, size = 19 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

// ─── Circle icon button (search / wishlist / cart) ───────────────────────────
interface NavIconBtnProps {
  label: string;
  onClick?: () => void;
  count?: number;
  children: React.ReactNode;
}
function NavIconBtn({ label, onClick, count = 0, children }: NavIconBtnProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative w-[42px] h-[42px] grid place-items-center rounded-full border border-fc-wheat/[0.16] text-fc-wheat bg-transparent hover:bg-fc-wheat/[0.08] hover:border-fc-wheat/[0.32] transition-colors"
    >
      {children}
      {count > 0 && (
        <span className="absolute -top-[3px] -right-[3px] min-w-[18px] h-[18px] px-[5px] rounded-full bg-fc-rust text-white text-[10px] font-semibold font-body grid place-items-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

// ─── Nav links ───────────────────────────────────────────────────────────────
const NAV_LINKS: [string, string][] = [
  ["Shop",    "shop"],
  ["Makers",  "makers"],
  ["Stories", "stories"],
  ["Journal", "faq"],
];

// ─── Navbar ──────────────────────────────────────────────────────────────────
export default function Navbar() {
  const cartCount     = useCartStore((s) => s.items.length);
  const openDrawer    = useCartStore((s) => s.openDrawer);
  const wishCount     = useWishlistStore((s) => s.count());
  const isMenuOpen    = useMenuStore((s) => s.isOpen);
  const toggleMenu    = useMenuStore((s) => s.toggle);
  const closeMenu     = useMenuStore((s) => s.close);

  const scrollTo = (id: string) => {
    closeMenu();
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-[200] bg-fc-night border-b border-fc-wheat/[0.14]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[68px] flex items-center justify-between gap-4 sm:gap-8">

        {/* Left — hamburger (mobile) + wordmark */}
        <div className="flex items-center gap-4">
          {/* Mobile hamburger — hidden on md+ */}
          <button
            type="button"
            aria-label="Menu"
            onClick={toggleMenu}
            className="md:hidden w-10 h-10 grid place-items-center text-fc-wheat bg-transparent border-none cursor-pointer"
          >
            <Icon size={20}>
              <path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" />
            </Icon>
          </button>

          {/* Wordmark */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollTo("top"); }}
            className="font-display font-light text-[25px] tracking-[-0.01em] text-fc-paper no-underline"
            style={{ fontVariationSettings: "'opsz' 48" }}
          >
            FlowCart
          </a>
        </div>

        {/* Centre — desktop nav links */}
        <nav className="hidden md:flex gap-8 flex-1 justify-center">
          {NAV_LINKS.map(([label, id]) => (
            <a
              key={label}
              href="#"
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              className="font-body text-sm font-medium text-fc-wheat opacity-[0.82] hover:opacity-100 hover:text-fc-marigold no-underline transition-all"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right — actions */}
        <div className="flex items-center gap-2">
          {/* Search — desktop only */}
          <span className="hidden sm:block">
            <NavIconBtn label="Search">
              <Icon>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </Icon>
            </NavIconBtn>
          </span>

          {/* Wishlist */}
          <NavIconBtn label="Wishlist" count={wishCount}>
            <Icon>
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </Icon>
          </NavIconBtn>

          {/* Cart */}
          <NavIconBtn label="Cart" onClick={openDrawer} count={cartCount}>
            <Icon>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </Icon>
          </NavIconBtn>

          {/* Sell with us CTA — desktop only */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollTo("sell"); }}
            className="hidden sm:block ml-[6px] font-body text-[13px] font-semibold text-fc-night bg-fc-marigold no-underline px-[18px] py-[10px] rounded-sm whitespace-nowrap hover:brightness-105 transition-all active:scale-[0.97]"
          >
            Sell with us
          </a>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="md:hidden fixed inset-0 z-[300] bg-fc-night/50"
          style={{ animation: "fcDrawerScrim 0.2s ease-out" }}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 left-0 h-full bg-fc-night p-8 flex flex-col gap-4 shadow-2xl"
            style={{ width: "min(82%, 320px)", animation: "fcMenuIn 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-light text-2xl text-fc-paper">FlowCart</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="w-10 h-10 grid place-items-center text-fc-wheat bg-transparent border-none cursor-pointer"
              >
                <Icon size={20}>
                  <path d="M6 6l12 12M18 6L6 18" />
                </Icon>
              </button>
            </div>

            {/* Links */}
            {NAV_LINKS.map(([label, id], i) => (
              <a
                key={label}
                href="#"
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                className="font-display font-light text-[26px] text-fc-wheat no-underline border-b border-fc-wheat/[0.12] pb-4"
                style={{ animation: `fcMenuItem 0.4s cubic-bezier(0.22,1,0.36,1) ${0.06 * i + 0.08}s both` }}
              >
                {label}
              </a>
            ))}

            {/* Sell CTA */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollTo("sell"); }}
              className="mt-auto text-center font-body text-sm font-semibold text-fc-night bg-fc-marigold no-underline py-[14px] rounded-sm"
            >
              Sell with us
            </a>
          </aside>
        </div>
      )}

      {/* Keyframe animations for mobile drawer */}
      <style>{`
        @keyframes fcDrawerScrim { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fcMenuIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes fcMenuItem { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </header>
  );
}
