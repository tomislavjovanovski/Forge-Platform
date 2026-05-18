import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * SettingsForm Pattern
 * Reusable form component for
 * settings/configuration with validation
 */
import { useState, forwardRef, } from 'react';
import { cn } from '../../utils/cn';
/**
 * SettingsForm Component
 * Provides a form for settings
 * and configuration with validation
 * and error handling
 */
const SettingsForm = forwardRef(({ fields, onSubmit, submitLabel = 'Save', showCancel = true, onCancel, title, description, isSubmitting = false, className, }, ref) => {
    const [formData, setFormData,] = useState(() => {
        const initial = {};
        fields.forEach((field) => {
            initial[field.name] =
                field.defaultValue ??
                    '';
        });
        return initial;
    });
    const handleChange = (event) => {
        const target = event.target;
        const { name, } = target;
        const value = target instanceof
            HTMLInputElement &&
            target.type ===
                'checkbox'
            ? target.checked
            : target.value;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const getStringValue = (value) => {
        return typeof value ===
            'string'
            ? value
            : '';
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
        }
    };
    return (_jsxs("form", { ref: ref, onSubmit: (event) => {
            void handleSubmit(event);
        }, className: cn('space-y-6 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900', className), children: [(title ||
                description) && (_jsxs("div", { children: [title && (_jsx("h2", { className: "text-xl font-semibold text-slate-900 dark:text-slate-50", children: title })), description && (_jsx("p", { className: "mt-1 text-sm text-slate-600 dark:text-slate-400", children: description }))] })), _jsx("div", { className: "space-y-4", children: fields.map((field) => (_jsxs("div", { children: [_jsxs("label", { htmlFor: field.name, className: "block text-sm font-medium text-slate-900 dark:text-slate-50", children: [field.label, field.required && (_jsx("span", { className: "ml-1 text-red-600", children: "*" }))] }), field.description && (_jsx("p", { className: "mt-1 text-xs text-slate-600 dark:text-slate-400", children: field.description })), _jsx("div", { className: "mt-2", children: field.type ===
                                'textarea' ? (_jsx("textarea", { id: field.name, name: field.name, placeholder: field.placeholder, value: getStringValue(formData[field
                                    .name]), onChange: handleChange, className: cn('w-full rounded-lg border border-slate-300 bg-white px-3 py-2', 'text-slate-900 placeholder:text-slate-500', 'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500', 'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50', field.error &&
                                    'border-red-500'), rows: 4 })) : field.type ===
                                'select' ? (_jsxs("select", { id: field.name, name: field.name, value: getStringValue(formData[field
                                    .name]), onChange: handleChange, className: cn('w-full rounded-lg border border-slate-300 bg-white px-3 py-2', 'text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500', 'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50', field.error &&
                                    'border-red-500'), children: [_jsx("option", { value: "", children: "Select an option" }), field.options?.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] })) : field.type ===
                                'checkbox' ? (_jsx("input", { id: field.name, name: field.name, type: "checkbox", checked: Boolean(formData[field
                                    .name]), onChange: handleChange, className: cn('h-4 w-4 rounded border-slate-300', 'focus:outline-none focus:ring-2 focus:ring-blue-500', 'dark:border-slate-600') })) : (_jsx("input", { id: field.name, name: field.name, type: field.type ??
                                    'text', placeholder: field.placeholder, value: getStringValue(formData[field
                                    .name]), onChange: handleChange, className: cn('w-full rounded-lg border border-slate-300 bg-white px-3 py-2', 'text-slate-900 placeholder:text-slate-500', 'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500', 'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50', field.error &&
                                    'border-red-500') })) }), field.error && (_jsx("p", { className: "mt-1 text-xs text-red-600 dark:text-red-400", children: field.error }))] }, field.name))) }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { type: "submit", disabled: isSubmitting, className: cn('inline-flex items-center justify-center gap-2', 'rounded-lg bg-blue-600 px-4 py-2 font-medium text-white', 'hover:bg-blue-700 active:bg-blue-800', 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2', 'disabled:cursor-not-allowed disabled:opacity-50', 'dark:focus:ring-offset-slate-900'), children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" }), "Saving..."] })) : (submitLabel) }), showCancel && (_jsx("button", { type: "button", onClick: onCancel, disabled: isSubmitting, className: cn('inline-flex items-center justify-center gap-2', 'rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-900', 'hover:bg-slate-50 active:bg-slate-100', 'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2', 'disabled:cursor-not-allowed disabled:opacity-50', 'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700'), children: "Cancel" }))] })] }));
});
SettingsForm.displayName =
    'SettingsForm';
export { SettingsForm, };
//# sourceMappingURL=SettingsForm.js.map