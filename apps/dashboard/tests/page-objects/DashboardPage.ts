import { expect, Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async expectUsersPage() {
    await expect(this.page.getByRole('heading', { name: /User Management/i })).toBeVisible();
  }

  async expectUsersTable() {
    await expect(this.page.getByRole('table')).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: /Name/i })).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: /Email/i })).toBeVisible();
  }

  async openSettingsTab() {
    await this.page.getByRole('button', { name: /Settings/i }).click();
  }

  async expectSettingsPage() {
    await expect(this.page.getByRole('heading', { name: /Application Settings/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Save Settings/i })).toBeVisible();
  }
}
