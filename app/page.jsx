// app/page.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { toast } from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import SettingsModal from "../components/SettingsModal";
import AdvancedToolsModal from "../components/AdvancedToolsModal";

export default function Home() {
  // Shared state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // For typing indicator
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [settings, setSettings] = useState({
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxTokens: 1024,
    showTimestamp: true,
    enableMarkdown: true,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // NEW: Advanced Tools Modal state
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  const [summaryResult, setSummaryResult] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Load saved data on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem("conversations");
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Persist conversations
  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px";
    }
  }, [input]);

  // Conversation management functions
  const createNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
      timestamp: new Date().toISOString(),
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversation(newConversation);
    setMessages([]);
  };

  const saveConversation = () => {
    if (currentConversation) {
      const updatedConversations = conversations.map((conv) =>
        conv.id === currentConversation.id
          ? { ...conv, messages, timestamp: new Date().toISOString() }
          : conv
      );
      setConversations(updatedConversations);
      toast.success("Conversation saved!");
    }
  };

  const deleteConversation = (id) => {
    setConversations(conversations.filter((conv) => conv.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
      setMessages([]);
    }
    toast.success("Conversation deleted");
  };

  const exportConversation = () => {
    const conversationData = {
      messages,
      settings,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob(
      [JSON.stringify(conversationData, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-export-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Conversation exported!");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const regenerateResponse = async () => {
    if (messages.length === 0) return;
    
    const lastUserMessage = messages.findLast((msg) => msg.sender === "user");
    if (lastUserMessage) {
      setIsLoading(true);
      setIsTyping(true);
      try {
        const { data } = await axios.post("/api/chat", { 
          message: lastUserMessage.text,
          settings,
        });
        
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastAiIndex = newMessages.findLastIndex((msg) => msg.sender === "ai");
          if (lastAiIndex !== -1) {
            newMessages[lastAiIndex] = {
              text: data.reply,
              sender: "ai",
              timestamp: new Date().toISOString(),
            };
          } else {
            newMessages.push({
              text: data.reply,
              sender: "ai",
              timestamp: new Date().toISOString(),
            });
          }
          return newMessages;
        });
      } catch (error) {
        toast.error("Failed to regenerate response");
      } finally {
        setIsLoading(false);
        setIsTyping(false);
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const currentMessage = input.trim();
    const userMessage = { 
      text: currentMessage, 
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);
    try {
      const { data } = await axios.post("/api/chat", { 
        message: currentMessage,
        settings,
      });
      const aiMessage = { 
        text: data.reply, 
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      
      if (messages.length === 0 && currentConversation) {
        const updatedConversation = {
          ...currentConversation,
          title: currentMessage.slice(0, 30) + (currentMessage.length > 30 ? "..." : ""),
        };
        setCurrentConversation(updatedConversation);
        setConversations(
          conversations.map((conv) =>
            conv.id === updatedConversation.id ? updatedConversation : conv
          )
        );
      }
    } catch (error) {
      const errorMessage = {
        text: "An error occurred. Please try again.",
        sender: "ai",
        error: true,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const formatTimestamp = (timestamp) =>
    new Date(timestamp).toLocaleTimeString();

  // NEW: Summarize conversation using Google Gemini
  const summarizeConversation = async () => {
    try {
      const { data } = await axios.post("/api/summarize", { messages });
      setSummaryResult(data.summary);
      toast.success("Conversation summarized!");
    } catch (error) {
      toast.error("Failed to summarize conversation");
    }
  };

  // NEW: Search conversation using DeepSeek-like semantic search
  const searchConversation = async (query) => {
    try {
      const { data } = await axios.post("/api/search", { query, messages });
      setSearchResults(data.results);
      toast.success("Search completed!");
    } catch (error) {
      toast.error("Failed to search conversation");
    }
  };

  return (
    <>
      <Head>
        <title>Enhanced ChatGPT Clone</title>
        <meta
          name="description"
          content="An enhanced ChatGPT clone with advanced features"
        />
      </Head>

      <div
        className={`flex h-screen overflow-hidden ${
          isDarkMode ? "bg-[#343541]" : "bg-gray-50"
        }`}
      >
        <Sidebar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          conversations={conversations}
          currentConversation={currentConversation}
          setCurrentConversation={(conv) => {
            setCurrentConversation(conv);
            setMessages(conv.messages);
            setIsMobileSidebarOpen(false);
          }}
          createNewConversation={createNewConversation}
          deleteConversation={deleteConversation}
          setShowSettings={setShowSettings}
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
          renameConversation={(id, newTitle) => {
            const updatedConversations = conversations.map((conv) =>
              conv.id === id ? { ...conv, title: newTitle } : conv
            );
            setConversations(updatedConversations);
          }}
        />

        <main
          className={`flex-1 flex flex-col relative ${
            isDarkMode ? "bg-[#343541]" : "bg-white"
          }`}
        >
          <ChatHeader
            isDarkMode={isDarkMode}
            saveConversation={saveConversation}
            exportConversation={exportConversation}
            regenerateResponse={regenerateResponse}
            settings={settings}
            // NEW: Open advanced tools modal when clicking the new button
            openAdvancedTools={() => setShowAdvancedTools(true)}
          />

          <ChatMessages
            messages={messages}
            isDarkMode={isDarkMode}
            settings={settings}
            formatTimestamp={formatTimestamp}
            copyToClipboard={copyToClipboard}
            isTyping={isTyping}
          />

          {showSettings && (
            <SettingsModal
              settings={settings}
              setSettings={setSettings}
              isDarkMode={isDarkMode}
              setShowSettings={setShowSettings}
            />
          )}

          {showAdvancedTools && (
            <AdvancedToolsModal
              isDarkMode={isDarkMode}
              setShowAdvancedTools={setShowAdvancedTools}
              summarizeConversation={summarizeConversation}
              summaryResult={summaryResult}
              searchConversation={searchConversation}
              searchResults={searchResults}
            />
          )}

          <ChatInput
            input={input}
            setInput={setInput}
            handleKeyDown={handleKeyDown}
            sendMessage={sendMessage}
            isLoading={isLoading}
            textareaRef={textareaRef}
            isDarkMode={isDarkMode}
            settings={settings}
          />
        </main>
      </div>
    </>
  );
}
