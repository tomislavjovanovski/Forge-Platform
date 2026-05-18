import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Input Component
 * Form input with support for variants, sizes, and states
 * Accessible by default with proper ARIA attributes
 */
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
const inputVariants = cva(cn('flex items-center gap-2', 'px-3 py-2 rounded-lg', 'border border-slate-300', 'bg-white text-slate-900', 'placeholder:text-slate-500', 'transition-colors duration-200', 'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2', 'focus-within:border-blue-500', 'dark:bg-slate-900 dark:text-slate-50 dark:border-slate-700 dark:placeholder:text-slate-400', 'disabled:opacity-50 disabled:cursor-not-allowed'), {
    variants: {
        size: {
            sm: 'h-8 text-sm',
            md: 'h-10 text-base',
            lg: 'h-12 text-lg',
        },
        hasError: {
            true: cn('border-red-500 focus-within:ring-red-500', 'dark:border-red-400'),
        },
        disabled: {
            true: 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800',
        },
        fullWidth: {
            true: 'w-full',
        },
    },
    defaultVariants: {
        size: 'md',
        hasError: false,
        disabled: false,
        fullWidth: false,
    },
});
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
const Input = forwardRef(({ className, size, error, disabled = false, fullWidth, icon, iconEnd, label, helperText, required, id, placeholder, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    return (_jsxs("div", { className: cn('flex flex-col gap-1.5', fullWidth && 'w-full'), children: [label && (_jsxs("label", { htmlFor: inputId, className: cn('text-sm font-medium text-slate-900 dark:text-slate-50', disabled && 'opacity-50'), children: [label, required && _jsx("span", { className: "ml-1 text-red-500", children: "*" })] })), _jsxs("div", { className: inputVariants({ size, hasError: !!error, disabled, fullWidth }), children: [icon && _jsx("span", { className: "flex items-center justify-center text-slate-500", children: icon }), _jsx("input", { ref: ref, id: inputId, className: cn('flex-1 border-0 bg-transparent outline-none', 'placeholder:text-slate-500 dark:placeholder:text-slate-400', 'disabled:opacity-50 disabled:cursor-not-allowed', className), disabled: disabled || false, placeholder: placeholder, "aria-label": label || placeholder, "aria-invalid": !!error, "aria-describedby": errorId || helperId, required: required, ...props }), iconEnd && (_jsx("span", { className: "flex items-center justify-center text-slate-500", children: iconEnd }))] }), error && (_jsx("p", { id: errorId, className: "text-sm text-red-500 dark:text-red-400", role: "alert", children: error })), helperText && !error && (_jsx("p", { id: helperId, className: "text-sm text-slate-500 dark:text-slate-400", children: helperText }))] }));
});
Input.displayName = 'Input';
export { Input, inputVariants };
//# sourceMappingURL=Input.js.map