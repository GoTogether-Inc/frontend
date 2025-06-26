import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';
// import fs from 'fs';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const enableAnalyze = process.env.ANALYZE === 'true';

  const API_BASE_URL = `${env.VITE_API_BASE_URL}`;

  return {
    plugins: [
      react(),
      ...(enableAnalyze
        ? [
            visualizer({
              filename: 'analyze.html',
              template: 'treemap', // network, treemap, sunburst
              open: true,
              gzipSize: true,
              brotliSize: true,
            }) as PluginOption,
          ]
        : []),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    server: {
      host: true,
      // 로컬 실행을 위해 일시적으로 https 로컬 설정 주석처리
      /* https: {
        key: fs.readFileSync('gotogether.io.kr+3-key.pem'),
        cert: fs.readFileSync('gotogether.io.kr+3.pem'),
      }, */
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
    build: {
      sourcemap: true,
      // rollupOptions: { // 추후 Code Splitting 적용 시 사용
      //   output: {
      //     manualChunks: {
      //       'react': ['react', 'react-dom'],
      //       'react-router': ['react-router'],
      //     }
      //   }
      // }
    },
  };
});
