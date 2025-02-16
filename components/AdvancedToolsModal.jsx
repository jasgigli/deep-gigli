// components/AdvancedToolsModal.js
import React, { useState } from "react";

export default function AdvancedToolsModal({
  isDarkMode,
  setShowAdvancedTools,
  summarizeConversation,
  summaryResult,
  searchConversation,
  searchResults,
}) {
  const [activeTab, setActiveTab] = useState("summarize");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-full max-w-xl p-6 rounded-lg ${
          isDarkMode ? "bg-[#202123]" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Advanced Tools
          </h2>
          <button
            onClick={() => setShowAdvancedTools(false)}
            className="text-sm font-medium"
          >
            Close
          </button>
        </div>

        <div className="mb-4 border-b">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("summarize")}
              className={`px-3 py-2 ${
                activeTab === "summarize"
                  ? isDarkMode
                    ? "border-b-2 border-white text-white"
                    : "border-b-2 border-gray-900 text-gray-900"
                  : isDarkMode
                  ? "text-white/60"
                  : "text-gray-500"
              }`}
            >
              Summarize
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`px-3 py-2 ${
                activeTab === "search"
                  ? isDarkMode
                    ? "border-b-2 border-white text-white"
                    : "border-b-2 border-gray-900 text-gray-900"
                  : isDarkMode
                  ? "text-white/60"
                  : "text-gray-500"
              }`}
            >
              Search
            </button>
          </nav>
        </div>

        {activeTab === "summarize" && (
          <div>
            <p className={isDarkMode ? "text-white/80" : "text-gray-700"}>
              Click the button below to generate a summary of your conversation.
            </p>
            <button
              onClick={summarizeConversation}
              className={`mt-4 px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              Summarize Conversation
            </button>
            {summaryResult && (
              <div className="mt-4 p-4 border rounded-md">
                <h3 className="font-semibold mb-2">Summary:</h3>
                <p>{summaryResult}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "search" && (
          <div>
            <p className={isDarkMode ? "text-white/80" : "text-gray-700"}>
              Enter a query to search through your conversation semantically.
            </p>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search query..."
              className={`w-full p-2 mt-2 rounded-md ${
                isDarkMode
                  ? "bg-[#343541] text-white border-white/20"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
            <button
              onClick={() => searchConversation(searchQuery)}
              className={`mt-4 px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              Search
            </button>
            {searchResults.length > 0 && (
              <div className="mt-4 p-4 border rounded-md">
                <h3 className="font-semibold mb-2">Search Results:</h3>
                <ul className="space-y-2">
                  {searchResults.map((result, idx) => (
                    <li key={idx} className="border-b pb-2">
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
