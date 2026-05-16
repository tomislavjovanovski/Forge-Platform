import { useCallback } from 'react';
import type { AnalyticsEvent } from '../index';

export function useAnalytics() {
  const track = useCallback((event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(event.event, event.properties);
    }
  }, []);

  const identify = useCallback((userId: string, traits?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.identify(userId, traits);
    }
  }, []);

  return { track, identify };
}
