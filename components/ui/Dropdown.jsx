import React from 'react';
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme

const Dropdown = ({ label, value, options, onChange, className }) => {
    const { colors } = useTheme(); // Use ThemeContext

    return (
        <div>
            {label && <label className="block text-sm font-medium" style={{ color: colors.textSecondary }}>{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
                style={{
                    backgroundColor: colors.backgroundPrimary,
                    borderColor: colors.borderPrimary,
                    color: colors.textPrimary,
                }}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;