// src/components/common/Chatbot/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react'; // useRef, useEffect 추가
import * as S from './Chatbot.style';
import NewsbotImg from '../../../assets/images/newsbot.svg';
import { sendChatMessage } from '../../../api/chatApi'; // 1. 방금 만든 API 함수 임포트

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 2. 메시지 목록 상태 관리 (id, text, isUser 포함)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요! Sync 챗봇입니다.\n궁금한 것을 물어보세요.",
      isUser: false,
    },
  ]);
  // 3. 사용자 입력값 및 로딩 상태 관리
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 4. 채팅창 스크롤을 위한 ref
  const chatBodyRef = useRef(null);

  // 5. 메시지 목록이 업데이트될 때마다 맨 아래로 스크롤
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]); // isLoading 변경 시에도 (로딩 점...) 스크롤

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // 챗봇 창 열릴 때 초기 메시지 상태로 리셋 (선택 사항)
    // setMessages([messages[0]]); 
  };

  // 6. 메시지 전송 핸들러
  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return; // 입력값이 없거나 로딩 중이면 중지

    // a. 사용자의 메시지를 목록에 추가
    const userMessage = {
      id: messages.length + 1,
      text: trimmedInput,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // b. API로 메시지 전송
      const response = await sendChatMessage(trimmedInput);
      console.log('챗봇 응답:', response);
      
      // c. 봇의 응답을 목록에 추가
      const botMessage = {
        id: messages.length + 2,
        text: response.message, // API 응답에서 메시지 추출
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      // d. API 에러 발생 시 에러 메시지 추가
      const errorMessage = {
        id: messages.length + 2,
        text: "죄송합니다. 메시지 전송에 실패했습니다.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 7. Enter 키로 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Shift+Enter는 줄바꿈 (현재는 input이라 미적용)
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <S.ChatbotWrapper>
      {isOpen && (
        <S.ChatWindow>
          <S.ChatHeader>
            <S.ChatTitle>Sync 챗봇</S.ChatTitle>
            <S.HeaderCloseButton onClick={toggleChat}>&times;</S.HeaderCloseButton>
          </S.ChatHeader>

          {/* 8. 메시지 목록 렌더링 및 ref 연결 */}
          <S.ChatBody ref={chatBodyRef}>
            {messages.map((msg) => (
              <S.ChatMessage key={msg.id} isUser={msg.isUser}>
                {msg.text}
              </S.ChatMessage>
            ))}
            {/* 9. 로딩 중일 때 점 애니메이션 표시 */}
            {isLoading && (
              <S.ChatMessage isUser={false}>
                <S.LoadingDots>
                  <span>.</span><span>.</span><span>.</span>
                </S.LoadingDots>
              </S.ChatMessage>
            )}
          </S.ChatBody>

          {/* 10. 입력창 상태 및 이벤트 핸들러 연결 */}
          <S.ChatFooter>
            <S.ChatInput
              placeholder="메시지 입력..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <S.SendButton onClick={handleSend} disabled={isLoading}>
              {isLoading ? "..." : "전송"}
            </S.SendButton>
          </S.ChatFooter>
        </S.ChatWindow>
      )}

      {/* 챗봇 열기/닫기 버튼 */}
      <S.ChatButton onClick={toggleChat}>
        {isOpen ? (
          <S.CloseIcon>&times;</S.CloseIcon>
        ) : (
          <S.ChatButtonImg src={NewsbotImg} alt="챗봇 열기" />
        )}
      </S.ChatButton>
    </S.ChatbotWrapper>
  );
};

export default Chatbot;