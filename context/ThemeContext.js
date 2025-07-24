"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const initialColors = {
    lightMode: {
      // ChatGPT Light Theme Colors
      primary: "#10a37f",
      primaryHover: "#0d8f6f",
      secondary: "#6b7280",
      secondaryHover: "#4b5563",
      accent: "#10a37f",
      accentHover: "#0d8f6f",
      backgroundPrimary: "#ffffff",
      backgroundSecondary: "#f7f7f8",
      backgroundAccent: "#f1f1f2",
      textPrimary: "#374151",
      textSecondary: "#6b7280",
      textAccent: "#9ca3af",
      borderPrimary: "#d1d5db",
      borderSecondary: "#e5e7eb",
      success: "#10a37f",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
      // ChatGPT specific colors
      sidebarBackground: "#f7f7f8",
      sidebarText: "#374151",
      sidebarHover: "#ececf1",
      mainBackground: "#ffffff",
      inputBackground: "#ffffff",
      inputBorder: "#d1d5db",
      inputFocus: "#10a37f",
      messageUser: "#f7f7f8",
      messageAssistant: "#ffffff",
    },
    darkMode: {
      // ChatGPT Dark Theme Colors
      primary: "#19c37d",
      primaryHover: "#15b370",
      secondary: "#8e8ea0",
      secondaryHover: "#acacbe",
      accent: "#19c37d",
      accentHover: "#15b370",
      backgroundPrimary: "#343541",
      backgroundSecondary: "#444654",
      backgroundAccent: "#202123",
      textPrimary: "#ececf1",
      textSecondary: "#c5c5d2",
      textAccent: "#8e8ea0",
      borderPrimary: "#565869",
      borderSecondary: "#4d4d4f",
      success: "#19c37d",
      error: "#f87171",
      warning: "#fbbf24",
      info: "#60a5fa",
      // ChatGPT specific colors
      sidebarBackground: "#202123",
      sidebarText: "#ececf1",
      sidebarHover: "#2a2b32",
      mainBackground: "#343541",
      inputBackground: "#40414f",
      inputBorder: "#565869",
      inputFocus: "#19c37d",
      messageUser: "#343541",
      messageAssistant: "#444654",
    },
  };
  const [colors] = useState(initialColors);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("themeMode");
      if (storedTheme) {
        setDarkMode(storedTheme === "dark");
      }
    } catch (error) {
      console.error("Error accessing localStorage for themeMode:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("themeMode", darkMode ? "dark" : "light");
    } catch (error) {
      console.error("Error saving themeMode to localStorage:", error);
    }
  }, [darkMode]);

  // Function to convert hex to RGB values for CSS variables
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Function to set CSS variables based on current theme
  const setCSSVariables = (colors) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;

      Object.entries(colors).forEach(([key, value]) => {
        const rgb = hexToRgb(value);
        if (rgb) {
          // Convert camelCase to kebab-case for CSS variables
          const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
          root.style.setProperty(
            `--color-${cssKey}`,
            `${rgb.r} ${rgb.g} ${rgb.b}`
          );
        }
      });
    }
  };

  // Set CSS variables and dark mode class whenever theme changes
  useEffect(() => {
    setCSSVariables(currentColors);

    // Add or remove dark class from html element for Tailwind dark mode
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (darkMode) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, [darkMode, colors]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const currentColors = darkMode ? colors.darkMode : colors.lightMode;
  const theme = {
    darkMode,
    toggleDarkMode,
    colors: currentColors,
    initialColors,
  };
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context.theme;
};

export { ThemeContext, ThemeProvider, useTheme };
