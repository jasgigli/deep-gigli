// hooks/useSummarize.js
import { useState, useCallback } from 'react';
import { summarizeService } from '@/services/summarizeService'; // Example service import

const useSummarize = () => {
    const [summaryResult, setSummaryResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const summarizeText = useCallback(async (text, options) => {
        setIsLoading(true);
        setSummaryResult("");
        try {
            const response = await summarizeService.summarizeText(text, options); // Using summarizeService
            setSummaryResult(response.summary);
        } catch (error) {
            console.error("Error summarizing text:", error);
            setSummaryResult("Failed to summarize text. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        summaryResult,
        setSummaryResult,
        isLoading,
        summarizeText,
    };
};

export default useSummarize;