// components/layouts/Sidebar.jsx
import React, { useState } from "react";
import { Plus, Trash2, Settings, Sun, Moon, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button"; // Assuming Button component is in "@/components/ui"
import { Input } from "@/components/ui/Input"; // Assuming Input component is in "@/components/ui"

export default function Sidebar({
    isDarkMode,
    toggleTheme,
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
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [editingConversationId, setEditingConversationId] = useState(null);
    const [newConversationTitle, setNewConversationTitle] = useState("");

    const filteredConversations = conversations.filter((conv) =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRenameConversation = (id, newTitle) => {
        const updatedConversations = conversations.map(conv =>
            conv.id === id ? { ...conv, title: newTitle } : conv
        );
        setConversations(updatedConversations);
        setEditingConversationId(null);
    };

    return (
        <motion.aside
            className={`
                ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 fixed md:relative z-40 md:z-auto
                w-64 h-full transition-transform duration-300 flex-shrink-0
                ${isDarkMode ? "bg-gray-800" : "bg-white"}
                p-4 flex flex-col shadow-lg md:shadow-none
            `}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="sm"
                className="md:hidden absolute top-2 right-2"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                aria-label="Toggle sidebar"
            >
                <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center justify-between mb-4">
                <Button
                    onClick={createNewConversation}
                    variant="primary"
                    size="sm"
                    className="w-full flex justify-center"
                >
                    <Plus className="h-4 w-4 mr-2" /> New Chat
                </Button>
            </div>

            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full p-2 rounded-md ${
                        isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"
                    }`}
                    aria-label="Search conversations"
                />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
                {filteredConversations.map((conv) => (
                    <div
                        key={conv.id}
                        className={`group flex items-center justify-between p-2 rounded-md cursor-pointer ${
                            currentConversation?.id === conv.id
                                ? isDarkMode
                                    ? "bg-gray-600"
                                    : "bg-gray-200"
                                : isDarkMode
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                            setEditingConversationId(null);
                            setCurrentConversation(conv);
                        }}
                        onDoubleClick={() => {
                            setEditingConversationId(conv.id);
                            setNewConversationTitle(conv.title);
                        }}
                    >
                        {editingConversationId === conv.id ? (
                            <Input
                                type="text"
                                value={newConversationTitle}
                                onChange={(e) => setNewConversationTitle(e.target.value)}
                                onBlur={() => handleRenameConversation(conv.id, newConversationTitle)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleRenameConversation(conv.id, newConversationTitle);
                                    }
                                }}
                                className={`flex-1 bg-transparent border-b outline-none ${
                                    isDarkMode ? "text-white" : "text-gray-700"
                                }`}
                                autoFocus
                                aria-label="Rename conversation"
                            />
                        ) : (
                            <span
                                className={`flex-1 truncate ${isDarkMode ? "text-white" : "text-gray-700"}`}
                            >
                                {conv.title}
                            </span>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteConversation(conv.id);
                            }}
                            className="opacity-0 group-hover:opacity-100"
                            aria-label="Delete conversation"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className={`mt-4 pt-4 ${isDarkMode ? "border-t border-gray-600" : "border-t border-gray-200"}`}>
                <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Settings</span>
                    <Button
                        onClick={toggleTheme}
                        variant="ghost"
                        size="sm"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                </div>
                <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                >
                    <Settings className="h-4 w-4 mr-2" /> Open Settings
                </Button>
            </div>
        </motion.aside>
    );
}