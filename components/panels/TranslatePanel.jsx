import React, { useState } from "react";
import { useTheme } from '@/app/context/ThemeContext';
import Dropdown from '@/components/ui/Dropdown'; // Import Dropdown component

const languageOptions = [ // Example language options - expand as needed
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    // ... add more languages
];

export default function TranslatePanel({ translationResult, isLoading, setTranslationResult, setIsLoading }) { // Updated props
    const { colors } = useTheme();
    const [sourceText, setSourceText] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState('en'); // Default source language
    const [targetLanguage, setTargetLanguage] = useState('es'); // Default target language


    const handleTranslate = async () => {
        if (!sourceText.trim()) {
            alert("Please enter text to translate."); // Basic validation
            return;
        }
        setIsLoading(true);
        setTranslationResult(""); // Clear previous translation

        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: sourceText,
                    sourceLanguage: sourceLanguage,
                    targetLanguage: targetLanguage,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTranslationResult(data.translation);
        } catch (error) {
            console.error("Error translating text:", error);
            setTranslationResult("Failed to translate. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>Translate Text</h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold mb-2" style={{ color: colors.textPrimary }}>Original Text</h3>
                    <Dropdown
                        label="Source Language"
                        value={sourceLanguage}
                        options={languageOptions}
                        onChange={(e) => setSourceLanguage(e.target.value)}
                    />
                    <textarea
                        placeholder="Enter text to translate..."
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        rows={8}
                        className="p-2 border rounded-md w-full resize-vertical"
                        style={{
                            backgroundColor: colors.backgroundPrimary,
                            borderColor: colors.borderPrimary,
                            color: colors.textPrimary,
                        }}
                    />
                </div>
                <div>
                    <h3 className="font-semibold mb-2" style={{ color: colors.textPrimary }}>Translation</h3>
                    <Dropdown
                        label="Target Language"
                        value={targetLanguage}
                        options={languageOptions}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                    />
                    <div className="p-2 border rounded-md h-[100%] overflow-auto" style={{ backgroundColor: colors.backgroundSecondary, borderColor: colors.borderPrimary }}>
                        <p className={``} style={{ color: colors.textSecondary, whiteSpace: 'pre-line' }}>{translationResult}</p>
                    </div>
                </div>
            </div>

            <button
                onClick={handleTranslate}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md mt-4`}
                style={{
                    backgroundColor: isLoading ? colors.backgroundAccent : colors.primary,
                    color: colors.backgroundPrimary,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    '&:hover': !isLoading && { backgroundColor: colors.primaryHover }
                }}
            >
                {isLoading ? "Translating..." : "Translate"}
            </button>
        </div>
    );
}