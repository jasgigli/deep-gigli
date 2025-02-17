"use client"; // Make it a client component

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false); // Default to light mode
    const initialColors = {
        lightMode: {
            // Soothing Pastels & Earthy Tones - Light Theme
            primary: '#A0CED9',          // Soft Sky Blue - Calming Primary
            primaryHover: '#7CB9C8',
            secondary: '#C5E8B7',        // Pale Sage Green - Natural & Harmonious
            secondaryHover: '#B2D6A4',
            accent: '#FFDB58',           // Soft Gold - Gentle & Warm Accent
            accentHover: '#FDD035',

            backgroundPrimary: '#F5F5F5', // Light Gray - Soft Main Background
            backgroundSecondary: '#FFFFFF', // White - Clean Card Backgrounds
            backgroundAccent: '#EEEEEE',  // Very Light Gray - Subtle Accents

            textPrimary: '#333333',      // Dark Charcoal - Readable Main Text
            textSecondary: '#555555',    // Medium Gray - Muted Secondary Text
            textAccent: '#777777',       // Light Gray - Hint/Less Important Text

            borderPrimary: '#DDDDDD',    // Light Gray - Soft Borders
            borderSecondary: '#EEEEEE',  // Very Light Gray - Lighter Borders

            success: '#4CAF50',          // Standard Success Green
            error: '#F44336',            // Standard Error Red
            warning: '#FFC107',          // Standard Warning Amber
            info: '#03A9F4',             // Standard Info Light Blue
        },
        darkMode: {
            // Deep Ocean & Twilight - Dark Theme
            primary: '#5DADE2',          // Deep Sky Blue - Dark Mode Primary
            primaryHover: '#4A9AD4',
            secondary: '#82E0AA',        // Mint Green - Vibrant Dark Secondary
            secondaryHover: '#69D19A',
            accent: '#FFC300',           // Bright Amber - Strong Dark Mode Accent
            accentHover: '#FDB813',

            backgroundPrimary: '#1E272E', // Dark Navy - Deep Dark Background
            backgroundSecondary: '#2C3A47', // Darker Gray - Dark Card Backgrounds
            backgroundAccent: '#34495E',  // Even Darker Gray - Dark Subtle Accents

            textPrimary: '#ECF0F1',      // Off-White - Light Text for Dark Mode
            textSecondary: '#D0D3D4',    // Light Gray - Muted Dark Mode Text
            textAccent: '#AEB6BF',       // Medium Gray - Dark Hint Text

            borderPrimary: '#456990',    // Dark Blue Gray - Dark Mode Borders
            borderSecondary: '#566573',  // Lighter Dark Gray - Lighter Dark Borders

            success: '#4CAF50',          // Keep Success Green
            error: '#F44336',            // Keep Error Red
            warning: '#FFC107',          // Keep Warning Amber
            info: '#03A9F4',             // Keep Info Light Blue
        },
    };
    const [colors, setColors] = useState(initialColors);

    useEffect(() => {
        const storedTheme = localStorage.getItem('themeMode');
        if (storedTheme) {
            setDarkMode(storedTheme === 'dark');
        } else {
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('themeMode', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const currentColors = darkMode ? colors.darkMode : colors.lightMode;
    const theme = { darkMode, toggleDarkMode, colors: currentColors };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);
export { ThemeContext, ThemeProvider, useTheme };