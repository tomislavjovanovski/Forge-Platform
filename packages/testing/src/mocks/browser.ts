/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

import { setupWorker } from 'msw/browser';

import type { SetupWorker } from 'msw/browser';

import { defaultHandlers } from './handlers';

export const worker: SetupWorker =
  setupWorker(
    ...defaultHandlers,
  );

export async function initializeMockServiceWorker(): Promise<void> {
  await worker.start({
    onUnhandledRequest:
      'warn',

    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

export function stopMockServiceWorker(): void {
  worker.stop();
}