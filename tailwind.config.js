/** @type {import('tailwindcss').Config} */
module.exports = {
  // Changed export default to module.exports for better compatibility
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode via class strategy
  theme: {
    extend: {
      colors: {
        // ChatGPT Color System using CSS Variables
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--color-primary-hover) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        "secondary-hover": "rgb(var(--color-secondary-hover) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",

        // Background colors
        "bg-primary": "rgb(var(--color-background-primary) / <alpha-value>)",
        "bg-secondary":
          "rgb(var(--color-background-secondary) / <alpha-value>)",
        "bg-accent": "rgb(var(--color-background-accent) / <alpha-value>)",

        // Text colors
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        "text-accent": "rgb(var(--color-text-accent) / <alpha-value>)",

        // Border colors
        "border-primary": "rgb(var(--color-border-primary) / <alpha-value>)",
        "border-secondary":
          "rgb(var(--color-border-secondary) / <alpha-value>)",

        // Status colors
        success: "rgb(var(--color-success) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",

        // ChatGPT specific colors
        "sidebar-bg": "rgb(var(--color-sidebar-background) / <alpha-value>)",
        "sidebar-text": "rgb(var(--color-sidebar-text) / <alpha-value>)",
        "sidebar-hover": "rgb(var(--color-sidebar-hover) / <alpha-value>)",
        "main-bg": "rgb(var(--color-main-background) / <alpha-value>)",
        "input-bg": "rgb(var(--color-input-background) / <alpha-value>)",
        "input-border": "rgb(var(--color-input-border) / <alpha-value>)",
        "input-focus": "rgb(var(--color-input-focus) / <alpha-value>)",
        "message-user": "rgb(var(--color-message-user) / <alpha-value>)",
        "message-assistant":
          "rgb(var(--color-message-assistant) / <alpha-value>)",
      },
      ringColor: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "input-focus": "rgb(var(--color-input-focus) / <alpha-value>)",
      },
      borderColor: {
        primary: "rgb(var(--color-border-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-border-secondary) / <alpha-value>)",
        "input-border": "rgb(var(--color-input-border) / <alpha-value>)",
      },
      textColor: {
        primary: "rgb(var(--color-text-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-text-accent) / <alpha-value>)",
        sidebar: "rgb(var(--color-sidebar-text) / <alpha-value>)",
      },
      backgroundColor: {
        primary: "rgb(var(--color-background-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-background-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-background-accent) / <alpha-value>)",
        sidebar: "rgb(var(--color-sidebar-background) / <alpha-value>)",
        main: "rgb(var(--color-main-background) / <alpha-value>)",
        input: "rgb(var(--color-input-background) / <alpha-value>)",
      },
      fill: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      },
      stroke: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      },
      animation: {
        bounce: "bounce 1.5s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
