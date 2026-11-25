/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F1EA',      // Warm Ivory — Main page background
        stone: '#E8E0D5',      // Soft Stone — Product image background
        espresso: '#292522',   // Espresso — Typography & buttons
        champagne: '#B89A72',  // Muted Champagne — Accents
        sand: '#D8CEC1',       // Sand Beige — Secondary sections
        pure: '#FFFFFF',       // Pure White — Cards / whitespace
      },
      opacity: {
        5: '0.05',
        8: '0.08',
        10: '0.10',
        15: '0.15',
        20: '0.20',
        25: '0.25',
        30: '0.30',
        35: '0.35',
        40: '0.40',
        45: '0.45',
        50: '0.50',
        55: '0.55',
        60: '0.60',
        65: '0.65',
        70: '0.70',
        75: '0.75',
        80: '0.80',
        85: '0.85',
        90: '0.90',
        92: '0.92',
        95: '0.95',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 18px 44px -16px rgba(41, 37, 34, 0.08)',
        'luxury-lg': '0 28px 64px -20px rgba(41, 37, 34, 0.13)',
        'champagne-glow': '0 12px 36px -8px rgba(184, 154, 114, 0.28)',
      },
    },
  },
  plugins: [],
};
