import { createSlice } from '@reduxjs/toolkit';
const initialState = {
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
        setUser(state, action) {
            state.user = action.payload;
        },
        revokeToken(state) {
            state.token = null;
        },
    },
});
export const { setUser, revokeToken } = authSlice.actions;
export default authSlice.reducer;
//# sourceMappingURL=authSlice.js.map