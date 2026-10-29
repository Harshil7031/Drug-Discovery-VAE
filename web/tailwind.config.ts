import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        violet: "var(--violet)",
        good: "var(--good)",
        warn: "var(--warn)",
        bad: "var(--bad)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
