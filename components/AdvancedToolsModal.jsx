// components/AdvancedToolsModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`w-full max-w-2xl p-6 rounded-lg ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          } shadow-lg`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Advanced Tools & Analytics
            </h2>
            <button
              onClick={() => setShowAdvancedTools(false)}
              className="text-sm font-medium text-blue-500 hover:underline"
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
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-3 py-2 ${
                  activeTab === "analytics"
                    ? isDarkMode
                      ? "border-b-2 border-white text-white"
                      : "border-b-2 border-gray-900 text-gray-900"
                    : isDarkMode
                    ? "text-white/60"
                    : "text-gray-500"
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          {activeTab === "summarize" && (
            <div>
              <p className={isDarkMode ? "text-white/80" : "text-gray-700"}>
                Click below to generate a summary of your conversation.
              </p>
              <button
                onClick={summarizeConversation}
                className={`mt-4 px-4 py-2 rounded-md ${
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-100 text-blue-900 hover:bg-blue-200"
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
                Enter a query to search your conversation semantically.
              </p>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search query..."
                className={`w-full p-2 mt-2 rounded-md ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                }`}
              />
              <button
                onClick={() => searchConversation(searchQuery)}
                className={`mt-4 px-4 py-2 rounded-md ${
                  isDarkMode
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-100 text-green-900 hover:bg-green-200"
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

          {activeTab === "analytics" && (
            <div>
              <p className={isDarkMode ? "text-white/80" : "text-gray-700"}>
                View your conversation analytics.
              </p>
              <div className="mt-4 p-4 border rounded-md">
                <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                <p>Real-time metrics and insights would appear here.</p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
