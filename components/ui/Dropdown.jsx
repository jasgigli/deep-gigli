"use client";

// components/ui/Dropdown.jsx
import React from "react";
import { useTheme } from "@/app/context/ThemeContext.js";

const Dropdown = ({ options, value, onChange, className = "", ...props }) => {
  const theme = useTheme(); // Corrected destructuring
  const isDarkMode = theme.darkMode;

  return (
    <select
      value={value}
      onChange={onChange}
      className={`rounded-md border shadow-sm focus:ring-2 focus:ring-${theme.colors.primary} focus:border-${theme.colors.primary} focus:outline-none ${className}`}
      style={{
        backgroundColor: theme.colors.backgroundSecondary,
        color: theme.colors.textPrimary,
        borderColor: theme.colors.borderPrimary,
      }}
      {...props}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          style={{
            backgroundColor: theme.colors.backgroundSecondary,
            color: theme.colors.textPrimary,
          }}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { Dropdown };
