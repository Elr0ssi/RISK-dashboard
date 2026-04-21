import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        risk: {
          bg: '#06090f',
          panel: '#101724',
          border: '#24334b',
          text: '#d9e4ff',
          danger: '#fb7185',
          warning: '#fbbf24',
          info: '#38bdf8',
          success: '#34d399'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
