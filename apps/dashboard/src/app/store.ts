import { configureStore } from '@reduxjs/toolkit';
import { dashboardApi } from '../services/dashboardApi';
import authReducer from '../features/auth/authSlice';
import featureFlagsReducer from '../features/featureFlags/featureFlagSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    featureFlags: featureFlagsReducer,
    notifications: notificationReducer,
    theme: themeReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
