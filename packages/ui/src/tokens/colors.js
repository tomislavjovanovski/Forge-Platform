/**
 * Color Tokens - Semantic naming following design system best practices
 * Inspired by Shopify Polaris and Radix design systems
 */
export const semanticColors = {
    // Neutral palette - for backgrounds, borders, text
    neutral: {
        0: '#FFFFFF',
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },
    // Brand colors - primary action colors
    brand: {
        50: '#F0F4FF',
        100: '#E6EDFF',
        200: '#B8D5FF',
        300: '#8ABDFF',
        400: '#5C9EFF',
        500: '#2E7FF4', // Primary brand
        600: '#1E5BC6',
        700: '#154399',
        800: '#0F2B6B',
        900: '#0A1940',
    },
    // Success states
    success: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#145231',
    },
    // Warning states
    warning: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FBBF24',
        500: '#F59E0B',
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F',
    },
    // Critical/Error states
    critical: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D',
    },
    // Info states
    info: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#0EA5E9',
        600: '#0284C7',
        700: '#0369A1',
        800: '#075985',
        900: '#0C3A70',
    },
};
// Interactive component colors
export const interactiveColors = {
    // Text colors
    text: {
        primary: semanticColors.neutral[900],
        secondary: semanticColors.neutral[600],
        tertiary: semanticColors.neutral[500],
        disabled: semanticColors.neutral[400],
        inverse: semanticColors.neutral[0],
    },
    // Background colors
    background: {
        primary: semanticColors.neutral[0],
        secondary: semanticColors.neutral[50],
        tertiary: semanticColors.neutral[100],
        hover: semanticColors.neutral[100],
        active: semanticColors.neutral[200],
    },
    // Border colors
    border: {
        primary: semanticColors.neutral[200],
        secondary: semanticColors.neutral[300],
        hover: semanticColors.neutral[400],
        focus: semanticColors.brand[500],
    },
    // State colors
    state: {
        success: semanticColors.success[500],
        warning: semanticColors.warning[500],
        critical: semanticColors.critical[500],
        info: semanticColors.info[500],
    },
};
// Dark mode color overrides
export const darkModeColors = {
    text: {
        primary: semanticColors.neutral[50],
        secondary: semanticColors.neutral[400],
        tertiary: semanticColors.neutral[500],
        disabled: semanticColors.neutral[600],
        inverse: semanticColors.neutral[900],
    },
    background: {
        primary: semanticColors.neutral[900],
        secondary: semanticColors.neutral[800],
        tertiary: semanticColors.neutral[700],
        hover: semanticColors.neutral[700],
        active: semanticColors.neutral[600],
    },
    border: {
        primary: semanticColors.neutral[700],
        secondary: semanticColors.neutral[600],
        hover: semanticColors.neutral[500],
        focus: semanticColors.brand[400],
    },
    state: {
        success: semanticColors.success[400],
        warning: semanticColors.warning[400],
        critical: semanticColors.critical[400],
        info: semanticColors.info[400],
    },
};
//# sourceMappingURL=colors.js.map