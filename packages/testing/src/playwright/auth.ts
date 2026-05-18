import type { Page } from '@playwright/test';

export async function injectAuthToken(
  page: Page,
  token: string
): Promise<void> {
  await page.addInitScript((authToken: string) => {
    window.localStorage.setItem('forge.authToken', authToken);
  }, token);
}

export async function setAuthCookie(
  page: Page,
  token: string
): Promise<void> {
  await page.context().addCookies([
    {
      name: 'forge-auth',
      value: token,
      domain: '127.0.0.1',
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'Lax',
    },
  ]);
}
