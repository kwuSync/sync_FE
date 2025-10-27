// src/components/common/Header/Header.style.js
import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 1. space-between으로 변경 */
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  z-index: 999;
`;

export const HeaderTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  
  /* ⬇️ 수정된 부분: 클릭 가능할 때만 커서 변경 */
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;

// 2. 기존 TTSButton에서 margin-left: auto 제거
export const TTSButton = styled.button`
  /* margin-left: auto; <- 제거 */
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f4f4f4;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

// 3. 햄버거 버튼 아이콘 추가
export const HamburgerButton = styled.button`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  margin-left: 16px; /* TTS 버튼과의 간격 */
`;

// 4. 버튼들을 묶을 Wrapper 추가 (TTS + 햄버거)
export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;