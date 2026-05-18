import posthog from 'posthog-js';
import type { AnalyticsConfig, AnalyticsEvent } from './index';

type PostHogWindow = {
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
  };
};

export function initPostHog(config: AnalyticsConfig): void {
  if (!config.enabled || !config.apiKey) {
    return;
  }

  posthog.init(config.apiKey, {
    api_host: config.endpoint ?? 'https://app.posthog.com',
    autocapture: true,
    capture_pageview: true,
    persistence: 'localStorage',
    loaded: (): void => {
      if (config.enabled) {
        posthog.capture('analytics.initialized', {
          environment: typeof window !== 'undefined' ? window.location.hostname : 'server',
        });
      }
    },
  });
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') {
    return;
  }

  const win = window as Window & PostHogWindow;
  if (!win.posthog) {
    return;
  }

  win.posthog.capture(event.event, event.properties);
}

export function identifyUser(userId: string, traits?: Record<string, unknown>): void {
  if (typeof window === 'undefined') {
    return;
  }

  const win = window as Window & PostHogWindow;
  if (!win.posthog) {
    return;
  }

  win.posthog.identify(userId, traits);
}
