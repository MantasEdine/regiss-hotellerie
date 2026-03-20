/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'class' tells Tailwind to activate dark mode
  // when the HTML element has class="dark"
  // (as opposed to 'media' which uses the OS setting)
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mauve: {
          50:  '#f5f0fa',
          100: '#ede6f3',
          200: '#d9cce8',
          300: '#c4a8d8',
          400: '#a97ec3',
          500: '#8f5aaf',
          600: '#7b5e8a',
          700: '#5a3f6b',
          800: '#3d2a48',
          900: '#2a1f35',
        },
        brand: {
          orange: '#D4622A',
          'orange-light': '#FAE8DC',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
