/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: '#05060f',
        ink: '#0b1020',
        neon: '#6fffe9',
        pulse: '#a855f7',
        flare: '#ff4ecd',
      },
      boxShadow: {
        glow: '0 0 50px rgba(111, 255, 233, 0.22)',
        magenta: '0 0 60px rgba(255, 78, 205, 0.18)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
