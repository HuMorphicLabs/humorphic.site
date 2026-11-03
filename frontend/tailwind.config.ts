import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#05131D",          // Deep Oceanic Dark Teal Background
          surface: "#092233",     // Elevated Teal Surface
          card: "#0D2B3E",        // Card Background with Steel Blue undertone
          hover: "#143D57",       // Hover Surface
          border: "#1C4E6D",      // Steel Blue / Cyan Border
          muted: "#85A9BE",       // Muted Text
        },
        humorphic: {
          primary: "#086288",     // Deep Teal (Primary brand color)
          teal: "#086288",        // Deep Teal
          steel: "#4D8DBA",       // Steel Blue (Secondary backgrounds, cards, section highlights)
          sky: "#97D7FF",         // Sky Blue (Accent, glowing effects, interactive highlights)
          cream: "#FFEFC4",       // Soft Cream Yellow (Subtle backgrounds, highlighted elements)
          dark: "#05131D",
          wine: "#0A3B52",
          crimson: "#086288",
          orange: "#086288",      // Map orange to Deep Teal for seamless legacy compatibility
          red: "#086288",
          amber: "#4D8DBA",       // Map amber to Steel Blue
          gold: "#FFEFC4",        // Map gold to Soft Cream Yellow
          yellow: "#FFEFC4",
          cyan: "#97D7FF",
          green: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px -5px rgba(8, 98, 136, 0.6), 0 0 15px rgba(151, 215, 255, 0.4)",
        "glow-steel": "0 0 30px -5px rgba(77, 141, 186, 0.5)",
        "glow-sky": "0 0 30px -5px rgba(151, 215, 255, 0.65)",
        "glow-cream": "0 0 30px -5px rgba(255, 239, 196, 0.4)",
        card: "0 10px 30px -10px rgba(4, 19, 29, 0.8)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scan: "scan 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
