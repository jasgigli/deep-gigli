"use client";

// _components/common/SettingsModal.jsx
import { Button } from "@/app/_components/ui/Button";
import { Dropdown } from "@/app/_components/ui/Dropdown";
import { Input } from "@/app/_components/ui/Input";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "react-hot-toast";

export default function SettingsModal({
  settings,
  setSettings,
  setShowSettings,
}) {
  const { theme, darkMode, colors } = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-full max-w-md p-6 rounded-lg ${
          darkMode ? "bg-[#202123]" : "bg-white"
        }`}
        style={{
          backgroundColor: theme?.colors?.backgroundSecondary,
          color: theme?.colors?.textPrimary,
        }}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
          style={{ color: theme?.colors?.textPrimary }}
        >
          Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label
              className={`block mb-2 ${
                darkMode ? "text-white/80" : "text-gray-700"
              }`}
              htmlFor="model-select"
              style={{ color: theme?.colors?.textSecondary }}
            >
              Model
            </label>
            <Dropdown
              id="model-select"
              value={settings.model}
              onChange={(e) =>
                setSettings({ ...settings, model: e.target.value })
              }
              options={[
                { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
                { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
              ]}
              className={`w-full p-2 rounded-md ${
                darkMode
                  ? "bg-[#343541] text-white border-white/20"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
              style={{
                backgroundColor: theme?.colors?.backgroundAccent,
                color: theme?.colors?.textPrimary,
                borderColor: theme?.colors?.borderPrimary,
              }}
            />
          </div>
          <div>
            <label
              className={`block mb-2 ${
                darkMode ? "text-white/80" : "text-gray-700"
              }`}
              htmlFor="temperature-range"
              style={{ color: theme?.colors?.textSecondary }}
            >
              Temperature ({settings.temperature})
            </label>
            <Input
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
                darkMode ? "text-white/80" : "text-gray-700"
              }`}
              htmlFor="max-tokens-input"
              style={{ color: theme?.colors?.textSecondary }}
            >
              Max Tokens
            </label>
            <Input
              type="number"
              value={settings.maxTokens}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxTokens: parseInt(e.target.value),
                })
              }
              className={`w-full p-2 rounded-md ${
                darkMode
                  ? "bg-[#343541] text-white border-white/20"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
              id="max-tokens-input"
              style={{
                backgroundColor: theme?.colors?.backgroundAccent,
                color: theme?.colors?.textPrimary,
                borderColor: theme?.colors?.borderPrimary,
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="showTimestamp"
              checked={settings.showTimestamp}
              onChange={(e) =>
                setSettings({ ...settings, showTimestamp: e.target.checked })
              }
            />
            <label
              htmlFor="showTimestamp"
              className={darkMode ? "text-white/80" : "text-gray-700"}
              style={{ color: theme?.colors?.textSecondary }}
            >
              Show timestamps
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Input
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
              className={darkMode ? "text-white/80" : "text-gray-700"}
              style={{ color: theme?.colors?.textSecondary }}
            >
              Enable Markdown rendering
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            onClick={() => {
              localStorage.setItem("settings", JSON.stringify(settings));
              setShowSettings(false);
              toast.success("Settings saved!");
            }}
            variant="primary"
          >
            Save
          </Button>
          <Button onClick={() => setShowSettings(false)} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
