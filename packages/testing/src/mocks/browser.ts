import { setupWorker } from 'msw/browser';
import type { SetupWorkerApi } from 'msw/browser';
import { defaultHandlers } from './handlers';

export const worker: SetupWorkerApi = setupWorker(...defaultHandlers);

export async function initializeMockServiceWorker() {
  await worker.start({
    onUnhandledRequest: 'warn',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

export async function stopMockServiceWorker() {
  await worker.stop();
}
