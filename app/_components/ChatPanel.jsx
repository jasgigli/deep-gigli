"use client";

// _components/ChatPanel.jsx
import ChatInput from "@/app/_components/ChatInput";
import ChatMessages from "@/app/_components/ChatMessages";
import { useTheme } from "@/context/ThemeContext";

export default function ChatPanel({
  messages,
  setMessages,
  settings,
  formatTimestamp,
  copyToClipboard,
  isTyping,
  setIsTyping,
  input,
  setInput,
  handleKeyDown,
  sendMessage,
  isLoading,
  textareaRef,
}) {
  const { theme } = useTheme();
  const backgroundColor = theme?.colors?.backgroundPrimary || "bg-white";

  return (
    <div
      className={`flex flex-col h-full ${backgroundColor}`}
      style={{ backgroundColor: theme?.colors?.backgroundPrimary }}
    >
      <ChatMessages
        messages={messages}
        settings={settings}
        formatTimestamp={formatTimestamp}
        copyToClipboard={copyToClipboard}
        isTyping={isTyping}
      />
      <div
        className="sticky bottom-0 border-t"
        style={{
          backgroundColor: theme?.colors?.backgroundSecondary,
          borderTopColor: theme?.colors?.borderPrimary,
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
