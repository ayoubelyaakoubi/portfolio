/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E63946',
          light: '#FF4D5A',
          dark: '#CC2F3C',
        },
        dark: {
          bg: '#0d0c1d',
          card: '#151433',
          border: '#252548',
          surface: '#1c1b3a',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2.5s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 25px rgba(230,57,70,0.25), 0 0 50px rgba(230,57,70,0.1)' },
          '100%': { boxShadow: '0 0 50px rgba(230,57,70,0.55), 0 0 100px rgba(230,57,70,0.2)' },
        },
      },
    },
  },
  plugins: [],
}
