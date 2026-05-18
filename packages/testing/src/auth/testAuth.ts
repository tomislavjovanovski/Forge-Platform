export interface TestIdentity {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  token: string;
}

export const adminIdentity: TestIdentity = {
  id: '2',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
  token: 'admin-token',
};

export const userIdentity: TestIdentity = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
  token: 'user-token',
};

export function getAuthHeaders(token?: string): Record<string, string> {
  return {
    Authorization: token ? `Bearer ${token}` : 'Bearer anonymous',
  };
}

export function makeAuthCookie(token: string): string {
  return `forge-auth=${token}; Domain=127.0.0.1; Path=/; Secure; SameSite=Lax`;
}
