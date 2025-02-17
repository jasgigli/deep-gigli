// app/chat/components/ChatPanel.jsx
import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatInputToolbar from "./ChatInputToolbar"; // Import toolbar
import { useTheme } from "../../context/ThemeContext.js";

export default function ChatPanel({
    messages,
    settings,
    formatTimestamp,
    copyToClipboard,
    isTyping,
    input,
    setInput,
    handleKeyDown,
    sendMessage,
    isLoading,
    textareaRef,
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
                {/*  You can add ChatInputToolbar here if you want to include extra actions above the input */}
                {/* <ChatInputToolbar isDarkMode={isDarkMode} /> */}
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