/**
 * Color Tokens - Semantic naming following design system best practices
 * Inspired by Shopify Polaris and Radix design systems
 */
export declare const semanticColors: {
    readonly neutral: {
        readonly 0: "#FFFFFF";
        readonly 50: "#F9FAFB";
        readonly 100: "#F3F4F6";
        readonly 200: "#E5E7EB";
        readonly 300: "#D1D5DB";
        readonly 400: "#9CA3AF";
        readonly 500: "#6B7280";
        readonly 600: "#4B5563";
        readonly 700: "#374151";
        readonly 800: "#1F2937";
        readonly 900: "#111827";
    };
    readonly brand: {
        readonly 50: "#F0F4FF";
        readonly 100: "#E6EDFF";
        readonly 200: "#B8D5FF";
        readonly 300: "#8ABDFF";
        readonly 400: "#5C9EFF";
        readonly 500: "#2E7FF4";
        readonly 600: "#1E5BC6";
        readonly 700: "#154399";
        readonly 800: "#0F2B6B";
        readonly 900: "#0A1940";
    };
    readonly success: {
        readonly 50: "#F0FDF4";
        readonly 100: "#DCFCE7";
        readonly 200: "#BBF7D0";
        readonly 300: "#86EFAC";
        readonly 400: "#4ADE80";
        readonly 500: "#22C55E";
        readonly 600: "#16A34A";
        readonly 700: "#15803D";
        readonly 800: "#166534";
        readonly 900: "#145231";
    };
    readonly warning: {
        readonly 50: "#FFFBEB";
        readonly 100: "#FEF3C7";
        readonly 200: "#FDE68A";
        readonly 300: "#FCD34D";
        readonly 400: "#FBBF24";
        readonly 500: "#F59E0B";
        readonly 600: "#D97706";
        readonly 700: "#B45309";
        readonly 800: "#92400E";
        readonly 900: "#78350F";
    };
    readonly critical: {
        readonly 50: "#FEF2F2";
        readonly 100: "#FEE2E2";
        readonly 200: "#FECACA";
        readonly 300: "#FCA5A5";
        readonly 400: "#F87171";
        readonly 500: "#EF4444";
        readonly 600: "#DC2626";
        readonly 700: "#B91C1C";
        readonly 800: "#991B1B";
        readonly 900: "#7F1D1D";
    };
    readonly info: {
        readonly 50: "#F0F9FF";
        readonly 100: "#E0F2FE";
        readonly 200: "#BAE6FD";
        readonly 300: "#7DD3FC";
        readonly 400: "#38BDF8";
        readonly 500: "#0EA5E9";
        readonly 600: "#0284C7";
        readonly 700: "#0369A1";
        readonly 800: "#075985";
        readonly 900: "#0C3A70";
    };
};
export declare const interactiveColors: {
    readonly text: {
        readonly primary: "#111827";
        readonly secondary: "#4B5563";
        readonly tertiary: "#6B7280";
        readonly disabled: "#9CA3AF";
        readonly inverse: "#FFFFFF";
    };
    readonly background: {
        readonly primary: "#FFFFFF";
        readonly secondary: "#F9FAFB";
        readonly tertiary: "#F3F4F6";
        readonly hover: "#F3F4F6";
        readonly active: "#E5E7EB";
    };
    readonly border: {
        readonly primary: "#E5E7EB";
        readonly secondary: "#D1D5DB";
        readonly hover: "#9CA3AF";
        readonly focus: "#2E7FF4";
    };
    readonly state: {
        readonly success: "#22C55E";
        readonly warning: "#F59E0B";
        readonly critical: "#EF4444";
        readonly info: "#0EA5E9";
    };
};
export declare const darkModeColors: {
    readonly text: {
        readonly primary: "#F9FAFB";
        readonly secondary: "#9CA3AF";
        readonly tertiary: "#6B7280";
        readonly disabled: "#4B5563";
        readonly inverse: "#111827";
    };
    readonly background: {
        readonly primary: "#111827";
        readonly secondary: "#1F2937";
        readonly tertiary: "#374151";
        readonly hover: "#374151";
        readonly active: "#4B5563";
    };
    readonly border: {
        readonly primary: "#374151";
        readonly secondary: "#4B5563";
        readonly hover: "#6B7280";
        readonly focus: "#5C9EFF";
    };
    readonly state: {
        readonly success: "#4ADE80";
        readonly warning: "#FBBF24";
        readonly critical: "#F87171";
        readonly info: "#38BDF8";
    };
};
export type SemanticColor = keyof typeof semanticColors;
export type InteractiveColor = keyof typeof interactiveColors;
//# sourceMappingURL=colors.d.ts.map