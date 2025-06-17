// src/api/authApi.js
import axiosInstance from './axiosInstance'; // axiosInstance 임포트
import { API_ENDPOINTS } from './apiConfig';

// 로그인 api 호출
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.login, { email, password });
    if (response.data.token) { // 예를 들어 응답 본문에 token 필드가 있다고 가정
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// --- 회원가입 관련 API 호출 ---

// 이메일 인증번호 전송 함수 수정
export const sendVerificationCode = async (email) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.sendEmailCode, { email });
    return response.data; // 서버 응답 (예: 숫자 0 또는 다른 상태)
  } catch (error) {
    console.error('인증번호 전송 실패:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 이메일 인증번호 확인 함수 수정
export const verifyCode = async (email, authNumber) => { // 파라미터 이름을 authNumber로 변경
  try {
    // API 이미지에서 authNumber가 숫자로 전달됨을 명시하고 있으므로, Number()로 변환
    const response = await axiosInstance.post(API_ENDPOINTS.verifyEmailCode, { email, authNumber: Number(authNumber) });
    return response.data; // 서버 응답 (예: true/false)
  } catch (error) {
    console.error('인증번호 확인 실패:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 회원가입 함수 수정
export const signup = async (nickname, email, password, passwordConfirm, authNumber) => { // nickname 파라미터 추가
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.signup, {
      nickname, // nickname 추가
      email,
      password,
      passwordConfirm,
      authNumber: Number(authNumber)
    });
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error.response ? error.response.data : error.message);
    throw error;
  }
};