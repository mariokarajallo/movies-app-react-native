/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,tsx}',
    './presentation/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './App.{js,ts,tsx}',
    './core/**/*.{js,ts,tsx}',
    './infrastucture/**/*.{js,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Netflix-inspired colors
        'netflix-red': '#E50914',
        'netflix-black': '#141414',
        'netflix-dark': '#1F1F1F',
        'netflix-gray': '#808080',
        'netflix-light-gray': '#E5E5E5',

        // IMDB-inspired colors
        'imdb-yellow': '#F5C518',
        'imdb-dark': '#1A1A1A',
        'imdb-gray': '#2F2F2F',

        // Modern gradients
        'gradient-dark': 'linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,1) 100%)',
      },
      fontFamily: {
        netflix: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
    },
  },
  plugins: [],
};
