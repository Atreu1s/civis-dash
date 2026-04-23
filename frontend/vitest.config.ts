import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true, // Описывает describe, it, expect, vi глобально
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8', // Быстрый и точный сборщик покрытия
      reporter: ['text', 'json-summary'],
      thresholds: { lines: 70, branches: 70, functions: 70, statements: 70 },
    },
  },
});