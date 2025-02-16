// utils/translation.js
export function translateText(text, targetLanguage) {
    if (!text || typeof text !== "string" || !targetLanguage) return text;
    return `${text} [Translated to ${targetLanguage}]`;
  }
  