import React, { useState } from "react";
import { useTheme } from '@/context/ThemeContext';
import Dropdown from "@/app/_components/ui/Dropdown" 

export default function SummarizePanel({ summaryResult, isLoading, setSummaryResult, setIsLoading }) { // Updated props
    const { colors } = useTheme();

    const [inputText, setInputText] = useState("");
    const [lengthType, setLengthType] = useState("paragraphs"); // Default to paragraphs
    const [lengthValue, setLengthValue] = useState(1); // Default length value
    const [languageStyle, setLanguageStyle] = useState("modern"); // Default language style

    const languageStyleOptions = [
        { value: "easy", label: "Easy English" },
        { value: "modernized", label: "Modernized English" },
        { value: "simple", label: "Simple Language" },
        { value: "modern", label: "Modern Language" },
    ];

    const lengthTypeOptions = [
        { value: "paragraphs", label: "Paragraphs" },
        { value: "characters", label: "Characters" },
        { value: "lines", label: "Lines" },
    ];


    const handleSummarize = async () => {
        if (!inputText.trim()) {
            alert("Please enter text to summarize."); // Basic validation, consider toast
            return;
        }
        setIsLoading(true);
        setSummaryResult(""); // Clear previous summary

        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: inputText,
                    lengthType: lengthType,
                    lengthValue: parseInt(lengthValue), // Ensure integer
                    languageStyle: languageStyle,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSummaryResult(data.summary);
        } catch (error) {
            console.error("Error summarizing text:", error);
            setSummaryResult("Failed to summarize. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>Summarize Text</h2>

            <textarea
                placeholder="Paste or type text to summarize here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={5}
                className="p-2 border rounded-md w-full resize-vertical"
                style={{
                    backgroundColor: colors.backgroundPrimary,
                    borderColor: colors.borderPrimary,
                    color: colors.textPrimary,
                }}
            />

            <div className="flex space-x-4">
                <Dropdown
                    label="Length Type"
                    value={lengthType}
                    options={lengthTypeOptions}
                    onChange={(e) => setLengthType(e.target.value)}
                />
                <div className="flex flex-col">
                    <label className="block text-sm font-medium" style={{ color: colors.textSecondary }}>Length Value</label>
                    <input
                        type="number"
                        value={lengthValue}
                        onChange={(e) => setLengthValue(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        style={{
                            backgroundColor: colors.backgroundPrimary,
                            borderColor: colors.borderPrimary,
                            color: colors.textPrimary,
                        }}
                    />
                </div>
                <Dropdown
                    label="Language Style"
                    value={languageStyle}
                    options={languageStyleOptions}
                    onChange={(e) => setLanguageStyle(e.target.value)}
                />
            </div>

            <button
                onClick={handleSummarize}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md`}
                style={{
                    backgroundColor: isLoading ? colors.backgroundAccent : colors.primary,
                    color: colors.backgroundPrimary,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    '&:hover': !isLoading && { backgroundColor: colors.primaryHover }
                }}
            >
                {isLoading ? "Summarizing..." : "Summarize"}
            </button>

            {summaryResult && (
                <div className="mt-4 p-4 border rounded-md" style={{ backgroundColor: colors.backgroundSecondary, borderColor: colors.borderPrimary }}>
                    <h3 className="font-semibold mb-2" style={{ color: colors.textPrimary }}>Summary:</h3>
                    <p className={``} style={{ color: colors.textSecondary }}>{summaryResult}</p>
                </div>
            )}
        </div>
    );
}