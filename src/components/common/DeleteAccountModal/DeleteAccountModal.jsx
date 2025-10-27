// src/components/common/DeleteAccountModal/DeleteAccountModal.jsx
import React, { useState } from "react";
import * as S from "./DeleteAccountModal.style";
import { useNavigate } from "react-router-dom";
import InputGroup from "../Input/InputGroup"; 
import Button from "../Button/Button"; 
import { deleteUser } from "../../../api/authApi"; 
import tokenManager from "../../../api/tokenManager"; 

const DeleteAccountModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      await deleteUser(email, password); 
      alert("회원 탈퇴가 완료되었습니다.");

      tokenManager.clearToken(); 
      tokenManager.clearRefreshToken(); 

      onClose();
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("회원 탈퇴에 실패했습니다.\n이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <S.Backdrop onClick={handleCancel} />
      <S.ModalWrapper>
      
        <S.Title>회원 탈퇴</S.Title>
        <S.Description>
          회원 탈퇴를 위해 본인 확인이 필요합니다.
          <br />
          이메일과 비밀번호를 입력해주세요.
        </S.Description>
        <S.FormContainer>
          <InputGroup
            label="이메일"
            id="delete-email"
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup
            label="비밀번호"
            id="delete-password"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.FormContainer>
        <S.ButtonWrapper>
          <Button
            onClick={handleCancel}
            style={{
              backgroundColor: "#FAFAFA",
              color: "#333",
              border: "1px solid #ccc",
              height: "45px",
            }}
          >
            취소
          </Button>
          <Button
            onClick={handleConfirmDelete}
            style={{ 
              backgroundColor: "#e03131", 
              height: "45px" 
            }}
          >
            탈퇴하기
          </Button>
        </S.ButtonWrapper>
      </S.ModalWrapper>
    </>
  );
};

export default DeleteAccountModal;