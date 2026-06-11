import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        void: '#050609',
        ink: '#07120c',
        panel: '#101410',
        lime: '#baff29',
        neon: '#6fffe9',
        pulse: '#7c5cff',
        flare: '#ff4ecd',
        warning: '#ffb020',
      },
      boxShadow: {
        glow: '0 0 56px rgba(186, 255, 41, 0.2)',
        magenta: '0 0 70px rgba(255, 78, 205, 0.18)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
