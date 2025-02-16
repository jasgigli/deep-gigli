// components/SettingsModal.js
import React from "react";
import { toast } from "react-hot-toast";

export default function SettingsModal({
  settings,
  setSettings,
  isDarkMode,
  setShowSettings,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-full max-w-md p-6 rounded-lg ${
          isDarkMode ? "bg-[#202123]" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label
              className={`block mb-2 ${
                isDarkMode ? "text-white/80" : "text-gray-700"
              }`}
            >
              Model
            </label>
            <select
              value={settings.model}
              onChange={(e) =>
                setSettings({ ...settings, model: e.target.value })
              }
              className={`w-full p-2 rounded-md ${
                isDarkMode
                  ? "bg-[#343541] text-white border-white/20"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            >
              <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
            </select>
          </div>
          <div>
            <label
              className={`block mb-2 ${
                isDarkMode ? "text-white/80" : "text-gray-700"
              }`}
            >
              Temperature ({settings.temperature})
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  temperature: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
          <div>
            <label
              className={`block mb-2 ${
                isDarkMode ? "text-white/80" : "text-gray-700"
              }`}
            >
              Max Tokens
            </label>
            <input
              type="number"
              value={settings.maxTokens}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxTokens: parseInt(e.target.value),
                })
              }
              className={`w-full p-2 rounded-md ${
                isDarkMode
                  ? "bg-[#343541] text-white border-white/20"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showTimestamp"
              checked={settings.showTimestamp}
              onChange={(e) =>
                setSettings({ ...settings, showTimestamp: e.target.checked })
              }
            />
            <label
              htmlFor="showTimestamp"
              className={isDarkMode ? "text-white/80" : "text-gray-700"}
            >
              Show timestamps
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enableMarkdown"
              checked={settings.enableMarkdown}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  enableMarkdown: e.target.checked,
                })
              }
            />
            <label
              htmlFor="enableMarkdown"
              className={isDarkMode ? "text-white/80" : "text-gray-700"}
            >
              Enable Markdown rendering
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => {
              localStorage.setItem("settings", JSON.stringify(settings));
              setShowSettings(false);
              toast.success("Settings saved!");
            }}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            Save
          </button>
          <button
            onClick={() => setShowSettings(false)}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
