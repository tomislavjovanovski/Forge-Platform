import { useCallback } from 'react';
import type { AnalyticsEvent } from '../index';

export function useAnalytics() {
  const track = useCallback((_event: AnalyticsEvent) => {
    // PostHog integration
    if (typeof window !== 'undefined') {
      // window.posthog?.capture(event.event, event.properties);
    }
  }, []);

  const identify = useCallback((_userId: string, _traits?: Record<string, unknown>) => {
    // window.posthog?.identify(userId, traits);
  }, []);

  return { track, identify };
}
