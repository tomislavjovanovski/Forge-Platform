/**
 * Typography Tokens
 * Font scales and type system for consistent hierarchy
 */
export const typography = {
    // Font families
    fonts: {
        sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", Courier, monospace',
    },
    // Font sizes with corresponding line heights
    scale: {
        xs: {
            fontSize: '0.75rem', // 12px
            lineHeight: '1rem', // 16px
            fontWeight: 500,
        },
        sm: {
            fontSize: '0.875rem', // 14px
            lineHeight: '1.25rem', // 20px
            fontWeight: 400,
        },
        base: {
            fontSize: '1rem', // 16px
            lineHeight: '1.5rem', // 24px
            fontWeight: 400,
        },
        lg: {
            fontSize: '1.125rem', // 18px
            lineHeight: '1.75rem', // 28px
            fontWeight: 500,
        },
        xl: {
            fontSize: '1.25rem', // 20px
            lineHeight: '1.75rem', // 28px
            fontWeight: 600,
        },
        '2xl': {
            fontSize: '1.5rem', // 24px
            lineHeight: '2rem', // 32px
            fontWeight: 700,
        },
        '3xl': {
            fontSize: '1.875rem', // 30px
            lineHeight: '2.25rem', // 36px
            fontWeight: 700,
        },
        '4xl': {
            fontSize: '2.25rem', // 36px
            lineHeight: '2.5rem', // 40px
            fontWeight: 700,
        },
    },
    // Semantic typography variants
    variants: {
        // Headings
        h1: {
            fontSize: '2.25rem',
            lineHeight: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h2: {
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '1.5rem',
            lineHeight: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.005em',
        },
        h4: {
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            fontWeight: 600,
        },
        // Body text
        body: {
            fontSize: '1rem',
            lineHeight: '1.5rem',
            fontWeight: 400,
        },
        'body-sm': {
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            fontWeight: 400,
        },
        // UI text
        button: {
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            fontWeight: 600,
            letterSpacing: '0.025em',
        },
        label: {
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            fontWeight: 600,
        },
        caption: {
            fontSize: '0.75rem',
            lineHeight: '1rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
        },
        // Code
        code: {
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            fontWeight: 400,
            fontFamily: 'var(--font-mono)',
        },
    },
};
//# sourceMappingURL=typography.js.map