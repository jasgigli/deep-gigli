// app/(app)/chat/components/ChatPanel.jsx
import React from "react";
import ChatMessages from "@/app/chat/components/ChatMessages";
import ChatInput from "@/app/chat/components/ChatInput";

export default function ChatPanel({
  messages,
  isDarkMode,
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
  return (
    <>
      <ChatMessages
        messages={messages}
        isDarkMode={isDarkMode}
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
        isDarkMode={isDarkMode}
      />
    </>
  );
}