/**
 * Input Component
 * Form input with support for variants, sizes, and states
 * Accessible by default with proper ARIA attributes
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  cn(
    'flex items-center gap-2',
    'px-3 py-2 rounded-lg',
    'border border-slate-300',
    'bg-white text-slate-900',
    'placeholder:text-slate-500',
    'transition-colors duration-200',
    'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
    'focus-within:border-blue-500',
    'dark:bg-slate-900 dark:text-slate-50 dark:border-slate-700 dark:placeholder:text-slate-400',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ),
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },

      error: {
        true: cn(
          'border-red-500 focus-within:ring-red-500',
          'dark:border-red-400',
        ),
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
      error: false,
      disabled: false,
      fullWidth: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'disabled'>,
    VariantProps<typeof inputVariants> {
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
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      error,
      disabled,
      fullWidth,
      icon,
      iconEnd,
      label,
      helperText,
      required,
      id,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium text-slate-900 dark:text-slate-50',
              disabled && 'opacity-50'
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className={inputVariants({ size, error: !!error, disabled, fullWidth })}>
          {/* Start icon */}
          {icon && <span className="flex items-center justify-center text-slate-500">{icon}</span>}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'flex-1 border-0 bg-transparent outline-none',
              'placeholder:text-slate-500 dark:placeholder:text-slate-400',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            disabled={disabled}
            placeholder={placeholder}
            aria-label={label || placeholder}
            aria-invalid={!!error}
            aria-describedby={errorId || helperId}
            required={required}
            {...props}
          />

          {/* End icon */}
          {iconEnd && (
            <span className="flex items-center justify-center text-slate-500">{iconEnd}</span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-500 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={helperId}
            className="text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
