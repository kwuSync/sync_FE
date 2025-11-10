export const API_ENDPOINTS = {
  // --- 인증 관련 엔드포인트 ---
  login: `/user/login`,
  signup: `/user/join`,
  sendEmailCode: `/mail/send`,
  verifyEmailCode: `/mail/verify`,
  logout: `/user/logout`,
  deleteUser: `/user`,
  updateUser: `/user`,

  // --- 뉴스 관련 엔드포인트 ---
  newsList: `/main/news`, // 뉴스 목록 조회
  newsSummary: (clusterId) => `/main/cluster/${clusterId}/summary`, // 뉴스 요약 조회
  ttsMain: `/main/tts`,
  ttsCluster: (clusterId) => `/cluster/${clusterId}/tts`,

  // --- 댓글 관련 엔드포인트 ---
  getComments: (clusterId) => `/cluster/${clusterId}/comment`,
  postComment: (clusterId) => `/cluster/${clusterId}/comment`,
  updateComment: (clusterId, commentId) => `/cluster/${clusterId}/comment/${commentId}`,
  deleteComment: (clusterId, commentId) => `/cluster/${clusterId}/comment/${commentId}`,
};
