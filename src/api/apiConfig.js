// 개발 환경과 배포 환경에 따라 URL을 다르게 설정할 수 있습니다.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://newsync.kr/';

export const API_ENDPOINTS = {
  // --- 인증 관련 엔드포인트 ---
  login: `${BASE_URL}/user/login`,
  signup: `${BASE_URL}/user/join`,
  sendEmailCode: `${BASE_URL}/mail/send`, 
  verifyEmailCode: `${BASE_URL}/mail/verify`,

  // --- 뉴스 관련 엔드포인트 ---
  newsList: `${BASE_URL}/main/news`, // 뉴스 목록 조회
  newsSummary: (clusterId) => `${BASE_URL}/main/cluster/${clusterId}/summary`, // 뉴스 요약 조회
};