import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        surface: '#141414',
        'surface-2': '#1A1A1A',
        'text-primary': '#F0EDE6',
        'text-secondary': '#9A9589',
        'text-tertiary': '#5A5650',
        accent: '#B8935A',
        'accent-hover': '#C9A46B',
        terracotta: '#C4603A',
        border: '#2A2A2A',
        'border-light': '#333333'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.02em'
      },
      boxShadow: {
        subtle: '0 2px 12px rgba(0,0,0,0.12)'
      }
    }
  },
  plugins: []
};
