// src/pages/LoginPage/LoginPage.jsx
import React, { useState, useEffect } from "react";
import * as L from "../../components/common/AuthLayout/AuthLayout.style";
import * as S from "./LoginPage.style";
import Button from "../../components/common/Button/Button";
import InputGroup from "../../components/common/Input/InputGroup";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi"; // 변경된 login 함수 임포트

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [notAllow, setNotAllow] = useState(true);

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

  const handleLogin = async () => {
    // 유효성 검사 최종 확인
    if (emailError || pwError || !email || !pw) {
        alert("이메일과 비밀번호를 올바르게 입력해주세요.");
        return;
    }

    try {
      const response = await login(email, pw);
      console.log("로그인 성공:", response);
      alert("로그인 성공! 🎉");
      navigate("/news");
    } catch (error) {
      console.error("로그인 실패:", error);
      // 서버에서 전달하는 구체적인 에러 메시지가 있다면 활용
      const errorMessage = error.response && error.response.data && error.response.data.message
                           ? error.response.data.message
                           : "로그인 실패. 이메일 또는 비밀번호를 확인해주세요.";
      alert(errorMessage);
    }
  };

  return (
    <L.PageWrapper>
      <L.Title>로그인</L.Title>
      <L.Container>
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