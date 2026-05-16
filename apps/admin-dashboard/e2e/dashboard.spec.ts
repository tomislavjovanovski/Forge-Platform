import { test, expect } from '@playwright/test';

test('loads dashboard page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Admin Dashboard/);
  const heading = page.locator('h1');
  await expect(heading).toContainText('Admin Dashboard');
});
