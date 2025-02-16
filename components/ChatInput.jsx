import React, { useEffect, useState, useRef } from 'react';
import { Send, Mic, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme

export default function ChatInput({
    input,
    setInput,
    handleKeyDown,
    sendMessage,
    isLoading,
    textareaRef,
    handleVoiceInput,
}) {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const { colors } = useTheme(); // Use ThemeContext

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    setInput(transcript);
                    handleVoiceInput(transcript);
                    setIsListening(false);
                };

                recognition.onerror = () => {
                    setIsListening(false);
                };

                setRecognition(recognition);
            }
        }
    }, []);

    const startListening = () => {
        if (recognition) {
            setIsListening(true);
            recognition.start();
        }
    };

    return (
        <div className={`border-t`} style={{ borderTopColor: colors.borderPrimary, backgroundColor: colors.backgroundSecondary }}>
            <div className="mx-auto max-w-3xl relative px-4 py-3">
                <motion.div
                    className={`relative rounded-xl shadow-lg`}
                    style={{
                        backgroundColor: colors.backgroundPrimary,
                        borderColor: colors.borderPrimary
                    }}
                    whileHover={{ scale: 1.01 }}
                >
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message ChatGPT..."
                        className={`w-full resize-none rounded-xl p-4 pr-24 focus:outline-none focus:ring-0`}
                        style={{
                            backgroundColor: colors.backgroundPrimary,
                            color: colors.textPrimary,
                            '::placeholder': { color: colors.textAccent } // Placeholder color
                        }}
                        rows={1}
                        disabled={isLoading}
                    />
                    <div className="absolute right-3 bottom-3 flex gap-2">
                        <button
                            onClick={startListening}
                            disabled={isListening || isLoading}
                            className={`p-2 rounded-lg transition-colors`}
                            style={{
                                color: colors.textSecondary,
                                '&:hover': { color: colors.textPrimary },
                            }}
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
                            className={`p-2 rounded-lg transition-colors`}
                            style={{
                                color: colors.textSecondary,
                                '&:hover': { color: colors.textPrimary },
                                '&:disabled': { color: colors.textAccent },
                            }}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" style={{ color: colors.textPrimary }} />
                            ) : (
                                <Send className="w-5 h-5" style={{ color: colors.textPrimary }} />
                            )}
                        </button>
                    </div>
                </motion.div>
                <p className={`text-center text-xs mt-2`} style={{ color: colors.textAccent }}>
                    ChatGPT Clone • Experimental UI
                </p>
            </div>
        </div>
    );
}