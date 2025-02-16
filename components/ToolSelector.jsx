import React from "react";
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme
import { MessageSquare, FileText, Globe } from 'lucide-react'; // Import icons

export default function ToolSelector({ selectedTool, setSelectedTool }) {
    const { colors } = useTheme(); // Use ThemeContext

    const tools = [
        { value: "chat", label: "Chat", icon: <MessageSquare size={20} /> },
        { value: "summarize", label: "Summarize", icon: <FileText size={20} /> },
        { value: "translate", label: "Translate", icon: <Globe size={20} /> },
    ];

    return (
        <div className="p-4 max-w-3xl mx-auto"> {/* Added padding and max-width */}
            <div
                className="flex justify-around items-center rounded-lg p-2"
                style={{ backgroundColor: colors.backgroundSecondary }} // Removed bg-gray-100 and used only inline style
            >
                {tools.map((tool) => (
                    <button
                        key={tool.value}
                        onClick={() => setSelectedTool(tool.value)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        style={{
                            backgroundColor: selectedTool === tool.value ? colors.backgroundAccent : 'transparent', // Highlight selected tool
                            color: colors.textPrimary,
                        }}
                        aria-label={`Select ${tool.label} tool`}
                    >
                        <span style={{ color: colors.textPrimary }}>{tool.icon}</span> {/* Icon with theme color */}
                        <span className="text-sm mt-1" style={{ color: colors.textSecondary }}>{tool.label}</span> {/* Label under icon */}
                    </button>
                ))}
            </div>
        </div>
    );
}