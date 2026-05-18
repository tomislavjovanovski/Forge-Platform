/**
 * SettingsForm Pattern
 * Reusable form component for
 * settings/configuration with validation
 */
import { type ReactNode } from 'react';
type FormValue = string | boolean;
export interface FormField {
    name: string;
    label: ReactNode;
    type?: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'textarea';
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
    onSubmit?: (data: Record<string, FormValue>) => void | Promise<void>;
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
declare const SettingsForm: import("react").ForwardRefExoticComponent<SettingsFormProps & import("react").RefAttributes<HTMLFormElement>>;
export { SettingsForm, };
//# sourceMappingURL=SettingsForm.d.ts.map