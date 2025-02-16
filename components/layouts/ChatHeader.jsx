"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, Settings, Sun, Moon, LogOut, LogIn, Plus } from "lucide-react"; // Added Plus icon for "New Conversation"
import { useTheme } from '@/app/context/ThemeContext';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function ChatHeader({
    setShowSettings,
    settings,
    isLoggedIn = false,
    createNewConversation, // Expecting createNewConversation function as prop now
    currentConversation, // Expecting currentConversation to potentially display title
}) {
    const { colors, darkMode, toggleDarkMode } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Dropdown toggle with animation support
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auth actions (placeholder implementations)
    const handleAuthAction = () => {
        const action = isLoggedIn ? 'logout' : 'login';
        alert(`${action} action (replace with actual logic)`);
        setIsDropdownOpen(false);
        // router.push(isLoggedIn ? '/' : '/signin');
    };

    return (
        <header
            className={`sticky top-0 z-10 px-4 sm:px-6 py-2 border-b flex items-center justify-between bg-opacity-95 backdrop-blur-sm transition-colors duration-300`}
            style={{
                backgroundColor: colors.backgroundPrimary,
                borderColor: colors.borderPrimary,
            }}
        >
            {/* Branding and Optional Conversation Title */}
            <div className="flex items-center">
                <h1 className="font-semibold text-xl bg-gradient-to-r from-primary-600 to-accent-400 bg-clip-text text-transparent mr-4 text-purple-400">
                    JasGigli AI
                </h1>
                {currentConversation && ( // Conditionally render conversation title
                    <span className="text-foreground-secondary text-sm truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]" title={currentConversation.title}>
                        {currentConversation.title}
                    </span>
                )}
            </div>


            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
               

                {/* Theme Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-1.5 rounded-md hover:bg-background-secondary transition-colors"
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                >
                    {darkMode ? (
                        <Sun size={19} className="text-foreground-secondary" />
                    ) : (
                        <Moon size={19} className="text-foreground-secondary" />
                    )}
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={toggleDropdown}
                        className={`p-1.5 rounded-md hover:bg-background-secondary transition-colors ${
                            isDropdownOpen ? 'bg-background-secondary' : ''
                        }`}
                        aria-expanded={isDropdownOpen}
                    >
                        <User size={20} className="text-foreground-primary" />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                className="absolute right-0 top-full mt-2 w-56 origin-top-right"
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                style={{
                                    backgroundColor: colors.backgroundSecondary,
                                    border: `1px solid ${colors.borderSecondary}`,
                                    borderRadius: '10px',
                                    boxShadow: '0 6px 18px rgba(0,0,0,0.10)',
                                }}
                            >
                                <div className="p-2 space-y-0.5">
                                    {isLoggedIn && (
                                        <>
                                            <DropdownItem
                                                icon={<Settings size={16} />}
                                                label="Settings"
                                                onClick={() => setShowSettings(true)}
                                            />
                                            <div className="border-t border-border-secondary my-1" />
                                        </>
                                    )}

                                    <DropdownItem
                                        icon={isLoggedIn ? <LogOut size={16} /> : <LogIn size={16} />}
                                        label={isLoggedIn ? 'Sign Out' : 'Sign In'}
                                        onClick={handleAuthAction}
                                        accent={isLoggedIn}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}

// Reusable dropdown item component
const DropdownItem = ({ icon, label, onClick, accent = false }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors ${
            accent
                ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                : 'text-foreground-primary hover:bg-background-tertiary'
        }`}
        role="menuitem"
    >
        <span className="mr-2.5 opacity-70">{icon}</span>
        <span>{label}</span>
    </button>
);