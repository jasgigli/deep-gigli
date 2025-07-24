"use client";

// _components/ChatInput.jsx

import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mic, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const { theme } = useTheme();
  const isDarkTheme = theme?.darkMode || false;
  const inputBgColor = theme?.colors?.backgroundAccent || "bg-gray-50";
  const inputTextColor = theme?.colors?.textPrimary || "text-gray-900";
  const borderColor = theme?.colors?.borderPrimary || "border-gray-300";
  const accentColor = theme?.colors?.accent || "bg-yellow-500"; // Example accent color

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

  return (
    <div
      style={{
        borderTop: `1px solid ${theme?.colors?.borderPrimary}`,
        backgroundColor: theme?.colors?.backgroundSecondary,
      }}
    >
      <div className="mx-auto max-w-3xl relative px-4 py-3">
        <div
          className="relative rounded-lg shadow-md border"
          style={{
            backgroundColor: theme?.colors?.backgroundAccent,
            borderColor: theme?.colors?.borderPrimary,
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message JasGigli AI..."
            className={`w-full resize-none rounded-lg p-4 pr-24 focus:outline-none focus:ring-0 ${inputBgColor} ${inputTextColor} border-none`}
            style={{
              backgroundColor: theme?.colors?.backgroundAccent,
              color: theme?.colors?.textPrimary,
            }}
            rows={1}
            disabled={isLoading}
            aria-label="Chat input"
          />
          <div className="absolute right-3 bottom-3 flex gap-2">
            <button
              onClick={startListening}
              disabled={isListening || isLoading}
              className="p-2 rounded-lg transition-colors hover:opacity-80"
              style={{ color: theme?.colors?.textPrimary }}
              aria-label="Start voice input"
              ref={voiceInputButtonRef}
            >
              <AnimatePresence>
                {isListening && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-red-200 opacity-80"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </AnimatePresence>
              <Mic size={20} color={theme?.colors?.textPrimary} />
            </button>
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg transition-colors hover:opacity-80"
              style={{ color: theme?.colors?.textPrimary }}
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2
                  className="w-5 h-5 animate-spin"
                  color={theme?.colors?.textPrimary}
                />
              ) : (
                <Send className="w-5 h-5" color={theme?.colors?.textPrimary} />
              )}
            </button>
          </div>
        </div>
        <p
          className="text-center text-xs mt-2"
          style={{ color: theme?.colors?.textAccent }}
        >
          JasGigli AI • AI enhances learning, but human judgment is key. Verify
          thoughtfully.
        </p>
      </div>
    </div>
  );
}
