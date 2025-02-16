// components/ui/Input.jsx
import React from 'react';

const Input = React.forwardRef(({ className = '', ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={`rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };