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
    extend: {},
  },
  plugins: [],
};
