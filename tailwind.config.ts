import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B0105",
          100: "#eef2f3",
          200: "#fc745f",
          300: "#f2303c",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateColumns: {
        "base-sm": "10% 1fr",
        "base-md": "15% 1fr",
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [
    require("tailwind-hamburgers"),
    "prettier-plugin-tailwindcss",
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
} satisfies Config;

export default config;
