// components/common/ToolSelector.jsx
import React from "react";
import { Dropdown } from "@/components/ui/Dropdown"; // Assuming Dropdown component is in "@/components/ui"

export default function ToolSelector({ selectedTool, setSelectedTool }) {
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