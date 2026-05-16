import { test } from '@playwright/test';
import { AnalyticsPage } from '../page-objects/AnalyticsPage';

test.describe('Analytics Dashboard', () => {
  test('renders analytics homepage and hero section', async ({ page }) => {
    const analytics = new AnalyticsPage(page);
    await analytics.goto();
    await analytics.expectHeading();
    await analytics.expectWelcomeMessage();
  });
});
