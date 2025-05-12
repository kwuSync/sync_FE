import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 16px;
  gap: 36px;
`;

export const Title = styled.h1`
  font-size: 34px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 32px;
  font-weight: 700;
`;

export const Illustration = styled.img`
  width: 260px;
  height: auto;
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: 32px;
`;

export const StartButton = styled.button`
  width: 180px;
  height: 65px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #FAFAFA;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Noto Sans KR', sans-serif;
  border: none;
  border-radius: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
