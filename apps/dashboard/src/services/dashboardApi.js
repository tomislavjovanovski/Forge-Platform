import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Audit', 'Metrics', 'Notifications', 'Flags', 'User'],
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => '/auth/profile',
            providesTags: ['User'],
        }),
        getMetrics: builder.query({
            query: () => '/metrics',
            providesTags: ['Metrics'],
        }),
        getAuditLog: builder.query({
            query: () => '/audit/log',
            providesTags: ['Audit'],
        }),
        getNotifications: builder.query({
            query: () => '/notifications',
            providesTags: ['Notifications'],
        }),
        getFeatureFlags: builder.query({
            query: () => '/feature-flags',
            providesTags: ['Flags'],
        }),
    }),
});
export const { useGetUserProfileQuery, useGetMetricsQuery, useGetAuditLogQuery, useGetNotificationsQuery, useGetFeatureFlagsQuery, } = dashboardApi;
//# sourceMappingURL=dashboardApi.js.map