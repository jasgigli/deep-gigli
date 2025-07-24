// app/features/summarize/page.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SummarizeFeaturePage = () => {
    return (
        <>
            <Head>
                <title>AI Text Summarizer - JasGigli AI</title>
                <meta name="description" content="Summarize long articles, documents, and text quickly with our AI-powered summarizer. Boost your productivity." />
            </Head>
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-center mb-8">AI Text Summarizer</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Struggling to keep up with information overload? JasGigli AI's Text Summarizer helps you condense lengthy articles, research papers, and documents into concise summaries. Get the key information you need in minutes, not hours.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                    <li><b>Save Time:</b> Quickly grasp the essence of any text.</li>
                    <li><b>Boost Productivity:</b> Focus on the most important details.</li>
                    <li><b>Easy to Use:</b> Simple interface, instant results.</li>
                </ul>
                <div className="text-center">
                    <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg">
                        Try Summarizer Now
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SummarizeFeaturePage;