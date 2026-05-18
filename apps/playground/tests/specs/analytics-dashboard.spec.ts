import { test } from '@playwright/test';
import { AnalyticsPage } from '../page-objects/AnalyticsPage';

test.describe('Analytics Dashboard', () => {
  test('renders observability command center and core widgets', async ({ page }) => {
    const analytics = new AnalyticsPage(page);
    await analytics.goto();
    await analytics.expectHeading();
  });
});
