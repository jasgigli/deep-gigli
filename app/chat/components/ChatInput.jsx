"use client";

import React, { useEffect, useState, useRef } from "react";
import { Send, Mic, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.js";

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
  const voiceInputButtonRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = "en-US";

        recog.onstart = () => setIsListening(true);
        recog.onend = () => setIsListening(false);
        recog.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          voiceInputButtonRef.current?.focus();
        };
        recog.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          voiceInputButtonRef.current?.focus();
        };
        setRecognition(recog);
      }
    }
  }, [setInput]);

  const startListening = () => {
    if (recognition && !isLoading) {
      recognition.start();
    }
  };

  const { darkMode, colors } = useTheme();
  const isDarkTheme = darkMode; // For cleaner conditional styling

  return (
    <div
      style={{
        borderTop: `1px solid ${colors.borderPrimary}`,
        backgroundColor: colors.backgroundSecondary,
      }}
    >
      <div className="mx-auto max-w-3xl relative px-4 py-3">
        <div // Removed motion.div for no scale effect
          className="relative rounded-lg shadow-md"
          style={{
            backgroundColor: colors.backgroundAccent,
            borderColor: colors.borderPrimary,
            borderWidth: '1px', // Ensure border is visible
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message JasGigli AI..."
            className="w-full resize-none rounded-lg p-4 pr-24 focus:outline-none focus:ring-0"
            style={{
              backgroundColor: colors.backgroundAccent,
              color: colors.textPrimary,
            }}
            rows={1}
            disabled={isLoading}
            aria-label="Chat input"
          />
          <div className="absolute right-3 bottom-3 flex gap-2">
            <button
              onClick={startListening}
              disabled={isListening || isLoading}
              className="p-2 rounded-lg transition-colors"
              style={{
                color: colors.textPrimary,
                backgroundColor: isDarkTheme ? colors.backgroundSecondary : 'transparent', // Light background in dark mode
                border: isDarkTheme ? `1px solid ${colors.textPrimary}` : 'none', // White border in dark mode
              }}
              aria-label="Start voice input"
              ref={voiceInputButtonRef}
            >
              <AnimatePresence>
                {isListening && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "rgba(255,0,0,0.2)" }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </AnimatePresence>
              <Mic size={20} color={colors.textPrimary} />
            </button>
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg transition-colors"
              style={{
                color: colors.textPrimary,
                backgroundColor: isDarkTheme ? colors.backgroundSecondary : 'transparent', // Light background in dark mode
                border: isDarkTheme ? `1px solid ${colors.textPrimary}` : 'none', // White border in dark mode
              }}
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" color={colors.textPrimary} />
              ) : (
                <Send className="w-5 h-5" color={colors.textPrimary} />
              )}
            </button>
          </div>
        </div>
        <p className="text-center text-xs mt-2" style={{ color: colors.textAccent }}>
          JasGigli AI • AI enhances learning, but human judgment is key. Verify thoughtfully.
        </p>
      </div>
    </div>
  );
}