import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '../../types/dashboard';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
}

const initialState: AuthState = {
  user: {
    id: 'u-01',
    name: 'Mina Chen',
    email: 'mina@forge.com',
    role: 'admin',
  },
  token: 'local-mock-token',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
    },
    revokeToken(state) {
      state.token = null;
    },
  },
});

export const { setUser, revokeToken } = authSlice.actions;
export default authSlice.reducer;
