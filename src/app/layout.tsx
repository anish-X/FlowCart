import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowCart Nepal — Handmade Crochet",
  description: "A marketplace for Nepal's crochet makers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable}`}
    >
      <body className="font-body bg-fc-white text-fc-night antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
