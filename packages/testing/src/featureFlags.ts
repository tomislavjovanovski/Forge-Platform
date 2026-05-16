export type FeatureFlags = Record<string, boolean>;

export function getFeatureFlags(defaults: FeatureFlags, overrides: FeatureFlags = {}) {
  return { ...defaults, ...overrides };
}

export function isFeatureEnabled(flags: FeatureFlags, featureKey: string) {
  return Boolean(flags[featureKey]);
}
