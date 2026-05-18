import { setupServer } from 'msw/node';
import type { RequestHandler } from 'msw';
import type { SetupServerApi } from 'msw/node';

let server: SetupServerApi | null = null;

export function setupTestServer(handlers: RequestHandler[] = []): SetupServerApi {
  server = setupServer(...handlers);
  return server;
}

export function getTestServer(): SetupServerApi {
  if (!server) {
    throw new Error('Test server not initialized. Call setupTestServer() first.');
  }

  return server;
}
