// hooks/useChat.js
import { useState, useCallback } from 'react';
import { chatService } from '@/services/chatService'; // Example service import

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = useCallback(async (message, settings) => {
        setIsLoading(true);
        setIsTyping(true);
        try {
            const response = await chatService.sendMessage(message, settings); // Using chatService
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }, { text: response.reply, sender: 'ai' }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Error sending message. Please try again.", sender: 'ai', error: true }]);
        } finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    }, []);

    return {
        messages,
        setMessages,
        isLoading,
        isTyping,
        sendMessage,
    };
};

export default useChat;