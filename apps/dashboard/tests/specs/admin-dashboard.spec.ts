import { test } from '@playwright/test';
import { DashboardPage } from '../page-objects/DashboardPage';

test.describe('Admin Dashboard smoke tests', () => {
  test('renders the main admin dashboard page and settings tab', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.expectUsersPage();
    await dashboard.expectUsersTable();

    await dashboard.openSettingsTab();
    await dashboard.expectSettingsPage();
  });
});
