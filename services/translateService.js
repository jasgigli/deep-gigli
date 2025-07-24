// services/translateService.js
import { apiClient } from '@/lib/api/client'; // Example API client import

export const translateService = {
    async translateText(text, sourceLanguage, targetLanguage) {
        try {
            const response = await apiClient.post('/api/translate', { text, sourceLanguage, targetLanguage });
            return response.data;
        } catch (error) {
            console.error("Error in translateService.translateText:", error);
            throw error;
        }
    },
    // ... other translate related service functions ...
};