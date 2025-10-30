// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.newsync.kr',
        changeOrigin: true,
        // 👇 이 부분의 주석을 해제하세요.
        // '/api'로 시작하는 경로를 빈 문자열('')로 바꿔서
        // '/api/user/login' -> '/user/login'으로 만듭니다.
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})