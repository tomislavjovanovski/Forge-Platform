import { test, expect } from '@playwright/test';

test('loads dashboard page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Admin Dashboard/);
  await expect(page.getByRole('heading', { name: /User Management/i })).toBeVisible();
});
