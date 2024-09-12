import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Port, target } from './src/importenv';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: Port,
    proxy: {
      '/api': {
        target: target,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});