import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080A0F",
        panel: "#101722",
        line: "rgba(148, 163, 184, 0.22)",
        cyan: "#22D3EE",
        amber: "#F59E0B"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },
      boxShadow: {
        glow: "0 0 80px rgba(34, 211, 238, 0.16)",
        panel: "0 30px 100px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
