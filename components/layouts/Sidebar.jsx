"use client";

import React, { useState } from "react";
import {
    Plus, Trash2, Settings, Sun, Moon, Search, MessageSquare, User, Wrench
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTheme } from "@/app/context/ThemeContext.js";

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
    const { darkMode, toggleDarkMode, colors } = useTheme();

    const filteredConversations = conversations.filter((conv) =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRenameConversation = (id, newTitle) => {
        const updatedConversations = conversations.map((conv) =>
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
                w-64 h-screen transition-transform duration-300 flex-shrink-0
                ${darkMode ? 'bg-dark-backgroundPrimary text-dark-textPrimary shadow-dark' : 'bg-light-backgroundPrimary text-light-textPrimary shadow-lg md:shadow-none'}
                flex flex-col
            `}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
        >

            {/* Profile Section */}
            {/* <div className="px-4 mb-6 flex items-center space-x-3">
                <User className="h-9 w-9 rounded-full p-1.5 bg-gray-400 text-white" />
                <span className="font-semibold text-lg truncate">User Name</span>
            </div> */}

            {/* New Chat Button */}
            <div className="px-4 my-4">
                <Button
                    onClick={createNewConversation}
                    variant="secondary"
                    size="sm"
                    className="w-full flex justify-center rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    <Plus className="h-4 w-4 mr-2" /> New Chat
                </Button>
            </div>

            {/* Search Conversations */}
            <div className="px-4 mb-6 relative">
                <Input
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full rounded-md pl-9 pr-3 shadow-sm text-sm ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'}`} 
                    aria-label="Search conversations"
                />
                <Search className="absolute left-7 top-2.5 h-5 w-5 text-gray-500" />
            </div>

            {/* Conversations List */}
            <div className="px-4 flex-1 overflow-y-auto space-y-1.5 mb-6">
                <p className="mb-2 text-sm font-semibold text-gray-500 uppercase px-1">
                    Chats
                </p>
                {filteredConversations.map((conv) => (
                    <div
                        key={conv.id}
                        className={`group flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-200 text-sm
                            ${currentConversation?.id === conv.id
                                ? darkMode
                                    ? 'bg-dark-backgroundAccent'
                                    : 'bg-light-backgroundAccent'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                            }
                            ${darkMode ? 'text-white' : 'text-gray-700'}`
                        }
                        onClick={() => {
                            setEditingConversationId(null);
                            setCurrentConversation(conv);
                            setIsMobileSidebarOpen(false);
                        }}
                        onDoubleClick={() => {
                            setEditingConversationId(conv.id);
                            setNewConversationTitle(conv.title);
                        }}
                    >
                        <MessageSquare className="h-4 w-4 mr-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
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
                                className={`flex-1 bg-transparent border-b outline-none text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}
                                autoFocus
                                aria-label="Rename conversation"
                            />
                        ) : (
                            <span className="flex-1 truncate">{conv.title}</span>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteConversation(conv.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-red-500"
                            aria-label="Delete conversation"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Preferences Section */}
            <div className={`px-4 pb-2 border-t ${darkMode ? 'border-dark-borderPrimary' : 'border-light-borderPrimary'}`}>
                <div className="flex justify-between items-center mb-2 pt-4">
                    <span className="font-semibold text-sm text-gray-500 uppercase">Preferences</span>
                </div>
                <div className="flex flex-col space-y-2">
                    <Button
                        onClick={toggleDarkMode}
                        variant="ghost"
                        size="sm"
                        className="w-full flex items-center justify-start rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Toggle theme"
                    >
                        <div className="flex items-center justify-center w-5 h-5 mr-2 text-gray-500 dark:text-white"> {/* Added text color classes here */}
                            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </div>
                        <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}> {/* Added explicit text color */}
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                    </Button>
                    <Button
                        onClick={() => setShowSettings(true)}
                        variant="ghost"
                        size="sm"
                        className="w-full flex items-center justify-start rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                         <div className="flex items-center justify-center w-5 h-5 mr-2 text-gray-500 dark:text-white"> {/* Added text color classes here */}
                            <Settings className="h-4 w-4" />
                        </div>
                        <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}> {/* Added explicit text color */}
                            Settings
                        </span>
                    </Button>
                </div>
            </div>
        </motion.aside>
    );
}