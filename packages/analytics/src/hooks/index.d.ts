import type { AnalyticsEvent } from '../index';
export declare function useAnalytics(): {
    track: (event: AnalyticsEvent) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
};
//# sourceMappingURL=index.d.ts.map