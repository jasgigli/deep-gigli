"use client";

import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

// Import Components
import ChatPanel from "@/app/_components/ChatPanel";
import SettingsModal from "@/app/_components/common/SettingModal";
import ToolSelector from "@/app/_components/common/ToolSelector";
import Header from "@/app/_components/layouts/Header";
import Sidebar from "@/app/_components/layouts/Sidebar";
import SummarizePanel from "@/app/_components/SummarizePanel";
import TranslatePanel from "@/app/_components/TranslatePanel";
import { useTheme } from "@/context/ThemeContext";

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [settings, setSettings] = useState({
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxTokens: 1024,
    showTimestamp: true,
    enableMarkdown: true,
  });
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [summaryResult, setSummaryResult] = useState("");
  const [translationResult, setTranslationResult] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [selectedTool, setSelectedTool] = useState("chat");

  const textareaRef = useRef(null);
  const { theme } = useTheme();
  const isDarkMode = theme?.darkMode || false;

  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px";
    }
  }, [input]);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    const currentMessage = input.trim();
    const userMessage = {
      text: currentMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMessage, settings }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiFullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsTyping(false);
          break;
        }
        aiFullResponse += decoder.decode(value);

        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (
            lastMessage &&
            lastMessage.sender === "ai" &&
            lastMessage.isStreaming
          ) {
            return [
              ...prevMessages.slice(0, prevMessages.length - 1),
              {
                ...lastMessage,
                text: lastMessage.text + decoder.decode(value),
              },
            ];
          } else {
            return [
              ...prevMessages,
              {
                text: decoder.decode(value),
                sender: "ai",
                timestamp: new Date().toISOString(),
                isStreaming: true,
              },
            ];
          }
        });
      }

      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.sender === "ai") {
          return [
            ...prevMessages.slice(0, prevMessages.length - 1),
            { ...lastMessage, isStreaming: false },
          ];
        }
        return prevMessages;
      });
    } catch (error) {
      setIsTyping(false);
      const errorMessage = {
        text: "An error occurred. Please try again.",
        sender: "ai",
        error: true,
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      console.error("Send message error:", error);
      toast.error("Failed to send message: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [
    input,
    isLoading,
    messages,
    settings,
    setMessages,
    setInput,
    setIsLoading,
    setIsTyping,
  ]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  const formatTimestamp = useCallback(
    (timestamp) => new Date(timestamp).toLocaleTimeString(),
    []
  );

  const summarizeConversation = useCallback(async () => {
    if (messages.length === 0) {
      toast.error("No conversation to summarize.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      setSummaryResult(data.summary);
      setSelectedTool("summarize"); // Switch to summarize tool
      toast.success("Conversation summarized!");
    } catch (error) {
      console.error("Summarize error:", error);
      toast.error("Failed to summarize conversation");
    } finally {
      setIsLoading(false);
    }
  }, [messages, setSelectedTool]);

  const translateConversation = useCallback(async () => {
    if (!targetLanguage) {
      toast.error("Please enter a target language.");
      return;
    }
    if (messages.length === 0) {
      toast.error("No conversation to translate.");
      return;
    }
    setIsLoading(true);
    try {
      const fullText = messages.map((msg) => msg.text).join("\n");
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: fullText, targetLanguage }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      setTranslationResult(data.translation);
      setSelectedTool("translate"); // Switch to translate tool
      toast.success("Conversation translated!");
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Failed to translate conversation");
    } finally {
      setIsLoading(false);
    }
  }, [messages, targetLanguage, setSelectedTool]);

  return (
    <>
      <Head>
        <title>JasGigli AI - Free AI Chat</title>
        <meta
          name="description"
          content="Start chatting with AI for free with JasGigli AI."
        />
      </Head>

      <div
        className={`flex h-screen overflow-hidden ${isDarkMode ? "dark" : ""}`}
      >
        <Sidebar
          conversations={[]} // No conversations in no-auth mode
          currentConversation={null}
          setCurrentConversation={() => {}} // No conversation selection
          createNewConversation={() => {}} // No new conversation creation
          deleteConversation={() => {}} // No deleting conversations
          setShowSettings={setShowSettingsModal}
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          setConversations={() => {}} // No conversation setting
        />

        <main
          className={`flex-1 flex flex-col relative ${
            isDarkMode ? "dark:bg-gray-800 bg-gray-100" : "bg-gray-100"
          }`}
        >
          <Header
            setShowSettings={setShowSettingsModal}
            setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            settings={settings}
            currentConversation={null} // No current conversation
          />

          <div className="px-4 pt-2">
            <ToolSelector
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
            />
          </div>

          <div className="flex-1 overflow-auto">
            {selectedTool === "chat" && (
              <ChatPanel
                messages={messages}
                setMessages={setMessages}
                settings={settings}
                formatTimestamp={formatTimestamp}
                copyToClipboard={copyToClipboard}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                sendMessage={sendMessage}
                isLoading={isLoading}
                textareaRef={textareaRef}
              />
            )}

            {selectedTool === "summarize" && (
              <SummarizePanel
                summarizeConversation={summarizeConversation}
                summaryResult={summaryResult}
                isLoading={isLoading}
                setSummaryResult={setSummaryResult}
                setIsLoading={setIsLoading}
              />
            )}

            {selectedTool === "translate" && (
              <TranslatePanel
                targetLanguage={targetLanguage}
                setTargetLanguage={setTargetLanguage}
                translateConversation={translateConversation}
                translationResult={translationResult}
                isLoading={isLoading}
                setTranslationResult={setTranslationResult}
                setIsLoading={setIsLoading}
              />
            )}
          </div>

          {showSettingsModal && (
            <SettingsModal
              settings={settings}
              setSettings={setSettings}
              setShowSettings={setShowSettingsModal}
            />
          )}
        </main>
      </div>
    </>
  );
}
