"use client";

// components/ui/Dropdown.jsx
import React from 'react';

const Dropdown = ({ options, value, onChange, className = '', ...props }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export { Dropdown };