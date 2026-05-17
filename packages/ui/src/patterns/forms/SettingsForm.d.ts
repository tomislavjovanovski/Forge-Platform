/**
 * SettingsForm Pattern
 * Reusable form component for settings/configuration with validation
 */
import React, { ReactNode } from 'react';
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
export declare const SettingsForm: React.ForwardRefExoticComponent<SettingsFormProps & React.RefAttributes<HTMLFormElement>>;
//# sourceMappingURL=SettingsForm.d.ts.map