import { useCallback } from 'react';
import type { AnalyticsEvent } from '../index';

type PostHogWindow = {
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
  };
};

export function useAnalytics(): {
  track: (event: AnalyticsEvent) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
} {
  const track = useCallback((event: AnalyticsEvent): void => {
    if (typeof window === 'undefined') {
      return;
    }

    const win = window as Window & PostHogWindow;
    if (!win.posthog) {
      return;
    }

    win.posthog.capture(event.event, event.properties);
  }, []);

  const identify = useCallback((userId: string, traits?: Record<string, unknown>): void => {
    if (typeof window === 'undefined') {
      return;
    }

    const win = window as Window & PostHogWindow;
    if (!win.posthog) {
      return;
    }

    win.posthog.identify(userId, traits);
  }, []);

  return { track, identify };
}
