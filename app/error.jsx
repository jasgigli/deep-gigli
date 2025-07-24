// app/error.js
"use client";

import React, { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("Global Error Boundary caught error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800 text-center p-4">
            <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
                Something went wrong!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                We encountered an unexpected error. Please try again later.
            </p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Try again
            </button>
        </div>
    );
}