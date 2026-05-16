/**
 * Spacing & Layout Tokens
 * Consistent spacing scale and responsive breakpoints
 */
export declare const spacing: {
    readonly 0: "0";
    readonly 0.5: "0.125rem";
    readonly 1: "0.25rem";
    readonly 1.5: "0.375rem";
    readonly 2: "0.5rem";
    readonly 2.5: "0.625rem";
    readonly 3: "0.75rem";
    readonly 3.5: "0.875rem";
    readonly 4: "1rem";
    readonly 5: "1.25rem";
    readonly 6: "1.5rem";
    readonly 7: "1.75rem";
    readonly 8: "2rem";
    readonly 9: "2.25rem";
    readonly 10: "2.5rem";
    readonly 12: "3rem";
    readonly 14: "3.5rem";
    readonly 16: "4rem";
    readonly 20: "5rem";
    readonly 24: "6rem";
    readonly 28: "7rem";
    readonly 32: "8rem";
    readonly 36: "9rem";
    readonly 40: "10rem";
    readonly 44: "11rem";
    readonly 48: "12rem";
    readonly 52: "13rem";
    readonly 56: "14rem";
    readonly 60: "15rem";
    readonly 64: "16rem";
    readonly 72: "18rem";
    readonly 80: "20rem";
    readonly 96: "24rem";
};
export type SpacingValue = keyof typeof spacing;
export declare const breakpoints: {
    readonly xs: "320px";
    readonly sm: "640px";
    readonly md: "768px";
    readonly lg: "1024px";
    readonly xl: "1280px";
    readonly '2xl': "1536px";
};
export type Breakpoint = keyof typeof breakpoints;
export declare const mediaQueries: {
    readonly xs: "@media (min-width: 320px)";
    readonly sm: "@media (min-width: 640px)";
    readonly md: "@media (min-width: 768px)";
    readonly lg: "@media (min-width: 1024px)";
    readonly xl: "@media (min-width: 1280px)";
    readonly '2xl': "@media (min-width: 1536px)";
    readonly 'sm-max': "@media (max-width: 640px)";
    readonly 'md-max': "@media (max-width: 768px)";
    readonly 'lg-max': "@media (max-width: 1024px)";
    readonly 'xl-max': "@media (max-width: 1280px)";
};
export declare const containerWidths: {
    readonly sm: "640px";
    readonly md: "768px";
    readonly lg: "1024px";
    readonly xl: "1280px";
    readonly '2xl': "1536px";
};
export declare const borderRadius: {
    readonly none: "0";
    readonly xs: "0.125rem";
    readonly sm: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
    readonly xl: "0.75rem";
    readonly '2xl': "1rem";
    readonly '3xl': "1.5rem";
    readonly full: "9999px";
};
export type BorderRadiusValue = keyof typeof borderRadius;
export declare const zIndex: {
    readonly hide: -1;
    readonly auto: 0;
    readonly base: 0;
    readonly dropdown: 1000;
    readonly sticky: 1020;
    readonly fixed: 1030;
    readonly modal: 1040;
    readonly popover: 1050;
    readonly tooltip: 1060;
};
export type ZIndexValue = keyof typeof zIndex;
export declare const shadows: {
    readonly none: "none";
    readonly xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    readonly base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
    readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
    readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
    readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
    readonly '2xl': "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
};
export type ShadowValue = keyof typeof shadows;
//# sourceMappingURL=spacing.d.ts.map