// components/common/AuthModal.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button'; // Assuming Button component is in "@/components/ui"
import { Input } from '@/components/ui/Input'; // Assuming Input component is in "@/components/ui"

const AuthModal = ({ mode = 'login' }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd handle authentication logic here (API calls, etc.)
        console.log(`${mode.toUpperCase()} form submitted with:`, { email, password });
        alert(`${mode.toUpperCase()} - Check console for details. In a real app, auth logic would be here.`);
    };

    return (
        <div className="p-6 rounded-lg shadow-xl bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <div className="mt-1">
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <div className="mt-1">
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Button type="submit" variant="primary">{mode === 'login' ? 'Login' : 'Sign Up'}</Button>
                    <button type="button" className="text-sm text-blue-500 hover:underline focus:outline-none">
                        Forgot password?
                    </button>
                </div>
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {mode === 'login' ? (
                        <>
                            Don't have an account? <a href="/auth/signup" className="text-blue-500 hover:underline">Sign up</a>
                        </>
                    ) : (
                        <>
                            Already have an account? <a href="/auth/login" className="text-blue-500 hover:underline">Login</a>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AuthModal;