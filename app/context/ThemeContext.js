"use client"; // Make it a client component
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false); // Default to light mode
    const initialColors = {
        lightMode: {
            // Soothing Pastels & Earthy Tones - Light Theme
            primary: '#A0CED9',
            primaryHover: '#7CB9C8',
            secondary: '#C5E8B7',
            secondaryHover: '#B2D6A4',
            accent: '#FFDB58',
            accentHover: '#FDD035',

            backgroundPrimary: '#F5F5F5',
            backgroundSecondary: '#FFFFFF',
            backgroundAccent: '#EEEEEE',

            textPrimary: '#333333',
            textSecondary: '#555555',
            textAccent: '#777777',

            borderPrimary: '#DDDDDD',
            borderSecondary: '#EEEEEE',

            success: '#4CAF50',
            error: '#F44336',
            warning: '#FFC107',
            info: '#03A9F4',
        },
        darkMode: {
            // Deep Ocean & Twilight - Dark Theme
            primary: '#5DADE2',
            primaryHover: '#4A9AD4',
            secondary: '#82E0AA',
            secondaryHover: '#69D19A',
            accent: '#FFC300',
            accentHover: '#FDB813',

            backgroundPrimary: '#1E272E',
            backgroundSecondary: '#2C3A47',
            backgroundAccent: '#34495E',

            textPrimary: '#ECF0F1',
            textSecondary: '#D0D3D4',
            textAccent: '#AEB6BF',

            borderPrimary: '#456990',
            borderSecondary: '#566573',

            success: '#4CAF50',
            error: '#F44336',
            warning: '#FFC107',
            info: '#03A9F4',
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
    const theme = { darkMode, toggleDarkMode, colors: currentColors, initialColors }; // Include initialColors in theme
    return (
        <ThemeContext.Provider value={{ theme }}> {/* Corrected value prop */}
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context.theme; // Access theme from context
};

export { ThemeContext, ThemeProvider, useTheme };