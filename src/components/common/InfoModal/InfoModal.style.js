// src/components/common/InfoModal/InfoModal.style.js
import styled from "styled-components";

// 뒷배경
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3000;
`;

// 모달 본체
export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  z-index: 3001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme, isError }) => (isError ? theme.colors.danger : theme.colors.primary)};
  margin-bottom: 12px;
`;

export const Message = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 24px;
  text-align: center;
  white-space: pre-line; /* \n 줄바꿈 지원 */
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;