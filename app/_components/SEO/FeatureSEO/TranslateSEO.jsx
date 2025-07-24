// _components/SEO/FeatureSEO/TranslateSEO.jsx
import React from 'react';
import SEO from '../SEO';

const TranslateSEO = () => {
    const seoData = {
        title: "AI Language Translator - Free Online Text Translation",
        description: "Translate text between languages instantly with our free AI Language Translator. Break language barriers and communicate globally with ease.",
        keywords: "AI translator, language translator, online translator, text translator, free translator, AI translation, multilingual translation",
        openGraph: {
            title: "AI Language Translator - JasGigli AI",
            description: "Translate text online to any language using AI.",
            url: 'https://yourwebsite.com/features/translate', // Replace with your actual URL
        },
    };

    return <SEO {...seoData} />;
};

export default TranslateSEO;