"use client";
// app/chat/components/ChatInputToolbar.jsx
import React from "react";
import { FileText, Search, Globe, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.js";

export default function ChatInputToolbar({ onSummarize, onSearch, onTranslate, onSentiment }) {
    const { isDarkMode } = useTheme(); // Use ThemeContext for styling

    return (
        <motion.div
            className="flex justify-around py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Example buttons - customize actions */}
            <button title="Summarize Conversation" onClick={onSummarize} className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-200 text-gray-700"}`}>
                <FileText size={20} />
            </button>
            <button title="Search Conversation" onClick={onSearch} className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-200 text-gray-700"}`}>
                <Search size={20} />
            </button>
            <button title="Translate Conversation" onClick={onTranslate} className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-200 text-gray-700"}`}>
                <Globe size={20} />
            </button>
            <button title="Analyze Sentiment" onClick={onSentiment} className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-200 text-gray-700"}`}>
                <Smile size={20} />
            </button>
        </motion.div>
    );
}