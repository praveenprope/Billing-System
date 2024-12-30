/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        '3d-fade-in': 'fade-in 2s ease-out',
        '3d-bounce': 'bounce-3d 1.5s infinite',
        'glow-pulse': 'glow 3s infinite ease-in-out',
        'spin-slow': 'spin 10s linear infinite',
        'slide-up': 'slide-up 1.5s ease-out',
        'float': 'float 3s infinite ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(-20px) rotateX(-30deg)' },
          '100%': { opacity: 1, transform: 'translateY(0) rotateX(0)' },
        },
        'bounce-3d': {
          '0%, 100%': { transform: 'translateY(0) rotateZ(0deg)' },
          '50%': { transform: 'translateY(-10px) rotateZ(5deg)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 10px #ffffff, 0 0 20px #ffffff' },
          '50%': { boxShadow: '0 0 20px #00ffcc, 0 0 40px #00ffcc' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
