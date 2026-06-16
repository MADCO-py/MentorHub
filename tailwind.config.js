/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface:    "#111111",
        "surface-light": "#1A1A1A",
        border:     "#2A2A2A",
        foreground: "#F5F5F5",
        muted:      "#888888",
        primary: {
          DEFAULT:    "#18C964", // verde universitario
          foreground: "#000000",
        },
        secondary: {
          DEFAULT:    "#FFFFFF",
          foreground: "#000000",
        },
        accent:     "#22D973", // verde más brillante para hover
        success:    "#18C964",
        whatsapp:   "#25D366",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans:    ["'Inter'", "system-ui", "sans-serif"],
        mono:    ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
        none:    "0px",
        sm:      "0px",
        md:      "0px",
        lg:      "0px",
        xl:      "0px",
        "2xl":   "0px",
        full:    "9999px",
      },
      boxShadow: {
        "glow-green": "0 0 30px rgba(24, 201, 100, 0.15)",
        "glow-white": "0 0 40px rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
