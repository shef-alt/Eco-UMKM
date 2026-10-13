import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        scan: {
          '0%': { top: '0' },
          '50%': { top: '100%' },
          '100%': { top: '0' },
        },
      },
      animation: {
        scan: 'scan 1.8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
