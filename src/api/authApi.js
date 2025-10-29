// src/api/authApi.js
import axios from 'axios';
import axiosInstance, { API_BASE_URL } from './axiosInstance'; // axiosInstance 임포트
import { API_ENDPOINTS } from './apiConfig';

const REFRESH_URL = '/reissue';

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


// 로그아웃 API 호출 (POST /user/logout)

export const logout = async () => {
  try {
    // API 명세상 body 없이 POST 요청
    const response = await axiosInstance.post(API_ENDPOINTS.logout);
    return response.data;
  } catch (error) {
    console.error('로그아웃 실패:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * 회원 정보 수정 API (PATCH /user)
 * @param {string} email - (Query Param) 현재 이메일
 * @param {string} nickname - (Body) 새 닉네임
 * @param {string} password - (Body) 새 비밀번호
 * @param {string} passwordConfirm - (Body) 새 비밀번호 확인
 */

export const updateUser = async (email, nickname, password, passwordConfirm) => {
  try {
    const body = { nickname, password, passwordConfirm };
    const config = {
      params: { email } // 쿼리 파라미터
    };

    // axios.patch(url, body, config)
    const response = await axiosInstance.patch(API_ENDPOINTS.updateUser, body, config);
    return response.data;
  } catch (error) {
    console.error('회원정보 수정 실패:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteUser = async (email, password) => {
  try {
    // API 명세상 email, password를 body에 담아 DELETE 요청
    // axios.delete에서 body를 보내려면 { data: { ... } } 형태로 감싸야 합니다.
    const response = await axiosInstance.delete(API_ENDPOINTS.deleteUser, {
      data: { email, password },
    });
    return response.data;
  } catch (error) {
    console.error('회원 탈퇴 실패:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 토큰 재발급 API 호출
export const reissueToken = async (refreshToken) => {
  try {
    // ⭐️ 이 요청만 axiosInstance가 아닌 raw axios를 사용
    const response = await axios.post(
      `${API_BASE_URL}${REFRESH_URL}`, // 갱신 API만 절대 경로 직접 조립
      refreshToken,                 
      { headers: { 'Content-Type': 'text/plain' } }
    );
    return response.data.data; // { accessToken } 반환
  } catch (error) {
    console.error('Token reissue failed:', error);
    throw error;
  }
};