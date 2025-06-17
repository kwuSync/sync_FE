import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import router from './routes/pagesRoutes';
import { Suspense } from 'react';
import { TTSProvider } from './contexts/TTSContext'; // ✅ 추가

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <TTSProvider> {/* ✅ TTSProvider로 감싸기 */}
        <GlobalStyle />
        <Suspense fallback={<div>로딩 중...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </TTSProvider>
    </ThemeProvider>
  );
};

export default App;