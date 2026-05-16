/**
 * Styling utilities
 * Class name merging and Tailwind helpers
 */
import { type ClassValue } from 'clsx';
/**
 * Merge Tailwind classes with proper precedence
 * Combines clsx for conditional classes with twMerge to handle overrides
 */
export declare function cn(...inputs: ClassValue[]): string;
/**
 * Create responsive classes with breakpoint prefixes
 * Example: resp({ md: 'flex', lg: 'grid' }) => 'md:flex lg:grid'
 */
export declare function resp(breakpoints: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>): string;
/**
 * Create CVA-style responsive variants
 * Example: respVariant({ base: 'p-4', md: 'p-6', lg: 'p-8' })
 */
export declare function respVariant(variants: Partial<Record<'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>): string;
/**
 * Type-safe data attributes for testing and styling
 */
export declare function dataAttr(condition: boolean | undefined): string | undefined;
/**
 * Create ARIA attributes in a type-safe way
 */
export declare const ariaAttr: {
    readonly hidden: (isHidden: boolean) => "true" | undefined;
    readonly disabled: (isDisabled: boolean) => "true" | undefined;
    readonly pressed: (isPressed: boolean) => "true" | "false";
    readonly expanded: (isExpanded: boolean) => "true" | "false";
    readonly checked: (isChecked: boolean | "mixed") => "mixed" | "true" | "false";
    readonly selected: (isSelected: boolean) => "true" | "false";
    readonly readonly: (isReadonly: boolean) => "true" | undefined;
    readonly invalid: (isInvalid: boolean) => "true" | "false";
    readonly required: (isRequired: boolean) => "true" | undefined;
};
export type AriaAttr = typeof ariaAttr;
//# sourceMappingURL=cn.d.ts.map