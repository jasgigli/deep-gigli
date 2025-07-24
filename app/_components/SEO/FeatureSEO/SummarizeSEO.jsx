// _components/SEO/FeatureSEO/SummarizeSEO.jsx
import React from 'react';
import SEO from '../SEO';

const SummarizeSEO = () => {
    const seoData = {
        title: "AI Text Summarizer - Summarize Articles & Documents Online",
        description: "Use our free AI Text Summarizer to condense long articles, documents, and text into key points quickly. Boost your productivity and save time.",
        keywords: "AI summarizer, text summarizer, online summarizer, document summarizer, article summarizer, free summarizer, AI text compression",
        openGraph: {
            title: "AI Text Summarizer - JasGigli AI",
            description: "Summarize long articles and documents online with AI.",
            url: 'https://yourwebsite.com/features/summarize', // Replace with your actual URL
        },
    };

    return <SEO {...seoData} />;
};

export default SummarizeSEO;