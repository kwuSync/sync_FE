// src/components/common/InfoModal/InfoModal.jsx
import React, { useEffect } from "react";
import * as S from "./InfoModal.style";
import Button from "../Button/Button";

/**
 * 단순 알림용 공용 모달 (확인 버튼만 있음)
 * @param {object} props
 * @param {boolean} props.isOpen - 모달이 열려있는지 여부
 * @param {Function} props.onClose - 닫기 버튼/배경 클릭 시 실행될 함수
 * @param {string} props.title - 모달의 제목 (예: "로그인 성공")
 * @param {string} [props.message] - (Optional) 모달의 상세 내용 (줄바꿈 \n 지원)
 * @param {boolean} [props.isError] - (Optional) true일 경우 제목을 빨간색으로 표시
 */
const InfoModal = ({ isOpen, onClose, title, message, isError = false }) => {
  
  // 2. useEffect 훅 추가
  useEffect(() => {
    // 3. 모달이 열려있을 때만 이벤트 리스너 등록
    if (isOpen) {
      const handleKeyDown = (e) => {
        // 4. Enter 키가 눌리면 onClose 함수 실행
        if (e.key === 'Enter') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      // 5. 컴포넌트가 닫히거나, unmount 될 때 이벤트 리스너 제거 (중요)
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]); // 6. isOpen 또는 onClose가 변경될 때마다 훅 실행

  if (!isOpen) return null;

  return (
    <>
      <S.Backdrop onClick={onClose} />
      <S.ModalWrapper>
        <S.Title isError={isError}>{title}</S.Title>
        {message && <S.Message>{message}</S.Message>}
        <S.ButtonWrapper>
          <Button
            onClick={onClose}
            style={{
              width: "120px",
              height: "45px",
              backgroundColor: isError ? "#e03131" : "#1A2B4C",
            }}
          >
            확인
          </Button>
        </S.ButtonWrapper>
      </S.ModalWrapper>
    </>
  );
};

export default InfoModal;