/**
 * Styling utilities
 * Class name merging and Tailwind helpers
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Merge Tailwind classes with proper precedence
 * Combines clsx for conditional classes with twMerge to handle overrides
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
/**
 * Create responsive classes with breakpoint prefixes
 * Example: resp({ md: 'flex', lg: 'grid' }) => 'md:flex lg:grid'
 */
export function resp(breakpoints) {
    return Object.entries(breakpoints)
        .map(([bp, classes]) => {
        if (bp === 'xs')
            return classes;
        return `${bp}:${classes}`;
    })
        .join(' ');
}
/**
 * Create CVA-style responsive variants
 * Example: respVariant({ base: 'p-4', md: 'p-6', lg: 'p-8' })
 */
export function respVariant(variants) {
    const classes = [];
    if (variants.base) {
        classes.push(variants.base);
    }
    if (variants.xs)
        classes.push(variants.xs);
    if (variants.sm)
        classes.push(`sm:${variants.sm}`);
    if (variants.md)
        classes.push(`md:${variants.md}`);
    if (variants.lg)
        classes.push(`lg:${variants.lg}`);
    if (variants.xl)
        classes.push(`xl:${variants.xl}`);
    if (variants['2xl'])
        classes.push(`2xl:${variants['2xl']}`);
    return classes.join(' ');
}
/**
 * Type-safe data attributes for testing and styling
 */
export function dataAttr(condition) {
    return condition ? '' : undefined;
}
/**
 * Create ARIA attributes in a type-safe way
 */
export const ariaAttr = {
    hidden: (isHidden) => isHidden ? 'true' : undefined,
    disabled: (isDisabled) => isDisabled ? 'true' : undefined,
    pressed: (isPressed) => isPressed ? 'true' : 'false',
    expanded: (isExpanded) => isExpanded ? 'true' : 'false',
    checked: (isChecked) => {
        if (isChecked === 'mixed')
            return 'mixed';
        return isChecked ? 'true' : 'false';
    },
    selected: (isSelected) => isSelected ? 'true' : 'false',
    readonly: (isReadonly) => isReadonly ? 'true' : undefined,
    invalid: (isInvalid) => isInvalid ? 'true' : 'false',
    required: (isRequired) => isRequired ? 'true' : undefined,
};
//# sourceMappingURL=cn.js.map