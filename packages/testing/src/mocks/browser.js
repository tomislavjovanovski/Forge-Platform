/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { setupWorker } from 'msw/browser';
import { defaultHandlers } from './handlers';
export const worker = setupWorker(...defaultHandlers);
export async function initializeMockServiceWorker() {
    await worker.start({
        onUnhandledRequest: 'warn',
        serviceWorker: {
            url: '/mockServiceWorker.js',
        },
    });
}
export function stopMockServiceWorker() {
    worker.stop();
}
//# sourceMappingURL=browser.js.map