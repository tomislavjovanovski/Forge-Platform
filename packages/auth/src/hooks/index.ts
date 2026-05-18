import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../index';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user): void => set({ user, isAuthenticated: !!user }),
      setToken: (token): void => set({ token }),
      logout: (): void => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'forge-auth-store',
    }
  )
);
