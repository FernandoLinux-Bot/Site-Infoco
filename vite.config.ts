import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // O player de vídeo e as libs de terceiros saem do bundle da primeira tela.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/CustomEase'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
