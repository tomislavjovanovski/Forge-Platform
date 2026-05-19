import { expect, Page } from '@playwright/test';

export class AnalyticsPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async expectPageReady() {
    await expect(this.page.getByRole('heading', { name: /Resilience Patterns/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Simulate Failure/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Reconnect/i })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /WebSocket Connection/i })).toBeVisible();
    await expect(this.page.getByText(/Real-time data streaming with automatic reconnection/i)).toBeVisible();
  }

  async openResilienceTab() {
    await this.page.getByRole('button', { name: /Resilience/i }).click();
  }

  async expectResiliencePatterns() {
    await expect(this.page.getByRole('heading', { name: /Exponential Backoff/i })).toBeVisible();
  }

  async openPatternsTab() {
    await this.page.getByRole('button', { name: /Patterns/i }).click();
  }

  async expectArchitecturePatterns() {
    await expect(this.page.getByRole('heading', { name: /Frontend Architecture Patterns/i })).toBeVisible();
  }
}
