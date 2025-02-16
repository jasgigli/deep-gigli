// components/ChatMessages.js
import React from "react";
import { User, Bot, Copy, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatMessages({
  messages,
  isDarkMode,
  settings,
  formatTimestamp,
  copyToClipboard,
}) {
  return (
    <div className="flex-1 overflow-y-auto scroll-smooth" >
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <h1
              className={`text-4xl font-bold ${
                isDarkMode ? "text-white/80" : "text-gray-800"
              }`}
            >
              Enhanced ChatGPT Clone
            </h1>
            <p className={isDarkMode ? "text-white/60" : "text-gray-600"}>
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
                  ? `${
                      msg.sender === "ai" ? "bg-[#444654]" : "bg-[#343541]"
                    } border-black/10`
                  : `${
                      msg.sender === "ai" ? "bg-gray-50" : "bg-white"
                    } border-gray-200`
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
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      {msg.sender === "user" ? "You" : "Assistant"}
                    </span>
                    {settings.showTimestamp && (
                      <span
                        className={`text-xs ${
                          isDarkMode ? "text-white/40" : "text-gray-400"
                        }`}
                      >
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    )}
                  </div>
                  <div
                    className={`overflow-hidden ${
                      msg.error
                        ? "text-red-500"
                        : isDarkMode
                        ? "text-white/90"
                        : "text-gray-700"
                    }`}
                  >
                    {settings.enableMarkdown ? (
                      <ReactMarkdown
                        className={`prose ${
                          isDarkMode ? "prose-invert" : ""
                        } max-w-none`}
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
                          ? "text-white/60 hover:bg-white/10"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <Copy size={14} />
                      Copy
                    </button>
                    <button
                      onClick={() => {
                        const text = msg.text;
                        const shareData = {
                          title: "Chat Message",
                          text: text,
                        };
                        if (navigator.share) {
                          navigator.share(shareData);
                        } else {
                          copyToClipboard(text);
                        }
                      }}
                      className={`p-1 rounded-md text-sm flex items-center gap-1 ${
                        isDarkMode
                          ? "text-white/60 hover:bg-white/10"
                          : "text-gray-500 hover:bg-gray-100"
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
  );
}
