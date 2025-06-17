// src/pages/SignupPage/SignupPage.style.js
import styled from "styled-components";

export const CheckboxContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    font-size: 14px;
    color: #0b1f3a;
    display: flex;
    align-items: center;

    input {
      margin-right: 8px;
    }
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column; /* 추가: 버튼과 메시지를 세로로 정렬 */
  align-items: center; /* 추가: 가로 중앙 정렬 */
`;

export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Input = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:disabled {
    background-color: #e1e1e1; 
    color: #333; 
    opacity: 1; 
    cursor: not-allowed;
  }
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

export const ErrorMessage = styled.div`
  font-size: 13px;
  color: ${props => (props.isSuccess ? 'green' : 'red')}; /* 수정: isSuccess prop에 따라 색상 변경 */
  margin-top: 5px; /* 조정: 메시지가 조금 더 떨어지게 */
  margin-bottom: 6px;
`;

export const GroupWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #0b1f3a;
  margin-bottom: 6px;
  display: inline-block;
`;