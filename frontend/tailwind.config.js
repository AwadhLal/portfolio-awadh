/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#12141C',
          soft: '#171A24',
          panel: '#1B1F2B',
          border: '#2A2F3F',
        },
        parchment: {
          DEFAULT: '#EDE9E0',
          dim: '#C7C2B8',
        },
        slate: {
          soft: '#8890A0',
        },
        teal: {
          accent: '#4FD1C5',
          dim: '#2E7D74',
        },
        amber: {
          accent: '#E8A33D',
          dim: '#9C6B26',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
