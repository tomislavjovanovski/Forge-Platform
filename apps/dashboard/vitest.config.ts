/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@forge': path.resolve(__dirname, '../../packages'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    passWithNoTests: true,

    exclude: [
      'node_modules/**',
      'dist/**',
      'coverage/**',

      // Playwright tests
      'e2e/**',
      'tests/specs/**',

      // optional safety
      '**/*.e2e.*',
    ],
  },
});
