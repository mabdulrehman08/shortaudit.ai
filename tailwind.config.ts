import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        void: '#05060f',
        ink: '#0b1020',
        panel: '#0d1224',
        neon: '#6fffe9',
        pulse: '#a855f7',
        flare: '#ff4ecd',
        warning: '#f59e0b',
      },
      boxShadow: {
        glow: '0 0 60px rgba(111, 255, 233, 0.22)',
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
