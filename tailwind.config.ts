import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        border: "#44403c", // Warm border
        input: "#44403c",
        ring: "#a8a29e",
        background: "#1c1917", // Deep Espresso/Stone
        foreground: "#f5f5f4", // Off-white "Paper" text

        primary: {
          DEFAULT: "#d6d3d1",
          foreground: "#1c1917",
        },
        secondary: {
          DEFAULT: "#292524",
          foreground: "#fafaf9",
        },
        muted: {
          DEFAULT: "#292524",
          foreground: "#a8a29e",
        },
        accent: {
          DEFAULT: "#44403c",
          foreground: "#fafaf9",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
