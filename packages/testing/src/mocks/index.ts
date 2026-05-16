import type { RequestHandler } from 'msw';
import type { SetupServerApi } from 'msw/node';

// Mock server setup utility
let server: SetupServerApi | null = null;

export function setupTestServer(handlers: RequestHandler[] = []): SetupServerApi {
  // Use dynamic import to avoid server-side module loading issues
  const { setupServer } = require('msw/node') as typeof import('msw/node');
  server = setupServer(...handlers) as SetupServerApi;
  return server;
}

export function getTestServer(): SetupServerApi {
  if (!server) {
    throw new Error('Test server not initialized. Call setupTestServer() first.');
  }
  return server;
}
