import React, { useState } from "react";
import { Plus, Trash2, Search, ArrowUpCircle } from "lucide-react"; // Removed Settings, Theme Toggle icons, added ArrowUpCircle for Upgrade
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';
import { MessageSquare, FileText, Globe } from 'lucide-react';

export default function Sidebar({
    conversations,
    currentConversation,
    setCurrentConversation,
    createNewConversation,
    deleteConversation,
    setShowSettings, // No longer used here, but keeping for prop consistency if other components use it
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    selectedTool,
    setSelectedTool,
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const router = useRouter();
    const { colors, toggleDarkMode } = useTheme(); // toggleDarkMode still needed if used in New Chat button

    const filteredConversations = conversations.filter((conv) =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToolChange = (tool) => {
        setSelectedTool(tool);
        setIsMobileSidebarOpen(false);
    };

    return (
        <motion.aside
            className={`
                ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 fixed md:relative z-40 md:z-auto
                w-64 h-full transition-transform duration-300 flex-shrink-0
                flex flex-col
            `}
            style={{ backgroundColor: colors.backgroundPrimary }}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="px-4 py-3">
                <div className="mb-3"> {/* Reduced vertical margin */}
                    <button
                        onClick={createNewConversation}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors duration-200`}
                        style={{
                            color: colors.textPrimary,
                            backgroundColor: colors.backgroundSecondary,
                            '&:hover': { backgroundColor: colors.backgroundAccent }
                        }}
                    >
                        <Plus size={16} />
                        New Chat
                    </button>
                </div>


                <div className="relative mb-3">
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full p-2 rounded-md text-sm pl-8`}
                        style={{
                            backgroundColor: colors.backgroundSecondary,
                            color: colors.textPrimary,
                            borderColor: colors.borderPrimary,
                            borderWidth: '1px'
                        }}
                    />
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ color: colors.textSecondary }}>
                        <Search size={16} />
                    </div>
                </div>


                <div>
                    <h3 className={`font-semibold text-sm mb-2 text-gray-500 uppercase tracking-wide`} style={{ color: colors.textSecondary }}>Tools</h3>
                    <ul className="space-y-1">
                        <li>
                            <button
                                onClick={() => handleToolChange('chat')}
                                className={`flex w-full items-center px-3 py-2 rounded-md cursor-pointer justify-start text-sm font-medium transition-colors duration-200 gap-2`}
                                style={{
                                    backgroundColor: selectedTool === 'chat' ? colors.backgroundAccent : 'transparent',
                                    color: colors.textPrimary,
                                    '&:hover': { backgroundColor: colors.backgroundSecondary }
                                }}
                            >
                                <MessageSquare size={16} style={{ color: colors.textPrimary }} />
                                Chat
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleToolChange('summarize')}
                                className={`flex w-full items-center px-3 py-2 rounded-md cursor-pointer justify-start text-sm font-medium transition-colors duration-200 gap-2`}
                                style={{
                                    backgroundColor: selectedTool === 'summarize' ? colors.backgroundAccent : 'transparent',
                                    color: colors.textPrimary,
                                    '&:hover': { backgroundColor: colors.backgroundSecondary }
                                }}
                            >
                                <FileText size={16} style={{ color: colors.textPrimary }} />
                                Summarize
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleToolChange('translate')}
                                className={`flex w-full items-center px-3 py-2 rounded-md cursor-pointer justify-start text-sm font-medium transition-colors duration-200 gap-2`}
                                style={{
                                    backgroundColor: selectedTool === 'translate' ? colors.backgroundAccent : 'transparent',
                                    color: colors.textPrimary,
                                    '&:hover': { backgroundColor: colors.backgroundSecondary }
                                }}
                            >
                                <Globe size={16} style={{ color: colors.textPrimary }} />
                                Translate
                            </button>
                        </li>
                    </ul>
                </div>
            </div>


            <div className="flex-1 overflow-y-auto px-4">
                <h3 className={`font-semibold text-sm mb-2 mt-3 text-gray-500 uppercase tracking-wide`} style={{ color: colors.textSecondary }}>Conversations</h3>
                <div className="space-y-1">
                    {filteredConversations.map((conv) => (
                        <div
                            key={conv.id}
                            className={`group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors duration-200`}
                            style={{
                                backgroundColor: currentConversation?.id === conv.id ? colors.backgroundAccent : 'transparent',
                                '&:hover': { backgroundColor: colors.backgroundSecondary }
                            }}
                            onClick={() => {
                                setEditingId(null);
                                setCurrentConversation(conv);
                            }}
                            onDoubleClick={() => {
                                setEditingId(conv.id);
                                setNewTitle(conv.title);
                            }}
                        >
                            {editingId === conv.id ? (
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    onBlur={() => {
                                        setEditingId(null);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setEditingId(null);
                                        }
                                    }}
                                    className={`flex-1 bg-transparent border-b outline-none text-sm`}
                                    style={{ color: colors.textPrimary }}
                                    autoFocus
                                />
                            ) : (
                                <span
                                    className={`flex-1 truncate text-sm font-medium`}
                                    style={{ color: colors.textPrimary }}
                                >
                                    {conv.title}
                                </span>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteConversation(conv.id);
                                }}
                                className={`opacity-0 group-hover:opacity-100 p-1 rounded-md transition-colors duration-200`}
                                style={{
                                    color: colors.textSecondary,
                                    backgroundColor: 'transparent',
                                    '&:hover': { backgroundColor: colors.backgroundAccent }
                                }}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <div className="px-4 py-3 border-t" style={{ borderColor: colors.borderPrimary }}>
                <button
                    onClick={() => { /* Handle Upgrade Logic Here */ alert('Upgrade Feature'); }} // Replace alert with actual upgrade logic
                    className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md font-medium transition-colors duration-200`}
                    style={{
                        color: colors.textPrimary,
                        backgroundColor: colors.backgroundSecondary,
                        '&:hover': { backgroundColor: colors.backgroundAccent }
                    }}
                >
                    <ArrowUpCircle size={16} /> {/* Upgrade Icon */}
                    Upgrade
                </button>
            </div>
        </motion.aside>
    );
}