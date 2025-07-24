"use client";

// _components/ChatMessages.jsx
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { ArrowDown, Bot, Copy, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatMessages({
  messages = [],
  settings,
  formatTimestamp,
  copyToClipboard,
  isTyping,
}) {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);
  const { theme } = useTheme();
  const backgroundColor = theme?.colors?.backgroundPrimary || "bg-gray-100";

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    setShowScrollDownButton(false);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const handleScroll = () => {
        const isScrollable =
          chatContainer.scrollHeight > chatContainer.clientHeight;
        const isAtBottom =
          isScrollable &&
          Math.abs(
            chatContainer.scrollHeight -
              chatContainer.scrollTop -
              chatContainer.clientHeight
          ) < 1;

        setShowScrollDownButton(isScrollable && !isAtBottom);
      };
      handleScroll();
      chatContainer.addEventListener("scroll", handleScroll);
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={chatContainerRef}
      className={`flex-1 overflow-y-auto scroll-smooth p-4 relative ${backgroundColor}`}
      style={{ backgroundColor: theme?.colors?.backgroundPrimary }}
    >
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <h1
              className={`text-3xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100`}
            >
              JasGigli AI Chat
            </h1>
            <p
              className={`text-lg md:text-xl text-gray-600 dark:text-gray-400`}
            >
              Start a conversation. Ask me anything!
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full space-y-4">
          {messages.map((msg, index) => {
            const messageClassName = `group rounded-xl p-5 shadow-md border`;
            let messageBgColorClassName = "";
            let messageBorderColorClassName = "";

            if (msg.sender === "ai") {
              messageBgColorClassName = "bg-gray-100 dark:bg-gray-800";
              messageBorderColorClassName =
                "border-gray-200 dark:border-gray-700";
            } else {
              messageBgColorClassName = "bg-white dark:bg-[#2E303A]";
              messageBorderColorClassName =
                "border-gray-200 dark:border-[#4B5563]";
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`${messageClassName} ${messageBgColorClassName} ${messageBorderColorClassName}`}
                style={{
                  backgroundColor: theme?.colors?.backgroundSecondary,
                  borderColor: theme?.colors?.borderPrimary,
                }}
              >
                <div className="flex gap-5">
                  <div className="w-10 h-10 flex-shrink-0">
                    {msg.sender === "user" ? (
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow">
                        <User size={24} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow">
                        <Bot size={24} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-lg font-semibold text-gray-900 dark:text-gray-200`}
                      >
                        {msg.sender === "user" ? "You" : "AI Assistant"}
                      </span>

                      {settings.showTimestamp && (
                        <span className={`text-sm text-gray-500`}>
                          {formatTimestamp(msg.timestamp)}
                        </span>
                      )}
                    </div>
                    <div
                      className={`prose prose-lg text-gray-800 dark:text-gray-100 prose-invert:text-gray-100`}
                    >
                      {settings.enableMarkdown ? (
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      ) : (
                        msg.text
                      )}
                    </div>
                    {msg.sender === "ai" && (
                      <div className="flex justify-end mt-3">
                        <button
                          onClick={() => copyToClipboard(msg.text)}
                          className={`p-2 rounded-md hover:bg-opacity-10 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white dark:hover:bg-white/20`}
                          aria-label="Copy code"
                        >
                          <Copy size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {isTyping && (
            <div
              className={`flex gap-4 rounded-lg p-4 bg-gray-100 dark:bg-gray-800`}
              style={{ backgroundColor: theme?.colors?.backgroundSecondary }}
            >
              <div className="w-10 h-10 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow">
                  <Bot size={24} className="text-white" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
                <span className="text-gray-500 italic dark:text-gray-400">
                  Typing...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
      {showScrollDownButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-opacity duration-200 opacity-90 hover:opacity-100"
          aria-label="Scroll to bottom"
          style={{ padding: "0.6rem" }}
        >
          <ArrowDown size={24} />
        </button>
      )}
    </div>
  );
}
