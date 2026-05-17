/**
 * SettingsForm Pattern
 * Reusable form component for settings/configuration with validation
 */

import React, { ReactNode, FormEvent, useState } from 'react';
import { cn } from '../../utils/cn';

export interface FormField {
  name: string;
  label: ReactNode;
  type?: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'textarea';
  placeholder?: string;
  description?: ReactNode;
  options?: Array<{ value: string; label: ReactNode }>;
  required?: boolean;
  error?: string;
  defaultValue?: string | boolean;
}

export interface SettingsFormProps {
  /** Form fields */
  fields: FormField[];
  /** Form submission handler */
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
  /** Submit button label */
  submitLabel?: ReactNode;
  /** Show cancel button */
  showCancel?: boolean;
  /** Cancel button handler */
  onCancel?: () => void;
  /** Form title */
  title?: ReactNode;
  /** Form description */
  description?: ReactNode;
  /** Is submitting */
  isSubmitting?: boolean;
  /** CSS class name */
  className?: string;
}

/**
 * SettingsForm Component
 * Provides a form for settings and configuration with validation and error handling
 *
 * Features:
 * - Multiple field types
 * - Validation support
 * - Error display
 * - Loading state
 * - Responsive design
 * - Dark mode support
 */
export const SettingsForm = React.forwardRef<HTMLFormElement, SettingsFormProps>(
  ({
    fields,
    onSubmit,
    submitLabel = 'Save',
    showCancel = true,
    onCancel,
    title,
    description,
    isSubmitting = false,
    className,
  }, ref) => {
    const [formData, setFormData] = useState<Record<string, any>>(() => {
      const initial: Record<string, any> = {};
      fields.forEach((field) => {
        initial[field.name] = field.defaultValue ?? '';
      });
      return initial;
    });

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      const { name, type, value, checked } = e.target as any;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (onSubmit) {
        await onSubmit(formData);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn('space-y-6 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900', className)}
      >
        {/* Header */}
        {(title || description) && (
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Fields */}
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                {field.label}
                {field.required && <span className="ml-1 text-red-600">*</span>}
              </label>

              {field.description && (
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {field.description}
                </p>
              )}

              <div className="mt-2">
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={cn(
                      'w-full rounded-lg border border-slate-300 bg-white px-3 py-2',
                      'text-slate-900 placeholder:text-slate-500',
                      'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
                      'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50',
                      field.error && 'border-red-500',
                    )}
                    rows={4}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={cn(
                      'w-full rounded-lg border border-slate-300 bg-white px-3 py-2',
                      'text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
                      'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50',
                      field.error && 'border-red-500',
                    )}
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <input
                    id={field.name}
                    name={field.name}
                    type="checkbox"
                    checked={formData[field.name] || false}
                    onChange={handleChange}
                    className={cn(
                      'h-4 w-4 rounded border-slate-300',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500',
                      'dark:border-slate-600',
                    )}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={cn(
                      'w-full rounded-lg border border-slate-300 bg-white px-3 py-2',
                      'text-slate-900 placeholder:text-slate-500',
                      'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
                      'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50',
                      field.error && 'border-red-500',
                    )}
                  />
                )}
              </div>

              {field.error && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {field.error}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-lg bg-blue-600 px-4 py-2 font-medium text-white',
              'hover:bg-blue-700 active:bg-blue-800',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'dark:focus:ring-offset-slate-900',
            )}
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </button>

          {showCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-900',
                'hover:bg-slate-50 active:bg-slate-100',
                'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700',
              )}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  },
);

SettingsForm.displayName = 'SettingsForm';
