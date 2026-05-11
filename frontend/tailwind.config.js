/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 80px rgba(255, 255, 255, 0.16)',
        card: '0 24px 80px rgba(2, 6, 23, 0.46)',
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(circle at top left, rgba(255,255,255,0.10), transparent 28rem), radial-gradient(circle at 80% 20%, rgba(148,163,184,0.08), transparent 26rem), linear-gradient(180deg, #000000 0%, #0a0a0a 48%, #000000 100%)',
      },
    },
  },
  plugins: [],
}
