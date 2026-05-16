import type { AnalyticsEvent } from '../index';
export declare function useAnalytics(): {
    track: (_event: AnalyticsEvent) => void;
    identify: (_userId: string, _traits?: Record<string, unknown>) => void;
};
//# sourceMappingURL=index.d.ts.map