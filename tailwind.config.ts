import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          beige: "#f5f0e8",
          cream: "#ebe5dc",
          sand: "#e0d9ce",
          stone: "#c4bcb0",
          charcoal: "#3d3935",
          black: "#1a1816",
        },
        accent: {
          gold: "#b8860b",
          "gold-light": "#d4a84b",
          "gold-dark": "#8b6914",
        },
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
        display: ["var(--font-heebo)", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
