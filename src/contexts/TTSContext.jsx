// src/contexts/TTSContext.jsx
import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import { API_ENDPOINTS } from "../api/apiConfig"; // 1. apiConfig 임포트
import { postTTS } from "../api/ttsApi"; // 2. 새로 만든 ttsApi 임포트

const TTSContext = createContext();

export const TTSProvider = ({ children }) => {
  // 3. TTS 설정을 Context에서 상태로 관리
  const [settings, setSettings] = useState({
    voiceName: "female",
    pitch: 1.0,
    speakingRate: 1.0,
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // 4. <audio> 태그 대신 Audio 객체를 ref로 관리
  const audioRef = useRef(null);

  // 5. 설정 업데이트 함수 (SideMenu에서 사용)
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    console.log("TTS 설정이 업데이트되었습니다.", newSettings);
  };

  // 6. 재생 중지 함수 (Audio 객체 제어)
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src); // 7. 메모리 누수 방지 (Blob URL 해제)
      audioRef.current = null;
    }
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  // 8. speak 함수 (API 호출 로직)
  const speak = async (text, options = { type: 'main' }) => {
    stop(); // 기존 오디오 중지

    try {
      setIsSpeaking(true);
      setIsPaused(false);

      // 9. 옵션에 따라 URL 분기
      let url;
      if (options.type === 'cluster' && options.id) {
        url = API_ENDPOINTS.ttsCluster(options.id);
      } else {
        url = API_ENDPOINTS.ttsMain;
      }

      // 10. API 요청 본문 생성 (Context에 저장된 settings 사용)
      const body = {
        text,
        ...settings,
      };

      // 11. API 호출 및 오디오 URL 받기
      const audioUrl = await postTTS(url, body);

      // 12. Audio 객체로 재생
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.play();

      audio.onended = () => {
        stop(); // 재생이 끝나면 정리
      };
      audio.onerror = (e) => {
        console.error("오디오 재생 오류:", e);
        stop(); // 에러 시 정리
      };

    } catch (error) {
      console.error("TTS 생성 실패:", error);
      setIsSpeaking(false);
    }
  };

  // 13. 일시정지 함수 (Audio 객체 제어)
  const togglePause = () => {
    if (!audioRef.current) return;

    if (isPaused) {
      audioRef.current.play();
      setIsPaused(false);
    } else {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  return (
    <TTSContext.Provider
      value={{
        speak,
        togglePause,
        stop,
        isSpeaking,
        isPaused,
        settings, // 14. 설정과
        updateSettings, // 15. 설정 업데이트 함수를 Context로 제공
      }}
    >
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => useContext(TTSContext);