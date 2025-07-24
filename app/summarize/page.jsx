"use client";

import SummarizePanel from "@/app/_components/SummarizePanel";
import { useTheme } from "@/context/ThemeContext";
import Head from "next/head";
import { useState } from "react";

const SummarizeToolPage = () => {
  const [summaryResult, setSummaryResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`${theme.darkMode ? "dark" : ""}`}>
      <Head>
        <title>Summarize Text - JasGigli AI</title>
        <meta
          name="description"
          content="Summarize text online with JasGigli AI's summarization tool."
        />
      </Head>
      <div className="container mx-auto px-6 py-10">
        <SummarizePanel
          summaryResult={summaryResult}
          isLoading={isLoading}
          setSummaryResult={setSummaryResult}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default SummarizeToolPage;
