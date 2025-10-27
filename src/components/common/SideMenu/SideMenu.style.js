// src/components/common/SideMenu/SideMenu.style.js
import styled, { css } from "styled-components";

// 뒷배경
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

// 모달
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: -300px; /* A-닫힌 상태 (화면 밖) */
  width: 250px; /* B-모달 너비 */
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  transition: right 0.3s ease-in-out;
  padding: 24px;
  padding-top: 80px; /* 헤더 높이만큼 여유 */

  /* C-열렸을 때 */
  ${({ isOpen }) =>
    isOpen &&
    css`
      right: 0; /* A'->B' 열린 상태 (화면 안) */
    `}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

export const MenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MenuItem = styled.li`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;