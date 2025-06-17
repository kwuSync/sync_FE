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

// 댓글 제출 함수 (기존 유지, 필요시 API 연동)
export const submitComment = async (newsId, commentText) => {
  try {
    // 이 부분은 백엔드에 댓글 API가 있다면 해당 API로 변경해야 합니다.
    // 현재는 더미 응답을 반환하도록 예시로 둡니다.
    console.log(`Submitting comment "${commentText}" for news ID ${newsId}`);
    return { success: true, comment: commentText };
  } catch (error) {
    console.error('Error submitting comment:', error.response ? error.response.data : error.message);
    throw error;
  }
};