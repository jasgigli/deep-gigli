// lib/utils/validation.js
// Example using Zod for schema validation (install zod: npm install zod)
import { z } from 'zod';

export const validationSchemas = {
    chatMessageSchema: z.object({
        message: z.string().min(1, { message: "Message cannot be empty" }),
        // ... other chat message validation rules ...
    }),
    summarizeTextSchema: z.object({
        text: z.string().min(1, { message: "Text to summarize cannot be empty" }),
        lengthValue: z.number().min(1).optional(),
        // ... other summarize validation rules ...
    }),
    translateTextSchema: z.object({
        text: z.string().min(1, { message: "Text to translate cannot be empty" }),
        targetLanguage: z.string().min(2, { message: "Target language must be selected" }),
        // ... other translate validation rules ...
    }),
    // ... other validation schemas for your application ...
};

export const validate = (schema, data) => {
    try {
        schema.parse(data);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.errors }; // Zod errors array
    }
};