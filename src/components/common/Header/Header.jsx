// src/components/common/Header/Header.jsx
import React, { useState } from 'react'; // 1. useState 임포트
import * as S from './Header.style';
import { useTTS } from '../../../contexts/TTSContext';
import SideMenu from '../SideMenu/SideMenu'; // 2. SideMenu 임포트

/**
 * 공통 헤더 컴포넌트
 * @param {object} props
 * @param {string} [props.title="오늘의 뉴스"] - 헤더에 표시될 제목
 * @param {Function} props.onTTSClick - TTS 재생 버튼 클릭 시 실행될 함수
 * @param {Function} [props.onTitleClick] - (New!) 타이틀 클릭 시 실행될 함수
 */
const Header = ({ title = "오늘의 뉴스", onTTSClick, onTitleClick }) => {
  const { isSpeaking, isPaused, togglePause } = useTTS();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 3. 사이드 메뉴 상태 추가

  const handleToggle = () => {
    if (isSpeaking) {
      togglePause();
    } else if (onTTSClick) {
      onTTSClick();
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // 4. 햄버거 메뉴 토글 함수
  };

  return (
    // 5. SideMenu 컴포넌트 렌더링
    <>
      <S.Header>
        <S.HeaderTitle 
          onClick={onTitleClick} 
          isClickable={!!onTitleClick}
        >
          {title}
        </S.HeaderTitle>
        
        {/* 6. TTS와 햄버거 버튼을 Wrapper로 묶음 */}
        <S.ButtonWrapper>
          <S.TTSButton onClick={handleToggle}>
            {isPaused ? "▶️" : isSpeaking ? "⏸️" : "📢"}
          </S.TTSButton>

          <S.HamburgerButton onClick={handleMenuToggle}>
            ☰
          </S.HamburgerButton>
        </S.ButtonWrapper>

      </S.Header>

      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
};

export default Header;