/**
 * SettingsForm Pattern
 * Reusable form component for
 * settings/configuration with validation
 */

import {
  useState,
  forwardRef,
  type ReactNode,
  type FormEvent,
  type ReactElement,
  type ChangeEvent,
} from 'react';

import { cn } from '../../utils/cn';

type FormValue =
  | string
  | boolean;

export interface FormField {
  name: string;

  label: ReactNode;

  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'checkbox'
    | 'textarea';

  placeholder?: string;

  description?: ReactNode;

  options?: Array<{
    value: string;
    label: ReactNode;
  }>;

  required?: boolean;

  error?: string;

  defaultValue?: FormValue;
}

export interface SettingsFormProps {
  /** Form fields */
  fields: FormField[];

  /** Form submission handler */
  onSubmit?: (
    data: Record<
      string,
      FormValue
    >,
  ) =>
    | void
    | Promise<void>;

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
 * Provides a form for settings
 * and configuration with validation
 * and error handling
 */
const SettingsForm = forwardRef<
  HTMLFormElement,
  SettingsFormProps
>(
  (
    {
      fields,
      onSubmit,
      submitLabel = 'Save',
      showCancel = true,
      onCancel,
      title,
      description,
      isSubmitting = false,
      className,
    },
    ref,
  ): ReactElement => {
    const [
      formData,
      setFormData,
    ] = useState<
      Record<
        string,
        FormValue
      >
    >(() => {
      const initial: Record<
        string,
        FormValue
      > = {};

      fields.forEach(
        (
          field,
        ): void => {
          initial[
            field.name
          ] =
            field.defaultValue ??
            '';
        },
      );

      return initial;
    });

    const handleChange = (
      event:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLSelectElement>
        | ChangeEvent<HTMLTextAreaElement>,
    ): void => {
      const target =
        event.target;

      const {
        name,
      } = target;

      const value: FormValue =
        target instanceof
          HTMLInputElement &&
        target.type ===
          'checkbox'
          ? target.checked
          : target.value;

      setFormData(
        (
          prev,
        ): Record<
          string,
          FormValue
        > => ({
          ...prev,
          [name]: value,
        }),
      );
    };

    const getStringValue = (
      value:
        | FormValue
        | undefined,
    ): string => {
      return typeof value ===
        'string'
        ? value
        : '';
    };

    const handleSubmit =
      async (
        event: FormEvent<HTMLFormElement>,
      ): Promise<void> => {
        event.preventDefault();

        if (
          onSubmit
        ) {
          await onSubmit(
            formData,
          );
        }
      };

    return (
      <form
        ref={ref}
        onSubmit={(
          event,
        ): void => {
          void handleSubmit(
            event,
          );
        }}
        className={cn(
          'space-y-6 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900',
          className,
        )}
      >
        {/* Header */}
        {(title ||
          description) && (
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {
                  description
                }
              </p>
            )}
          </div>
        )}

        {/* Fields */}
        <div className="space-y-4">
          {fields.map(
            (
              field,
            ): ReactElement => (
              <div
                key={
                  field.name
                }
              >
                <label
                  htmlFor={
                    field.name
                  }
                  className="block text-sm font-medium text-slate-900 dark:text-slate-50"
                >
                  {
                    field.label
                  }

                  {field.required && (
                    <span className="ml-1 text-red-600">
                      *
                    </span>
                  )}
                </label>

                {field.description && (
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {
                      field.description
                    }
                  </p>
                )}

                <div className="mt-2">
                  {field.type ===
                  'textarea' ? (
                    <textarea
                      id={
                        field.name
                      }
                      name={
                        field.name
                      }
                      placeholder={
                        field.placeholder
                      }
                      value={getStringValue(
                        formData[
                          field
                            .name
                        ],
                      )}
                      onChange={
                        handleChange
                      }
                      className={cn(
                        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2',
                        'text-slate-900 placeholder:text-slate-500',
                        'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
                        'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50',
                        field.error &&
                          'border-red-500',
                      )}
                      rows={4}
                    />
                  ) : field.type ===
                    'select' ? (
                    <select
                      id={
                        field.name
                      }
                      name={
                        field.name
                      }
                      value={getStringValue(
                        formData[
                          field
                            .name
                        ],
                      )}
                      onChange={
                        handleChange
                      }
                      className={cn(
                        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2',
                        'text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
                        'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50',
                        field.error &&
                          'border-red-500',
                      )}
                    >
                      <option value="">
                        Select an
                        option
                      </option>

                      {field.options?.map(
                        (
                          option,
                        ): ReactElement => (
                          <option
                            key={
                              option.value
                            }
                            value={
                              option.value
                            }
                          >
                            {
                              option.label
                            }
                          </option>
                        ),
                      )}
                    </select>
                  ) : field.type ===
                    'checkbox' ? (
                    <input
                      id={
                        field.name
                      }
                      name={
                        field.name
                      }
                      type="checkbox"
                      checked={Boolean(
                        formData[
                          field
                            .name
                        ],
                      )}
                      onChange={
                        handleChange
                      }
                      className={cn(
                        'h-4 w-4 rounded border-slate-300',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500',
                        'dark:border-slate-600',
                      )}
                    />
                  ) : (
                    <input
                      id={
                        field.name
                      }
                      name={
                        field.name
                      }
                      type={
                        field.type ??
                        'text'
                      }
                      placeholder={
                        field.placeholder
                      }
                      value={getStringValue(
                        formData[
                          field
                            .name
                        ],
                      )}
                      onChange={
                        handleChange
                      }
                      className={cn(
                        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2',
                        'text-slate-900 placeholder:text-slate-500',
                        'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
                        'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50',
                        field.error &&
                          'border-red-500',
                      )}
                    />
                  )}
                </div>

                {field.error && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {
                      field.error
                    }
                  </p>
                )}
              </div>
            ),
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={
              isSubmitting
            }
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-lg bg-blue-600 px-4 py-2 font-medium text-white',
              'hover:bg-blue-700 active:bg-blue-800',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
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
              onClick={
                onCancel
              }
              disabled={
                isSubmitting
              }
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-900',
                'hover:bg-slate-50 active:bg-slate-100',
                'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
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

SettingsForm.displayName =
  'SettingsForm';

export {
  SettingsForm,
};