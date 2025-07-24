"use client";

// _components/ui/Dropdown.jsx
import { useTheme } from "@/context/ThemeContext";

const Dropdown = ({ options, value, onChange, className = "", ...props }) => {
  const theme = useTheme();

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
