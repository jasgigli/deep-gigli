"use client"; // Make it a client component

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false); // Default to light mode
    const [colors, setColors] = useState({
        lightMode: {
            // Serene Ocean Light Theme Palette (Psychologically Relaxing & Attractive)
            primary: '#64B5F6',          // Soft Blue (Light Blue 300) - Calming Primary
            primaryHover: '#42A5F5',
            secondary: '#81C784',        // Sea Green (Green 300) - Natural & Harmonious
            secondaryHover: '#66BB6A',
            accent: '#FFD54F',           // Warm Sand (Yellow 300) - Subtle & Gentle Accent
            accentHover: '#FFCA28',

            backgroundPrimary: '#F8F9FA', // Off-White (Gray 50) - Clean Main Background
            backgroundSecondary: '#ECEFF1', // Light Gray (Blue Gray 100) - Card Backgrounds
            backgroundAccent: '#E0E0E0',  // Very Light Gray (Gray 200) - Subtle Accents

            textPrimary: '#424242',      // Dark Gray (Gray 800) - Readable Main Text
            textSecondary: '#757575',    // Medium Gray (Gray 600) - Muted Secondary Text
            textAccent: '#9E9E9E',       // Light Gray (Gray 500) - Hint/Less Important Text

            borderPrimary: '#BDBDBD',    // Light Gray (Gray 400) - Soft Borders
            borderSecondary: '#CFD8DC',  // Very Light Gray (Blue Gray 200) - Lighter Borders

            success: '#4CAF50',          // Green 500 - Standard Success Green
            error: '#F44336',            // Red 500 - Standard Error Red
            warning: '#FFC107',          // Amber 500 - Standard Warning Amber
            info: '#03A9F4',             // Light Blue 500 - Standard Info Light Blue
        },
        darkMode: {
            // Serene Ocean Dark Theme Palette (Relaxing & Attractive Dark Mode)
            primary: '#1E88E5',          // Deep Blue (Blue 600) - Dark Mode Primary
            primaryHover: '#1976D2',
            secondary: '#26A69A',        // Teal Green (Teal 600) - Sophisticated Dark Secondary
            secondaryHover: '#009688',
            accent: '#FFEE58',           // Moon Yellow (Yellow A200) - Soft Dark Mode Accent
            accentHover: '#FDD835',

            backgroundPrimary: '#263238', // Dark Navy (Blue Gray 900) - Deep Dark Background
            backgroundSecondary: '#37474F', // Darker Gray (Blue Gray 800) - Dark Card Backgrounds
            backgroundAccent: '#455A64',  // Even Darker Gray (Blue Gray 700) - Dark Subtle Accents

            textPrimary: '#ECEFF1',      // Off-White (Blue Gray 100) - Light Text for Dark Mode
            textSecondary: '#B0BEC5',    // Light Gray (Blue Gray 300) - Muted Dark Mode Text
            textAccent: '#90A4AE',       // Medium Gray (Blue Gray 400) - Dark Hint Text

            borderPrimary: '#546E7A',    // Dark Gray (Blue Gray 600) - Dark Mode Borders
            borderSecondary: '#607D8B',  // Lighter Dark Gray (Blue Gray 500) - Lighter Dark Borders

            success: '#4CAF50',          // Green 500 - Keep Success Green
            error: '#F44336',            // Red 500 - Keep Error Red
            warning: '#FFC107',          // Amber 500 - Keep Warning Amber
            info: '#03A9F4',             // Light Blue 500 - Keep Info Light Blue
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