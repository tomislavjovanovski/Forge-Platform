export type FeatureFlags = Record<string, boolean>;

export function getFeatureFlags(
  defaults: FeatureFlags,
  overrides: FeatureFlags = {}
): FeatureFlags {
  return { ...defaults, ...overrides };
}

export function isFeatureEnabled(
  flags: FeatureFlags,
  featureKey: string
): boolean {
  return Boolean(flags[featureKey]);
}
