import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext"

export const metadata = {
    title: "JasGigli AI - Your Super AI Agent",
    description: "A powerful AI agent for chat, summarization, translation, and more.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="font-inter"> {/* Apply default font here */}
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}