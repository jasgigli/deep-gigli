"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    RefreshCw, Save, Download, Menu, User, Settings, LogOut, LogIn, HelpCircle, Info
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/app/context/ThemeContext.js";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
// import AuthModal from "@/components/common/AuthModal"; // Removed AuthModal import

export default function Header({
    saveConversation,
    exportConversation,
    regenerateResponse,
    settings,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    setShowSettings,
    isLoggedIn = false,
    currentConversation,
}) {
    const { darkMode, colors } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    // const [showAuthModal, setShowAuthModal] = useState(false); // Removed AuthModal state

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
        setIsDropdownOpen(false);
        router.push('/auth/login'); // Redirect to /auth/login page
    };

    const handleHelpAction = () => {
        alert('Help action (replace with actual help/documentation link)');
        setIsDropdownOpen(false);
    };

    const handleAboutAction = () => {
        alert('About action (replace with your about page/modal)');
        setIsDropdownOpen(false);
    };

    // Conditional rendering for SSR safety
    if (!colors) {
        return (
            <header className="sticky top-0 z-20 border-b bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-16 flex items-center px-4 sm:px-6 lg:px-8">
                <div className="container max-w-full mx-auto">
                    <span className="font-bold text-xl">JasGigli AI</span>
                </div>
            </header>
        );
    }


    return (
        <header
            className={`sticky top-0 z-20 bg-opacity-95 backdrop-blur-lg border-b transition-colors duration-200  ${ // Apply theme colors like Sidebar
                darkMode ? 'bg-dark-backgroundPrimary text-dark-textPrimary border-dark-borderPrimary' : 'bg-light-backgroundPrimary text-light-textPrimary border-light-borderPrimary'
            }`}
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
                            className={`hover:text-gray-700 ${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-500'}`}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Branding and Conversation Title */}
                    <div className="flex-1 flex items-center justify-center md:justify-start">
                        <a href="/" className="flex items-center">
                            <span className={`font-bold text-xl md:text-2xl text-primary mr-4`}>JasGigli AI</span>
                        </a>
                        {currentConversation && (
                            <span className={`text-sm truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} title={currentConversation.title}>
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
                                className={`hover:text-gray-700 ${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-500'} ${isDropdownOpen ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                            >
                                <User className="h-5 w-5" />
                            </Button>
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        className="absolute right-0 top-full mt-3 w-64 origin-top-right rounded-xl shadow-xl ring-1 ring-gray-900 ring-opacity-5 focus:outline-none"
                                        initial={{ opacity: 0, y: -15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        style={{ backgroundColor: colors?.backgroundSecondary, border: `1px solid ${colors?.borderSecondary}` }}
                                        role="menu" aria-orientation="vertical" aria-labelledby="user-button" tabIndex="-1"
                                    >
                                        <div className="py-2" role="none">
                                            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                User Options
                                            </div>
                                            {isLoggedIn && (
                                                <>
                                                    <DropdownItem
                                                        icon={<Settings className="h-4 w-4" />}
                                                        label="Settings"
                                                        onClick={() => setShowSettings(true)}
                                                    />
                                                    <div className="border-t border-gray-200 dark:border-gray-700 my-2 mx-3" />
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
                                            <div className="border-t border-gray-200 dark:border-gray-700 my-2 mx-3" />
                                            <DropdownItem
                                                icon={<LogIn className="h-4 w-4" />}
                                                label={'Sign In'}
                                                onClick={handleAuthAction} // handleAuthAction now redirects
                                                accent={false}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>
                </div>
            </div>
            {/* AuthModal component removed */}
        </header>
    );
}


const DropdownItem = ({ icon, label, onClick, accent = false }) => (
    <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={`w-full flex justify-start rounded-md px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-300 ${accent ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : ''} text-${useTheme().darkMode ? 'white' : 'gray-700'}`}
        role="menuitem"
    >
        <span className="mr-3 text-gray-500 dark:text-gray-400">{icon}</span>
        <span className={`${useTheme().darkMode ? 'text-white' : 'text-gray-700'}`}>{label}</span>
    </Button>
);