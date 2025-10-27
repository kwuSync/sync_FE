// src/components/common/EditProfileModal/EditProfileModal.jsx
import React, { useState } from "react";
import * as S from "../DeleteAccountModal/DeleteAccountModal.style"; // 1. 스타일 재사용
import InputGroup from "../Input/InputGroup";
import Button from "../Button/Button";
import { updateUser } from "../../../api/authApi"; // 2. API 임포트

/**
 * 회원 정보 수정 모달
 * @param {object} props
 * @param {boolean} props.isOpen - 모달이 열려있는지 여부
 * @param {Function} props.onClose - 닫기 버튼/배경 클릭 시 실행될 함수
 * @param {Function} props.onUpdateSuccess - (중요) 성공 시 부모에게 알릴 콜백
 */
const EditProfileModal = ({ isOpen, onClose, onUpdateSuccess }) => {
  // 3. SignupPage 및 API 참고 4개 상태
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  // 4. 에러 상태
  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");
  const [apiError, setApiError] = useState("");

  // 5. SignupPage에서 유효성 검사 함수 가져오기
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "현재 이메일을 입력해주세요.";
    if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
    return "";
  };
  const validateNickname = (nickname) => {
    if (!nickname) return "새 닉네임을 입력해주세요.";
    if (nickname.length < 2 || nickname.length > 10) return "닉네임은 2~10자여야 합니다.";
    return "";
  };
  const validatePassword = (pw) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    if (!pw) return "새 비밀번호를 입력해주세요.";
    if (!pwRegex.test(pw))
      return "8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.";
    return "";
  };
  const validatePasswordCheck = (pw, pwCheck) => {
    if (!pwCheck) return "비밀번호 확인을 입력해주세요.";
    if (pw !== pwCheck) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  const clearInputs = () => {
    setEmail("");
    setNickname("");
    setPw("");
    setPwCheck("");
    setEmailError("");
    setNicknameError("");
    setPwError("");
    setPwCheckError("");
    setApiError("");
  };

  const handleCancel = () => {
    clearInputs();
    onClose();
  };

  const handleUpdate = async () => {
    // 6. 전체 유효성 검사
    const emailErr = validateEmail(email);
    const nicknameErr = validateNickname(nickname);
    const pwErr = validatePassword(pw);
    const pwCheckErr = validatePasswordCheck(pw, pwCheck);

    setEmailError(emailErr);
    setNicknameError(nicknameErr);
    setPwError(pwErr);
    setPwCheckError(pwCheckErr);
    setApiError("");

    if (emailErr || nicknameErr || pwErr || pwCheckErr) {
      return;
    }

    try {
      // 7. API 호출
      await updateUser(email, nickname, pw, pwCheck);
      clearInputs();
      onUpdateSuccess("회원정보가 수정되었습니다."); // 부모 컴포넌트에 성공 알림
    } catch (err) {
      setApiError("정보 수정에 실패했습니다.\n입력한 이메일이 정확한지 확인해주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <S.Backdrop onClick={handleCancel} />
      <S.ModalWrapper>
        <S.Title>회원정보 수정</S.Title>
        <S.Description>
          정보 수정을 위해 현재 이메일과
          <br />
          새 닉네임, 새 비밀번호를 입력해주세요.
        </S.Description>
        <S.FormContainer>
          <InputGroup
            label="현재 이메일"
            id="update-email"
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <InputGroup
            label="새 닉네임"
            id="update-nickname"
            type="text"
            placeholder="닉네임 입력 (2~10자)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            error={nicknameError}
          />
          <InputGroup
            label="새 비밀번호"
            id="update-password"
            type="password"
            placeholder="비밀번호 입력"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            error={pwError}
          />
          <InputGroup
            label="새 비밀번호 확인"
            id="update-passwordCheck"
            type="password"
            placeholder="비밀번호 확인 입력"
            value={pwCheck}
            onChange={(e) => setPwCheck(e.target.value)}
            error={pwCheckError}
          />
          {apiError && <S.ErrorMessage>{apiError}</S.ErrorMessage>}
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
            onClick={handleUpdate}
            style={{
              height: "45px",
            }}
          >
            수정하기
          </Button>
        </S.ButtonWrapper>
      </S.ModalWrapper>
    </>
  );
};

export default EditProfileModal;