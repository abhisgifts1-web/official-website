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
        background: "var(--background)",
        foreground: "var(--foreground)",

        // THEME TOKENS — MATTE BLACK + GOLDEN YELLOW + WHITE SYSTEM
        primary: {
          DEFAULT: "#121212", // Primary Matte Black
          dark: "#0A0A0A",    // Deep Matte Charcoal
          light: "#1E1E1E",   // Elevated Matte Surface
          surface: "#181818", // Card Matte Surface
        },
        secondary: {
          DEFAULT: "#FFFFFF", // Secondary Pure White
          light: "#FFFFFF",   // Crisp White
          dark: "#E5E7EB",    // Light Off-White
        },
        accent: {
          DEFAULT: "#EAB308", // Primary Accent: Golden Yellow
          glow: "#FDE047",    // Radiant Golden Yellow Glow
        },
        darkbg: "#121212",    // Matte Black Background
        warmivory: "#181818", // Matte Surface Card
        goldborder: "rgba(234, 179, 8, 0.35)", // Subtle Golden Yellow Border
        primarytext: "#FFFFFF", // Secondary White Text on Matte Black
        secondarytext: "#E5E7EB", // Muted White / Off-white Text
        ledglow: "#FDE047",   // Golden Yellow LED Radiance

        // MATTE BLACK / CHARCOAL SWATCH PALETTE
        burgundy: {
          50: "#181818",
          100: "#1C1C1C",
          200: "#222222",
          300: "#2A2A2A",
          400: "#383838",
          500: "#4B4B4B",
          600: "#2A2A2A",
          700: "#1E1E1E",
          800: "#161616",
          900: "#121212", // Exact Matte Black
          950: "#0A0A0A", // Deep Charcoal
        },

        // GOLDEN YELLOW SWATCH PALETTE
        champagne: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047", // Light Golden Yellow
          400: "#FACC15", // Luminous Gold
          500: "#EAB308", // Golden Yellow Primary Accent
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
          950: "#422006",
        },

        // MATTE SURFACES & WHITE PALETTE
        cream: {
          50: "#FFFFFF",
          100: "#F9FAFB",
          200: "#181818", // Matte Black Surface
          300: "#202020",
          400: "#282828",
          500: "#333333", // Matte Divider
          600: "#525252",
          700: "#737373",
          800: "#1E1E1E",
          900: "#121212",
        },
        gold: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
          950: "#422006",
        },
        ivory: {
          50: "#FFFFFF",
          100: "#F9FAFB",
          200: "#181818",
          300: "#202020",
          400: "#282828",
          500: "#333333",
          600: "#525252",
          700: "#737373",
          800: "#1E1E1E",
          900: "#121212",
        },
        brand: {
          50: "#181818",
          100: "#222222",
          200: "#2A2A2A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308", // Golden Yellow Accent
          600: "#CA8A04",
          700: "#1E1E1E",
          800: "#161616",
          900: "#121212",
        },
        warmstone: "#2A2A2A",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        sans: ["var(--font-poppins)", "Poppins", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-poppins)", "Poppins", "sans-serif"],
        cinzel: ["var(--font-poppins)", "Poppins", "sans-serif"],
        marcellus: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(0, 0, 0, 0.65)",
        "warm-lg": "0 10px 30px -4px rgba(0, 0, 0, 0.85)",
        glow: "0 0 25px rgba(234, 179, 8, 0.45)",
        "led-glow": "0 0 35px rgba(253, 224, 71, 0.65)",
        burgundy: "0 8px 30px -4px rgba(0, 0, 0, 0.70)",
        emerald: "0 8px 30px -4px rgba(16, 185, 129, 0.40)",
        gold: "0 8px 30px -4px rgba(234, 179, 8, 0.40)",
      },
    },
  },
  plugins: [],
};
export default config;
