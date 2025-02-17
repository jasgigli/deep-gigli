"use client";

import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useTheme } from "../../context/ThemeContext.js";

export default function ChatPanel({
  messages = [],
  settings = { showTimestamp: false, enableMarkdown: false },
  formatTimestamp = (ts) => ts,
  copyToClipboard = () => {},
  isTyping = false,
  input = "",
  setInput = () => {},
  handleKeyDown = () => {},
  sendMessage = () => {},
  isLoading = false,
  textareaRef = null,
}) {
  const { darkMode, colors } = useTheme();

  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: colors.backgroundPrimary }}
    >
      <ChatMessages
        messages={messages}
        settings={settings}
        formatTimestamp={formatTimestamp}
        copyToClipboard={copyToClipboard}
        isTyping={isTyping}
      />
      {/* Chat Input Area */}
      <div
        className="sticky bottom-0"
        style={{
          backgroundColor: colors.backgroundSecondary,
          borderTop: `1px solid ${colors.borderPrimary}`,
        }}
      >
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
