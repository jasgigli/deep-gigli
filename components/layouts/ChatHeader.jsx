import React from "react";
import { Save, ArrowLeft, FileDown, RefreshCw } from "lucide-react";
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme

export default function ChatHeader({
    saveConversation,
    exportConversation,
    regenerateResponse,
    settings,
}) {
    const { colors } = useTheme(); // Use the hook

    return (
        <header
            className={`sticky top-0 z-10 p-4 border-b`}
            style={{
                backgroundColor: colors.backgroundPrimary,
                borderBottomColor: colors.borderPrimary,
            }}
        >
            <div className="mx-auto max-w-3xl flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h2 className={`text-lg font-semibold`} style={{ color: colors.textPrimary }}>
                        JasGigli AI
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={regenerateResponse}
                        className={`p-2 rounded-md`}
                        style={{
                            color: colors.textPrimary,
                            '&:hover': { backgroundColor: colors.backgroundSecondary },
                        }}
                        aria-label="Regenerate Response"
                    >
                        <RefreshCw size={16} style={{ color: colors.textPrimary }} />
                    </button>
                    <button
                        onClick={saveConversation}
                        className={`p-2 rounded-md`}
                        style={{
                            color: colors.textPrimary,
                            '&:hover': { backgroundColor: colors.backgroundSecondary },
                        }}
                        aria-label="Save Conversation"
                    >
                        <Save size={16} style={{ color: colors.textPrimary }} />
                    </button>
                    <button
                        onClick={exportConversation}
                        className={`p-2 rounded-md`}
                        style={{
                            color: colors.textPrimary,
                            '&:hover': { backgroundColor: colors.backgroundSecondary },
                        }}
                        aria-label="Export Conversation"
                    >
                        <FileDown size={16} style={{ color: colors.textPrimary }} />
                    </button>
                </div>
            </div>
        </header>
    );
}