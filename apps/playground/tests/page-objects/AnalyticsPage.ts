import { expect, Page } from '@playwright/test';

export class AnalyticsPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async expectHeading() {
    await expect(this.page.getByTestId('dashboard-heading')).toHaveText(
      'Observability Command Center'
    );
  }

  async expectDashboardWidgets() {
    await expect(this.page.getByTestId('dashboard-subtitle')).toContainText(
      'Realtime metrics'
    );
    await expect(this.page.getByTestId('realtime-metrics-widget')).toBeVisible();
    await expect(this.page.getByTestId('error-tracking-widget')).toBeVisible();
  }
}
