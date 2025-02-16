"use client"; // Make it a client component

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false); // Default to light mode
    const [colors, setColors] = useState({
        lightMode: {
            // Primary Brand Colors
            primary: '#6366F1',          // Indigo-500 (Primary actions, brand accent)
            primaryHover: '#4F46E5',     // Indigo-600 (Hover state for primary)
            secondary: '#10B981',        // Green-500  (Success, secondary actions)
            secondaryHover: '#059669',   // Green-600 (Hover for secondary)
            accent: '#F59E0B',           // Yellow-500 (Warnings, accents)
            accentHover: '#D97706',      // Yellow-600 (Hover for accent)

            // Background and Surface Colors
            backgroundPrimary: '#FFFFFF',   // White (Main page background)
            backgroundSecondary: '#F9FAFB', // Gray-50 (Card backgrounds, secondary surfaces)
            backgroundAccent: '#E5E7EB',    // Gray-200 (Subtle background accents)

            // Text Colors
            textPrimary: '#111827',      // Gray-900 (Main text color)
            textSecondary: '#4B5563',    // Gray-500 (Secondary, muted text)
            textAccent: '#6B7280',       // Gray-400 (Hint text, less important text)

            // Border Colors
            borderPrimary: '#D1D5DB',     // Gray-300 (Default borders)
            borderSecondary: '#E5E7EB',   // Gray-200 (Lighter borders)

            // Status Colors (Optional, can be added if needed)
            success: '#22C55E',         // Green-500
            error: '#EF4444',           // Red-500
            warning: '#F59E0B',         // Yellow-500
            info: '#3AB7BF',            // Cyan-500

            // ... add more semantic colors as needed for light mode
        },
        darkMode: {
            // Primary Brand Colors
            primary: '#A78BFA',          // Indigo-400 (Dark Mode Primary)
            primaryHover: '#8B5CF6',     // Indigo-500 (Hover for dark mode primary)
            secondary: '#34D399',        // Green-400  (Dark Mode Secondary)
            secondaryHover: '#22C55E',   // Green-500 (Hover for dark mode secondary)
            accent: '#FCD34D',           // Yellow-400 (Dark Mode Accent)
            accentHover: '#FBBF24',      // Yellow-500 (Hover for dark mode accent)

            // Background and Surface Colors
            backgroundPrimary: '#111827',   // Gray-900 (Dark Main page background)
            backgroundSecondary: '#1F2937', // Gray-800 (Dark Card backgrounds)
            backgroundAccent: '#374151',    // Gray-700 (Dark Subtle background accents)

            // Text Colors
            textPrimary: '#F9FAFB',      // Gray-50  (Dark Primary Text)
            textSecondary: '#D1D5DB',    // Gray-300 (Dark Secondary Text)
            textAccent: '#9CA3AF',       // Gray-400 (Dark Hint text)

            // Border Colors
            borderPrimary: '#4B5563',     // Gray-500 (Dark Default borders)
            borderSecondary: '#6B7280',   // Gray-400 (Dark Lighter borders)

            // Status Colors (Optional, adapt for dark mode if needed)
            success: '#22C55E',         // Green-500 (Keep same or adjust brightness)
            error: '#EF4444',           // Red-500 (Keep same or adjust brightness)
            warning: '#F59E0B',         // Yellow-500 (Keep same or adjust brightness)
            info: '#3AB7BF',            // Cyan-500 (Keep same or adjust brightness)

            // ... add more semantic colors as needed for dark mode
        },
    });

    useEffect(() => {
        // Load theme from localStorage on initial load
        const storedTheme = localStorage.getItem('themeMode');
        if (storedTheme) {
            setDarkMode(storedTheme === 'dark');
        } else {
            // Default to light mode if no theme in localStorage
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        // Save theme to localStorage whenever it changes
        localStorage.setItem('themeMode', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const currentColors = darkMode ? colors.darkMode : colors.lightMode;

    const theme = {
        darkMode,
        toggleDarkMode,
        colors: currentColors,
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvider, useTheme };