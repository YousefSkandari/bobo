import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'cloud-slow': 'cloud-drift-slow 120s linear infinite',
        'cloud-fast': 'cloud-drift-fast 80s linear infinite',
        'window-flicker': 'window-flicker 8s ease-in-out infinite',
      },
      keyframes: {
        'cloud-drift-slow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'cloud-drift-fast': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'window-flicker': {
          '0%': { opacity: '0.7' },
          '25%': { opacity: '0.9' },
          '50%': { opacity: '0.8' },
          '75%': { opacity: '1' },
          '100%': { opacity: '0.7' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config; 