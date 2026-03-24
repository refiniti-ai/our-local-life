import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Americana palette – sun-washed, tactile
        aqua: {
          DEFAULT: "#3A9B9B",
          light: "#5BB5B5",
          dark: "#2D7A7A",
        },
        cream: "#F5F0E6",
        canvas: "#E8E0D0",
        "service-red": "#C23A3A",
        "service-red-dark": "#9E2E2E",
        "turf-green": "#2D5A3D",
        charcoal: "#2C2C2C",
        "charcoal-light": "#4A4A4A",
      },
      fontFamily: {
        script: ["var(--font-pacifico)", "cursive"],
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      backgroundImage: {
        "stripe-diag": "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0,0,0,0.03) 8px, rgba(0,0,0,0.03) 16px)",
        "canvas-texture": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        badge: "0 2px 0 0 rgba(0,0,0,0.1), 0 4px 6px -1px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
