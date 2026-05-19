import { test } from '@playwright/test';
import { AnalyticsPage } from '../page-objects/AnalyticsPage';

test.describe('Analytics Dashboard', () => {
  test('renders resilience playground with websocket connection and pattern tabs', async ({ page }) => {
    const analytics = new AnalyticsPage(page);
    await analytics.goto();
    await analytics.expectPageReady();

    await analytics.openResilienceTab();
    await analytics.expectResiliencePatterns();

    await analytics.openPatternsTab();
    await analytics.expectArchitecturePatterns();
  });
});
