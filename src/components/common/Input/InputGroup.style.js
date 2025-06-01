import styled from "styled-components";

export const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 15px;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 4px;
`;

export const Input = styled.input`
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0b1f3a;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 13px;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 4px;
`;
