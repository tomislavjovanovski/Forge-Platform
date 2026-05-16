import { http, HttpHandler } from 'msw';
import type { SetupServerApi } from 'msw/node';

// Mock server setup utility
let server: SetupServerApi | null = null;

export function setupTestServer(handlers: HttpHandler[] = []): SetupServerApi {
  // Use dynamic import to avoid server-side module loading issues
  const { setupServer } = require('msw/node') as typeof import('msw/node');
  server = setupServer(...handlers);
  return server;
}

export function getTestServer(): SetupServerApi {
  if (!server) {
    throw new Error('Test server not initialized. Call setupTestServer() first.');
  }
  return server;
}

export { setupServer };
