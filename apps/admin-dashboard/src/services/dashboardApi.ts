import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  AuditEntry,
  DashboardMetric,
  FeatureFlagMap,
  NotificationItem,
  UserProfile,
} from '../types/dashboard';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Audit', 'Metrics', 'Notifications', 'Flags', 'User'],
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    getMetrics: builder.query<DashboardMetric[], void>({
      query: () => '/metrics',
      providesTags: ['Metrics'],
    }),
    getAuditLog: builder.query<AuditEntry[], void>({
      query: () => '/audit/log',
      providesTags: ['Audit'],
    }),
    getNotifications: builder.query<NotificationItem[], void>({
      query: () => '/notifications',
      providesTags: ['Notifications'],
    }),
    getFeatureFlags: builder.query<FeatureFlagMap, void>({
      query: () => '/feature-flags',
      providesTags: ['Flags'],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetMetricsQuery,
  useGetAuditLogQuery,
  useGetNotificationsQuery,
  useGetFeatureFlagsQuery,
} = dashboardApi;
