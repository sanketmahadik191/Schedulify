import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Allows access from network devices, not just localhost
      port: Number(env.VITE_PORT) || 3000, // Uses VITE_PORT or defaults to 3000
      proxy: {
        '/api': {
          target:"https://schedulify-backend.onrender.com/", 
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
