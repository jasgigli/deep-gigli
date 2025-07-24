// app/features/translate/page.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const TranslateFeaturePage = () => {
    return (
        <>
            <Head>
                <title>AI Language Translator - JasGigli AI</title>
                <meta name="description" content="Translate text and conversations instantly with our AI-powered language translator. Break language barriers effortlessly." />
            </Head>
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-center mb-8">AI Language Translator</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Communicate globally with ease using JasGigli AI's Language Translator. Whether you need to translate documents, emails, or chat messages, our AI translator provides accurate and fast translations across multiple languages.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                    <li><b>Accurate Translations:</b> Powered by advanced AI models.</li>
                    <li><b>Multi-Language Support:</b> Translate between numerous languages.</li>
                    <li><b>Seamless Communication:</b> Break down language barriers.</li>
                </ul>
                <div className="text-center">
                    <Link href="/" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-lg">
                        Start Translating
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TranslateFeaturePage;