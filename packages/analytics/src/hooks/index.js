import { useCallback } from 'react';
export function useAnalytics() {
    const track = useCallback((event) => {
        if (typeof window === 'undefined') {
            return;
        }
        const win = window;
        if (!win.posthog) {
            return;
        }
        win.posthog.capture(event.event, event.properties);
    }, []);
    const identify = useCallback((userId, traits) => {
        if (typeof window === 'undefined') {
            return;
        }
        const win = window;
        if (!win.posthog) {
            return;
        }
        win.posthog.identify(userId, traits);
    }, []);
    return { track, identify };
}
//# sourceMappingURL=index.js.map