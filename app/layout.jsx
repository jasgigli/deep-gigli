
import "./globals.css";



export const metadata = {
  title: "AI ChatBot",
  description: "Question and Answers ChatBot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
