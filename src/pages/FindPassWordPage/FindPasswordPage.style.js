import styled from "styled-components";

export const Description = styled.p`
  font-size: 14px;
  text-align: center;
  color: #333;
  margin-bottom: 32px;
  line-height: 1.4;
`;

export const InputGroup = styled.div`
  display: flex;
  width: 80%;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
`;

export const SmallButton = styled.button`
  width: 60px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;