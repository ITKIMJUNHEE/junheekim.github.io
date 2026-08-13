import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// junheekim.cloud 커스텀 도메인으로 루트 배포되므로 base는 '/' 유지.
// 커스텀 도메인 없이 <username>.github.io/<repo> 형태로 배포한다면
// base를 '/<repo-name>/'으로 바꿔야 함.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
