import React from 'react';
import { User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme


export default function ChatMessages({
    messages,
    settings,
    formatTimestamp,
    copyToClipboard,
    isTyping,
}) {
    const { colors } = useTheme(); // Use ThemeContext

    return (
        <div className="flex-1 overflow-y-auto scroll-smooth p-4" style={{ backgroundColor: colors.backgroundPrimary }}> {/* Added padding to ChatMessages container */}
            {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4 px-4">
                        <h1 className={`text-4xl font-bold`} style={{ color: colors.textPrimary }}>
                            JasGigli AI
                        </h1>
                        <p className={``} style={{ color: colors.textSecondary }}>
                            Start a conversation by typing a message below. Select a tool from the sidebar.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="w-full space-y-4"> {/* Added space-y-4 for message spacing */}
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`group`}
                            style={{
                                backgroundColor: msg.sender === 'ai' ? colors.backgroundSecondary : colors.backgroundPrimary,
                            }}
                        >
                            <div className="mx-auto max-w-3xl px-4 py-4"> {/* Increased padding in message bubble */}
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 flex-shrink-0">
                                        {msg.sender === 'user' ? (
                                            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={20} style={{ color: colors.backgroundPrimary }} />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Bot size={20} style={{ color: colors.backgroundPrimary }} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm`} style={{ color: colors.textPrimary }}>
                                                {msg.sender === 'user' ? 'You' : 'Assistant'}
                                            </span>
                                            {settings.showTimestamp && (
                                                <span className={`text-xs`} style={{ color: colors.textAccent }}>
                                                    {formatTimestamp(msg.timestamp)}
                                                </span>
                                            )}
                                        </div>
                                        <div className={`prose`} style={{ color: colors.textPrimary }}>
                                            {settings.enableMarkdown ? (
                                                <ReactMarkdown className={``} style={{ color: colors.textPrimary }}>
                                                    {msg.text}
                                                </ReactMarkdown>
                                            ) : (
                                                msg.text
                                            )}
                                        </div>
                                        {msg.sender === 'ai' && (
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => copyToClipboard(msg.text)}
                                                    className={`p-1.5 rounded-md hover:bg-opacity-10`}
                                                    style={{
                                                        color: colors.textSecondary,
                                                        '&:hover': { backgroundColor: colors.backgroundSecondary, color: colors.textPrimary }
                                                    }}
                                                >
                                                    <Copy size={16} />
                                                </button>
                                                <button
                                                    className={`p-1.5 rounded-md hover:bg-opacity-10`}
                                                    style={{
                                                        color: colors.textSecondary,
                                                        '&:hover': { backgroundColor: colors.backgroundSecondary, color: colors.textPrimary }
                                                    }}
                                                >
                                                    <ThumbsUp size={16} />
                                                </button>
                                                <button
                                                    className={`p-1.5 rounded-md hover:bg-opacity-10`}
                                                    style={{
                                                        color: colors.textSecondary,
                                                        '&:hover': { backgroundColor: colors.backgroundSecondary, color: colors.textPrimary }
                                                    }}
                                                >
                                                    <ThumbsDown size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && ( // Typing indicator
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`group`}
                            style={{ backgroundColor: colors.backgroundSecondary }}
                        >
                            <div className="mx-auto max-w-3xl px-4 py-4">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 flex-shrink-0">
                                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Bot size={20} style={{ color: colors.backgroundPrimary, opacity: 0.6 }} /> {/* Opacity to indicate typing */}
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className={`text-sm`} style={{ color: colors.textPrimary, opacity: 0.6 }}> {/* Opacity for typing text */}
                                            Assistant is typing...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
}