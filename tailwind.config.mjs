/** @type {import('tailwindcss').Config} */
export default {

  darkMode: 'class', // or 'media'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "chatgpt-green": "#10a37f",
        "sidebar-black": "#202123",
        "main-gray": "#343541",
      },
      animation: {
        'bounce': 'bounce 1.5s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      fontFamily: {
        
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
