import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A2540",
          50: "#e8f0f8",
          100: "#c5d6ec",
          200: "#9ebade",
          300: "#779ecf",
          400: "#5788c4",
          500: "#3772b8",
          600: "#2c5a94",
          700: "#214270",
          800: "#162c4c",
          900: "#0A2540",
        },
        accent: {
          DEFAULT: "#C9A961",
          50: "#fdf8ee",
          100: "#f9efd0",
          200: "#f3dfa1",
          300: "#ecc86a",
          400: "#e5b23e",
          500: "#C9A961",
          600: "#a8882a",
          700: "#856a20",
          800: "#624e18",
          900: "#3f3210",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "Inter, system-ui, sans-serif",
            h1: { fontFamily: "Playfair Display, serif" },
            h2: { fontFamily: "Playfair Display, serif" },
            h3: { fontFamily: "Playfair Display, serif" },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
