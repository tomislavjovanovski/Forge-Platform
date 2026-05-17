import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FeatureFlagMap } from '../../types/dashboard';

const initialState: FeatureFlagMap = {
  enableAuditTrail: true,
  enableMonitoring: true,
  enableCommandPalette: true,
};

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    setFeatureFlags(state, action: PayloadAction<Partial<FeatureFlagMap>>) {
      return { ...state, ...action.payload };
    },
    toggleFlag(state, action: PayloadAction<keyof FeatureFlagMap>) {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { setFeatureFlags, toggleFlag } = featureFlagsSlice.actions;
export default featureFlagsSlice.reducer;
