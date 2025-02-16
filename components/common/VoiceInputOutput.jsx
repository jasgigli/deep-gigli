// components/common/VoiceInputOutput.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button"; // Assuming Button component is in "@/components/ui"

export default function VoiceInputOutput({ isDarkMode, onVoiceInput }) {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");

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
    }, [recognition, onVoiceInput]);

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
        <div className="flex flex-col items-center p-2">
            <Button
                onClick={startListening}
                variant="primary"
                disabled={listening}
            >
                {listening ? "Listening..." : "Start Voice Input"}
            </Button>
            {transcript && (
                <div className="mt-2">
                    <p className={isDarkMode ? "text-white" : "text-gray-900"}>Transcript: {transcript}</p>
                    <Button
                        onClick={() => speakText(transcript)}
                        variant="secondary"
                        className="mt-1"
                    >
                        Listen Back
                    </Button>
                </div>
            )}
        </div>
    );
}