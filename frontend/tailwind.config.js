/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#000000',
        surface: {
          soft: '#0d0d0d',
          card: '#1a1a1a',
          elevated: '#262626',
        },
        hairline: {
          DEFAULT: '#3c3c3c',
          strong: '#262626',
        },
        ink: '#ffffff',
        body: {
          DEFAULT: '#bbbbbb',
          strong: '#e6e6e6',
        },
        muted: '#7e7e7e',
        brand: {
          blue: {
            light: '#0066b1',
            dark: '#1c69d4',
          },
          red: '#e22718',
        },
        warning: '#f4b400',
        success: '#0fa336',
        danger: '#e22718'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        machined: '1.5px',
      }
    },
  },
  plugins: [],
}
