/**
 * Typography Tokens
 * Font scales and type system for consistent hierarchy
 */
export declare const typography: {
    readonly fonts: {
        readonly sans: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"";
        readonly mono: "ui-monospace, SFMono-Regular, \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", Courier, monospace";
    };
    readonly scale: {
        readonly xs: {
            readonly fontSize: "0.75rem";
            readonly lineHeight: "1rem";
            readonly fontWeight: 500;
        };
        readonly sm: {
            readonly fontSize: "0.875rem";
            readonly lineHeight: "1.25rem";
            readonly fontWeight: 400;
        };
        readonly base: {
            readonly fontSize: "1rem";
            readonly lineHeight: "1.5rem";
            readonly fontWeight: 400;
        };
        readonly lg: {
            readonly fontSize: "1.125rem";
            readonly lineHeight: "1.75rem";
            readonly fontWeight: 500;
        };
        readonly xl: {
            readonly fontSize: "1.25rem";
            readonly lineHeight: "1.75rem";
            readonly fontWeight: 600;
        };
        readonly '2xl': {
            readonly fontSize: "1.5rem";
            readonly lineHeight: "2rem";
            readonly fontWeight: 700;
        };
        readonly '3xl': {
            readonly fontSize: "1.875rem";
            readonly lineHeight: "2.25rem";
            readonly fontWeight: 700;
        };
        readonly '4xl': {
            readonly fontSize: "2.25rem";
            readonly lineHeight: "2.5rem";
            readonly fontWeight: 700;
        };
    };
    readonly variants: {
        readonly h1: {
            readonly fontSize: "2.25rem";
            readonly lineHeight: "2.5rem";
            readonly fontWeight: 700;
            readonly letterSpacing: "-0.01em";
        };
        readonly h2: {
            readonly fontSize: "1.875rem";
            readonly lineHeight: "2.25rem";
            readonly fontWeight: 700;
            readonly letterSpacing: "-0.01em";
        };
        readonly h3: {
            readonly fontSize: "1.5rem";
            readonly lineHeight: "2rem";
            readonly fontWeight: 700;
            readonly letterSpacing: "-0.005em";
        };
        readonly h4: {
            readonly fontSize: "1.25rem";
            readonly lineHeight: "1.75rem";
            readonly fontWeight: 600;
        };
        readonly body: {
            readonly fontSize: "1rem";
            readonly lineHeight: "1.5rem";
            readonly fontWeight: 400;
        };
        readonly 'body-sm': {
            readonly fontSize: "0.875rem";
            readonly lineHeight: "1.25rem";
            readonly fontWeight: 400;
        };
        readonly button: {
            readonly fontSize: "0.875rem";
            readonly lineHeight: "1.25rem";
            readonly fontWeight: 600;
            readonly letterSpacing: "0.025em";
        };
        readonly label: {
            readonly fontSize: "0.875rem";
            readonly lineHeight: "1.25rem";
            readonly fontWeight: 600;
        };
        readonly caption: {
            readonly fontSize: "0.75rem";
            readonly lineHeight: "1rem";
            readonly fontWeight: 500;
            readonly letterSpacing: "0.05em";
        };
        readonly code: {
            readonly fontSize: "0.875rem";
            readonly lineHeight: "1.25rem";
            readonly fontWeight: 400;
            readonly fontFamily: "var(--font-mono)";
        };
    };
};
export type TypographyVariant = keyof typeof typography.variants;
//# sourceMappingURL=typography.d.ts.map