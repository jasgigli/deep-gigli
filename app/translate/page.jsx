"use client";

import TranslatePanel from "@/app/_components/TranslatePanel";
import { useTheme } from "@/context/ThemeContext";
import Head from "next/head";
import { useState } from "react";

const TranslateToolPage = () => {
  const [translationResult, setTranslationResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`${theme.darkMode ? "dark" : ""}`}>
      <Head>
        <title>Translate Text - JasGigli AI</title>
        <meta
          name="description"
          content="Translate text to different languages with JasGigli AI's translation tool."
        />
      </Head>
      <div className="container mx-auto px-6 py-10">
        <TranslatePanel
          translationResult={translationResult}
          isLoading={isLoading}
          setTranslationResult={setTranslationResult}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default TranslateToolPage;
