// components/common/SettingsModal.jsx
import React from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/Button"; // Assuming Button component is in "@/components/ui"
import { Dropdown } from "@/components/ui/Dropdown"; // Assuming Dropdown component is in "@/components/ui"
import { Input } from "@/components/ui/Input"; // Assuming Input component is in "@/components/ui"

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
                            htmlFor="model-select"
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
                                isDarkMode
                                    ? "bg-[#343541] text-white border-white/20"
                                    : "bg-white text-gray-900 border-gray-300"
                            }`}
                        />
                    </div>
                    <div>
                        <label
                            className={`block mb-2 ${
                                isDarkMode ? "text-white/80" : "text-gray-700"
                            }`}
                            htmlFor="temperature-range"
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
                            id="temperature-range"
                        />
                    </div>
                    <div>
                        <label
                            className={`block mb-2 ${
                                isDarkMode ? "text-white/80" : "text-gray-700"
                            }`}
                            htmlFor="max-tokens-input"
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
                                isDarkMode
                                    ? "bg-[#343541] text-white border-white/20"
                                    : "bg-white text-gray-900 border-gray-300"
                            }`}
                            id="max-tokens-input"
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
                            className={isDarkMode ? "text-white/80" : "text-gray-700"}
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
                            className={isDarkMode ? "text-white/80" : "text-gray-700"}
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
                    <Button
                        onClick={() => setShowSettings(false)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}