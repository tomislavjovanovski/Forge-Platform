export type EventType =
  | 'page_view'
  | 'user_action'
  | 'feature_used'
  | 'error_occurred'
  | 'conversion';

export interface AnalyticsEvent {
  event: EventType;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

export interface AnalyticsConfig {
  apiKey: string;
  enabled: boolean;
  endpoint?: string;
}
