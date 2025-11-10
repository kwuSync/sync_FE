// src/components/common/TTSSettingsModal/TTSSettingsModal.jsx
import React, { useState } from "react";
import * as S from "./TTSSettingsModal.style";
import Button from "../Button/Button";

/**
 * TTS 설정 모달
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {Function} props.onSave - 저장 버튼 클릭 시 (settings) => {}
 */
const TTSSettingsModal = ({ isOpen, onClose, onSave }) => {
  // voiceName 기본값을 "female"로 설정
  const [voiceName, setVoiceName] = useState("female");
  const [pitch, setPitch] = useState(1.0);
  const [speakingRate, setSpeakingRate] = useState(1.0);

  const handleSave = () => {
    onSave({
      voiceName,
      pitch: parseFloat(pitch),
      speakingRate: parseFloat(speakingRate),
    });
    onClose(); // 1. 저장 후 모달을 닫도록 onClose() 호출 추가
  };

  if (!isOpen) return null;

  return (
    <>
      <S.Backdrop onClick={onClose} />
      <S.ModalWrapper>
        <S.Title>TTS 설정</S.Title>

        <S.FormContainer>
          {/* --- 1. 목소리 선택 (female/male) --- */}
          <S.FormGroup>
            <S.Label htmlFor="tts-voice">목소리</S.Label>
            <S.Select
              id="tts-voice"
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
            >
              <option value="female">여성</option>
              <option value="male">남성</option>
            </S.Select>
          </S.FormGroup>

          {/* --- 2. 음성 속도 --- */}
          <S.FormGroup>
            <S.Label htmlFor="tts-rate">음성 속도</S.Label>
            <S.SliderWrapper>
              <S.Slider
                id="tts-rate"
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={speakingRate}
                onChange={(e) => setSpeakingRate(e.target.value)}
              />
              <S.SliderValue>{speakingRate}x</S.SliderValue>
            </S.SliderWrapper>
          </S.FormGroup>

          {/* --- 3. 음성 톤 --- */}
          <S.FormGroup>
            <S.Label htmlFor="tts-pitch">음성 톤 (Pitch)</S.Label>
            <S.SliderWrapper>
              <S.Slider
                id="tts-pitch"
                type="range"
                min="0.0"
                max="2.0"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
              />
              <S.SliderValue>{pitch}</S.SliderValue>
            </S.SliderWrapper>
          </S.FormGroup>
        </S.FormContainer>

        <S.ButtonWrapper>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "#FAFAFA",
              color: "#333",
              border: "1px solid #ccc",
              height: "45px",
            }}
          >
            취소
          </Button>
          <Button
            onClick={handleSave} // 2. 수정된 핸들러 연결
            style={{
              height: "45px",
            }}
          >
            저장하기
          </Button>
        </S.ButtonWrapper>
      </S.ModalWrapper>
    </>
  );
};

export default TTSSettingsModal;