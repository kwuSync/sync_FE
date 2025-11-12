import React, { Suspense, useEffect, useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import router from './routes/pagesRoutes';
import { TTSProvider } from './contexts/TTSContext';

import tokenManager from './api/tokenManager';
import { reissueToken } from './api/authApi';
import Chatbot from './components/common/Chatbot/Chatbot';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trySilentRefresh = async () => {
      const refreshToken = tokenManager.getRefreshToken();
      
      if (refreshToken) {
        try {
          const { accessToken } = await reissueToken(refreshToken);
          
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
        <Chatbot />
      </TTSProvider>
    </ThemeProvider>
  );
};

export default App;