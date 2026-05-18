import { expect, Page } from '@playwright/test';

export class AnalyticsPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async expectHeading() {
    await expect(
      this.page.getByRole('heading', {
        name: /Realtime Connection/i,
      })
    ).toBeVisible();
  }

}
