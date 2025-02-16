// components/ChatHeader.jsx
import React from "react";
import { Save, Download, RotateCcw, PenToolIcon } from "lucide-react";
import { motion } from "framer-motion";
// (Ensure you install and import your tooltip library if needed)

export default function ChatHeader({
  isDarkMode,
  saveConversation,
  exportConversation,
  regenerateResponse,
  openAdvancedTools,
  settings,
}) {
  return (
    <motion.div
      className="absolute top-4 right-4 flex gap-2 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        data-tip="Save conversation"
        onClick={saveConversation}
        className={`p-2 rounded-md ${
          isDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Save size={20} />
      </button>
      <button
        data-tip="Export conversation"
        onClick={exportConversation}
        className={`p-2 rounded-md ${
          isDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Download size={20} />
      </button>
      <button
        data-tip="Regenerate response"
        onClick={regenerateResponse}
        className={`p-2 rounded-md ${
          isDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <RotateCcw size={20} />
      </button>
      <button
        data-tip="Advanced Tools"
        onClick={openAdvancedTools}
        className={`p-2 rounded-md ${
          isDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <PenToolIcon size={20} />
      </button>
    </motion.div>
  );
}
