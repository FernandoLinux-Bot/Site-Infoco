import { defineConfig, devices } from '@playwright/test';

// Configurável para que duas execuções (ex.: uma auditoria em paralelo) não
// disputem a mesma porta e derrubem o preview uma da outra.
const PORT = Number(process.env.PREVIEW_PORT ?? 4173);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  // O `vite preview` é single-thread e serve um chunk de ~900 KB (o player de
  // vídeo). Com os dois projetos em paralelo cheio ele engasgava e o page.goto
  // estourava 30s — falha de infraestrutura, não do site.
  workers: process.env.CI ? 2 : 4,
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 45_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    // Nunca reaproveitar um preview já rodando: ele pode estar servindo um dist/
    // antigo, e a suíte passaria a validar um build que não é o do código atual.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
