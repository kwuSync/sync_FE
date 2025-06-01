import styled from "styled-components";

export const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 100px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Container = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
