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

        // THEME TOKENS — EXACT ROYAL BURGUNDY + CHAMPAGNE GOLD SYSTEM
        primary: {
          DEFAULT: "#641E2E", // Primary Royal Burgundy
          dark: "#32151D",    // Dark Background Velvet Wine
          light: "#8B3A4C",
          surface: "#FCE7EA",
        },
        secondary: {
          DEFAULT: "#B88A35", // Secondary Champagne Gold
          light: "#E8C77E",   // Accent Luminous Gold
          dark: "#7D5B1E",
        },
        accent: {
          DEFAULT: "#E8C77E", // Light Champagne Gold
          glow: "#FFD58A",    // Warm 3000K LED Glow
        },
        darkbg: "#32151D",    // Velvet Dark Background
        warmivory: "#FFF7ED", // Warm Ivory Background
        goldborder: "#E8D5BD",// Subtle Gold Border
        primarytext: "#641E2E", // Royal Burgundy Text
        secondarytext: "#795D58", // Muted Warm Taupe Text
        ledglow: "#FFD58A",   // 3000K LED Glow Radiance

        // ROYAL BURGUNDY SWATCH PALETTE
        burgundy: {
          50: "#FFF7ED",
          100: "#FDF2F4",
          200: "#FCE7EA",
          300: "#F6CAD2",
          400: "#D27387",
          500: "#8B3A4C",
          600: "#752234",
          700: "#641E2E", // Exact Primary
          800: "#4B1622",
          900: "#32151D", // Exact Dark Background
          950: "#1F0A11",
        },

        // CHAMPAGNE & ANTIQUE GOLD SWATCH PALETTE
        champagne: {
          50: "#FAF7F0",
          100: "#F5EFEB",
          200: "#E8D5BD", // Exact Border
          300: "#E8C77E", // Exact Accent
          400: "#D6AB54",
          500: "#B88A35", // Exact Secondary
          600: "#A07528",
          700: "#7D5B1E",
          800: "#5F4414",
          900: "#422E0B",
          950: "#2B200A",
        },

        // CREAM & WARM IVORY PALETTE
        cream: {
          50: "#FFFFFF",
          100: "#FFFDF9",
          200: "#FFF7ED", // Warm Ivory Canvas
          300: "#FBF1E2",
          400: "#F5E5CD",
          500: "#E8D5BD", // Border
          600: "#D8BF9F",
          700: "#B59976",
          800: "#876E4E",
          900: "#56432B",
        },

        // Aliases for seamless backward compatibility across components
        emerald: {
          50: "#FFF7ED",
          100: "#FDF2F4",
          200: "#FCE7EA",
          300: "#F6CAD2",
          400: "#D27387",
          500: "#8B3A4C",
          600: "#752234",
          700: "#641E2E",
          800: "#4B1622",
          900: "#32151D",
          950: "#1F0A11",
        },
        gold: {
          50: "#FAF7F0",
          100: "#F5EFEB",
          200: "#E8D5BD",
          300: "#E8C77E",
          400: "#D6AB54",
          500: "#B88A35",
          600: "#A07528",
          700: "#7D5B1E",
          800: "#5F4414",
          900: "#422E0B",
          950: "#2B200A",
        },
        ivory: {
          50: "#FFFFFF",
          100: "#FFFDF9",
          200: "#FFF7ED",
          300: "#FBF1E2",
          400: "#F5E5CD",
          500: "#E8D5BD",
          600: "#D8BF9F",
          700: "#B59976",
          800: "#876E4E",
          900: "#56432B",
        },
        brand: {
          50: "#FFF7ED",
          100: "#FDF2F4",
          200: "#FCE7EA",
          300: "#E8D5BD",
          400: "#E8C77E",
          500: "#B88A35",
          600: "#752234",
          700: "#641E2E",
          800: "#4B1622",
          900: "#32151D",
        },
        warmstone: "#E8D5BD",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        marcellus: ["var(--font-marcellus)", "Marcellus", "serif"],
        serif: ["var(--font-cinzel)", "var(--font-marcellus)", "var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(100, 30, 46, 0.10)",
        "warm-lg": "0 10px 30px -4px rgba(100, 30, 46, 0.16)",
        glow: "0 0 25px rgba(184, 138, 53, 0.45)",
        "led-glow": "0 0 35px rgba(255, 213, 138, 0.65)",
        burgundy: "0 8px 30px -4px rgba(100, 30, 46, 0.35)",
        emerald: "0 8px 30px -4px rgba(100, 30, 46, 0.35)",
        gold: "0 8px 30px -4px rgba(184, 138, 53, 0.40)",
      },
    },
  },
  plugins: [],
};
export default config;
