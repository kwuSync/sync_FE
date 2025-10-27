// src/pages/LoginPage/LoginPage.jsx
import React, { useState, useEffect } from "react";
import * as L from "../../components/common/AuthLayout/AuthLayout.style";
import * as S from "./LoginPage.style";
import Button from "../../components/common/Button/Button";
import InputGroup from "../../components/common/Input/InputGroup";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import tokenManager from "../../api/tokenManager"; 
// 1. InfoModal 임포트
import InfoModal from "../../components/common/InfoModal/InfoModal";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [notAllow, setNotAllow] = useState(true);

  // 2. 모달 상태 추가 (객체로 관리)
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    message: "",
    isError: false,
    onClose: () => {}, // 모달 닫기 시 실행할 콜백
  });

  // ... (validateEmail, validatePassword, handleEmail, handlePw, useEffect는 변경 없음) ...
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "이메일을 입력해주세요.";
    if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
    return "";
  };

  const validatePassword = (pw) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    if (!pw) return "비밀번호를 입력해주세요.";
    if (!pwRegex.test(pw))
      return "비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.";
    return "";
  };

  const handleEmail = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(validateEmail(val));
  };

  const handlePw = (e) => {
    const val = e.target.value;
    setPw(val);
    setPwError(validatePassword(val));
  };

  useEffect(() => {
    const isEmailValid = !validateEmail(email);
    const isPwValid = !validatePassword(pw);
    setNotAllow(!(isEmailValid && isPwValid));
  }, [email, pw]);


  // 3. handleLogin 함수 수정 (alert -> setModalInfo)
  const handleLogin = async () => {
    if (emailError || pwError || !email || !pw) {
      // 유효성 검사 실패 시 모달
      setModalInfo({
        isOpen: true,
        title: "입력 오류",
        message: "이메일과 비밀번호를 올바르게 입력해주세요.",
        isError: true,
        onClose: () => setModalInfo({ isOpen: false }),
      });
      return;
    }

    try {
      const response = await login(email, pw);
      console.log("로그인 성공 응답:", response);

      const { accessToken, refreshToken } = response.data; 

      if (accessToken && refreshToken) {
        tokenManager.setToken(accessToken);
        tokenManager.setRefreshToken(refreshToken);

        // 4. 로그인 성공 시 모달
        setModalInfo({
          isOpen: true,
          title: "로그인 성공! 🎉",
          message: "뉴스 페이지로 이동합니다.",
          isError: false,
          onClose: () => {
            setModalInfo({ isOpen: false });
            navigate("/news"); // 모달을 닫은 후 페이지 이동
          },
        });
      } else {
        throw new Error("로그인 응답에 토큰이 포함되지 않았습니다.");
      }

    } catch (error) {
      console.error("로그인 실패:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
                            ? error.response.data.message
                            : "로그인 실패.\n이메일 또는 비밀번호를 확인해주세요.";
      
      // 5. 로그인 실패(API) 시 모달
      setModalInfo({
        isOpen: true,
        title: "로그인 실패",
        message: errorMessage,
        isError: true,
        onClose: () => setModalInfo({ isOpen: false }),
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !notAllow) {
      handleLogin();
    }
  };

  return (
    <L.PageWrapper>
      {/* 6. 모달 컴포넌트 렌더링 */}
      <InfoModal
        isOpen={modalInfo.isOpen}
        title={modalInfo.title}
        message={modalInfo.message}
        isError={modalInfo.isError}
        onClose={modalInfo.onClose}
      />

      <L.Title>로그인</L.Title>
      <L.Container>
        {/* ... (InputGroup, Button, SubText 등 나머지 JSX) ... */}
        <InputGroup
          label="이메일"
          id="email"
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmail}
          error={emailError}
          onKeyDown={handleKeyPress}
        />

        <InputGroup
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호 입력"
          value={pw}
          onChange={handlePw}
          error={pwError}
          onKeyDown={handleKeyPress}
        />

        <Button onClick={handleLogin} disabled={notAllow}>
          로그인
        </Button>

        <S.SubText>
          <S.LinkText onClick={() => navigate("/signup")}>회원가입</S.LinkText>
          <br />
          <S.LinkText onClick={() => navigate("/find-password")}>
          비밀번호를 까먹으셨나요?
          </S.LinkText>
      </S.SubText>
      </L.Container>
    </L.PageWrapper>
  );
};

export default LoginPage;