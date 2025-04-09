import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/frontend/app.jsx',
      refresh: true,
    }),
    react({
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
  ],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './resources/frontend'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          inertia: ['@inertiajs/react'],
          vendor: ['lodash', 'axios'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
  }
});
