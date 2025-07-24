// app/layout.js
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata = {
  title: {
    default: "JasGigli AI - Free AI Chat & AI Tools",
    template: "%s | JasGigli AI",
  },
  description:
    "Experience free AI chat, text summarization, translation, and more with JasGigli AI. Your all-in-one AI assistant.",
  keywords: [
    "Free AI Chat",
    "AI Chatbot",
    "Summarization",
    "Translation",
    "Artificial Intelligence",
    "AI Tools",
    "JasGigli AI",
  ],
  authors: [
    { name: "Junaid Ali Shah Gigli", url: "https://jasgiigli.blogspot.com" },
  ],
  openGraph: {
    title: "JasGigli AI - Free AI Chat & AI Tools",
    description:
      "Experience free AI chat, text summarization, translation, and more with JasGigli AI. Your all-in-one AI assistant.",
    url: "https://yourwebsite.com", // Replace with your actual website URL
    siteName: "JasGigli AI",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "JasGigli AI - Free AI Chat & AI Tools OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      nosnippet: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
