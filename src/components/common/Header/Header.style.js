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

export const TTSButton = styled.button`
  margin-left: auto;
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