/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hindi: ['"Baloo 2"', 'cursive'],
        modern: ['Poppins', 'sans-serif'],
      },
      colors: {
        glassWhite: 'rgba(255, 255, 255, 0.1)',
        glassBorder: 'rgba(255, 255, 255, 0.2)',
        primaryDark: '#0f0c29',
        primaryMid: '#302b63',
        primaryLight: '#24243e',
        neonPurple: '#a78bfa',
        softPink: '#ec4899',
        alertRed: '#ef4444',
        successGreen: '#10b981',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '12px',
        xl: '20px',
      },
      blur: {
        xs: '2px',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        glow: 'glow 2s ease-in-out infinite alternate',
        bounceFast: 'bounceFast 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #6b21a8' },
          '100%': { boxShadow: '0 0 20px #9333ea' },
        },
        bounceFast: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(147, 51, 234, 0.6)',
        neon: '0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #a78bfa',
        soft: '0 4px 30px rgba(0, 0, 0, 0.2)',
        innerGlass: 'inset 0 0 10px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
