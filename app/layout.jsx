import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext.js"


export const metadata = {
    title: "JasGigli AI ChatBot",
    description: "Super AI Agent with Chat, Translation, and Summarization",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider> {/* Wrap your app with ThemeProvider */}
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}