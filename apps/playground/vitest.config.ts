import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,

    // Optional but recommended
    include: [
      'src/**/*.test.ts',
      'src/**/*.test.tsx',
      'tests/**/*.test.ts',
      'tests/**/*.test.tsx',
    ],

    // Ignore Playwright
    exclude: [
      'node_modules/**',
      'dist/**',
      'coverage/**',

      'tests/specs/**',
      'e2e/**',

      '**/*.e2e.*',
    ],
  },
});

