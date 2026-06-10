"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import PromoBanner from "@/components/sections/PromoBanner";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import MakerSpotlight from "@/components/sections/MakerSpotlight";
import MakerGrid from "@/components/sections/MakerGrid";
import Testimonials from "@/components/sections/Testimonials";
import QuickViewModal from "@/components/ui/QuickViewModal";

export default function Home() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PromoBanner onShop={() => scrollTo("shop")} />
        <FeaturedProducts />
        <MakerSpotlight />
        <MakerGrid />
        <Testimonials />
      </main>
      <QuickViewModal />
    </>
  );
}
