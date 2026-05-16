/**
 * Styling utilities
 * Class name merging and Tailwind helpers
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with proper precedence
 * Combines clsx for conditional classes with twMerge to handle overrides
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Create responsive classes with breakpoint prefixes
 * Example: resp({ md: 'flex', lg: 'grid' }) => 'md:flex lg:grid'
 */
export function resp(
  breakpoints: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>
): string {
  return Object.entries(breakpoints)
    .map(([bp, classes]) => {
      if (bp === 'xs') return classes;
      return `${bp}:${classes}`;
    })
    .join(' ');
}

/**
 * Create CVA-style responsive variants
 * Example: respVariant({ base: 'p-4', md: 'p-6', lg: 'p-8' })
 */
export function respVariant(
  variants: Partial<Record<'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>
): string {
  const classes: string[] = [];

  if (variants.base) {
    classes.push(variants.base);
  }

  if (variants.xs) classes.push(variants.xs);
  if (variants.sm) classes.push(`sm:${variants.sm}`);
  if (variants.md) classes.push(`md:${variants.md}`);
  if (variants.lg) classes.push(`lg:${variants.lg}`);
  if (variants.xl) classes.push(`xl:${variants.xl}`);
  if (variants['2xl']) classes.push(`2xl:${variants['2xl']}`);

  return classes.join(' ');
}

/**
 * Type-safe data attributes for testing and styling
 */
export function dataAttr(condition: boolean | undefined): string | undefined {
  return condition ? '' : undefined;
}

/**
 * Create ARIA attributes in a type-safe way
 */
export const ariaAttr = {
  hidden: (isHidden: boolean) => isHidden ? 'true' : undefined,
  disabled: (isDisabled: boolean) => isDisabled ? 'true' : undefined,
  pressed: (isPressed: boolean) => isPressed ? 'true' : 'false',
  expanded: (isExpanded: boolean) => isExpanded ? 'true' : 'false',
  checked: (isChecked: boolean | 'mixed') => {
    if (isChecked === 'mixed') return 'mixed';
    return isChecked ? 'true' : 'false';
  },
  selected: (isSelected: boolean) => isSelected ? 'true' : 'false',
  readonly: (isReadonly: boolean) => isReadonly ? 'true' : undefined,
  invalid: (isInvalid: boolean) => isInvalid ? 'true' : 'false',
  required: (isRequired: boolean) => isRequired ? 'true' : undefined,
} as const;

export type AriaAttr = typeof ariaAttr;
