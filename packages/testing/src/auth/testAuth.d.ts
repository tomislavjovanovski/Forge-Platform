export interface TestIdentity {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    token: string;
}
export declare const adminIdentity: TestIdentity;
export declare const userIdentity: TestIdentity;
export declare function getAuthHeaders(token?: string): Record<string, string>;
export declare function makeAuthCookie(token: string): string;
//# sourceMappingURL=testAuth.d.ts.map