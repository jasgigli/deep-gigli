"use client";

import React from "react";
import { FileText, Search, Globe, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.js";

export default function ChatInputToolbar({
  onSummarize,
  onSearch,
  onTranslate,
  onSentiment,
}) {
  const { darkMode, colors } = useTheme();

  const buttonStyle = {
    color: colors.textPrimary,
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <motion.div
      className="flex justify-around py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: colors.backgroundSecondary }}
    >
      <button
        title="Summarize Conversation"
        onClick={onSummarize}
        className="p-2 rounded-full"
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = colors.primaryHover)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <FileText size={20} color={colors.textPrimary} />
      </button>
      <button
        title="Search Conversation"
        onClick={onSearch}
        className="p-2 rounded-full"
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = colors.primaryHover)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <Search size={20} color={colors.textPrimary} />
      </button>
      <button
        title="Translate Conversation"
        onClick={onTranslate}
        className="p-2 rounded-full"
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = colors.primaryHover)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <Globe size={20} color={colors.textPrimary} />
      </button>
      <button
        title="Analyze Sentiment"
        onClick={onSentiment}
        className="p-2 rounded-full"
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = colors.primaryHover)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <Smile size={20} color={colors.textPrimary} />
      </button>
    </motion.div>
  );
}
