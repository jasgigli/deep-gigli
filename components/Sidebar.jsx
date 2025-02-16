// components/Sidebar.js
import React from "react";
import { Plus, Trash2, Settings, Sun, Moon } from "lucide-react";

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
}) {
  return (
    <aside
      className={`
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 fixed md:relative z-40 md:z-auto
        w-64 h-full transition-transform duration-200 flex-shrink-0
        ${isDarkMode ? "bg-[#202123]" : "bg-white"}
        p-4 flex flex-col shadow-lg md:shadow-none
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={createNewConversation}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isDarkMode
              ? "border border-white/20 text-white hover:bg-white/10"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Plus size={16} />
          New Chat
        </button>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-md ${
            isDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group flex items-center justify-between p-2 rounded-md cursor-pointer ${
              currentConversation?.id === conv.id
                ? isDarkMode
                  ? "bg-white/10"
                  : "bg-gray-100"
                : isDarkMode
                ? "hover:bg-white/5"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setCurrentConversation(conv)}
          >
            <span
              className={`flex-1 truncate ${
                isDarkMode ? "text-white/90" : "text-gray-700"
              }`}
            >
              {conv.title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteConversation(conv.id);
              }}
              className={`opacity-0 group-hover:opacity-100 p-1 rounded-md ${
                isDarkMode
                  ? "text-white/80 hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div
        className={`mt-4 pt-4 ${
          isDarkMode ? "border-t border-white/20" : "border-t border-gray-200"
        }`}
      >
        <button
          onClick={() => setShowSettings((prev) => !prev)}
          className={`flex items-center gap-2 w-full p-2 rounded-md ${
            isDarkMode
              ? "text-white/80 hover:bg-white/10"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Settings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
}
