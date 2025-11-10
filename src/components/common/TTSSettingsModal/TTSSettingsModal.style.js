// src/components/common/TTSSettingsModal/TTSSettingsModal.style.js
import styled from "styled-components";
// 기존 모달 스타일 재사용
export {
  Backdrop,
  ModalWrapper,
  Title,
  ButtonWrapper,
  ErrorMessage,
} from "../DeleteAccountModal/DeleteAccountModal.style";

// --- TTSSettingsModal 전용 스타일 ---

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 그룹 간 간격 */
  margin: 24px 0;
`;

export const FormGroup = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  font-size: 15px;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
  display: block;
`;

export const Select = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #0b1f3a;
  }
`;

export const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Slider = styled.input`
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const SliderValue = styled.span`
  font-size: 14px;
  color: #333;
  width: 35px; /* 값 표시 공간 확보 */
  text-align: right;
`;