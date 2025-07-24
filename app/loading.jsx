// app/loading.js
import { useTheme } from "@/context/ThemeContext";

export default function Loading() {
  const { theme } = useTheme();
  const textColor = theme?.colors?.textPrimary || "white";
  const bgColor = theme?.colors?.backgroundPrimary || "#gray-800";

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: textColor }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        <p className="mt-4 text-lg" style={{ color: textColor }}>
          Loading AI Chat...
        </p>
      </div>
    </div>
  );
}
