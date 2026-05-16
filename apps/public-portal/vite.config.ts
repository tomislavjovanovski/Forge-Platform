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
  server: {
    port: 3002,
    strictPort: false,
  },
  build: {
    target: 'ES2020',
    minify: 'esbuild',
    sourcemap: true,
  },
  define: {
    'process.env.VITE_APP_ENV': JSON.stringify(process.env.VITE_APP_ENV || 'development'),
  },
});
