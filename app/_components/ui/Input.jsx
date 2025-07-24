"use client";

// _components/ui/Input.jsx
import { useTheme } from "@/context/ThemeContext";
import React from "react";

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  const { theme } = useTheme();
  return (
    <input
      ref={ref}
      className={`rounded-md border shadow-sm focus:ring-2 focus:ring-${theme.colors.primary} focus:border-${theme.colors.primary} focus:outline-none ${className}`}
      style={{
        backgroundColor: theme.colors.backgroundSecondary,
        color: theme.colors.textPrimary,
        borderColor: theme.colors.borderPrimary,
      }}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
