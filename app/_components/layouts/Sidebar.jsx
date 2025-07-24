"use client";

import { Button } from "@/app/_components/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Settings, Sun } from "lucide-react";
import { useState } from "react";

export default function Sidebar({
  conversations,
  currentConversation,
  setCurrentConversation,
  createNewConversation,
  deleteConversation,
  setShowSettings,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  selectedTool,
  setSelectedTool,
  setConversations,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingConversationId, setEditingConversationId] = useState(null);
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const { theme, toggleDarkMode, darkMode, colors } = useTheme();

  const filteredConversations = []; // No conversations to filter in no-auth mode

  const handleRenameConversation = () => {}; // No conversation renaming in no-auth

  const deleteConversationNoAuth = () => {}; // No conversation deletion in no-auth

  const createNewConversationNoAuth = () => {}; // No new conversation creation in no-auth

  const setCurrentConversationNoAuth = () => {}; // No conversation setting in no-auth

  return (
    <motion.aside
      className={`
                ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 fixed md:relative z-40 md:z-auto
                w-64 h-screen transition-transform duration-300 flex-shrink-0
                ${
                  darkMode
                    ? "bg-dark-backgroundPrimary text-dark-textPrimary shadow-dark"
                    : "bg-light-backgroundPrimary text-light-textPrimary shadow-lg md:shadow-none"
                }
                flex flex-col
            `}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: theme?.colors?.backgroundPrimary,
        color: theme?.colors?.textPrimary,
        borderRightColor: theme?.colors?.borderPrimary,
      }}
    >
      {/* Tool Selection - always visible */}
      <div className="px-4 my-4">
        <ToolSelector
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
      </div>

      {/* Conversations List - Hidden in no-auth mode */}
      {/* <div className="px-4 flex-1 overflow-y-auto space-y-1.5 mb-6">
                <p className="mb-2 text-sm font-semibold text-gray-500 uppercase px-1">
                    Chats
                </p>
                {filteredConversations.map((conv) => (
                   // ... (Conversation list rendering - removed for no-auth)
                ))}
            </div> */}

      {/* Preferences Section */}
      <div
        className={`px-4 pb-2 border-t ${
          darkMode ? "border-dark-borderPrimary" : "border-light-borderPrimary"
        }`}
        style={{ borderTopColor: theme?.colors?.borderPrimary }}
      >
        <div className="flex justify-between items-center mb-2 pt-4">
          <span
            className="font-semibold text-sm text-gray-500 uppercase"
            style={{ color: theme?.colors?.textSecondary }}
          >
            Preferences
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <Button
            onClick={toggleDarkMode}
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-start rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            <div
              className="flex items-center justify-center w-5 h-5 mr-2 text-gray-500 dark:text-white"
              style={{ color: theme?.colors?.textSecondary }}
            >
              {darkMode ? (
                <Sun
                  className="h-4 w-4"
                  style={{ color: theme?.colors?.textSecondary }}
                />
              ) : (
                <Moon
                  className="h-4 w-4"
                  style={{ color: theme?.colors?.textSecondary }}
                />
              )}
            </div>
            <span
              className={`${darkMode ? "text-white" : "text-gray-700"}`}
              style={{ color: theme?.colors?.textPrimary }}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </Button>
          <Button
            onClick={() => setShowSettings(true)}
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-start rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div
              className="flex items-center justify-center w-5 h-5 mr-2 text-gray-500 dark:text-white"
              style={{ color: theme?.colors?.textSecondary }}
            >
              <Settings
                className="h-4 w-4"
                style={{ color: theme?.colors?.textSecondary }}
              />
            </div>
            <span
              className={`${darkMode ? "text-white" : "text-gray-700"}`}
              style={{ color: theme?.colors?.textPrimary }}
            >
              Settings
            </span>
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}
