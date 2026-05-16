/**
 * Button Component
 * Primary interactive element with multiple variants
 * Supports loading, disabled, and icon states
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | "danger" | "ghost" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | null | undefined;
    fullWidth?: boolean | null | undefined;
    loading?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    /**
     * Show loading spinner
     */
    isLoading?: boolean;
    /**
     * Icon to display before text
     */
    icon?: React.ReactNode;
    /**
     * Icon to display after text
     */
    iconEnd?: React.ReactNode;
    /**
     * Tooltip text on hover
     */
    title?: string;
    /**
     * Aria label for accessibility
     */
    'aria-label'?: string;
}
/**
 * Button component
 * @example
 * ```tsx
 * // Primary button
 * <Button>Click me</Button>
 *
 * // With icon
 * <Button icon={<PlusIcon />}>Add Item</Button>
 *
 * // Loading state
 * <Button isLoading>Processing...</Button>
 *
 * // Responsive size
 * <Button size={{ initial: 'sm', md: 'lg' }}>
 *   Save changes
 * </Button>
 * ```
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
//# sourceMappingURL=Button.d.ts.map