"use client";

import SettingsModal from "@/app/_components/common/SettingModal";
import Head from "next/head";
import { useState } from "react";

const SettingsPage = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(true); // Show modal directly on page

  return (
    <>
      <Head>
        <title>Settings - JasGigli AI</title>
        <meta
          name="description"
          content="Customize your JasGigli AI settings."
        />
      </Head>
      <div className="container mx-auto px-6 py-10">
        {showSettingsModal && (
          <SettingsModal
            setShowSettings={setShowSettingsModal} // Just to close it, saving is handled in modal
          />
        )}
      </div>
    </>
  );
};

export default SettingsPage;
