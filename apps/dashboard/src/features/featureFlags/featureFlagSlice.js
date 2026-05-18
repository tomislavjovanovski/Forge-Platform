import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    enableAuditTrail: true,
    enableMonitoring: true,
    enableCommandPalette: true,
};
const featureFlagsSlice = createSlice({
    name: 'featureFlags',
    initialState,
    reducers: {
        setFeatureFlags(state, action) {
            return { ...state, ...action.payload };
        },
        toggleFlag(state, action) {
            state[action.payload] = !state[action.payload];
        },
    },
});
export const { setFeatureFlags, toggleFlag } = featureFlagsSlice.actions;
export default featureFlagsSlice.reducer;
//# sourceMappingURL=featureFlagSlice.js.map