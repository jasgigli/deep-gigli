import React from "react";
import ChatMessages from "../ChatMessages";
import ChatInput from "../ChatInput";
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme - if you want to style ChatPanel directly

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
    const { colors } = useTheme(); // Access colors - though not directly used in this component's style now

    return (
        <div className="flex flex-col h-full" style={{ backgroundColor: colors.backgroundPrimary }}> {/* Example: Setting ChatPanel background */}
            <ChatMessages
                messages={messages}
                settings={settings}
                formatTimestamp={formatTimestamp}
                copyToClipboard={copyToClipboard}
                isTyping={isTyping}
            />
            <ChatInput
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                sendMessage={sendMessage}
                isLoading={isLoading}
                textareaRef={textareaRef}
                />
        </div>
    );
}