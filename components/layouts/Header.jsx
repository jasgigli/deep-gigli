// components/layouts/Header.jsx
import React from "react";
import { RefreshCw, Save, Download } from "lucide-react";
import { Button } from "@/components/ui/Button"; // Assuming Button component is in "@/components/ui"

export default function Header({ isDarkMode, saveConversation, exportConversation, regenerateResponse, settings }) {
    return (
        <header
            className={`flex items-center justify-between px-4 py-3 border-b sticky top-0 z-10 ${
                isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            }`}
        >
            <h1 className="text-2xl font-bold text-blue-500 text-center w-full">JasGigli AI</h1>
            <div className="absolute right-4 flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={regenerateResponse}
                    aria-label="Regenerate response"
                >
                    <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={saveConversation}
                    aria-label="Save conversation"
                >
                    <Save className="h-4 w-4 mr-2" /> Save
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={exportConversation}
                    aria-label="Export conversation"
                >
                    <Download className="h-4 w-4 mr-2" /> Export
                </Button>
            </div>
        </header>
    );
}