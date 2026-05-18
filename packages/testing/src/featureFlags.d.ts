export type FeatureFlags = Record<string, boolean>;
export declare function getFeatureFlags(defaults: FeatureFlags, overrides?: FeatureFlags): FeatureFlags;
export declare function isFeatureEnabled(flags: FeatureFlags, featureKey: string): boolean;
//# sourceMappingURL=featureFlags.d.ts.map