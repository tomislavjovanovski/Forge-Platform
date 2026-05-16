import * as Sentry from '@sentry/react';
export function initSentry(config) {
    if (!config.enabled || !config.dsn) {
        return;
    }
    Sentry.init({
        dsn: config.dsn,
        environment: config.environment,
        tracesSampleRate: config.tracesSampleRate ?? 1.0,
        integrations: [new Sentry.Replay()],
    });
}
export { Sentry };
//# sourceMappingURL=index.js.map