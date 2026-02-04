import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true, // Enable source maps for debugging
  },
  esbuild: {
    sourcemap: true, // Enable source maps for esbuild
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5136',      
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
        secure: false,
      },
    },
  },
})
