import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fc-night":    "#1C1510",
        "fc-earth":    "#4A2E1A",
        "fc-rust":     "#B05432",
        "fc-marigold": "#D4883A",
        "fc-turmeric": "#E8B86D",
        "fc-wheat":    "#F0DEC0",
        "fc-paper":    "#F8F3EB",
        "fc-white":    "#FDFAF5",
        "fc-moss":     "#4E6B46",
        "fc-teal":     "#3D7A72",
        "fc-slate":    "#5C6B7A",
        "fc-rose":     "#B5584A",
        "fc-indigo":   "#4A5280",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
