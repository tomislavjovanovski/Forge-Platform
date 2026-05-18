export const adminIdentity = {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    token: 'admin-token',
};
export const userIdentity = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    token: 'user-token',
};
export function getAuthHeaders(token) {
    return {
        Authorization: token ? `Bearer ${token}` : 'Bearer anonymous',
    };
}
export function makeAuthCookie(token) {
    return `forge-auth=${token}; Domain=127.0.0.1; Path=/; Secure; SameSite=Lax`;
}
//# sourceMappingURL=testAuth.js.map