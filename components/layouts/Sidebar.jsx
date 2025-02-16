import React, { useState } from "react";
import { Plus, Trash2, Settings, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme

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
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const router = useRouter();
    const { toggleDarkMode, colors } = useTheme(); // Use the hook

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
                p-4 flex flex-col shadow-lg md:shadow-none
            `}
            style={{ backgroundColor: colors.backgroundPrimary }}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={createNewConversation}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md`}
                    style={{
                        borderColor: colors.borderPrimary,
                        color: colors.textPrimary,
                        backgroundColor: colors.backgroundPrimary,
                        '&:hover': { backgroundColor: colors.backgroundSecondary }
                    }}
                >
                    <Plus size={16} />
                    New Chat
                </button>
                <button
                    onClick={toggleDarkMode} // Use toggleDarkMode from context
                    className={`p-2 rounded-md`}
                    style={{
                        color: colors.textPrimary,
                        '&:hover': { backgroundColor: colors.backgroundSecondary }
                    }}
                >
                    <Sun size={20} />
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full p-2 rounded-md`}
                    style={{
                        backgroundColor: colors.backgroundSecondary,
                        color: colors.textPrimary,
                        borderColor: colors.borderPrimary
                    }}
                />
            </div>

            <div className="mb-4">
                <h3 className={`font-semibold mb-2`} style={{ color: colors.textPrimary }}>Tools</h3>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => handleToolChange('chat')}
                            className={`flex w-full items-center p-2 rounded-md cursor-pointer justify-start`}
                            style={{
                                backgroundColor: selectedTool === 'chat' ? colors.backgroundAccent : 'transparent',
                                color: colors.textPrimary,
                                '&:hover': { backgroundColor: colors.backgroundSecondary }
                            }}
                        >
                            Chat
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleToolChange('summarize')}
                            className={`flex w-full items-center p-2 rounded-md cursor-pointer justify-start`}
                            style={{
                                backgroundColor: selectedTool === 'summarize' ? colors.backgroundAccent : 'transparent',
                                color: colors.textPrimary,
                                '&:hover': { backgroundColor: colors.backgroundSecondary }
                            }}
                        >
                            Summarize
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleToolChange('translate')}
                            className={`flex w-full items-center p-2 rounded-md cursor-pointer justify-start`}
                            style={{
                                backgroundColor: selectedTool === 'translate' ? colors.backgroundAccent : 'transparent',
                                color: colors.textPrimary,
                                '&:hover': { backgroundColor: colors.backgroundSecondary }
                            }}
                        >
                            Translate
                        </button>
                    </li>
                </ul>
            </div>


            <div className="flex-1 overflow-y-auto space-y-2">
                <h3 className={`font-semibold mb-2`} style={{ color: colors.textPrimary }}>Conversations</h3>
                {filteredConversations.map((conv) => (
                    <div
                        key={conv.id}
                        className={`group flex items-center justify-between p-2 rounded-md cursor-pointer`}
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
                                className={`flex-1 bg-transparent border-b outline-none`}
                                style={{ color: colors.textPrimary }}
                                autoFocus
                            />
                        ) : (
                            <span
                                className={`flex-1 truncate`}
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
                            className={`opacity-0 group-hover:opacity-100 p-1 rounded-md`}
                            style={{
                                color: colors.textSecondary,
                                '&:hover': { backgroundColor: colors.backgroundSecondary }
                            }}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>


            <button
                onClick={() => setShowSettings(true)}
                className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border`}
                style={{
                    borderColor: colors.borderPrimary,
                    color: colors.textPrimary,
                    backgroundColor: colors.backgroundPrimary,
                    '&:hover': { backgroundColor: colors.backgroundSecondary }
                }}
            >
                <Settings size={16} />
                Settings
            </button>
        </motion.aside>
    );
}