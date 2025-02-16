"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { 
  Loader2, Send, Plus, User, Bot, Settings, Save,
  Trash2, Copy, RotateCcw, Download, Share2, Moon, Sun
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Load saved conversations from localStorage
  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
    
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px";
    }
  }, [input]);

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
      const updatedConversations = conversations.map(conv => 
        conv.id === currentConversation.id 
          ? { ...conv, messages, timestamp: new Date().toISOString() }
          : conv
      );
      setConversations(updatedConversations);
      toast.success('Conversation saved!');
    }
  };

  const deleteConversation = (id) => {
    setConversations(conversations.filter(conv => conv.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
      setMessages([]);
    }
    toast.success('Conversation deleted');
  };

  const exportConversation = () => {
    const conversationData = {
      messages,
      settings,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(conversationData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Conversation exported!');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const regenerateResponse = async () => {
    if (messages.length === 0) return;
    
    const lastUserMessage = messages.findLast(msg => msg.sender === 'user');
    if (lastUserMessage) {
      setIsLoading(true);
      try {
        const { data } = await axios.post("/api/chat", { 
          message: lastUserMessage.text,
          settings
        });
        
        // Replace the last AI message or add a new one
        setMessages(prev => {
          const newMessages = [...prev];
          const lastAiIndex = newMessages.findLastIndex(msg => msg.sender === 'ai');
          if (lastAiIndex !== -1) {
            newMessages[lastAiIndex] = {
              text: data.reply,
              sender: 'ai',
              timestamp: new Date().toISOString(),
            };
          } else {
            newMessages.push({
              text: data.reply,
              sender: 'ai',
              timestamp: new Date().toISOString(),
            });
          }
          return newMessages;
        });
      } catch (error) {
        toast.error('Failed to regenerate response');
      } finally {
        setIsLoading(false);
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
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const { data } = await axios.post("/api/chat", { 
        message: currentMessage,
        settings
      });
      const aiMessage = { 
        text: data.reply, 
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Update conversation title if this is the first message
      if (messages.length === 0 && currentConversation) {
        const updatedConversation = {
          ...currentConversation,
          title: currentMessage.slice(0, 30) + (currentMessage.length > 30 ? '...' : ''),
        };
        setCurrentConversation(updatedConversation);
        setConversations(conversations.map(conv =>
          conv.id === updatedConversation.id ? updatedConversation : conv
        ));
      }
    } catch (error) {
      const errorMessage = {
        text: "An error occurred. Please try again.",
        sender: "ai",
        error: true,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
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
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <>
      <Head>
        <title>Enhanced ChatGPT Clone</title>
        <meta name="description" content="An enhanced ChatGPT clone with advanced features" />
      </Head>
      
      <div className={`flex h-screen overflow-hidden ${
        isDarkMode ? 'bg-[#343541]' : 'bg-gray-50'
      }`}>
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        >
          ☰
        </button>

        {/* Left Sidebar */}
        <aside className={`
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          fixed md:relative
          z-40 md:z-auto
          w-64 h-full
          transition-transform duration-200
          flex-shrink-0
          ${isDarkMode ? 'bg-[#202123]' : 'bg-white'}
          p-4 flex flex-col
          shadow-lg md:shadow-none
        `}>
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={createNewConversation}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                isDarkMode 
                  ? 'border border-white/20 text-white hover:bg-white/10' 
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Plus size={16} />
              New Chat
            </button>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md ${
                isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2">
            {conversations.map(conv => (
              <div
                key={conv.id}
                className={`group flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  currentConversation?.id === conv.id
                    ? isDarkMode ? 'bg-white/10' : 'bg-gray-100'
                    : isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setCurrentConversation(conv);
                  setMessages(conv.messages);
                  setIsMobileSidebarOpen(false);
                }}
              >
                <span className={`flex-1 truncate ${
                  isDarkMode ? 'text-white/90' : 'text-gray-700'
                }`}>
                  {conv.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className={`opacity-0 group-hover:opacity-100 p-1 rounded-md ${
                    isDarkMode ? 'text-white/80 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          
          <div className={`mt-4 pt-4 ${
            isDarkMode ? 'border-t border-white/20' : 'border-t border-gray-200'
          }`}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-2 w-full p-2 rounded-md ${
                isDarkMode 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings size={16} />
              Settings
            </button>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className={`flex-1 flex flex-col relative ${
          isDarkMode ? 'bg-[#343541]' : 'bg-white'
        }`}>
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={saveConversation}
              className={`p-2 rounded-md ${
                isDarkMode ? 'text-white/80 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Save conversation"
            >
              <Save size={20} />
            </button>
            <button
              onClick={exportConversation}
              className={`p-2 rounded-md ${
                isDarkMode ? 'text-white/80 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Export conversation"
            >
              <Download size={20} />
            </button>
            <button
              onClick={regenerateResponse}
              className={`p-2 rounded-md ${
                isDarkMode ? 'text-white/80 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Regenerate response"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef} 
            className="flex-1 overflow-y-auto scroll-smooth"
          >
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 px-4">
                  <h1 className={`text-4xl font-bold ${
                    isDarkMode ? 'text-white/80' : 'text-gray-800'
                  }`}>
                    Enhanced ChatGPT Clone
                  </h1>
                  <p className={isDarkMode ? 'text-white/60' : 'text-gray-600'}>
                    Start a conversation by typing a message below.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`border-b ${
                      isDarkMode
                        ? `${msg.sender === 'ai' ? 'bg-[#444654]' : 'bg-[#343541]'} border-black/10`
                        : `${msg.sender === 'ai' ? 'bg-gray-50' : 'bg-white'} border-gray-200`
                    }`}
                  >
                    <div className="max-w-3xl mx-auto flex p-6 gap-4">
                      <div className="w-8 h-8 flex-shrink-0">
                        {msg.sender === "user" ? (
                          <div className="w-8 h-8 rounded-full bg-[#5436DA] flex items-center justify-center">
                            <User size={20} className="text-white" />
                            </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#11A37F] flex items-center justify-center">
                            <Bot size={20} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${
                            isDarkMode ? 'text-white/60' : 'text-gray-500'
                          }`}>
                            {msg.sender === 'user' ? 'You' : 'Assistant'}
                          </span>
                          {settings.showTimestamp && (
                            <span className={`text-xs ${
                              isDarkMode ? 'text-white/40' : 'text-gray-400'
                            }`}>
                              {formatTimestamp(msg.timestamp)}
                            </span>
                          )}
                        </div>
                        <div className={`overflow-hidden ${
                          msg.error ? 'text-red-500' : isDarkMode ? 'text-white/90' : 'text-gray-700'
                        }`}>
                          {settings.enableMarkdown ? (
                            <ReactMarkdown
                              className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          ) : (
                            msg.text
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => copyToClipboard(msg.text)}
                            className={`p-1 rounded-md text-sm flex items-center gap-1 ${
                              isDarkMode 
                                ? 'text-white/60 hover:bg-white/10' 
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            <Copy size={14} />
                            Copy
                          </button>
                          <button
                            onClick={() => {
                              const text = msg.text;
                              const shareData = {
                                title: 'Chat Message',
                                text: text
                              };
                              if (navigator.share) {
                                navigator.share(shareData);
                              } else {
                                copyToClipboard(text);
                              }
                            }}
                            className={`p-1 rounded-md text-sm flex items-center gap-1 ${
                              isDarkMode 
                                ? 'text-white/60 hover:bg-white/10' 
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            <Share2 size={14} />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings Modal */}
          {showSettings && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className={`w-full max-w-md p-6 rounded-lg ${
                isDarkMode ? 'bg-[#202123]' : 'bg-white'
              }`}>
                <h2 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block mb-2 ${
                      isDarkMode ? 'text-white/80' : 'text-gray-700'
                    }`}>
                      Model
                    </label>
                    <select
                      value={settings.model}
                      onChange={(e) => setSettings({...settings, model: e.target.value})}
                      className={`w-full p-2 rounded-md ${
                        isDarkMode 
                          ? 'bg-[#343541] text-white border-white/20' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    >
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block mb-2 ${
                      isDarkMode ? 'text-white/80' : 'text-gray-700'
                    }`}>
                      Temperature ({settings.temperature})
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) => setSettings({...settings, temperature: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className={`block mb-2 ${
                      isDarkMode ? 'text-white/80' : 'text-gray-700'
                    }`}>
                      Max Tokens
                    </label>
                    <input
                      type="number"
                      value={settings.maxTokens}
                      onChange={(e) => setSettings({...settings, maxTokens: parseInt(e.target.value)})}
                      className={`w-full p-2 rounded-md ${
                        isDarkMode 
                          ? 'bg-[#343541] text-white border-white/20' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showTimestamp"
                      checked={settings.showTimestamp}
                      onChange={(e) => setSettings({...settings, showTimestamp: e.target.checked})}
                    />
                    <label htmlFor="showTimestamp" className={
                      isDarkMode ? 'text-white/80' : 'text-gray-700'
                    }>
                      Show timestamps
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enableMarkdown"
                      checked={settings.enableMarkdown}
                      onChange={(e) => setSettings({...settings, enableMarkdown: e.target.checked})}
                    />
                    <label htmlFor="enableMarkdown" className={
                      isDarkMode ? 'text-white/80' : 'text-gray-700'
                    }>
                      Enable Markdown rendering
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem('settings', JSON.stringify(settings));
                      setShowSettings(false);
                      toast.success('Settings saved!');
                    }}
                    className={`px-4 py-2 rounded-md ${
                      isDarkMode
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className={`px-4 py-2 rounded-md ${
                      isDarkMode
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className={`border-t p-4 ${
            isDarkMode ? 'border-white/20 bg-[#343541]' : 'border-gray-200 bg-white'
          }`}>
            <div className="max-w-3xl mx-auto relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Send a message..."
                className={`w-full resize-none rounded-lg border p-4 pr-12 focus:outline-none focus:ring-0 ${
                  isDarkMode
                    ? 'bg-[#40414F] text-white border-white/20 focus:border-white/40'
                    : 'bg-white text-gray-900 border-gray-300 focus:border-gray-400'
                }`}
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className={`absolute right-3 bottom-3 p-1 rounded-lg ${
                  isDarkMode
                    ? 'text-white/60 hover:text-white/90 disabled:text-white/40'
                    : 'text-gray-400 hover:text-gray-600 disabled:text-gray-300'
                } disabled:opacity-50`}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
              </button>
            </div>
            <p className={`text-center text-xs mt-2 ${
              isDarkMode ? 'text-white/40' : 'text-gray-500'
            }`}>
              Model: {settings.model} • Temperature: {settings.temperature} • Max Tokens: {settings.maxTokens}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}