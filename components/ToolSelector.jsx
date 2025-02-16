import React from "react";
import { useTheme } from '@/app/context/ThemeContext';
import { MessageSquare, FileText, Globe } from 'lucide-react';

export default function ToolSelector({ selectedTool, setSelectedTool }) {
    const { colors } = useTheme();

    const tools = [
        { value: "chat", label: "Chat", icon: <MessageSquare size={18} /> },
        { value: "summarize", label: "Summarize", icon: <FileText size={18} /> },
        { value: "translate", label: "Translate", icon: <Globe size={18} /> },
    ];

    return (
        <div className="max-w-3xl mx-auto">
            <div
                className="flex justify-around items-center rounded-md p-1"
                style={{ backgroundColor: colors.backgroundSecondary }}
            >
                {tools.map((tool) => (
                    <button
                        key={tool.value}
                        onClick={() => setSelectedTool(tool.value)}
                        className={`flex flex-col items-center justify-center p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors duration-200`} // Added hover:bg-gray-200 and transition for smoother hover
                        style={{
                            backgroundColor: selectedTool === tool.value ? colors.backgroundAccent : 'transparent',
                            color: colors.textPrimary,
                            borderColor: selectedTool === tool.value ? colors.primary : 'transparent',
                            '--tw-ring-color': colors.primary,
                        }}
                        aria-label={`Select ${tool.label} tool`}
                    >
                        <span style={{ color: colors.textPrimary }}>{tool.icon}</span>
                        <span className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{tool.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}