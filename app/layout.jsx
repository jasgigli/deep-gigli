import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext"

export const metadata = {
    title: {
        default: "JasGigli AI - Super AI Agent", // Default title if no template is matched
        template: '%s | JasGigli AI - Your AI Assistant', // Template for dynamic titles
    },
    description: "Your powerful AI agent for chat, summarization, translation, and more. Experience the future of AI-powered assistance.",
    keywords: ['AI Agent', 'Chatbot', 'Summarization', 'Translation', 'Artificial Intelligence', 'Productivity', 'Assistant', 'JasGigli AI'], // Added keywords
    authors: [{ name: 'Junaid Ali Shah Gigli', url: 'https://jasgiigli.blogspot.com' }], // Replace with your author info
    openGraph: {
        title: "JasGigli AI - Super AI Agent",
        description: "Your powerful AI agent for chat, summarization, translation, and more.",
        url: 'https://yourwebsite.com', // Replace with your website URL
        siteName: 'JasGigli AI',
        images: [
            {
                url: 'https://yourwebsite.com/og-image.png', // Replace with your OG image URL
                width: 1200,
                height: 630,
                alt: 'JasGigli AI - Super AI Agent OG Image',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            nosnippet: false,
            maxSnippet: -1,
            maxImagePreview: 'large',
            maxVideoPreview: -1,
        },
    },
    // Optional: If you want to set a theme color for browsers
    themeColor: '#64B5F6', // Example primary color of your light theme
    icons: {
        icon: '/favicon.ico', // Path to your favicon
        // apple: '/apple-icon.png', // Path to apple-touch-icon.png if you have one
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            
            <body className="font-inter">
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}