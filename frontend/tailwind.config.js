/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 80px rgba(56, 189, 248, 0.22)',
        card: '0 24px 80px rgba(2, 6, 23, 0.46)',
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(circle at top left, rgba(34,211,238,0.18), transparent 28rem), radial-gradient(circle at 80% 20%, rgba(168,85,247,0.18), transparent 26rem), linear-gradient(180deg, #020617 0%, #07111f 48%, #020617 100%)',
      },
    },
  },
  plugins: [],
}
