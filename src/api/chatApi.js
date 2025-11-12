// src/api/chatApi.js
import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './apiConfig';

/**
 * 챗봇 메시지를 전송하고 응답을 받습니다.
 * @param {string} message - 사용자가 입력한 메시지
 * @returns {Promise<object>} - 챗봇의 응답 (e.g., { message: "응답" })
 */
export const sendChatMessage = async (message) => {
  try {
    const body = {
      message: message,
      cluster_id: "1", // 말씀하신 대로 빈 문자열로 처리
      session_id: "1"  // 말씀하신 대로 빈 문자열로 처리
    };
    
    const response = await axiosInstance.post(API_ENDPOINTS.chat, body);

    if (response.data.data.answer) {
      return { message: response.data.data.answer };
    }

    throw new Error("API 응답 형식이 올바르지 않습니다.");

  } catch (error) {
    console.error('챗봇 메시지 전송 실패:', error.response ? error.response.data : error.message);
    throw error;
  }
};