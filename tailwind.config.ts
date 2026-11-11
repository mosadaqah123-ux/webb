import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060E1B",
          900: "#0B1930", // Primary deep navy requested
          850: "#0F213F",
          800: "#142A50",
          700: "#1D3B6E",
          600: "#2B5294",
        },
        gold: {
          50: "#FAF7F2",
          100: "#F3ECE1",
          200: "#E5D7C1",
          300: "#D3BE9C",
          400: "#B5A181", // Subtle muted gold requested
          500: "#A28D6C",
          600: "#867252",
          700: "#69573C",
          800: "#4F402B",
        },
        ivory: {
          50: "#F7F8FA", // Warm white requested
          100: "#F0F2F5",
          200: "#E3E6EB",
          300: "#CFD4DC",
          400: "#9CA4B1",
          500: "#6B7280",
        },
      },
      fontFamily: {
        arabic: ["var(--font-ibm-plex-arabic)", "system-ui", "sans-serif"],
        amiri: ["var(--font-amiri)", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9B89B 0%, #B5A181 50%, #948062 100%)",
        "navy-gradient": "linear-gradient(180deg, #0B1930 0%, #060E1B 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(181, 161, 129, 0.2)",
        "navy-card": "0 20px 40px -15px rgba(11, 25, 48, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
