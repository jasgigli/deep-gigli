// services/chatService.js
import { apiClient } from '@/lib/api/client'; // Example API client import

export const chatService = {
    async sendMessage(message, settings) {
        try {
            const response = await apiClient.post('/api/chat', { message, settings });
            return response.data;
        } catch (error) {
            console.error("Error in chatService.sendMessage:", error);
            throw error;
        }
    },
    // ... other chat related service functions ...
};