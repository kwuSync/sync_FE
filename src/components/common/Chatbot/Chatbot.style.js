// src/components/common/Chatbot/Chatbot.style.js
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- (ChatbotWrapper, ChatButton, ChatButtonImg, CloseIcon, ChatWindow, ChatHeader, ChatTitle, HeaderCloseButton, ChatBody, ChatMessage, ChatFooter는 이전과 동일) ---

export const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000; /* 헤더(999)보다 높게 설정 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ChatButtonImg = styled.img`
  width: 55%;
  height: 55%;
`;

export const CloseIcon = styled.span`
  font-size: 32px;
  color: white;
  font-weight: 300;
  line-height: 1;
`;

export const ChatWindow = styled.div`
  margin-bottom: 12px; 
  width: 350px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ChatHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

export const HeaderCloseButton = styled.button`
  font-size: 28px;
  font-weight: 400;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ChatMessage = styled.div`
  padding: 10px 14px;
  border-radius: 18px;
  max-width: 80%;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-line;

  ${({ isUser }) =>
    isUser
      ? `
    background-color: #e6e6e6;
    color: #333;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  `
      : `
    background-color: ${'#1A2B4C'};
    color: white;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  `}
`;

export const ChatFooter = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 8px;
  background-color: #fff;
`;


// --- ⬇️ (수정) ChatInput, SendButton 스타일 ⬇️ ---

export const ChatInput = styled.input`
  flex: 1;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0 16px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  /* 비활성화 시 스타일 */
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const SendButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  padding: 0 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 60px; /* 로딩 중 '...'일 때 너비 고정 */
  text-align: center;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  /* 비활성화 시 스타일 */
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// --- ⬇️ (추가) 로딩 애니메이션 ⬇️ ---

// 로딩 중 ... 애니메이션
const dotFlashing = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

export const LoadingDots = styled.div`
  span {
    animation: ${dotFlashing} 1.4s infinite linear;
    animation-fill-mode: both;
    font-size: 20px;
    line-height: 1;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;