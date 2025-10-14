module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        beige: '#EADBC8',
        bg: '#FAFAFA',
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-in-out',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        'lg': '480px',
      },
    },
  },
  plugins: [],
};
