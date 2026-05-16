export interface ErrorEvent {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
}

export interface SentryConfig {
  dsn: string;
  environment: string;
  enabled: boolean;
  tracesSampleRate?: number;
}
