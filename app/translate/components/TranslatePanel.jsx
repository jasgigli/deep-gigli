// app/translate/components/TranslatePanel.jsx
import React from "react";
import { Input } from "@/components/ui/Input"; // Assuming Input component is in "@/components/ui"
import { Button } from "@/components/ui/Button"; // Assuming Button component is in "@/components/ui"
import { Loader2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.js"

export default function TranslatePanel({ targetLanguage, setTargetLanguage, translateConversation, translationResult, isLoading }) {
    const { isDarkMode } = useTheme(); // Use ThemeContext for styling

    return (
        <div className="p-6 flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Translate Conversation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                Enter the target language and click translate to translate the entire conversation.
            </p>
            <div className="mb-4 w-full max-w-sm">
                <Input
                    type="text"
                    placeholder="Target Language (e.g., Spanish, French)"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    aria-label="Target language"
                />
            </div>
            <Button
                onClick={translateConversation}
                variant="primary"
                disabled={isLoading || !targetLanguage}
            >
                {isLoading ? (
                    <>
                        Translating <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </>
                ) : (
                    "Translate Now"
                )}
            </Button>
            {translationResult && (
                <div className="mt-8 p-4 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 w-full max-w-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Translation:</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{translationResult}</p>
                </div>
            )}
        </div>
    );
}