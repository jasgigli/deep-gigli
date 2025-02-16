// components/Sidebar.jsx
import React, { useState } from "react";
import { Plus, Trash2, Settings, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({
  isDarkMode,
  toggleTheme,
  conversations,
  currentConversation,
  setCurrentConversation,
  createNewConversation,
  deleteConversation,
  setShowSettings,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  renameConversation,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.aside
      className={`
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 fixed md:relative z-40 md:z-auto
        w-64 h-full transition-transform duration-300 flex-shrink-0
        ${isDarkMode ? "bg-gray-800" : "bg-white"}
        p-4 flex flex-col shadow-lg md:shadow-none
      `}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={createNewConversation}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isDarkMode ? "border border-gray-600 text-white hover:bg-gray-700" : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Plus size={16} />
          New Chat
        </button>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-md ${isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full p-2 rounded-md ${
            isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            className={`group flex items-center justify-between p-2 rounded-md cursor-pointer ${
              currentConversation?.id === conv.id
                ? isDarkMode
                  ? "bg-gray-600"
                  : "bg-gray-200"
                : isDarkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setEditingId(null);
              setCurrentConversation(conv);
            }}
            onDoubleClick={() => {
              setEditingId(conv.id);
              setNewTitle(conv.title);
            }}
          >
            {editingId === conv.id ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => {
                  renameConversation(conv.id, newTitle);
                  setEditingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    renameConversation(conv.id, newTitle);
                    setEditingId(null);
                  }
                }}
                className={`flex-1 bg-transparent border-b outline-none ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 truncate ${isDarkMode ? "text-white" : "text-gray-700"}`}
              >
                {conv.title}
              </span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteConversation(conv.id);
              }}
              className={`opacity-0 group-hover:opacity-100 p-1 rounded-md ${
                isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className={`mt-4 pt-4 ${isDarkMode ? "border-t border-gray-600" : "border-t border-gray-200"}`}>
        <button
          onClick={() => setShowSettings((prev) => !prev)}
          className={`flex items-center gap-2 w-full p-2 rounded-md ${
            isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Settings size={16} />
          Settings
        </button>
      </div>
    </motion.aside>
  );
}
