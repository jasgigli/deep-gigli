// app/summarize/components/SummarizePanel.jsx
import React from "react";
import { Button } from "@/components/ui/Button"; // Assuming Button component is in "@/components/ui"
import { Loader2 } from "lucide-react";

export default function SummarizePanel({ summarizeConversation, summaryResult, isLoading }) {
    return (
        <div className="p-6 flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Summarize Conversation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                Click the button below to summarize the current conversation using AI.
            </p>
            <Button
                onClick={summarizeConversation}
                variant="primary"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        Summarizing <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </>
                ) : (
                    "Summarize Now"
                )}
            </Button>
            {summaryResult && (
                <div className="mt-8 p-4 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Summary:</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{summaryResult}</p>
                </div>
            )}
        </div>
    );
}