// services/summarizeService.js
import { apiClient } from '@/lib/api/client'; // Example API client import

export const summarizeService = {
    async summarizeText(text, options) {
        try {
            const response = await apiClient.post('/api/summarize', { text, ...options });
            return response.data;
        } catch (error) {
            console.error("Error in summarizeService.summarizeText:", error);
            throw error;
        }
    },
    // ... other summarize related service functions ...
};