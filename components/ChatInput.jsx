// components/ChatInput.js
import React from "react";
import { Loader2, Send } from "lucide-react";

export default function ChatInput({
  input,
  setInput,
  handleKeyDown,
  sendMessage,
  isLoading,
  textareaRef,
  isDarkMode,
  settings,
}) {
  return (
    <div
      className={`border-t p-4 ${
        isDarkMode ? "border-white/20 bg-[#343541]" : "border-gray-200 bg-white"
      }`}
    >
      <div className="max-w-3xl mx-auto relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          className={`w-full resize-none rounded-lg border p-4 pr-12 focus:outline-none focus:ring-0 ${
            isDarkMode
              ? "bg-[#40414F] text-white border-white/20 focus:border-white/40"
              : "bg-white text-gray-900 border-gray-300 focus:border-gray-400"
          }`}
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className={`absolute right-3 bottom-3 p-1 rounded-lg ${
            isDarkMode
              ? "text-white/60 hover:text-white/90 disabled:text-white/40"
              : "text-gray-400 hover:text-gray-600 disabled:text-gray-300"
          } disabled:opacity-50`}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Send className="w-6 h-6" />
          )}
        </button>
      </div>
      <p
        className={`text-center text-xs mt-2 ${
          isDarkMode ? "text-white/40" : "text-gray-500"
        }`}
      >
        Model: {settings.model} • Temperature: {settings.temperature} • Max Tokens: {settings.maxTokens}
      </p>
    </div>
  );
}
