import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_BASE_URL = `${env.VITE_API_BASE_URL}`;

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    server: {
      host: true,
      https: {
        key: fs.readFileSync('_wildcard.gotogether.io.kr+2-key.pem'),
        cert: fs.readFileSync('_wildcard.gotogether.io.kr+2.pem'),
      },
      allowedHosts: ['gotogether.io.kr'],
      proxy: {
        '/api/v1': {
          target: API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
