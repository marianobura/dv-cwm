/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '25': '6.25rem',
        'body': 'calc(100vh - 96px)',
        'chat': 'calc(100vh - 96px - 122px)',
      },
      gridTemplateColumns: {
        'layout': '300px 1fr',
      },
      minHeight: {
        'body': 'calc(100vh - 96px)',
        'chat': 'calc(100vh - 96px - 122px)',
      },
    },
  },
  plugins: [],
}

