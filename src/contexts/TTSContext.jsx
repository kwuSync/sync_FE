import React, { createContext, useContext, useState } from "react";

const TTSContext = createContext();

export const TTSProvider = ({ children }) => {
  const [utterance, setUtterance] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speak = (text) => {
    if (utterance) {
      window.speechSynthesis.cancel(); // 기존 음성 취소
    }

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.lang = "ko-KR";

    newUtterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setUtterance(null);
    };

    window.speechSynthesis.speak(newUtterance);
    setUtterance(newUtterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    if (!utterance) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setUtterance(null);
  };

  return (
    <TTSContext.Provider value={{ speak, togglePause, stop, isSpeaking, isPaused }}>
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => useContext(TTSContext);