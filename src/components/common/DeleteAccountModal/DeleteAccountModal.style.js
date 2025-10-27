// src/components/common/DeleteAccountModal/DeleteAccountModal.style.js
import styled from "styled-components";

// ... (Backdrop, ModalWrapper, Title, Description, FormContainer 변경 없음) ...
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2000;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  z-index: 2001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.div`
  font-size: 13px;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.danger};
  margin-top: -8px;
  margin-bottom: 12px;
  text-align: center;
  white-space: pre-line; 
  line-height: 1.4; 
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;

  > button {
    flex: 1;
  }
`;