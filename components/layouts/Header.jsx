"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    RefreshCw, Save, Download, Menu, User, Settings, LogOut, LogIn, HelpCircle, Info
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/app/context/ThemeContext.js";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function ModernHeader({
    saveConversation,
    exportConversation,
    regenerateResponse,
    settings,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    setShowSettings,
    isLoggedIn = false,
    // createNewConversation, // Removed as it's not used in Header
    currentConversation,
}) {
    const { darkMode, colors } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAuthAction = () => {
        const action = isLoggedIn ? 'logout' : 'login';
        alert(`${action} action (replace with actual logic)`);
        setIsDropdownOpen(false);
        // router.push(isLoggedIn ? '/' : '/signin');
    };

    const handleHelpAction = () => {
        alert('Help action (replace with actual help/documentation link)');
        setIsDropdownOpen(false);
    };

    const handleAboutAction = () => {
        alert('About action (replace with your about page/modal)');
        setIsDropdownOpen(false);
    };


    return (
        <header
            className={`sticky top-0 z-20 bg-opacity-95 backdrop-blur-lg border-b transition-colors duration-200 ${
                darkMode ? colors?.darkMode?.backgroundSecondary : colors?.lightMode?.backgroundSecondary
            } ${darkMode ? colors?.darkMode?.borderPrimary : colors?.lightMode?.borderPrimary}`}
        >
            <div className="container max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                            aria-label="Toggle sidebar"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Branding and Conversation Title */}
                    <div className="flex-1 flex items-center justify-center md:justify-start">
                        <a href="/" className="flex items-center">
                            <span className="font-bold text-xl md:text-2xl text-primary mr-4">JasGigli AI</span>
                        </a>
                        {currentConversation && (
                            <span className="text-gray-500 dark:text-gray-400 text-sm truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]" title={currentConversation.title}>
                                {currentConversation.title}
                            </span>
                        )}
                    </div>

                    {/* Right Side Controls - No Theme Toggle Button */}
                    <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
                        


                        {/* User Dropdown Button */}
                        <div className="relative" ref={dropdownRef}>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleDropdown}
                                aria-label="User Menu"
                                className={`text-gray-500 hover:text-gray-700 ${isDropdownOpen ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                            >
                                <User className="h-5 w-5" />
                            </Button>
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        className="absolute right-0 top-full mt-3 w-64 origin-top-right rounded-xl shadow-xl ring-1 ring-gray-900 ring-opacity-5 focus:outline-none" // More prominent shadow and rounded corners
                                        initial={{ opacity: 0, y: -15, scale: 0.95 }} // Increased initial y offset
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }} // Slightly slower transition
                                        style={{ backgroundColor: colors.backgroundSecondary, border: `1px solid ${colors.borderSecondary}` }}
                                        role="menu" aria-orientation="vertical" aria-labelledby="user-button" tabIndex="-1"
                                    >
                                        <div className="py-2" role="none"> {/* Increased vertical padding */}
                                            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400"> {/* Dropdown header */}
                                                User Options
                                            </div>
                                            {isLoggedIn && (
                                                <>
                                                    <DropdownItem
                                                        icon={<Settings className="h-4 w-4" />}
                                                        label="Settings"
                                                        onClick={() => setShowSettings(true)}
                                                    />
                                                    <div className="border-t border-gray-200 dark:border-gray-700 my-2 mx-3" /> {/* Separator with margin */}
                                                </>
                                            )}
                                            <DropdownItem
                                                icon={<HelpCircle className="h-4 w-4" />}
                                                label="Help & Support"
                                                onClick={handleHelpAction}
                                            />
                                            <DropdownItem
                                                icon={<Info className="h-4 w-4" />}
                                                label="About"
                                                onClick={handleAboutAction}
                                            />
                                            <div className="border-t border-gray-200 dark:border-gray-700 my-2 mx-3" /> {/* Separator with margin */}
                                            <DropdownItem
                                                icon={isLoggedIn ? <LogOut className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                                                label={isLoggedIn ? 'Sign Out' : 'Sign In'}
                                                onClick={handleAuthAction}
                                                accent={isLoggedIn}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}


const DropdownItem = ({ icon, label, onClick, accent = false }) => (
    <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={`w-full flex justify-start rounded-md px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${accent ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : ''}`} // Added px-4 py-2 for padding
        role="menuitem"
    >
        <span className="mr-3">{icon}</span> {/* Increased icon margin */}
        {label}
    </Button>
);