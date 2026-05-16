// Mock server setup utility
let server = null;
export function setupTestServer(handlers = []) {
    // Use dynamic import to avoid server-side module loading issues
    const { setupServer } = require('msw/node');
    server = setupServer(...handlers);
    return server;
}
export function getTestServer() {
    if (!server) {
        throw new Error('Test server not initialized. Call setupTestServer() first.');
    }
    return server;
}
export { setupServer };
//# sourceMappingURL=index.js.map