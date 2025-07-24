"use client";

// _components/common/VoiceInputOutput.jsx
import { Button } from "@/app/_components/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export default function VoiceInputOutput({ onVoiceInput }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { theme, colors } = useTheme();

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
      <Button onClick={startListening} variant="primary" disabled={listening}>
        {listening ? "Listening..." : "Start Voice Input"}
      </Button>
      {transcript && (
        <div className="mt-2">
          <p style={{ color: theme?.colors?.textPrimary }}>
            Transcript: {transcript}
          </p>
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
