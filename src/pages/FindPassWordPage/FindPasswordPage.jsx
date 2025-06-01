import React, { useState } from "react";
import * as S from "./FindPasswordPage.style";
import * as L from "../../components/common/AuthLayout/AuthLayout.style";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";


const FindPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const navigate = useNavigate();

  const handleSendCode = () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    // TODO: 이메일로 인증번호 전송 로직
    alert("인증번호가 전송되었습니다.");
    setIsCodeSent(true);
  };

  const handleVerifyCode = () => {
    if (code === "123456") {
      alert("인증 완료!");
      setIsCodeVerified(true);
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const handleNext = () => {
    if (isCodeVerified) {
      alert("다음 단계로 이동 (비밀번호 재설정)");
      // 예: navigate("/reset-password")
    } else {
      alert("이메일 인증을 먼저 완료해주세요.");
    }
  };

  return (
    <L.PageWrapper>
      <L.Title>비밀번호 찾기</L.Title>
      <S.Description>
        비밀번호를 찾고자 하는 이메일을 입력 후 <br /> 전송 버튼을 눌러주세요
      </S.Description>

      <S.InputGroup>
        <S.Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <S.SmallButton type="button" onClick={handleSendCode}>
          전송
        </S.SmallButton>
      </S.InputGroup>

      <S.InputGroup>
        <S.Input
          type="text"
          placeholder="인증번호 확인"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={!isCodeSent}
        />
        <S.SmallButton type="button" onClick={handleVerifyCode}>
          확인
        </S.SmallButton>
      </S.InputGroup>

      <S.ButtonWrapper>
        <Button onClick={() => navigate("/login")}>다음</Button>
      </S.ButtonWrapper>
    </L.PageWrapper>
  );
};

export default FindPasswordPage;
