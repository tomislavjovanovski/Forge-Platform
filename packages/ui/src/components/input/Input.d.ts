/**
 * Input Component
 * Form input with support for variants, sizes, and states
 * Accessible by default with proper ARIA attributes
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const inputVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    error?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
    /**
     * Icon to display before input
     */
    icon?: React.ReactNode;
    /**
     * Icon to display after input
     */
    iconEnd?: React.ReactNode;
    /**
     * Error message to display below input
     */
    error?: string;
    /**
     * Helper text to display below input
     */
    helperText?: string;
    /**
     * Label for the input
     */
    label?: string;
    /**
     * Whether input is required
     */
    required?: boolean;
}
/**
 * Input component
 * @example
 * ```tsx
 * // Basic input
 * <Input placeholder="Enter text..." />
 *
 * // With icon
 * <Input icon={<SearchIcon />} placeholder="Search..." />
 *
 * // With error
 * <Input error="This field is required" />
 *
 * // With label
 * <Input label="Email" type="email" required />
 * ```
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input, inputVariants };
//# sourceMappingURL=Input.d.ts.map