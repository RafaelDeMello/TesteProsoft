/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        prosoft: {
          bg: '#111014',
          surface: '#1a1520',
          border: '#2e2638',
          primary: '#7c4dab',
          accent: '#9b6cc7',
          text: '#e8e0f0',
          muted: '#5a5260',
          subtle: '#4a4455',
        },
      },
    },
  },
}
