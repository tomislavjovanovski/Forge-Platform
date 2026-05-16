import { expect, Page } from '@playwright/test';

export class AnalyticsPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async expectHeading() {
    await expect(this.page.locator('h1')).toHaveText('Analytics Dashboard');
  }

  async expectWelcomeMessage() {
    await expect(this.page.locator('main p')).toHaveText(
      'Welcome to forge-platform analytics dashboard'
    );
  }
}
