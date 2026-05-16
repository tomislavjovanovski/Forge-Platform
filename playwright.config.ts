import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);
const appName = process.env.PW_APP ?? 'admin-dashboard';
const portMap: Record<string, number> = {
  'admin-dashboard': 4173,
  'analytics-dashboard': 4174,
  'public-portal': 4175,
};
const port = Number(process.env.PW_PORT ?? portMap[appName] ?? 4173);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './',
  testMatch: ['**/tests/**/*.spec.ts'],
  timeout: 120000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 3 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
    baseURL,
    trace: 'retain-on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1600, height: 900 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: `pnpm --dir ./apps/${appName} exec vite preview --host 127.0.0.1 --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120000,
  },
});
