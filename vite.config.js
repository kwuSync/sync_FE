// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // ⬇️ 백엔드 개발자님이 알려주신 새 IP로 변경
        target: 'https://newsync.kr', 
        changeOrigin: true, // CORS 해결용
        
        // ⬇️ (★핵심★) '/api' 경로를 제거하는 설정은 그대로 유지!
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})