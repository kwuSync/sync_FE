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
  justify-content: center;
`;