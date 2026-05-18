export function getFeatureFlags(defaults, overrides = {}) {
    return { ...defaults, ...overrides };
}
export function isFeatureEnabled(flags, featureKey) {
    return Boolean(flags[featureKey]);
}
//# sourceMappingURL=featureFlags.js.map