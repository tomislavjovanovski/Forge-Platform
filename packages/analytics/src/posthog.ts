import posthog from 'posthog-js';
import type { AnalyticsConfig, AnalyticsEvent } from '../index';

export function initPostHog(config: AnalyticsConfig) {
  if (!config.enabled || !config.apiKey) {
    return;
  }

  posthog.init(config.apiKey, {
    api_host: config.endpoint ?? 'https://app.posthog.com',
    autocapture: true,
    capture_pageview: true,
    persistence: 'localStorage',
    loaded: () => {
      if (config.enabled) {
        posthog.capture('analytics.initialized', {
          environment: typeof window !== 'undefined' ? window.location.hostname : 'server',
        });
      }
    },
  });
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined' || !window.posthog) {
    return;
  }

  window.posthog.capture(event.event, event.properties);
}

export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.posthog) {
    return;
  }

  window.posthog.identify(userId, traits);
}
