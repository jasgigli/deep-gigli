"use client"; // Ensure this is a client component

import React from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const { darkMode, toggleDarkMode, colors } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-12 transition-colors duration-300"
      style={{ backgroundColor: colors.backgroundPrimary }}
    >
      {/* Theme Toggle */}
      <div className="w-full max-w-4xl px-6 flex justify-end mb-8">
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle theme"
          className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="h-6 w-6" style={{ color: colors.textPrimary }} />
          ) : (
            <Moon className="h-6 w-6" style={{ color: colors.textPrimary }} />
          )}
        </button>
      </div>

      {/* Main Content Card */}
      <div
        className="max-w-4xl w-full p-10 rounded-3xl shadow-xl text-center transition-all duration-300"
        style={{
          backgroundColor: colors.backgroundSecondary,
          border: `1px solid ${colors.borderPrimary}`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          About JasGigli AI
        </h1>

        <div className="space-y-8">
          {/* Our Mission */}
          <section>
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: colors.textPrimary }}
            >
              Our Mission
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              At JasGigli AI, our mission is to democratize access to powerful
              AI tools, making them both intuitive and beneficial for everyone.
              We believe in AI’s potential to augment human capabilities, foster
              creativity, and streamline workflows.
            </p>
          </section>

          {/* What We Offer */}
          <section>
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: colors.textPrimary }}
            >
              What We Offer
            </h2>
            <ul
              className="list-disc list-inside space-y-2 text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              <li>
                <span className="font-bold" style={{ color: colors.textPrimary }}>
                  Intelligent Chat:
                </span>{" "}
                Engage in dynamic conversations with our advanced AI model.
              </li>
              <li>
                <span className="font-bold" style={{ color: colors.textPrimary }}>
                  Conversation Summarization:
                </span>{" "}
                Quickly condense lengthy chats into key takeaways.
              </li>
              <li>
                <span className="font-bold" style={{ color: colors.textPrimary }}>
                  Real-time Translation:
                </span>{" "}
                Break language barriers with seamless translation.
              </li>
              <li>
                <span className="font-bold" style={{ color: colors.textPrimary }}>
                  User-Friendly Experience:
                </span>{" "}
                Enjoy a clean, modern interface that’s intuitive on any device.
              </li>
            </ul>
          </section>

          {/* Technology & Innovation */}
          <section>
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: colors.textPrimary }}
            >
              Technology &amp; Innovation
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Built on cutting-edge AI technology, JasGigli AI leverages advanced
              models to deliver sophisticated and reliable performance. We are
              committed to continuous innovation and refining our AI to provide
              you with the best possible experience.
            </p>
          </section>

          {/* Our Team */}
          <section>
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: colors.textPrimary }}
            >
              Our Team
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Our team is composed of passionate developers, AI enthusiasts, and
              UX designers dedicated to creating intelligent, user-centric
              applications. We are committed to responsible AI development and
              making a positive impact through technology.
            </p>
          </section>

          {/* Connect With Us */}
          <section>
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: colors.textPrimary }}
            >
              Connect With Us
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              We value your feedback! For support, inquiries, or suggestions,
              please reach out to us at:{" "}
              <a
                href="mailto:feedback@jasgigliai.com"
                className="hover:underline"
                style={{ color: colors.primary }}
              >
                overview.jjj@gmail.com
              </a>
            </p>
          </section>

          {/* Back to Chat Section */}
          <section>
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: colors.textPrimary }}
            >
              Back to Chat
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Ready to start a conversation? Return to the JasGigli AI Chat and
              engage with our intelligent system.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              Go to Chat
            </Link>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-sm" style={{ color: colors.textAccent }}>
          © {new Date().getFullYear()} JasGigli AI. All rights reserved.
          <div className="mt-2">
            <a
              href="/terms-of-service"
              className="hover:underline mr-4"
              style={{ color: colors.textPrimary }}
            >
              Terms of Service
            </a>
            <a
              href="/privacy-policy"
              className="hover:underline"
              style={{ color: colors.textPrimary }}
            >
              Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
