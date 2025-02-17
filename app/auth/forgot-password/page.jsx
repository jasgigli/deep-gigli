// app/auth/forgot-password/page.js
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useTheme } from '@/app/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

// Fallback Colors using full palettes from ThemeContext
const initialColorsFallback = {
    lightMode: {
        primary: '#A0CED9', primaryHover: '#7CB9C8', secondary: '#C5E8B7', secondaryHover: '#B2D6A4', accent: '#FFDB58', accentHover: '#FDD035',
        backgroundPrimary: '#F5F5F5', backgroundSecondary: '#FFFFFF', backgroundAccent: '#EEEEEE',
        textPrimary: '#333333', textSecondary: '#555555', textAccent: '#777777',
        borderPrimary: '#DDDDDD', borderSecondary: '#EEEEEE',
        success: '#4CAF50', error: '#F44336', warning: '#FFC107', info: '#03A9F4',
    },
    darkMode: {
        primary: '#5DADE2', primaryHover: '#4A9AD4', secondary: '#82E0AA', secondaryHover: '#69D19A', accent: '#FFC300', accentHover: '#FDB813',
        backgroundPrimary: '#1E272E', backgroundSecondary: '#2C3A47', backgroundAccent: '#34495E',
        textPrimary: '#ECF0F1', textSecondary: '#B0BEC5', textAccent: '#90A4AE',
        borderPrimary: '#456990', borderSecondary: '#566573',
        success: '#4CAF50', error: '#F44336', warning: '#FFC107', info: '#03A9F4',
    },
};

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const { darkMode, colors, toggleDarkMode } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace with actual forgot password logic (e.g., API call to send reset link)
        console.log('Forgot Password form submitted:', { email });
        alert('Forgot Password form submitted! Check console.');
    };

    // Use nullish coalescing operator (??) to provide fallback colors
    const currentColors = colors ?? initialColorsFallback[darkMode ? 'darkMode' : 'lightMode'];

    return (
        <div className={`flex justify-center items-center h-screen`} style={{ backgroundColor: currentColors.backgroundPrimary }}>
            <div className={`card w-full max-w-md p-8 rounded-xl shadow-lg border`} style={{ backgroundColor: currentColors.backgroundSecondary, borderColor: currentColors.borderPrimary }}>
                 <div className="flex justify-end mb-4">
                    <button
                        onClick={toggleDarkMode}
                        aria-label="Toggle theme"
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        {darkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-gray-700" />}
                    </button>
                </div>
                <h2 className={`text-2xl font-bold text-center mb-6`} style={{ color: currentColors.textPrimary }}>Forgot Your Password?</h2>
                <p className={`text-center mb-4`} style={{ color: currentColors.textSecondary }}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className={`block text-sm font-medium`} style={{ color: currentColors.textSecondary }}>Email</label>
                        <div className="mt-1">
                            <Input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full ${darkMode ? 'dark' : 'light'}"
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full">Reset Password</Button>
                </form>
                <div className="mt-6 text-center">
                    <Link href="/auth/login" className="text-sm text-blue-500 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;