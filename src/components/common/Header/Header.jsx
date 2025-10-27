// src/components/common/Header/Header.jsx
import React from 'react';
import * as S from './Header.style';
import { useTTS } from '../../../contexts/TTSContext';

/**
 * 공통 헤더 컴포넌트
 * @param {object} props
 * @param {string} [props.title="오늘의 뉴스"] - 헤더에 표시될 제목
 * @param {Function} props.onTTSClick - TTS 재생 버튼 클릭 시 실행될 함수
 */
const Header = ({ title = "오늘의 뉴스", onTTSClick, onTitleClick }) => {
  // TTS 상태 관리는 이 컴포넌트가 담당합니다.
  const { isSpeaking, isPaused, togglePause } = useTTS();

  const handleToggle = () => {
    if (isSpeaking) {
      // 이미 재생 중이면 일시정지/재개
      togglePause();
    } else if (onTTSClick) {
      // 재생 중이 아니면 부모로부터 받은 TTS 시작 함수 실행
      onTTSClick();
    }
  };

  return (
    <S.Header>
      <S.HeaderTitle 
        onClick={onTitleClick} 
        isClickable={!!onTitleClick}
      >
        {title}
      </S.HeaderTitle>
      <S.TTSButton onClick={handleToggle}>
        {isPaused ? "▶️" : isSpeaking ? "⏸️" : "📢"}
      </S.TTSButton>
    </S.Header>
  );
};

export default Header;