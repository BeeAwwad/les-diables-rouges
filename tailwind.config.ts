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

      gridTemplateColumns: {
        "base-sm": "10% 1fr",
        "base-md": "15% 1fr",
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
