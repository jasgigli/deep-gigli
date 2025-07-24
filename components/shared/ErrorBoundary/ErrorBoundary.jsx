"use client";

// components/shared/ErrorBoundary/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="text-center p-6">
                    <h2 className="text-xl font-semibold text-red-500 mb-2">Oops! Something went wrong.</h2>
                    <p>Please try refreshing the page or contact support if the issue persists.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;