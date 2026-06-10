"use client";

import { useCartStore } from "@/stores/cartStore";
import { formatNPR } from "@/services/mockData";

export default function CartDrawer() {
  const items       = useCartStore((s) => s.items);
  const isOpen      = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const setQty      = useCartStore((s) => s.setQty);
  const removeItem  = useCartStore((s) => s.removeItem);
  const total       = useCartStore((s) => s.total());

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes fcDrawerScrim { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fcDrawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>

      {/* Scrim */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 z-[1100] bg-fc-night/50"
        style={{ animation: "fcDrawerScrim 0.2s ease-out" }}
      >
        {/* Drawer panel — stopPropagation so clicks inside don't close */}
        <aside
          onClick={(e) => e.stopPropagation()}
          className="absolute top-0 right-0 h-full bg-fc-paper flex flex-col shadow-[0_12px_40px_rgba(28,21,16,0.14)]"
          style={{
            width: "min(100%, 380px)",
            animation: "fcDrawerIn 0.32s cubic-bezier(0.215,0.61,0.355,1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-fc-night/[0.12]">
            <h2
              className="m-0 font-display font-light text-fc-earth"
              style={{ fontSize: "1.25rem", fontVariationSettings: "'opsz' 48" }}
            >
              Your cart{" "}
              <span className="text-[#6B5742]">· {items.length}</span>
            </h2>
            <button
              type="button"
              aria-label="Close cart"
              onClick={closeDrawer}
              className="w-[34px] h-[34px] grid place-items-center border-none bg-transparent text-fc-earth cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-auto px-8 py-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <p
                className="font-display italic font-light text-[16px] text-[#6B5742] text-center mt-16"
                style={{ fontVariationSettings: "'opsz' 48" }}
              >
                Your cart is empty — go meet a maker.
              </p>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  {/* Thumbnail placeholder */}
                  <div
                    className="w-16 flex-none rounded-lg bg-fc-wheat"
                    style={{ height: 76 }}
                  />

                  {/* Item details */}
                  <div className="flex-1 flex flex-col gap-[2px] min-w-0">
                    <span className="font-body font-semibold text-[15px] text-fc-night truncate">
                      {item.product.name}
                    </span>
                    <span
                      className="font-display italic font-light text-[12px] text-[#6B5742]"
                      style={{ fontVariationSettings: "'opsz' 48" }}
                    >
                      by {item.product.maker}
                    </span>

                    {/* Qty stepper + line total */}
                    <div className="flex items-center justify-between mt-[6px]">
                      <div className="inline-flex items-center border border-fc-night/[0.12] rounded-[4px]">
                        <button
                          type="button"
                          aria-label="Decrease"
                          onClick={() =>
                            item.quantity <= 1
                              ? removeItem(item.product.id)
                              : setQty(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-[30px] grid place-items-center border-none bg-transparent text-fc-earth cursor-pointer text-base leading-none hover:bg-fc-wheat/50 transition-colors"
                        >
                          –
                        </button>
                        <span className="min-w-6 text-center font-body text-[13px] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase"
                          onClick={() => setQty(item.product.id, item.quantity + 1)}
                          className="w-7 h-[30px] grid place-items-center border-none bg-transparent text-fc-earth cursor-pointer text-base leading-none hover:bg-fc-wheat/50 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-body font-semibold text-[13px] text-fc-earth tabular-nums">
                        {formatNPR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer — subtotal + checkout */}
          {items.length > 0 && (
            <div className="border-t border-fc-night/[0.12] px-8 py-6 flex flex-col gap-4">
              <div className="flex justify-between items-baseline">
                <span className="font-body text-[13px] text-[#6B5742]">Subtotal</span>
                <span
                  className="font-display font-light text-[20px] text-fc-earth tabular-nums"
                  style={{ fontVariationSettings: "'opsz' 48" }}
                >
                  {formatNPR(total)}
                </span>
              </div>

              <button
                type="button"
                className="w-full py-[13px] bg-fc-earth text-fc-wheat font-body text-sm font-semibold uppercase tracking-widest rounded-sm hover:bg-fc-night transition-colors"
              >
                Checkout
              </button>

              <p className="m-0 text-center font-body text-[11px] text-[#6B5742]">
                Each order directly supports a Nepali maker.
              </p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
