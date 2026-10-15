import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        // O player do Mux é um web component: o Vue não deve tentar resolvê-lo.
        compilerOptions: { isCustomElement: tag => tag === 'mux-player' },
      },
    }),
  ],
  build: {
    // O player de vídeo e as libs de terceiros saem do bundle da primeira tela.
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          motion: ['motion-v'],
          gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/CustomEase'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
