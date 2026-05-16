import { useCallback } from 'react';
export function useAnalytics() {
    const track = useCallback((_event) => {
        // PostHog integration
        if (typeof window !== 'undefined') {
            // window.posthog?.capture(event.event, event.properties);
        }
    }, []);
    const identify = useCallback((_userId, _traits) => {
        // window.posthog?.identify(userId, traits);
    }, []);
    return { track, identify };
}
//# sourceMappingURL=index.js.map