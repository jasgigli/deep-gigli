/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Light and dark palettes (no changes here)
                light: {
                    primary: '#64B5F6', primaryHover: '#42A5F5', secondary: '#81C784', secondaryHover: '#66BB6A', accent: '#FFD54F', accentHover: '#FFCA28',
                    backgroundPrimary: '#F8F9FA', backgroundSecondary: '#ECEFF1', backgroundAccent: '#E0E0E0',
                    textPrimary: '#424242', textSecondary: '#757575', textAccent: '#9E9E9E',
                    borderPrimary: '#BDBDBD', borderSecondary: '#CFD8DC',
                    success: '#4CAF50', error: '#F44336', warning: '#FFC107', info: '#03A9F4',
                },
                dark: {
                    primary: '#1E88E5', primaryHover: '#1976D2', secondary: '#26A69A', secondaryHover: '#009688', accent: '#FFEE58', accentHover: '#FDD835',
                    backgroundPrimary: '#263238', backgroundSecondary: '#37474F', backgroundAccent: '#455A64',
                    textPrimary: '#ECEFF1', textSecondary: '#B0BEC5', textAccent: '#90A4AE',
                    borderPrimary: '#546E7A', borderSecondary: '#607D8B',
                    success: '#4CAF50', error: '#F44336', warning: '#FFC107', info: '#03A9F4',
                },
                // **Simplified - Direct Hex Codes for Top-Level Colors (Debugging)**
                primary: '#64B5F6',
                primaryHover: '#42A5F5',
                secondary: '#81C784',
                secondaryHover: '#66BB6A',
                accent: '#FFD54F',
                accentHover: '#FFCA28',
                backgroundPrimary: '#F8F9FA',
                backgroundSecondary: '#ECEFF1',
                backgroundAccent: '#E0E0E0',
                textPrimary: '#424242',
                textSecondary: '#757575',
                textAccent: '#9E9E9E',
                borderPrimary: '#BDBDBD',
                borderSecondary: '#CFD8DC',
                success: '#4CAF50',
                error: '#F44336',
                warning: '#FFC107',
                info: '#03A9F4',
            },
            animation: {
                'bounce': 'bounce 1.5s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
    },
    plugins: [require('@tailwindcss/typography')],
};