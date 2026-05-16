import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Button Component
 * Primary interactive element with multiple variants
 * Supports loading, disabled, and icon states
 */
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
const buttonVariants = cva(
// Base styles
cn('inline-flex items-center justify-center gap-2', 'whitespace-nowrap rounded-lg font-medium', 'transition-colors duration-200', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', 'disabled:opacity-50 disabled:cursor-not-allowed', 'cursor-pointer'), {
    variants: {
        variant: {
            // Primary - main action
            primary: cn('bg-blue-600 text-white', 'hover:bg-blue-700 active:bg-blue-800', 'focus-visible:ring-blue-500', 'dark:bg-blue-600 dark:hover:bg-blue-700'),
            // Secondary - alternative action
            secondary: cn('bg-slate-200 text-slate-900', 'hover:bg-slate-300 active:bg-slate-400', 'focus-visible:ring-slate-500', 'dark:bg-slate-700 dark:text-slate-50 dark:hover:bg-slate-600'),
            // Tertiary - minimal emphasis
            tertiary: cn('text-slate-700 hover:bg-slate-100 active:bg-slate-200', 'focus-visible:ring-slate-500', 'dark:text-slate-300 dark:hover:bg-slate-800'),
            // Danger - destructive actions
            danger: cn('bg-red-600 text-white', 'hover:bg-red-700 active:bg-red-800', 'focus-visible:ring-red-500', 'dark:bg-red-600 dark:hover:bg-red-700'),
            // Ghost - low emphasis
            ghost: cn('text-slate-700 hover:bg-slate-100', 'focus-visible:ring-slate-500', 'dark:text-slate-300 dark:hover:bg-slate-800'),
        },
        size: {
            xs: 'h-6 px-2 text-xs',
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
            xl: 'h-14 px-8 text-base',
        },
        fullWidth: {
            true: 'w-full',
        },
        loading: {
            true: 'pointer-events-none',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        fullWidth: false,
        loading: false,
    },
});
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
const Button = forwardRef(({ className, variant, size, fullWidth, isLoading, icon, iconEnd, children, disabled, type = 'button', ...props }, ref) => {
    return (_jsxs("button", { ref: ref, type: type, disabled: disabled || isLoading, className: cn(buttonVariants({ variant, size, fullWidth, loading: isLoading }), className), ...props, children: [isLoading && (_jsxs("svg", { className: "h-4 w-4 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-label": "Loading", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })), icon && !isLoading && _jsx("span", { className: "flex items-center justify-center", children: icon }), children, iconEnd && _jsx("span", { className: "flex items-center justify-center", children: iconEnd })] }));
});
Button.displayName = 'Button';
export { Button, buttonVariants };
//# sourceMappingURL=Button.js.map