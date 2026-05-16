import type { Page, Route } from '@playwright/test';

export async function mockApiEndpoint(
  page: Page,
  url: string,
  response: unknown,
  status = 200,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
) {
  await page.route(url, (route: Route) => {
    if (route.request().method() !== method) {
      return route.fallback();
    }

    return route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}
