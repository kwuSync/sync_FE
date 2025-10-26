import React, { Suspense, useEffect, useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import router from './routes/pagesRoutes';
import { TTSProvider } from './contexts/TTSContext';

import axios from 'axios'; 
import tokenManager from './api/tokenManager';

const REFRESH_URL = '/reissue'; 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trySilentRefresh = async () => {
      const refreshToken = tokenManager.getRefreshToken();
      
      if (refreshToken) {
        try {
          // --- ⬇️ 여기가 최종 수정된 부분입니다 ⬇️ ---
          const response = await axios.post(
            `${API_BASE_URL}${REFRESH_URL}`, // URL
            refreshToken,                   // Body: 순수 토큰 문자열
            {                               // Config
              headers: { 'Content-Type': 'text/plain' } 
            }
          );
          // --- ⬆️ 수정 완료 ⬆️ ---

          // (응답 형식은 이전에 확인한 .data.data.accessToken이 맞다고 가정)
          const { accessToken } = response.data.data;
          
          if (accessToken) {
            tokenManager.setToken(accessToken);
          }
          
        } catch (error) {
          console.error('Silent refresh failed:', error);
          tokenManager.clearToken();
          tokenManager.clearRefreshToken();
        }
      }
      
      setIsLoading(false);
    };

    trySilentRefresh();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <TTSProvider>
        <GlobalStyle />
        <Suspense fallback={<div>로딩 중...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </TTSProvider>
    </ThemeProvider>
  );
};

export default App;