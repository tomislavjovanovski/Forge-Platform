import { expect, Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async expectHeading() {
    await expect(this.page.locator('h1')).toHaveText('Admin Dashboard');
  }

  async expectWelcomeMessage() {
    await expect(this.page.locator('main p')).toHaveText(
      'Welcome to forge-platform admin dashboard'
    );
  }
}
