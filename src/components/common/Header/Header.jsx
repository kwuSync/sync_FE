// src/components/common/Header/Header.jsx
import React from 'react';
import * as S from './Header.style';
import { useTTS } from '../../../contexts/TTSContext';

/**
 * 공통 헤더 컴포넌트
 * @param {object} props
 * @param {string} [props.title="오늘의 뉴스"] - 헤더에 표시될 제목
 * @param {Function} props.onTTSClick - TTS 재생 버튼 클릭 시 실행될 함수
 * @param {Function} [props.onTitleClick] - (New!) 타이틀 클릭 시 실행될 함수
 */
const Header = ({ title = "오늘의 뉴스", onTTSClick, onTitleClick }) => {
  const { isSpeaking, isPaused, togglePause } = useTTS();

  const handleToggle = () => {
    if (isSpeaking) {
      togglePause();
    } else if (onTTSClick) {
      onTTSClick();
    }
  };

  // ⬇️ 수정된 부분: 타이틀 클릭 핸들러 및 isClickable prop 전달
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