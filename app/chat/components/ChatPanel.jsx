"use client";

import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useTheme } from "../../context/ThemeContext.js";

export default function ChatPanel({
    messages = [],
    settings = { showTimestamp: false, enableMarkdown: false },
    formatTimestamp = (ts) => ts,
    copyToClipboard = () => { },
    isTyping = false,
    input = "",
    setInput = () => { },
    handleKeyDown = () => { },
    sendMessage = () => { },
    isLoading = false,
    textareaRef = null,
}) {
    const { isDarkMode } = useTheme(); // Use ThemeContext for styling

    return (
        <div className="flex flex-col h-full">
            <ChatMessages
                messages={messages}
                settings={settings}
                formatTimestamp={formatTimestamp}
                copyToClipboard={copyToClipboard}
                isTyping={isTyping}
            />
            {/* Chat Input Area */}
            <div className="sticky bottom-0 bg-inherit border-t border-gray-200 dark:border-[#40414F] dark:bg-[#343541]">
                <ChatInput
                    input={input}
                    setInput={setInput}
                    handleKeyDown={handleKeyDown}
                    sendMessage={sendMessage}
                    isLoading={isLoading}
                    textareaRef={textareaRef}
                />
            </div>
        </div>
    );
}
