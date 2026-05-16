export interface User {
    id: string;
    email: string;
    name: string;
    role?: string;
}
export interface AuthContext {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}
export declare const AUTH_STORAGE_KEY = "forge-auth";
export declare const TOKEN_STORAGE_KEY = "forge-token";
//# sourceMappingURL=index.d.ts.map