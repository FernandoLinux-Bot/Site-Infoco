import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: The triple-slash directive for node types was causing an error, and `process.cwd()` was not recognized.
  // Using `(process as any).cwd()` bypasses the TypeScript error when Node.js types are not available.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    plugins: [react()],
  }
})
