// app/features/chat-agent/page.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const ChatAgentFeaturePage = () => {
    return (
        <>
            <Head>
                <title>AI Chat Agent - JasGigli AI</title>
                <meta name="description" content="Discover the power of our AI Chat Agent for interactive conversations and intelligent assistance. Experience the future of AI interaction." />
            </Head>
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-center mb-8">AI Chat Agent</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Engage in dynamic conversations with our AI Chat Agent. Whether you're looking for information, creative writing assistance, or just a friendly chat, our AI agent is ready to assist. Explore the capabilities of advanced AI conversation.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                    <li><b>Intelligent Conversations:</b> Natural and engaging AI interactions.</li>
                    <li><b>Versatile Assistance:</b> Help with information, writing, and more.</li>
                    <li><b>24/7 Availability:</b> AI agent ready whenever you need it.</li>
                </ul>
                <div className="text-center">
                    <Link href="/" className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-lg">
                        Chat with AI Agent
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ChatAgentFeaturePage;