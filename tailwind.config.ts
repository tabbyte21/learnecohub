import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EBF2FB",
          100: "#D0DFEF",
          200: "#A8C2E3",
          300: "#7BA0D3",
          400: "#4D7EC4",
          500: "#1B3A7B",
          600: "#163167",
          700: "#112755",
          800: "#0D1D43",
          900: "#091431",
        },
        mint: {
          50: "#ECFBF2",
          100: "#D1F5E0",
          200: "#A3EBC1",
          300: "#69DC9A",
          400: "#2ECC71",
          500: "#27AE60",
          600: "#1F8E4E",
          700: "#176E3C",
          800: "#114F2C",
          900: "#0C361E",
        },
        gold: {
          50: "#FFFBEB",
          100: "#FFF4CC",
          200: "#FFEA99",
          300: "#FFDF66",
          400: "#F5C518",
          500: "#DBAF10",
          600: "#B5910B",
          700: "#8E7108",
          800: "#685206",
          900: "#423404",
        },
        lavender: {
          50: "#F0EDF9",
          100: "#DFD8F2",
          200: "#BFB1E5",
          300: "#9F8AD8",
          400: "#7F63CB",
          500: "#6545B0",
          600: "#503790",
          700: "#3D2B70",
          800: "#2B1F50",
          900: "#1A1330",
        },
        peach: {
          50: "#FEF5F0",
          100: "#FDE8DC",
          200: "#FBCFB7",
          300: "#F8B38E",
          400: "#F49668",
          500: "#EE7A45",
          600: "#D46030",
          700: "#AD4C27",
          800: "#863B20",
          900: "#652E1A",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1A1A2E",
          900: "#0F0F1E",
        },
      },
      fontFamily: {
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-right": "slideRight 0.7s ease-out forwards",
        "slide-left": "slideLeft 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "scale-in": "scaleIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
