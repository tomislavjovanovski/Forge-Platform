import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * AsyncSection Pattern
 * Wraps async content with loading,
 * error, and empty states
 */
import { forwardRef, } from 'react';
import { cn } from '../../utils/cn';
/**
 * AsyncSection Component
 * Handles loading, error,
 * and empty states
 * for async content
 */
export const AsyncSection = forwardRef(({ children, isLoading = false, error = null, isEmpty = false, loadingContent, emptyContent, errorContent, title, description, className, }, ref) => {
    return (_jsxs("section", { ref: ref, className: cn('', className), children: [title && (_jsx("h2", { className: "mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50", children: title })), description && (_jsx("p", { className: "mb-4 text-sm text-slate-600 dark:text-slate-400", children: description })), isLoading && (_jsx("div", { className: "rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900", children: loadingContent ?? (_jsx("div", { className: "flex w-full items-center justify-center py-12", children: _jsxs("div", { className: "w-full space-y-4", children: [_jsx("div", { className: "h-4 rounded bg-slate-200 dark:bg-slate-800" }), _jsx("div", { className: "h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" }), _jsx("div", { className: "h-4 w-4/6 rounded bg-slate-200 dark:bg-slate-800" })] }) })) })), error && (_jsx("div", { className: "rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950", children: errorContent ? (errorContent(error)) : (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-red-900 dark:text-red-50", children: "Error loading content" }), _jsx("p", { className: "mt-1 text-sm text-red-800 dark:text-red-200", children: error.message })] })) })), !isLoading &&
                !error &&
                isEmpty && (_jsx("div", { className: "rounded-lg border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900", children: emptyContent ?? (_jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "No content available" })) })), !isLoading &&
                !error &&
                !isEmpty &&
                children] }));
});
AsyncSection.displayName =
    'AsyncSection';
//# sourceMappingURL=AsyncSection.js.map