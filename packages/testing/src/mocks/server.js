import { setupServer } from 'msw/node';
let server;
export function setupTestServer(handlers = []) {
    server = setupServer(...handlers);
    return server;
}
export function getTestServer() {
    if (server ===
        undefined) {
        throw new Error('Test server not initialized. Call setupTestServer() first.');
    }
    return server;
}
//# sourceMappingURL=server.js.map