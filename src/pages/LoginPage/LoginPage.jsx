// src/pages/LoginPage/LoginPage.jsx
import React, { useState, useEffect } from "react";
import * as L from "../../components/common/AuthLayout/AuthLayout.style";
import * as S from "./LoginPage.style";
import Button from "../../components/common/Button/Button";
import InputGroup from "../../components/common/Input/InputGroup";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
// ⬇️ 수정: tokenManger -> tokenManager (오타 수정)
import tokenManager from "../../api/tokenManager"; 
// ⬇️ 참고: axiosInstance는 이 파일에서 직접 사용되진 않네요. (authApi.js에서 사용)
import axiosInstance from "../../api/axiosInstance";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [notAllow, setNotAllow] = useState(true);

  // --- 유효성 검사 함수 (변경 없음) ---
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

  // --- ⬇️ 여기가 핵심 수정 사항입니다 ⬇️ ---
  const handleLogin = async () => {
    // 유효성 검사 최종 확인
    if (emailError || pwError || !email || !pw) {
      alert("이메일과 비밀번호를 올바르게 입력해주세요.");
      return;
    }

    try {
      // 1. authApi.js의 login 함수 호출
      // (login 함수가 { accessToken: '...', refreshToken: '...' } 객체를 반환한다고 가정)
      const response = await login(email, pw);
      console.log("로그인 성공 응답:", response);

      // 2. 응답 객체에서 토큰 추출
      // (만약 response.data.accessToken 형태라면 { accessToken, refreshToken } = response.data 로 수정 필요)
      const { accessToken, refreshToken } = response.data; 

      if (accessToken && refreshToken) {
        // 3. 토큰 매니저를 사용하여 토큰 저장
        tokenManager.setToken(accessToken);       // Access Token -> 메모리
        tokenManager.setRefreshToken(refreshToken); // Refresh Token -> 세션 스토리지

        // 4. 로그인 성공 처리
        alert("로그인 성공! 🎉");
        navigate("/news"); // 메인 뉴스 페이지로 이동
      } else {
        // API는 성공(200)했지만 응답에 토큰이 없는 비정상 케이스
        throw new Error("로그인 응답에 토큰이 포함되지 않았습니다.");
      }

    } catch (error) {
      console.error("로그인 실패:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
                            ? error.response.data.message
                            : "로그인 실패. 이메일 또는 비밀번호를 확인해주세요.";
      alert(errorMessage);
    }
  };
  // --- ⬆️ 수정 완료 ⬆️ ---

  return (
    <L.PageWrapper>
      <L.Title>로그인</L.Title>
      <L.Container>
        {/* ... (InputGroup 및 Button 등 JSX 코드는 변경 없음) ... */}
        <InputGroup
          label="이메일"
          id="email"
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmail}
          error={emailError}
        />

        <InputGroup
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호 입력"
          value={pw}
          onChange={handlePw}
          error={pwError}
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