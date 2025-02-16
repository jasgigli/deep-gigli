// app/chat/components/ChatMessages.jsx
import React, { useRef, useEffect } from 'react';
import { User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

export default function ChatMessages({
    messages,
    isDarkMode,
    settings,
    formatTimestamp,
    copyToClipboard,
    isTyping,
}) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]); // Scroll to bottom on new messages or typing

    return (
        <div className="flex-1 overflow-y-auto scroll-smooth p-4">
            {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4 px-4">
                        <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            JasGigli AI Chat
                        </h1>
                        <p className={`text-md md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Start a conversation. Ask me anything!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="w-full space-y-4">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`group ${
                                isDarkMode
                                    ? `${msg.sender === 'ai' ? 'bg-[#343541]' : 'bg-[#444654]'}`
                                    : `${msg.sender === 'ai' ? 'bg-gray-50' : 'bg-white'}`
                            } rounded-lg p-4`}
                        >
                            <div className="flex gap-4">
                                <div className="w-8 h-8 flex-shrink-0">
                                    {msg.sender === 'user' ? (
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                            <User size={20} className="text-white" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                            <Bot size={20} className="text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {msg.sender === 'user' ? 'You' : 'AI Assistant'}
                                        </span>
                                        {settings.showTimestamp && (
                                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {formatTimestamp(msg.timestamp)}
                                            </span>
                                        )}
                                    </div>
                                    <div className={`prose ${isDarkMode ? 'text-gray-100 prose-invert' : 'text-gray-800'}`}>
                                        {settings.enableMarkdown ? (
                                            <ReactMarkdown >
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
                                                className={`p-1.5 rounded-md hover:bg-opacity-10 ${
                                                    isDarkMode
                                                        ? 'text-gray-300 hover:bg-white'
                                                        : 'text-gray-500 hover:bg-gray-200'
                                                }`}
                                                aria-label="Copy code"
                                            >
                                                <Copy size={16} />
                                            </button>
                                            {/* Add reaction buttons if needed
                                            <button className={`p-1.5 rounded-md hover:bg-opacity-10 ${isDarkMode ? 'text-gray-300 hover:bg-white' : 'text-gray-500 hover:bg-gray-200'}`}>
                                                <ThumbsUp size={16} />
                                            </button>
                                            <button className={`p-1.5 rounded-md hover:bg-opacity-10 ${isDarkMode ? 'text-gray-300 hover:bg-white' : 'text-gray-500 hover:bg-gray-200'}`}>
                                                <ThumbsDown size={16} />
                                            </button>
                                            */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-4 rounded-lg p-4 bg-[#343541] dark:bg-[#444654]">
                            <div className="w-8 h-8 flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                    <Bot size={20} className="text-white" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} /> {/* Scroll anchor */}
                </div>
            )}
        </div>
    );
}