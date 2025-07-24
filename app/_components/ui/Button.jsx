"use client";

// _components/ui/Button.jsx
import React from 'react';

const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
    let baseClasses = "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";
    let variantClasses;
    let sizeClasses;

    switch (variant) {
        case 'primary':
            variantClasses = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
            break;
        case 'secondary':
            variantClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500";
            break;
        case 'destructive':
            variantClasses = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
            break;
        case 'outline':
            variantClasses = "border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-500";
            break;
        case 'ghost':
            variantClasses = "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-500";
            break;
        default: // 'default'
            variantClasses = "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500";
    }

    switch (size) {
        case 'sm':
            sizeClasses = "px-2 py-1 text-sm";
            break;
        case 'lg':
            sizeClasses = "px-4 py-3 text-lg";
            break;
        default: // 'default'
            sizeClasses = "px-3 py-2 text-base";
    }

    const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
};

export { Button };