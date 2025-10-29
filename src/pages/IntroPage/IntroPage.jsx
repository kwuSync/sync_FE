import React from 'react';
import * as S from './IntroPage.style';
import { useNavigate } from 'react-router-dom';
import NewsbotImg from '../../assets/images/newsbot.svg';
import Button from '../../components/common/Button/Button';
import tokenManager from '../../api/tokenManager';

const IntroPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    const accessToken = tokenManager.getToken(); // 3. 메모리의 토큰 확인
    
    if (accessToken) {
      navigate('/news'); // 4. 토큰이 있으면 뉴스 페이지로
    } else {
      navigate('/login'); // 5. 토큰이 없으면 로그인 페이지로
    }
  };

  return (
    <S.Container>
      <S.Title>뉴스 3줄 요약 좀...</S.Title>
      <S.Illustration src={NewsbotImg} alt="뉴스봇 마스코트" />
      <Button onClick={handleStartClick} >
        시작하기
      </Button>
    </S.Container>
  );
};

export default IntroPage;