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
        cyber: {
          bg: "#05070b",
          surface: "#0a0e17",
          card: "#101623",
          hover: "#151e30",
          border: "#1e293b",
          muted: "#64748b",
        },
        humorphic: {
          orange: "#eb3b1c",
          gold: "#f7c873",
          cyan: "#00f0ff",
          green: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(235, 59, 28, 0.4)",
        "glow-gold": "0 0 25px -5px rgba(247, 200, 115, 0.35)",
        "glow-cyan": "0 0 25px -5px rgba(0, 240, 255, 0.35)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scan: "scan 3s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
