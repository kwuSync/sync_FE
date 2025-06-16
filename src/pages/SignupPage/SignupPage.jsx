import React, { useState, useEffect } from "react";
import * as L from "../../components/common/AuthLayout/AuthLayout.style";
import * as S from "./SignupPage.style";
import InputGroup from "../../components/common/Input/InputGroup";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "이메일을 입력해주세요.";
    if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
    return "";
  };

  const validatePassword = (pw) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    if (!pw) return "비밀번호를 입력해주세요.";
    if (!pwRegex.test(pw))
      return "8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.";
    return "";
  };

  const validatePasswordCheck = (pw, pwCheck) => {
    if (!pwCheck) return "비밀번호 확인을 입력해주세요.";
    if (pw !== pwCheck) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  const handleSendCode = () => {
    if (validateEmail(email)) {
      setEmailError(validateEmail(email));
      return;
    }
    alert("인증번호가 전송되었습니다.");
    setIsCodeSent(true);
  };

  const handleVerifyCode = () => {
    if (code === "5026") {
      alert("인증 완료!");
      setIsCodeVerified(true);
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const handleSubmit = () => {
    alert("회원가입 성공!");
    navigate("/login");
  };

  useEffect(() => {
    const validPw = !validatePassword(pw);
    const validPwCheck = !validatePasswordCheck(pw, pwCheck);
    const validAgree = agreeTerms;

    setNotAllow(!(isCodeVerified && validPw && validPwCheck && validAgree));
  }, [pw, pwCheck, agreeTerms, isCodeVerified]);

  return (
    <L.PageWrapper>
      <L.Title>회원가입</L.Title>
      <L.Container>
        {/* 이메일 인증 영역 */}
        <S.GroupWrapper>
          <S.Label htmlFor="email">이메일</S.Label>
          <S.InputGroup>
            <S.Input
              id="email"
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(validateEmail(e.target.value));
              }}
            />
            <S.SmallButton onClick={handleSendCode}>전송</S.SmallButton>
          </S.InputGroup>
          {emailError && <S.ErrorMessage>{emailError}</S.ErrorMessage>}
        </S.GroupWrapper>

        <S.GroupWrapper>
          <S.Label htmlFor="code">인증번호</S.Label>
          <S.InputGroup>
            <S.Input
              id="code"
              type="text"
              placeholder="인증번호 입력"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={!isCodeSent}
            />
            <S.SmallButton onClick={handleVerifyCode}>확인</S.SmallButton>
          </S.InputGroup>
      </S.GroupWrapper>

        {/* 비밀번호 입력 영역 */}
        <InputGroup
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호 입력"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setPwError(validatePassword(e.target.value));
          }}
          error={pwError}
        />

        <InputGroup
          label="비밀번호 검증"
          id="passwordCheck"
          type="password"
          placeholder="비밀번호 확인 입력"
          value={pwCheck}
          onChange={(e) => {
            setPwCheck(e.target.value);
            setPwCheckError(validatePasswordCheck(pw, e.target.value));
          }}
          error={pwCheckError}
        />

        {/* 약관 동의 */}
        <S.CheckboxContainer>
          <label>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span> ‘본 서비스의 이용약관과 개인정보 정책에 동의합니다’</span>
          </label>

          <label>
            <input
              type="checkbox"
              checked={agreeMarketing}
              onChange={(e) => setAgreeMarketing(e.target.checked)}
            />
            <span> ‘마케팅 정보 수신에 동의합니다’</span>
          </label>
        </S.CheckboxContainer>

        {/* 회원가입 버튼 */}
        <S.ButtonWrapper>
          <Button onClick={handleSubmit} disabled={notAllow}>
            회원가입
          </Button>
        </S.ButtonWrapper>
      </L.Container>
    </L.PageWrapper>
  );
};

export default SignupPage;