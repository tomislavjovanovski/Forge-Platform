import { setupServer } from 'msw/node';

import type {
  HttpHandler,
} from 'msw';

import type {
  SetupServer,
} from 'msw/node';

let server:
  | SetupServer
  | undefined;

export function setupTestServer(
  handlers: HttpHandler[] = [],
): SetupServer {
  server = setupServer(
    ...handlers,
  );

  return server;
}

export function getTestServer(): SetupServer {
  if (
    server ===
    undefined
  ) {
    throw new Error(
      'Test server not initialized. Call setupTestServer() first.',
    );
  }

  return server;
}
