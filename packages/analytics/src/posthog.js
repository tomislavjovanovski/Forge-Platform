import posthog from 'posthog-js';
export function initPostHog(config) {
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
export function trackEvent(event) {
    if (typeof window === 'undefined') {
        return;
    }
    const win = window;
    if (!win.posthog) {
        return;
    }
    win.posthog.capture(event.event, event.properties);
}
export function identifyUser(userId, traits) {
    if (typeof window === 'undefined') {
        return;
    }
    const win = window;
    if (!win.posthog) {
        return;
    }
    win.posthog.identify(userId, traits);
}
//# sourceMappingURL=posthog.js.map