import styled from "styled-components";



export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  label {
    font-size: 14px;
    color: #0b1f3a;
    margin-bottom: 4px;
  }
`;

export const Input = styled.input`
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const ErrorMessage = styled.div`
  font-size: 13px;
  color: red;
  margin-top: -8px;
  margin-bottom: 4px;
`;

export const SubText = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};;;
`;

export const LinkText = styled.span`
  color: ${({ theme }) => theme.colors.primary};;;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 8px;
  display: inline-block;

  &:hover {
    color: #3366cc;
  }
`;
