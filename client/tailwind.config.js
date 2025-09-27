/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        taskio: {
          ...require('daisyui/src/theming/themes')['emerald'],
          '--rounded-box': '1rem',
          '--rounded-btn': '0.75rem',
          '--rounded-badge': '1.5rem',
          'base-100': '#f8faf9',
          'base-200': '#eef3f0',
          'base-300': '#e3ece7',
          'neutral': '#2a2f2e',
          'primary': '#10b981',
          'primary-content': '#062e24',
          'secondary': '#60a5fa',
          'accent': '#f59e0b',
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          // Green + black palette overrides
          'primary': '#10b981',
          'primary-content': '#052e26',
          'accent': '#34d399',
          'neutral': '#0a0f0d',
          'base-100': '#0b0f0d',
          'base-200': '#111614',
          'base-300': '#16201b',
        },
      },
    ],
  },
};


