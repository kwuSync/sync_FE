import React from 'react';
import * as S from './IntroPage.style';
import { useNavigate } from 'react-router-dom';
import NewsbotImg from '../../assets/images/newsbot.svg';
import Button from '../../components/common/Button/Button';

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Title>뉴스 3줄 요약 좀...</S.Title>
      <S.Illustration src={NewsbotImg} alt="뉴스봇 마스코트" />
      <Button onClick={() => navigate('/login')}>
        시작하기
      </Button>
    </S.Container>
  );
};

export default IntroPage;