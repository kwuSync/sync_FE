// src/api/newsApi.js
import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './apiConfig'; // 올바른 임포트 이름

// 뉴스 목록을 가져오는 함수 (NewsListPage에 사용)
export const getNewsList = async () => {
  
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.newsList); // <--- 여기서 API_ENDpoints -> API_ENDPOINTS 로 수정
    return response.data.data.newsList;
  } catch (error) {
    console.error('Error fetching news list:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 뉴스 요약 상세를 가져오는 함수 (NewsDetailPage에 사용)
export const getNewsSummary = async (clusterId) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.newsSummary(clusterId)); // <--- 여기서도 동일하게 API_ENDPOINTS 로 수정
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching news summary for cluster ID ${clusterId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// ⬇️ 1. 댓글 목록 조회 (GET) ⬇️
export const getComments = async (clusterId) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.getComments(clusterId));
    // 백엔드 응답 구조에 따라 .data.data.comments 등으로 조정 필요
    return response.data.data; 
  } catch (error) {
    console.error(`Error fetching comments for cluster ID ${clusterId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// ⬇️ 2. 댓글 제출 (POST) - ⬇️
export const submitComment = async (clusterId, commentText) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.postComment(clusterId), { commentText }); 
    return response.data.data; // 새로 생성된 댓글 객체 반환
  } catch (error) {
    console.error('Error submitting comment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ⬇️ 3. 댓글 수정 (PATCH) ⬇️
export const updateComment = async (clusterId, commentId, commentText) => {
  try {
    const response = await axiosInstance.patch(API_ENDPOINTS.updateComment(clusterId, commentId), { commentText });
    return response.data.data; // 수정된 댓글 객체 반환
  } catch (error) {
    console.error('Error updating comment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ⬇️ 4. 댓글 삭제 (DELETE) ⬇️
export const deleteComment = async (clusterId, commentId) => {
  try {
    const response = await axiosInstance.delete(API_ENDPOINTS.deleteComment(clusterId, commentId));
    return response.data; // 성공 메시지 반환
  } catch (error) {
    console.error('Error deleting comment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ⬇️ 5. TTS 설정 저장 (POST) ⬇️
/**
 * TTS 설정을 서버에 저장합니다.
 * @param {object} settings
 * @param {string} settings.voiceName
 * @param {number} settings.pitch
 * @param {number} settings.speakingRate
 */
export const saveTtsSettings = async ({ voiceName, pitch, speakingRate }) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.saveTtsSettings, {
      voiceName,
      pitch,
      speakingRate,
    });
    return response.data; // 성공 응답 반환
  } catch (error) {
    console.error('Error saving TTS settings:', error.response ? error.response.data : error.message);
    throw error;
  }
};