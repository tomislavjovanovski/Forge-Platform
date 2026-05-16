import * as Sentry from '@sentry/react';
import type { SentryConfig } from '../index';

export function initSentry(config: SentryConfig): void {
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
