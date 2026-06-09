"use client";

import { useCartStore } from "@/stores/cartStore";
import { useMenuStore } from "@/stores/menuStore";

export default function Navbar() {
  // Selective subscriptions — component only re-renders when these specific
  // slices change, not on every store update
  const cartCount = useCartStore((state) => state.items.length);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const isMenuOpen = useMenuStore((state) => state.isOpen);
  const toggleMenu = useMenuStore((state) => state.toggle);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fc-night">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="font-display text-xl text-fc-wheat tracking-tight">
            FlowCart Nepal
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#shop"   className="font-body text-sm text-fc-wheat/70 hover:text-fc-wheat transition-colors">Shop</a>
            <a href="#makers" className="font-body text-sm text-fc-wheat/70 hover:text-fc-wheat transition-colors">Makers</a>
            <a href="#about"  className="font-body text-sm text-fc-wheat/70 hover:text-fc-wheat transition-colors">About</a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Cart button — live count from store */}
            <button
              onClick={openDrawer}
              aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              className="relative p-2 text-fc-wheat/70 hover:text-fc-wheat transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-fc-rust text-white text-[10px] font-body font-semibold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Desktop CTA */}
            <a
              href="#shop"
              className="hidden md:inline-flex items-center px-4 py-2 bg-fc-rust text-white text-xs font-body font-semibold uppercase tracking-widest rounded-sm hover:bg-fc-earth transition-colors"
            >
              Shop Now
            </a>

            {/* Mobile hamburger — swaps to X when open */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 text-fc-wheat/70 hover:text-fc-wheat transition-colors"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-fc-earth/30 bg-fc-night px-4 py-4 flex flex-col gap-4">
          <a onClick={toggleMenu} href="#shop"   className="font-body text-sm text-fc-wheat/80 hover:text-fc-wheat transition-colors">Shop</a>
          <a onClick={toggleMenu} href="#makers" className="font-body text-sm text-fc-wheat/80 hover:text-fc-wheat transition-colors">Makers</a>
          <a onClick={toggleMenu} href="#about"  className="font-body text-sm text-fc-wheat/80 hover:text-fc-wheat transition-colors">About</a>
          <a
            href="#shop"
            className="inline-flex items-center justify-center px-4 py-2 bg-fc-rust text-white text-xs font-body font-semibold uppercase tracking-widest rounded-sm"
          >
            Shop Now
          </a>
        </div>
      )}
    </header>
  );
}
