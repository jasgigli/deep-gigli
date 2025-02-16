import React from "react";
import { toast } from "react-hot-toast";
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme

export default function SettingsModal({
    settings,
    setSettings,
    setShowSettings,
}) {
    const { colors } = useTheme(); // Use ThemeContext

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                className={`w-full max-w-md p-6 rounded-lg`}
                style={{ backgroundColor: colors.backgroundSecondary }}
            >
                <h2
                    className={`text-xl font-bold mb-4`}
                    style={{ color: colors.textPrimary }}
                >
                    Settings
                </h2>
                <div className="space-y-4">
                    <div>
                        <label
                            className={`block mb-2`}
                            style={{ color: colors.textSecondary }}
                        >
                            Model
                        </label>
                        <select
                            value={settings.model}
                            onChange={(e) =>
                                setSettings({ ...settings, model: e.target.value })
                            }
                            className={`w-full p-2 rounded-md`}
                            style={{
                                backgroundColor: colors.backgroundPrimary,
                                color: colors.textPrimary,
                                borderColor: colors.borderSecondary,
                            }}
                        >
                            <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                        </select>
                    </div>
                    <div>
                        <label
                            className={`block mb-2`}
                            style={{ color: colors.textSecondary }}
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
                            className={`block mb-2`}
                            style={{ color: colors.textSecondary }}
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
                            className={`w-full p-2 rounded-md`}
                            style={{
                                backgroundColor: colors.backgroundPrimary,
                                color: colors.textPrimary,
                                borderColor: colors.borderSecondary,
                            }}
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
                            className={``}
                            style={{ color: colors.textSecondary }}
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
                            className={``}
                            style={{ color: colors.textSecondary }}
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
                        className={`px-4 py-2 rounded-md`}
                        style={{
                            backgroundColor: colors.backgroundAccent,
                            color: colors.textPrimary,
                            '&:hover': { backgroundColor: colors.backgroundAccentHover }
                        }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setShowSettings(false)}
                        className={`px-4 py-2 rounded-md`}
                        style={{
                            backgroundColor: colors.backgroundAccent,
                            color: colors.textPrimary,
                            '&:hover': { backgroundColor: colors.backgroundAccentHover }
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}