import styled from 'styled-components';

export const ButtonWrapper = styled.button`
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