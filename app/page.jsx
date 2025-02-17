"use client";

import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { toast } from "react-hot-toast";

// Import Components
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import ChatPanel from "@/app/chat/components/ChatPanel";
import SummarizePanel from "@/app/summarize/components/SummarizePanel";
import TranslatePanel from "@/app/translate/components/TranslatePanel";
import SettingsModal from "@/components/common/SettingModal"
import ToolSelector from "@/components/common/ToolSelector";
import { useTheme } from "./context/ThemeContext.js"

export default function Home() {
    // --- State Management ---
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [settings, setSettings] = useState({ // Default settings
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
    const [selectedTool, setSelectedTool] = useState("chat"); // Default tool is chat

    const textareaRef = useRef(null);

    // --- Theme Context ---
    const { isDarkMode, toggleDarkMode } = useTheme(); // Use ThemeContext

    // --- Load and Save Settings/Conversations ---
    useEffect(() => {
        // Load settings from local storage
        const savedSettings = localStorage.getItem("settings");
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
        // Load conversations from local storage
        const savedConversations = localStorage.getItem("conversations");
        if (savedConversations) {
            setConversations(JSON.parse(savedConversations));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem("conversations", JSON.stringify(conversations));
    }, [conversations]);


    // --- Auto-resize Textarea ---
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px";
        }
    }, [input]);

    // --- Conversation Management Handlers ---
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
        setSelectedTool("chat"); // Reset tool to chat when creating new conversation
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
        const conversationData = { messages, settings, timestamp: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(conversationData, null, 2)], { type: "application/json" });
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
        const lastUserMessage = messages.slice().reverse().find((msg) => msg.sender === "user");
        if (lastUserMessage) {
            setIsLoading(true);
            setIsTyping(true);
            try {
                const { data } = await axios.post("/api/chat", { message: lastUserMessage.text, settings });
                setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastAiIndex = newMessages.slice().reverse().findIndex((msg) => msg.sender === "ai");
                    if (lastAiIndex !== -1) {
                        const index = newMessages.length - 1 - lastAiIndex;
                        newMessages[index] = {
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
            const { data } = await axios.post("/api/chat", { message: currentMessage, settings });
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

    const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleTimeString();

    // --- Tool Specific Functions ---
    const summarizeConversation = async () => {
        if (messages.length === 0) {
            toast.error("No conversation to summarize.");
            return;
        }
        setIsLoading(true);
        try {
            const { data } = await axios.post("/api/summarize", { messages });
            setSummaryResult(data.summary);
            toast.success("Conversation summarized!");
        } catch (error) {
            toast.error("Failed to summarize conversation");
            console.error("Summarize error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const translateConversation = async () => {
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
            const fullText = messages.map((msg) => msg.text).join("\n"); // Join messages with newlines
            const { data } = await axios.post("/api/translate", { text: fullText, targetLanguage });
            setTranslationResult(data.translation);
            toast.success("Conversation translated!");
        } catch (error) {
            toast.error("Failed to translate conversation");
            console.error("Translation error:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <Head>
                <title>JasGigli AI - Super AI Agent</title>
                <meta name="description" content="Your powerful AI agent for chat, summarization, and translation." />
            </Head>

            <div className={`flex h-screen overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                {/* Sidebar */}
                <Sidebar
                    conversations={conversations}
                    currentConversation={currentConversation}
                    setCurrentConversation={(conv) => { setCurrentConversation(conv); setMessages(conv.messages); setIsMobileSidebarOpen(false); }}
                    createNewConversation={createNewConversation}
                    deleteConversation={deleteConversation}
                    setShowSettings={setShowSettingsModal}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                    setConversations={setConversations} // Pass setConversations
                />

                {/* Main Content */}
                <main className={`flex-1 flex flex-col relative ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                    {/* Header */}
                    <Header

                        setShowSettings={setShowSettingsModal}
                        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                        isMobileSidebarOpen={isMobileSidebarOpen}
                        settings={settings}
                        
                    />

                    {/* Tool Selector */}
                    <div className="px-4 pt-2">
                        <ToolSelector
                            selectedTool={selectedTool}
                            setSelectedTool={setSelectedTool}
                        />
                    </div>


                    {/* Panel Area */}
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

                        {selectedTool === "summarize" && (
                            <SummarizePanel
                                summarizeConversation={summarizeConversation}
                                summaryResult={summaryResult}
                                isLoading={isLoading} // Pass isLoading state
                            />
                        )}

                        {selectedTool === "translate" && (
                            <TranslatePanel
                                targetLanguage={targetLanguage}
                                setTargetLanguage={setTargetLanguage}
                                translateConversation={translateConversation}
                                translationResult={translationResult}
                                isLoading={isLoading} // Pass isLoading state
                            />
                        )}
                    </div>

                    {/* Settings Modal */}
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