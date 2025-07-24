// app/auth/login/page.js
"use client";

import React, { useState } from 'react';
import { Button } from '@/app/_components/ui/Button';
import { Input } from '@/app/_components/ui/Input';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
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
        textPrimary: '#ECF0F1', textSecondary: '#D0D3D4', textAccent: '#AEB6BF',
        borderPrimary: '#456990', borderSecondary: '#566573',
        success: '#4CAF50', error: '#F44336', warning: '#FFC107', info: '#03A9F4',
    },
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { darkMode, colors, toggleDarkMode } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace with actual login logic
        console.log('Login form submitted:', { email, password });
        alert('Login form submitted! Check console.');
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
                <h2 className={`text-3xl font-bold text-center mb-6`} style={{ color: currentColors.textPrimary }}>Login</h2>
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
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className={`block text-sm font-medium`} style={{ color: currentColors.textSecondary }}>Password</label>
                        <div className="mt-1">
                            <Input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <Button type="submit" variant="primary">Login</Button>
                        <Link href="/auth/forgot-password" className="text-sm text-blue-500 hover:underline focus:outline-none">
                            Forgot password?
                        </Link>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className={`text-sm`} style={{ color: currentColors.textAccent }}>
                        Don't have an account?
                        <Link href="/auth/signup" className="text-blue-500 hover:underline ml-1">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;