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

export const AUTH_STORAGE_KEY = 'forge-auth';
export const TOKEN_STORAGE_KEY = 'forge-token';
