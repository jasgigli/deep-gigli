"use client";
// app/chat/components/ChatInput.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Send, Mic, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext.js"; // Import useTheme

export default function ChatInput({
    input,
    setInput,
    handleKeyDown,
    sendMessage,
    isLoading,
    textareaRef,
}) {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const voiceInputButtonRef = useRef(null); // Ref for focus management

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    setInput(transcript);
                    voiceInputButtonRef.current?.focus(); 
                };

                recognition.onerror = (event) => {
                    console.error("Speech recognition error", event.error);
                    setIsListening(false);
                    voiceInputButtonRef.current?.focus(); 
                };

                setRecognition(recognition);
            }
        }
    }, []);

    const startListening = () => {
        if (recognition && !isLoading) {
            recognition.start();
        }
    };

    // --- Theme Context ---
    const { isDarkMode } = useTheme(); // Use ThemeContext for styling

    return (
        <div className={`border-t ${isDarkMode ? 'border-[#40414F] bg-[#343541]' : 'border-gray-200 bg-white'}`}>
            <div className="mx-auto max-w-3xl relative px-4 py-3">
                <motion.div
                    className={`relative rounded-lg shadow-md ${
                        isDarkMode ? 'bg-[#40414F] border-[#40414F]' : 'bg-white border-gray-300'
                    }`}
                    whileHover={{ scale: 1.01 }}
                >
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message JasGigli AI..."
                        className={`w-full resize-none rounded-lg p-4 pr-24 focus:outline-none focus:ring-0 ${
                            isDarkMode
                                ? 'bg-[#40414F] text-white placeholder-gray-400'
                                : 'bg-white text-gray-900 placeholder-gray-500'
                        }`}
                        rows={1}
                        disabled={isLoading}
                        aria-label="Chat input"
                    />
                    <div className="absolute right-3 bottom-3 flex gap-2">
                        <button
                            onClick={startListening}
                            disabled={isListening || isLoading}
                            className={`p-2 rounded-lg transition-colors ${
                                isDarkMode
                                    ? 'text-gray-300 hover:text-white'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            aria-label="Start voice input"
                            ref={voiceInputButtonRef} // Attach ref to voice input button
                        >
                            <AnimatePresence>
                                {isListening && (
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-red-500/20"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    />
                                )}
                            </AnimatePresence>
                            <Mic size={20} />
                        </button>
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            className={`p-2 rounded-lg transition-colors ${
                                isDarkMode
                                    ? 'text-gray-300 hover:text-white disabled:text-gray-500'
                                    : 'text-gray-500 hover:text-gray-700 disabled:text-gray-400'
                            }`}
                            aria-label="Send message"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </motion.div>
                <p className={`text-center text-xs mt-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  JasGigli AI • AI enhances learning, but human judgment is key. Verify thoughtfully
                </p>
            </div>
        </div>
    );
}