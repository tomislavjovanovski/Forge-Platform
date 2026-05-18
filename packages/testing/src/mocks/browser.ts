/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { setupWorker } from 'msw';
import type { SetupWorkerApi } from 'msw';
import { defaultHandlers } from './handlers';

export const worker: SetupWorkerApi = setupWorker(...defaultHandlers);

export async function initializeMockServiceWorker(): Promise<void> {
  await worker.start({
    onUnhandledRequest: 'warn',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

export function stopMockServiceWorker(): void {
  worker.stop();
}
