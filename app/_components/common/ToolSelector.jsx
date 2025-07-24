"use client";

// _components/common/ToolSelector.jsx
import { Dropdown } from "@/app/_components/ui/Dropdown";
import { useTheme } from "@/context/ThemeContext";

export default function ToolSelector({ selectedTool, setSelectedTool }) {
  const { theme, colors } = useTheme();
  return (
    <div className="mb-4">
      <Dropdown
        value={selectedTool}
        onChange={(e) => setSelectedTool(e.target.value)}
        options={[
          { value: "chat", label: "Chat" },
          { value: "summarize", label: "Summarize" },
          { value: "translate", label: "Translate" },
        ]}
        className="w-full"
      />
    </div>
  );
}
