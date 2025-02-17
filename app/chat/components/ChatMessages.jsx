"use client";

import React, { useRef, useEffect } from "react";
import { User, Bot, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.js";

export default function ChatMessages({
  messages = [],
  settings = { showTimestamp: false, enableMarkdown: false },
  formatTimestamp = (ts) => ts,
  copyToClipboard = () => {},
  isTyping = false,
}) {
  const messagesEndRef = useRef(null);
  const { darkMode, colors } = useTheme();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Function to determine message background based on sender and theme
  const getMessageBackground = (sender) => {
    if (sender === "ai") {
      return darkMode ? colors.backgroundAccent : "#f0f0f0";
    }
    return darkMode ? colors.backgroundSecondary : "#ffffff";
  };

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth p-4">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <h1
              className="text-2xl md:text-4xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              JasGigli AI Chat
            </h1>
            <p
              className="text-md md:text-lg"
              style={{ color: colors.textSecondary }}
            >
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
              style={{ backgroundColor: getMessageBackground(msg.sender) }}
              className="group rounded-lg p-4"
            >
              <div className="flex gap-4">
                <div className="w-8 h-8 flex-shrink-0">
                  {msg.sender === "user" ? (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <User size={20} color="#ffffff" />
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      <Bot size={20} color="#ffffff" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: colors.textPrimary }}
                    >
                      {msg.sender === "user" ? "You" : "AI Assistant"}
                    </span>
                    {settings.showTimestamp && (
                      <span
                        className="text-xs"
                        style={{ color: colors.textSecondary }}
                      >
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="prose" style={{ color: colors.textPrimary }}>
                    {settings.enableMarkdown ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                  {msg.sender === "ai" && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => copyToClipboard(msg.text)}
                        className="p-1.5 rounded-md hover:bg-opacity-10"
                        style={{ color: colors.textSecondary }}
                        aria-label="Copy message"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div
              className="flex gap-4 rounded-lg p-4"
              style={{ backgroundColor: darkMode ? colors.backgroundAccent : "#f0f0f0" }}
            >
              <div className="w-8 h-8 flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <Bot size={20} color="#ffffff" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: colors.textSecondary }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce delay-100"
                    style={{ backgroundColor: colors.textSecondary }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce delay-200"
                    style={{ backgroundColor: colors.textSecondary }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
