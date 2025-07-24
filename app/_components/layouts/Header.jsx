"use client";

// _components/layouts/Header.jsx

import { Button } from "@/app/_components/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Info, Menu, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Header({
  setShowSettings,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  currentConversation,
}) {
  const { theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const headerBgColor = theme?.colors?.backgroundPrimary || "bg-gray-100";
  const headerBorderColor = theme?.colors?.borderPrimary || "border-gray-200";
  const textColor = theme?.colors?.textPrimary || "text-gray-900";
  const dropdownBgColor = theme?.colors?.backgroundSecondary || "bg-white";
  const dropdownBorderColor =
    theme?.colors?.borderSecondary || "border-gray-200";

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHelpAction = () => {
    alert("Help action (replace with actual help/documentation link)");
    setIsDropdownOpen(false);
  };

  const handleAboutAction = () => {
    setIsDropdownOpen(false);
    router.push("/features"); // Example: link to a features overview page
  };

  return (
    <header
      className={`sticky top-0 z-20 bg-opacity-95 backdrop-blur-lg border-b transition-colors duration-200 ${headerBgColor} ${textColor} ${headerBorderColor}`}
      style={{
        backgroundColor: theme?.colors?.backgroundPrimary,
        borderBottomColor: theme?.colors?.borderPrimary,
        color: theme?.colors?.textPrimary,
      }}
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
              className={`hover:text-gray-700 ${textColor} hover:opacity-75`}
            >
              <Menu
                className="h-6 w-6"
                style={{ color: theme?.colors?.textPrimary }}
              />
            </Button>
          </div>

          {/* Branding and Conversation Title */}
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <a href="/" className="flex items-center">
              <span
                className={`font-bold text-xl md:text-2xl text-primary mr-4`}
                style={{ color: theme?.colors?.primary }}
              >
                JasGigli AI
              </span>
            </a>
            {currentConversation && (
              <span
                className={`text-sm truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] text-gray-500 dark:text-gray-400`}
                title={currentConversation.title}
                style={{ color: theme?.colors?.textSecondary }}
              >
                {currentConversation.title}
              </span>
            )}
          </div>

          {/* Right Side Controls */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {/* User Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDropdown}
                aria-label="User Menu"
                className={`hover:text-gray-700 ${textColor} hover:opacity-75 ${
                  isDropdownOpen ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
                style={{ color: theme?.colors?.textPrimary }}
              >
                <User
                  className="h-5 w-5"
                  style={{ color: theme?.colors?.textPrimary }}
                />
              </Button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-3 w-64 origin-top-right rounded-xl shadow-xl ring-1 ring-gray-900 ring-opacity-5 focus:outline-none"
                    initial={{ opacity: 0, y: -15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      backgroundColor: dropdownBgColor,
                      border: `1px solid ${dropdownBorderColor}`,
                    }}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-button"
                    tabIndex="-1"
                  >
                    <div className="py-2" role="none">
                      <div
                        className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400"
                        style={{ color: theme?.colors?.textSecondary }}
                      >
                        Options
                      </div>

                      <DropdownItem
                        icon={<Settings className="h-4 w-4" />}
                        label="Settings"
                        onClick={() => setShowSettings(true)}
                      />
                      <div
                        className="border-t border-gray-200 dark:border-gray-700 my-2 mx-3"
                        style={{ borderColor: theme?.colors?.borderSecondary }}
                      />

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

const DropdownItem = ({ icon, label, onClick, accent = false }) => {
  const { theme } = useTheme();
  const itemTextColor = theme?.colors?.textPrimary || "text-gray-700";
  const hoverBgColor = theme?.darkMode
    ? "hover:bg-gray-300"
    : "hover:bg-gray-100";
  const accentTextColorClass = accent
    ? "text-red-500 dark:text-red-500"
    : itemTextColor;
  const accentHoverBgClass = accent
    ? "dark:hover:bg-red-900/20 hover:bg-red-50"
    : hoverBgColor;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`w-full flex justify-start rounded-md px-4 py-2 text-sm ${accentTextColorClass} ${accentHoverBgClass}`}
      role="menuitem"
      style={{ color: theme?.colors?.textPrimary }}
    >
      <span
        className="mr-3 text-gray-500 dark:text-gray-400"
        style={{ color: theme?.colors?.textSecondary }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Button>
  );
};
