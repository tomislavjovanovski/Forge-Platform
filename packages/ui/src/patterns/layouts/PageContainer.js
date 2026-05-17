import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * PageContainer Pattern
 * Responsive container for page content with consistent padding and max-width
 */
import React from 'react';
import { cn } from '../../utils/cn';
/**
 * PageContainer Component
 * Wraps page content with consistent spacing, max-width, and responsive behavior
 */
export const PageContainer = React.forwardRef(({ children, title, description, actions, className }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn('mx-auto max-w-7xl', className), children: [(title || description || actions) && (_jsxs("div", { className: "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [_jsxs("div", { className: "flex-1", children: [title && (_jsx("h1", { className: "text-3xl font-bold text-slate-900 dark:text-slate-50", children: title })), description && (_jsx("p", { className: "mt-2 text-slate-600 dark:text-slate-400", children: description }))] }), actions && _jsx("div", { className: "flex gap-2", children: actions })] })), children] }));
});
PageContainer.displayName = 'PageContainer';
//# sourceMappingURL=PageContainer.js.map