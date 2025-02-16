import React, { useState, useEffect } from "react";
import { useTheme } from '@/app/context/ThemeContext'; // Import useTheme

export default function VoiceInputOutput({ onVoiceInput }) {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const { colors } = useTheme(); // Use ThemeContext

    let recognition;
    if (typeof window !== "undefined" && window.SpeechRecognition) {
        recognition = new window.SpeechRecognition();
    } else if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
        recognition = new window.webkitSpeechRecognition();
    }

    useEffect(() => {
        if (!recognition) return;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            const lastResult = event.results[event.results.length - 1][0].transcript;
            setTranscript(lastResult);
            onVoiceInput(lastResult);
            setListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setListening(false);
        };
    }, [recognition]);

    const startListening = () => {
        if (recognition) {
            setListening(true);
            recognition.start();
        }
    };

    const speakText = (text) => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="flex flex-col items-center p-2" style={{ backgroundColor: colors.backgroundPrimary, color: colors.textPrimary }}>
            <button
                onClick={startListening}
                className={`px-4 py-2 rounded-md`}
                style={{
                    backgroundColor: colors.primary,
                    color: colors.backgroundPrimary,
                    '&:hover': { backgroundColor: colors.primaryHover }
                }}
            >
                {listening ? "Listening..." : "Start Voice Input"}
            </button>
            {transcript && (
                <div className="mt-2">
                    <p className={``} style={{ color: colors.textPrimary }}>Transcript: {transcript}</p>
                    <button
                        onClick={() => speakText(transcript)}
                        className="mt-1 px-3 py-1 rounded-md"
                        style={{ backgroundColor: colors.secondary, color: colors.backgroundPrimary }}
                    >
                        Listen Back
                    </button>
                </div>
            )}
        </div>
    );
}