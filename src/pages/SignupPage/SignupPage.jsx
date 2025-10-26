// src/pages/SignupPage/SignupPage.jsx
import React, { useState, useEffect } from "react";
import * as L from "../../components/common/AuthLayout/AuthLayout.style";
import * as S from "./SignupPage.style"; // SignupPage.style에서 ErrorMessage를 임포트한다고 가정
import InputGroup from "../../components/common/Input/InputGroup";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import { signup, sendVerificationCode, verifyCode } from "../../api/authApi"; // API 함수 임포트

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(""); // 인증번호는 문자열로 받지만, API 전송 시 숫자로 변환
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState(""); // 인증번호 오류 메시지 추가
  const [pwError, setPwError] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  // 새로운 메시지 상태 추가 (alert 대체)
  const [signupMessage, setSignupMessage] = useState(""); // 회원가입 성공/실패 메시지
  const [verificationMessage, setVerificationMessage] = useState(""); // 인증번호 전송/확인 메시지

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  // 모든 메시지 상태 초기화 함수
  const clearMessages = () => {
    setEmailError("");
    setCodeError("");
    setPwError("");
    setPwCheckError("");
    setNicknameError("");
    setSignupMessage("");
    setVerificationMessage("");
  };

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

  const validateNickname = (nickname) => {
    if (!nickname) return "닉네임을 입력해주세요.";
    if (nickname.length < 2 || nickname.length > 10) return "닉네임은 2~10자여야 합니다.";
    return "";
  };

  // 이메일 인증번호 전송 핸들러
  const handleSendCode = async () => {
    clearMessages(); // 모든 메시지 초기화

    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    try {
      await sendVerificationCode(email);
      setVerificationMessage("인증번호가 이메일로 전송되었습니다.");
      setIsCodeSent(true);
    } catch (error) {
      console.error("인증번호 전송 실패:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
                           ? error.response.data.message
                           : "인증번호 전송에 실패했습니다. 이메일을 확인해주세요.";
      setVerificationMessage(`오류: ${errorMessage}`);
    }
  };

  // 이메일 인증번호 확인 핸들러
  const handleVerifyCode = async () => {
    clearMessages(); // 모든 메시지 초기화

    if (!code) {
        setCodeError("인증번호를 입력해주세요.");
        return;
    }

    try {
      const response = await verifyCode(email, code);
      console.log("인증번호 확인 응답:", response);
      if (response.data === true) {
        setVerificationMessage("이메일 인증이 완료되었습니다!");
        setIsCodeVerified(true);
      } else {
        setVerificationMessage("오류: 인증번호가 올바르지 않습니다.");
        setIsCodeVerified(false);
      }
    } catch (error) {
      console.error("인증번호 확인 실패:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
                           ? error.response.data.message
                           : "인증번호 확인에 실패했습니다. 다시 시도해주세요.";
      setVerificationMessage(`오류: ${errorMessage}`);
      setIsCodeVerified(false);
    }
  };

  // 최종 회원가입 제출 핸들러
  const handleSubmit = async () => {
    clearMessages(); // 모든 메시지 초기화

    // 최종 유효성 검사 (모든 필드와 약관 동의)
    const emailErr = validateEmail(email);
    const nicknameErr = validateNickname(nickname);
    const pwErr = validatePassword(pw);
    const pwCheckErr = validatePasswordCheck(pw, pwCheck);

    setEmailError(emailErr);
    setNicknameError(nicknameErr);
    setPwError(pwErr);
    setPwCheckError(pwCheckErr);

    if (emailErr || nicknameErr || pwErr || pwCheckErr || !isCodeVerified || !agreeTerms) {
        setSignupMessage("필수 정보를 올바르게 입력하고 이메일 인증 및 약관에 동의해주세요.");
        return;
    }

    try {
      await signup(nickname, email, pw, pwCheck, code);
      setSignupMessage("회원가입이 성공적으로 완료되었습니다!");
      // 성공 후 2-3초 뒤에 로그인 페이지로 이동 (UX 개선)
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("회원가입 실패:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
                           ? error.response.data.message
                           : "회원가입에 실패했습니다. 다시 시도해주세요.";
      setSignupMessage(`오류: ${errorMessage}`);
    }
  };

  useEffect(() => {
    const validEmail = !validateEmail(email);
    const validNickname = !validateNickname(nickname);
    const validPw = !validatePassword(pw);
    const validPwCheck = !validatePasswordCheck(pw, pwCheck);
    const validAgree = agreeTerms;

    setNotAllow(!(isCodeVerified && validEmail && validNickname && validPw && validPwCheck && validAgree));
  }, [email, nickname, pw, pwCheck, agreeTerms, isCodeVerified]);

  return (
    <L.PageWrapper>
      <L.Title>회원가입</L.Title>
      <L.Container>
        {/* 닉네임 입력 영역 */}
        <InputGroup
          label="닉네임"
          id="nickname"
          type="text"
          placeholder="닉네임 입력 (2~10자)"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setNicknameError(validateNickname(e.target.value));
          }}
          error={nicknameError}
        />

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
              disabled={isCodeSent && !isCodeVerified} // 인증번호 전송 후, 인증 완료 전까지 이메일 수정 불가
            />
            <S.SmallButton onClick={handleSendCode} disabled={isCodeSent || !!emailError || !email}>
              전송
            </S.SmallButton>
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
              disabled={!isCodeSent || isCodeVerified}
            />
            <S.SmallButton onClick={handleVerifyCode} disabled={!isCodeSent || isCodeVerified || !code}>
              확인
            </S.SmallButton>
          </S.InputGroup>
          {codeError && <S.ErrorMessage>{codeError}</S.ErrorMessage>}
          {verificationMessage && !codeError && <S.ErrorMessage isSuccess={verificationMessage.includes("완료")}>{verificationMessage}</S.ErrorMessage>} {/* 성공 메시지 스타일을 위한 isSuccess prop 추가 */}
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
          {signupMessage && <S.ErrorMessage isSuccess={signupMessage.includes("성공적으로")}>{signupMessage}</S.ErrorMessage>}
        </S.ButtonWrapper>
      </L.Container>
    </L.PageWrapper>
  );
};

export default SignupPage;