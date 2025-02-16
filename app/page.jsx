"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { toast } from "react-hot-toast";
import { ThemeProvider } from '@/app/context/ThemeContext'; // Import ThemeProvider

// Import Layout Components
import Sidebar from "@/components/layouts/Sidebar";
import ChatHeader from "@/components/layouts/ChatHeader";

// Import Panel Components
import ChatPanel from "@/components/panels/ChatPanel";
import SummarizePanel from "@/components/panels/SummarizePanel";
import TranslatePanel from "@/components/panels/TranslatePanel";

// Import UI Components
import SettingsModal from "@/components/SettingsModal";
import ToolSelector from "@/components/ToolSelector";

export default function Home() {
  // --- State Management ---
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  // Removed isDarkMode state
  const [settings, setSettings] = useState({ // Default settings
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxTokens: 1024,
    showTimestamp: true,
    enableMarkdown: true,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Advanced tool state
  const [summaryResult, setSummaryResult] = useState("");
  const [translationResult, setTranslationResult] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");

  // Tool selection state (default is "chat")
  const [selectedTool, setSelectedTool] = useState("chat");

  // Ref for textarea auto-resize
  const textareaRef = React.useRef(null);

  // --- Load & Save State (useEffect hooks) ---
  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) setSettings(JSON.parse(savedSettings) || settings); // Use default if nothing saved

    // Load conversations from localStorage
    const savedConversations = localStorage.getItem("conversations");
    if (savedConversations) setConversations(JSON.parse(savedConversations) || []);
  }, []);


  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  // Removed useEffect for theme saving/loading - ThemeContext handles this now


  // --- Input Textarea Auto-Resize ---
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  // --- Conversation Management Functions ---
  const createNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(), // Simple unique ID
      title: "New Conversation",
      messages: [],
    };
    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
    setMessages([]); // Clear messages for new conversation
  };

  const saveConversation = () => {
    if (!currentConversation) return;
    const updatedConversation = {
      ...currentConversation,
      messages: messages, // Update messages in current conversation
    };
    setCurrentConversation(updatedConversation);
    setConversations(
      conversations.map((conv) =>
        conv.id === currentConversation.id ? updatedConversation : conv
      )
    );
    toast.success("Conversation saved!");
  };


  const deleteConversation = (id) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
    if (currentConversation && currentConversation.id === id) {
      setCurrentConversation(null);
      setMessages([]); // Clear messages if deleting current conversation
    }
    toast.success("Conversation deleted!");
  };


  const exportConversation = () => {
    if (!currentConversation || messages.length === 0) {
      toast.error("No conversation to export.");
      return;
    }

    const filename = `conversation-${currentConversation.id}.json`;
    const jsonStr = JSON.stringify({
      title: currentConversation.title,
      messages: messages,
      settings: settings // Include settings in export
    }, null, 2); // Pretty print JSON

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
    URL.revokeObjectURL(url); // Revoke URL
    toast.success("Conversation exported!");
  };


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Code copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy code to clipboard.");
    });
  };


  const regenerateResponse = async () => {
    if (messages.length < 2 || isLoading) return; // Ensure there's a user message and AI response to regenerate
    setIsLoading(true);
    setIsTyping(true);

    const conversationHistory = messages.slice(0, messages.length - 1); // Exclude the last AI response

    const lastUserMessage = conversationHistory.filter(msg => msg.sender === 'user').pop(); // Get last user message

    if (!lastUserMessage) {
      toast.error("No user message to regenerate response for.");
      setIsLoading(false);
      setIsTyping(false);
      return;
    }


    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: lastUserMessage.text, settings }), // Regenerate based on last user message
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const regeneratedAiMessage = {
        text: data.reply,
        sender: "ai",
        timestamp: new Date().toISOString(),
        regenerated: true, // Flag as regenerated if needed for UI
      };


      const updatedMessages = [...conversationHistory, regeneratedAiMessage]; // Replace last AI response
      setMessages(updatedMessages);


    } catch (error) {
      console.error("Error regenerating response:", error);
      toast.error("Failed to regenerate response.");
      const errorMessage = {
        text: "Failed to regenerate response. Please try again.",
        sender: "ai",
        error: true,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
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
      const response = await fetch('/api/chat', { // Using fetch for API call - consistent with Next.js
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage, settings }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Improved error handling
      }

      const data = await response.json();

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
      console.error("Error sending message:", error);
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Removed toggleTheme function - ThemeContext provides this globally
  const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleTimeString();

  // --- Tool-Specific Functions ---
  const summarizeConversation = async () => {
    if (messages.length === 0) {
      toast.error("No conversation to summarize.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSummaryResult(data.summary);
      toast.success("Conversation summarized!");
    } catch (error) {
      console.error("Error summarizing conversation:", error);
      toast.error("Failed to summarize conversation");
    } finally {
      setIsLoading(false);
    }
  };


  const translateConversation = async (targetLanguage) => {
    if (!targetLanguage) {
      toast.error("Please enter a target language for translation.");
      return;
    }
    if (messages.length === 0) {
      toast.error("No conversation to translate.");
      return;
    }
    setIsLoading(true);
    try {
      // **Important: You need to create the /api/translate endpoint**
      // This is placeholder - you'll implement the actual translation logic in app/api/translate/route.js
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages, targetLanguage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTranslationResult(data.translation); // Assuming your API returns { translation: "..." }
      toast.success("Conversation translated!");

    } catch (error) {
      console.error("Error translating conversation:", error);
      toast.error("Failed to translate conversation");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Head>
        <title>JasGigli AI Chat App</title>
        <meta name="description" content="Super AI Agent with Chat, Translation, and Summarization" />
      </Head>

      <ThemeProvider> {/* Wrap the entire content with ThemeProvider */}
        <div className={`flex h-screen overflow-hidden`}> {/* Removed theme class from here */}
          <Sidebar
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
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
          />

          <main className={`flex-1 flex flex-col relative`}> {/* Removed theme class from here */}
            <ChatHeader
              saveConversation={saveConversation}
              exportConversation={exportConversation}
              regenerateResponse={regenerateResponse}
              settings={settings}
            />

            <ToolSelector
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
            />

            <div className="flex-1 overflow-auto">
              {selectedTool === "chat" && (
                <ChatPanel
                  messages={messages}
                  settings={settings}
                  formatTimestamp={formatTimestamp}
                  copyToClipboard={copyToClipboard}
                  isTyping={isTyping}
                  input={input}
                  setInput={setInput}
                  handleKeyDown={handleKeyDown}
                  sendMessage={sendMessage}
                  isLoading={isLoading}
                  textareaRef={textareaRef}
                />
              )}

              {/* {selectedTool === "summarize" && (
                                <SummarizePanel
                                    summarizeConversation={summarizeConversation}
                                    summaryResult={summaryResult}
                                    isLoading={isLoading} // Pass isLoading to SummarizePanel if you want to show loading state there
                                />
                            )}

                            {selectedTool === "translate" && (
                                <TranslatePanel
                                    targetLanguage={targetLanguage}
                                    setTargetLanguage={setTargetLanguage}
                                    translateConversation={translateConversation}
                                    translationResult={translationResult}
                                    isLoading={isLoading} // Pass isLoading to TranslatePanel as well
                                />
                            )} */}
              {selectedTool === "summarize" && (
                <SummarizePanel
                  summarizeConversation={summarizeConversation} // You can remove this now as summarization is triggered by handleSummarize in SummarizePanel
                  summaryResult={summaryResult}
                  isLoading={isLoading}
                  setSummaryResult={setSummaryResult} // Pass setSummaryResult
                  setIsLoading={setIsLoading}         // Pass setIsLoading
                />
              )}

              {selectedTool === "translate" && (
                <TranslatePanel
                  targetLanguage={targetLanguage}
                  setTargetLanguage={setTargetLanguage}
                  translateConversation={translateConversation} // Remove this, translation is triggered by handleTranslate in TranslatePanel
                  translationResult={translationResult}
                  isLoading={isLoading}
                  setTranslationResult={setTranslationResult} // Pass setTranslationResult
                  setIsLoading={setIsLoading}             // Pass setIsLoading
                />
              )}
            </div>

            {showSettings && (
              <SettingsModal
                settings={settings}
                setSettings={setSettings}
                setShowSettings={setShowSettings}
              />
            )}
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}