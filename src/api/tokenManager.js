let inMemoryAccessToken = null;

const tokenManager = {
  /**
   * Access Token을 메모리에 저장합니다.
   */
  setToken: (token) => {
    inMemoryAccessToken = token;
  },

  /**
   * 메모리에서 Access Token을 가져옵니다.
   */
  getToken: () => {
    return inMemoryAccessToken;
  },

  /**
   * 메모리의 Access Token을 삭제합니다.
   */
  clearToken: () => {
    inMemoryAccessToken = null;
  },

  // --- Refresh Token (sessionStorage) ---

  /**
   * Refresh Token을 세션 스토리지에 저장합니다.
   */
  setRefreshToken: (refreshToken) => {
    sessionStorage.setItem('refreshToken', refreshToken);
  },

  /**
   * 세션 스토리지에서 Refresh Token을 가져옵니다.
   */
  getRefreshToken: () => {
    return sessionStorage.getItem('refreshToken');
  },

  /**
   * 세션 스토리지의 Refresh Token을 삭제합니다.
   */
  clearRefreshToken: () => {
    sessionStorage.removeItem('refreshToken');
  },
};

export default tokenManager;