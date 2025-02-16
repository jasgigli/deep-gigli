// components/ChatHeader.js
import React from "react";
import { Save, Download, RotateCcw } from "lucide-react";

export default function ChatHeader({
  isDarkMode,
  saveConversation,
  exportConversation,
  regenerateResponse,
  settings,
}) {
  return (
    <div className="absolute top-4 right-4 flex gap-2 z-10">
      <button
        onClick={saveConversation}
        title="Save conversation"
        className={`p-2 rounded-md ${
          isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Save size={20} />
      </button>
      <button
        onClick={exportConversation}
        title="Export conversation"
        className={`p-2 rounded-md ${
          isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Download size={20} />
      </button>
      <button
        onClick={regenerateResponse}
        title="Regenerate response"
        className={`p-2 rounded-md ${
          isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <RotateCcw size={20} />
      </button>
    </div>
  );
}
