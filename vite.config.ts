import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // /api 요청을 Spring 서버(8080)로 프록시 → CORS 문제 없이 호출
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
