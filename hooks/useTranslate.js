// hooks/useTranslate.js
import { useState, useCallback } from 'react';
import { translateService } from '@/services/translateService'; // Example service import

const useTranslate = () => {
    const [translationResult, setTranslationResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const translateText = useCallback(async (text, sourceLanguage, targetLanguage) => {
        setIsLoading(true);
        setTranslationResult("");
        try {
            const response = await translateService.translateText(text, sourceLanguage, targetLanguage); // Using translateService
            setTranslationResult(response.translation);
        } catch (error) {
            console.error("Error translating text:", error);
            setTranslationResult("Failed to translate text. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        translationResult,
        setTranslationResult,
        isLoading,
        translateText,
    };
};

export default useTranslate;