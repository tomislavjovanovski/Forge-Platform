import type { AnalyticsConfig, AnalyticsEvent } from './index';
export declare function initPostHog(config: AnalyticsConfig): void;
export declare function trackEvent(event: AnalyticsEvent): void;
export declare function identifyUser(userId: string, traits?: Record<string, unknown>): void;
//# sourceMappingURL=posthog.d.ts.map