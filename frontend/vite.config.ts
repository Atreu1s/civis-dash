import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // локальный моковый сервер, если есть
        changeOrigin: true,
      },
    },
  },
});
